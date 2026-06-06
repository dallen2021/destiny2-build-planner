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

    type PartHeader = {
      v: number;
      i: number;
      plate: {
        w: number;
        h: number;
        placements: { x: number; y: number; w: number; h: number; png: number }[];
      } | null;
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
            ) as { parts: PartHeader[] };

            // Geometry section (4-byte aligned), then all PNG bytes.
            let cursor = (4 + jsonLength + 3) & ~3;
            const built: { geometry: THREE.BufferGeometry; plate: PartHeader["plate"] }[] = [];
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
              built.push({ geometry, plate: part.plate });
              triangleTotal += part.i / 3;
            }

            let pngCursor = cursor;
            for (const { geometry, plate } of built) {
              let material: THREE.MeshStandardMaterial = fallbackMaterial;
              if (plate && plate.placements.length > 0) {
                const canvas = document.createElement("canvas");
                canvas.width = plate.w;
                canvas.height = plate.h;
                const ctx = canvas.getContext("2d");
                for (const pl of plate.placements) {
                  const pngBytes = new Uint8Array(buffer.slice(pngCursor, pngCursor + pl.png));
                  pngCursor += pl.png;
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
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.flipY = false;
                material = new THREE.MeshStandardMaterial({
                  map: texture,
                  metalness: 0.2,
                  roughness: 0.72,
                  side: THREE.DoubleSide,
                });
              }
              model.add(new THREE.Mesh(geometry, material));
            }
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
