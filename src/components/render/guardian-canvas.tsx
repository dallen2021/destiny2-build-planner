"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function GearCanvas({
  itemHashes,
  showStatus = true,
  interactive = true,
  fill = 2.1,
}: {
  itemHashes: string[];
  showStatus?: boolean;
  interactive?: boolean;
  /** Camera distance multiplier; lower = the Guardian fills more of the frame. */
  fill?: number;
}) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState("Loading geometry…");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let frame = 0;
    let controls: OrbitControls | null = null;
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    if (!interactive) renderer.domElement.style.pointerEvents = "none";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.001, 100);

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    scene.add(new THREE.HemisphereLight(0xbcd2ff, 0x202830, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(2.5, 4, 3);
    scene.add(key);
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.1);
    fillLight.position.set(-1, 1, 3);
    scene.add(fillLight);
    const rim = new THREE.DirectionalLight(0x9fc0ff, 1.4);
    rim.position.set(-3, 1.5, -3);
    scene.add(rim);

    // Outer group = yaw + framing; inner = stand-up rotation. Nesting keeps the
    // two rotations from interacting through a single Euler.
    const group = new THREE.Group();
    const model = new THREE.Group();
    group.add(model);
    scene.add(group);

    type Dye = {
      slot: number;
      cloth: boolean;
      primary: [number, number, number];
      secondary: [number, number, number];
    };
    type Plate = {
      w: number;
      h: number;
      placements: { x: number; y: number; w: number; h: number; png: number }[];
    } | null;
    type PartHeader = {
      v: number;
      i: number;
      dyeSlot: number;
      diffuse: Plate;
      normal: Plate;
      gearstack: Plate;
    };

    // Composite a plate's placement PNGs (starting at `offset`) into a canvas
    // texture; returns the texture and the advanced byte offset.
    const compositePlate = async (
      buffer: ArrayBuffer,
      offset: number,
      plate: NonNullable<Plate>,
    ): Promise<{ texture: THREE.CanvasTexture; offset: number }> => {
      const canvas = document.createElement("canvas");
      canvas.width = plate.w;
      canvas.height = plate.h;
      const ctx = canvas.getContext("2d");
      for (const pl of plate.placements) {
        const pngBytes = new Uint8Array(buffer.slice(offset, offset + pl.png));
        offset += pl.png;
        if (!ctx) continue;
        try {
          const bmp = await createImageBitmap(new Blob([pngBytes]));
          ctx.drawImage(bmp, pl.x, pl.y, pl.w, pl.h);
          bmp.close();
        } catch {
          // skip an undecodable placement
        }
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.flipY = false;
      return { texture, offset };
    };

    // Bungie's gear-dye model (from spasm): the final albedo is the diffuse
    // overlay-blended with the dye color, masked by the gearstack red channel.
    const applyDye = (
      material: THREE.MeshStandardMaterial,
      gearstack: THREE.CanvasTexture,
      dye: Dye,
    ) => {
      const change = new THREE.Vector3(dye.secondary[0], dye.secondary[1], dye.secondary[2]);
      material.onBeforeCompile = (shader) => {
        shader.uniforms.uGearstack = { value: gearstack };
        shader.uniforms.uChangeColor = { value: change };
        shader.fragmentShader =
          "uniform sampler2D uGearstack;\nuniform vec3 uChangeColor;\n" +
          "vec3 d2Overlay(vec3 b, vec3 s){return mix(2.0*b*s,1.0-2.0*(1.0-b)*(1.0-s),step(vec3(0.5),b));}\n" +
          shader.fragmentShader.replace(
            "#include <map_fragment>",
            "#include <map_fragment>\n  float d2Mask = texture2D(uGearstack, vMapUv).r;\n  diffuseColor.rgb = mix(diffuseColor.rgb, d2Overlay(diffuseColor.rgb, uChangeColor), d2Mask);",
          );
      };
      material.customProgramCacheKey = () => "d2-dye-v1";
    };

    void (async () => {
      try {
        const fallbackMaterial = new THREE.MeshStandardMaterial({
          color: 0xc2cad2,
          metalness: 0.25,
          roughness: 0.6,
          side: THREE.DoubleSide,
        });
        let triangleTotal = 0;

        await Promise.all(
          itemHashes.map(async (hash) => {
            const response = await fetch(`/api/render/gear/${hash}`);
            const contentType = response.headers.get("content-type") ?? "";
            if (!response.ok || !contentType.includes("octet-stream")) return;
            const buffer = await response.arrayBuffer();
            const dv = new DataView(buffer);
            const jsonLength = dv.getUint32(0, true);
            const header = JSON.parse(
              new TextDecoder().decode(new Uint8Array(buffer, 4, jsonLength)),
            ) as { dyes: Dye[]; parts: PartHeader[] };
            const dyeFor = (slot: number) =>
              header.dyes.find((d) => d.slot === slot) ??
              header.dyes[slot] ??
              header.dyes[0] ??
              null;

            // Geometry section (4-byte aligned) first.
            let cursor = (4 + jsonLength + 3) & ~3;
            const built: {
              geometry: THREE.BufferGeometry;
              diffuse: Plate;
              normal: Plate;
              gearstack: Plate;
              dyeSlot: number;
            }[] = [];
            for (const part of header.parts) {
              const positions = new Float32Array(buffer, cursor, part.v * 3);
              cursor += part.v * 3 * 4;
              const normals = new Float32Array(buffer, cursor, part.v * 3);
              cursor += part.v * 3 * 4;
              const uvs = new Float32Array(buffer, cursor, part.v * 2);
              cursor += part.v * 2 * 4;
              const indices = new Uint32Array(buffer, cursor, part.i);
              cursor += part.i * 4;

              const geometry = new THREE.BufferGeometry();
              geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
              geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
              geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
              geometry.setIndex(new THREE.BufferAttribute(indices, 1));
              built.push({
                geometry,
                diffuse: part.diffuse,
                normal: part.normal,
                gearstack: part.gearstack,
                dyeSlot: part.dyeSlot,
              });
              triangleTotal += part.i / 3;
            }

            // PNG sections follow geometry, in order: diffuse, normal, gearstack.
            let off = cursor;
            const compositeAll = async (plates: Plate[], srgb: boolean) => {
              const out: (THREE.CanvasTexture | null)[] = [];
              for (const plate of plates) {
                if (plate) {
                  const r = await compositePlate(buffer, off, plate);
                  r.texture.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
                  out.push(r.texture);
                  off = r.offset;
                } else {
                  out.push(null);
                }
              }
              return out;
            };
            const diffuseTex = await compositeAll(built.map((b) => b.diffuse), true);
            const normalTex = await compositeAll(built.map((b) => b.normal), false);
            const gearstackTex = await compositeAll(built.map((b) => b.gearstack), false);

            built.forEach((part, k) => {
              const diffuse = diffuseTex[k];
              if (!diffuse) {
                model.add(new THREE.Mesh(part.geometry, fallbackMaterial));
                return;
              }
              const material = new THREE.MeshStandardMaterial({
                map: diffuse,
                normalMap: normalTex[k] ?? null,
                metalness: 0.28,
                roughness: 0.62,
                side: THREE.DoubleSide,
              });
              const gearstack = gearstackTex[k];
              const dye = dyeFor(part.dyeSlot);
              if (gearstack && dye) applyDye(material, gearstack, dye);
              model.add(new THREE.Mesh(part.geometry, material));
            });
          }),
        );

        if (model.children.length === 0) {
          setStatus("No geometry loaded");
          return;
        }

        // Destiny gear is authored Z-up; stand the Guardian up for a Y-up scene,
        // then yaw 180° so the front faces the camera + key light.
        model.rotation.x = -Math.PI / 2;
        group.rotation.y = Math.PI;

        const box = new THREE.Box3().setFromObject(group);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        group.position.sub(center);
        const radius = Math.max(size.x, size.y, size.z, 0.001) * 0.5;
        const distance = (radius / Math.tan((camera.fov * Math.PI) / 360)) * fill;
        camera.position.set(distance * 0.32, distance * 0.1, distance);
        camera.lookAt(0, 0, 0);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.4;
        controls.enableZoom = interactive;
        controls.enablePan = false;
        controls.enableRotate = interactive;
        controls.target.set(0, 0, 0);
        controls.update();

        setStatus(
          `${itemHashes.length} piece${itemHashes.length === 1 ? "" : "s"} · ${triangleTotal.toLocaleString()} triangles`,
        );
      } catch (error) {
        setStatus(`Failed: ${error instanceof Error ? error.message : String(error)}`);
      }
    })();

    const loop = () => {
      frame = requestAnimationFrame(loop);
      controls?.update();
      renderer.render(scene, camera);
    };
    loop();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      controls?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [itemHashes, interactive, fill]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
      {showStatus ? (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 14,
            color: "#cfd6dd",
            font: "12px ui-monospace, monospace",
            letterSpacing: "0.04em",
            pointerEvents: "none",
          }}
        >
          {status}
        </div>
      ) : null}
    </div>
  );
}
