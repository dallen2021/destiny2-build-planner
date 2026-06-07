"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

export type GearItem = {
  hash: string;
  shader?: string | null;
  /** Applied dye hashes for this piece (from CharacterRenderData.peerView). */
  dyes?: number[];
};

export function GearCanvas({
  items,
  showStatus = true,
  interactive = true,
  fill = 2.1,
}: {
  items: GearItem[];
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
    // Tone-map the HDR emissive (the nebula glow runs > 1) so the surface stays
    // a rich magenta instead of clamping to flat pink; bloom adds the halo.
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    if (!interactive) renderer.domElement.style.pointerEvents = "none";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.001, 100);

    // Post-processing: render → selective bloom (the emissive nebula glow) →
    // tone-map/output. Only HDR-bright pixels (the emissive) bloom.
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(mount.clientWidth || 1, mount.clientHeight || 1),
      0.55, // strength
      0.4, // radius
      0.55, // threshold — only the bright emissive blooms
    );
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h);
      composer.setSize(w, h);
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
      emissive: [number, number, number];
    };
    type Plate = {
      w: number;
      h: number;
      placements: { x: number; y: number; w: number; h: number; png: number }[];
    } | null;
    type PartHeader = {
      v: number;
      i: number;
      diffuse: Plate;
      normal: Plate;
      gearstack: Plate;
      dyeslot: Plate;
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

    // Bungie's gear-dye model (from spasm): albedo = overlay(diffuse, dyeColor)
    // masked by gearstack.r. The dye color is chosen per pixel — preferentially
    // from the dyeslot plate (R/G/B = weights for dye slots 0/1/2, giving true
    // per-pixel multi-tone), falling back to the per-vertex index palette when a
    // piece ships no dyeslot.
    const DYE_PALETTE_SIZE = 8;
    const applyDye = (
      material: THREE.MeshStandardMaterial,
      gearstack: THREE.CanvasTexture,
      palette: THREE.Vector3[],
      dyeslot: THREE.CanvasTexture | null,
      slotColors: THREE.Vector3[],
      diffuseRect: THREE.Vector4,
      dyeslotRect: THREE.Vector4,
      emissive: THREE.Vector3,
      emissiveStrength: number,
      wisp: THREE.Texture | null,
      wispTile: number,
    ) => {
      const useDyeslot = dyeslot != null;
      // Glow requires the shader's "wisp" mask (only the bright wisps glow).
      const useWisp = useDyeslot && wisp != null && emissiveStrength > 0;
      material.onBeforeCompile = (shader) => {
        shader.uniforms.uGearstack = { value: gearstack };
        if (useDyeslot) {
          shader.uniforms.uDyeslot = { value: dyeslot };
          shader.uniforms.uSlot0 = { value: slotColors[0] };
          shader.uniforms.uSlot1 = { value: slotColors[1] };
          shader.uniforms.uSlot2 = { value: slotColors[2] };
          shader.uniforms.uDiffuseRect = { value: diffuseRect };
          shader.uniforms.uDyeslotRect = { value: dyeslotRect };
        } else {
          shader.uniforms.uChangeColors = { value: palette };
        }
        if (useWisp) {
          shader.uniforms.uEmissive = { value: emissive };
          shader.uniforms.uEmissiveStrength = { value: emissiveStrength };
          shader.uniforms.uWisp = { value: wisp };
          shader.uniforms.uWispTile = { value: wispTile };
        }
        shader.vertexShader =
          "attribute float aDyeIndex;\nvarying float vDyeIndex;\n" +
          shader.vertexShader.replace(
            "#include <begin_vertex>",
            "#include <begin_vertex>\n  vDyeIndex = aDyeIndex;",
          );
        const decl =
          (useDyeslot
            ? "uniform sampler2D uGearstack;\nuniform sampler2D uDyeslot;\nuniform vec3 uSlot0;\nuniform vec3 uSlot1;\nuniform vec3 uSlot2;\nuniform vec4 uDiffuseRect;\nuniform vec4 uDyeslotRect;\nvarying float vDyeIndex;\n"
            : `uniform sampler2D uGearstack;\nuniform vec3 uChangeColors[${DYE_PALETTE_SIZE}];\nvarying float vDyeIndex;\n`) +
          (useWisp
            ? "uniform vec3 uEmissive;\nuniform float uEmissiveStrength;\nuniform sampler2D uWisp;\nuniform float uWispTile;\n"
            : "");
        // The dyeslot plate packs its texture at a different rect than the
        // diffuse, so map the diffuse-plate UV → 0..1 surface fraction → the
        // dyeslot's own rect before sampling. (gearstack already matches diffuse.)
        const pickDye = useDyeslot
          ? "vec2 d2Frac = (vMapUv - uDiffuseRect.xy) / uDiffuseRect.zw;\n  vec2 d2SlotUV = uDyeslotRect.xy + d2Frac * uDyeslotRect.zw;\n  vec4 d2Slot = texture2D(uDyeslot, d2SlotUV);\n  float d2w = d2Slot.r + d2Slot.g + d2Slot.b;\n  vec3 d2Dye = d2w > 0.003 ? (d2Slot.r * uSlot0 + d2Slot.g * uSlot1 + d2Slot.b * uSlot2) / d2w : uSlot0;"
          : `int d2i = int(clamp(vDyeIndex + 0.5, 0.0, float(${DYE_PALETTE_SIZE - 1})));\n  vec3 d2Dye = uChangeColors[d2i];`;
        let frag = shader.fragmentShader.replace(
          "#include <map_fragment>",
          `#include <map_fragment>\n  ${pickDye}\n  float d2Mask = texture2D(uGearstack, vMapUv).r;\n  diffuseColor.rgb = mix(diffuseColor.rgb, d2Overlay(diffuseColor.rgb, d2Dye), d2Mask);`,
        );
        // Galaxy-shader glow: the dye's emissive tint lights the slot-2 (nebula)
        // regions, gated by the shader's grayscale "wisp" texture so only the
        // bright wisps glow — the magenta nebula between the gold stripes.
        if (useWisp) {
          frag = frag.replace(
            "#include <emissivemap_fragment>",
            "#include <emissivemap_fragment>\n  float d2Wisp = texture2D(uWisp, vMapUv * uWispTile).r;\n  totalEmissiveRadiance += uEmissive * d2Slot.b * d2Wisp * d2Mask * uEmissiveStrength;",
          );
        }
        shader.fragmentShader =
          decl +
          "vec3 d2Overlay(vec3 b, vec3 s){return mix(2.0*b*s,1.0-2.0*(1.0-b)*(1.0-s),step(vec3(0.5),b));}\n" +
          frag;
      };
      material.customProgramCacheKey = () =>
        useWisp ? "d2-dye-slot-v4-wisp" : useDyeslot ? "d2-dye-slot-v4" : "d2-dye-v2";
    };

    // Normalized placement rect (x, y, w, h) of a plate's first texture.
    const plateRect = (plate: Plate): THREE.Vector4 => {
      const pl = plate?.placements?.[0];
      return plate && pl && plate.w && plate.h
        ? new THREE.Vector4(pl.x / plate.w, pl.y / plate.h, pl.w / plate.w, pl.h / plate.h)
        : new THREE.Vector4(0, 0, 1, 1);
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
          items.map(async ({ hash, shader, dyes }) => {
            const params = new URLSearchParams();
            if (shader) params.set("shader", shader);
            if (dyes && dyes.length > 0) params.set("dyes", dyes.join(","));
            const query = params.toString();
            const url = `/api/render/gear/${hash}${query ? `?${query}` : ""}`;
            const response = await fetch(url);
            const contentType = response.headers.get("content-type") ?? "";
            if (!response.ok || !contentType.includes("octet-stream")) return;
            const buffer = await response.arrayBuffer();
            const dv = new DataView(buffer);
            const jsonLength = dv.getUint32(0, true);
            const header = JSON.parse(
              new TextDecoder().decode(new Uint8Array(buffer, 4, jsonLength)),
            ) as { dyes: Dye[]; parts: PartHeader[]; wisp?: number | null };
            // gear_dye_change_color_index encodes slot*2 + (0 primary, 1 secondary).
            const colorForIndex = (index: number): [number, number, number] | null => {
              const slot = index >> 1;
              const dye =
                header.dyes.find((d) => d.slot === slot) ?? header.dyes[slot] ?? header.dyes[0];
              if (!dye) return null;
              return (index & 1) === 1 ? dye.secondary : dye.primary;
            };

            // Geometry section (4-byte aligned) first.
            let cursor = (4 + jsonLength + 3) & ~3;
            const built: {
              geometry: THREE.BufferGeometry;
              v: number;
              diffuse: Plate;
              normal: Plate;
              gearstack: Plate;
              dyeslot: Plate;
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
                v: part.v,
                diffuse: part.diffuse,
                normal: part.normal,
                gearstack: part.gearstack,
                dyeslot: part.dyeslot,
              });
              triangleTotal += part.i / 3;
            }

            // Per-vertex dye indices (u8) follow geometry; upload as a float attr.
            for (const part of built) {
              const dyeBytes = new Uint8Array(buffer, cursor, part.v);
              cursor += part.v;
              const aDyeIndex = new Float32Array(part.v);
              for (let n = 0; n < part.v; n += 1) aDyeIndex[n] = dyeBytes[n];
              part.geometry.setAttribute("aDyeIndex", new THREE.BufferAttribute(aDyeIndex, 1));
            }

            // 8-entry dye palette keyed by gear_dye_change_color_index; 0.5 grey
            // is an overlay no-op for unused slots.
            const palette: THREE.Vector3[] = [];
            for (let n = 0; n < DYE_PALETTE_SIZE; n += 1) {
              const c = colorForIndex(n);
              palette.push(
                c ? new THREE.Vector3(c[0], c[1], c[2]) : new THREE.Vector3(0.5, 0.5, 0.5),
              );
            }

            // PNG sections follow, in order: diffuse, normal, gearstack, dyeslot.
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
            const dyeslotTex = await compositeAll(built.map((b) => b.dyeslot), false);

            // The shader's grayscale wisp/nebula texture (one, shared) follows the
            // part PNGs — the mask that gates where the emissive glow lands.
            const wispLen = header.wisp ?? 0;
            let wispTex: THREE.Texture | null = null;
            if (wispLen > 0) {
              try {
                const bmp = await createImageBitmap(
                  new Blob([new Uint8Array(buffer.slice(off, off + wispLen))]),
                );
                const canvas = document.createElement("canvas");
                canvas.width = bmp.width;
                canvas.height = bmp.height;
                canvas.getContext("2d")?.drawImage(bmp, 0, 0);
                bmp.close();
                wispTex = new THREE.CanvasTexture(canvas);
                wispTex.wrapS = THREE.RepeatWrapping;
                wispTex.wrapT = THREE.RepeatWrapping;
                wispTex.colorSpace = THREE.NoColorSpace;
                wispTex.flipY = false;
              } catch {
                wispTex = null;
              }
              off += wispLen;
            }

            // Primary color for dye slots 0/1/2 (raw-linear), indexed by the
            // dyeslot plate's R/G/B weights. Missing slot → neutral overlay no-op.
            const slotColor = (s: number): THREE.Vector3 => {
              const dye = header.dyes.find((d) => d.slot === s) ?? header.dyes[s] ?? header.dyes[0];
              return dye
                ? new THREE.Vector3(dye.primary[0], dye.primary[1], dye.primary[2])
                : new THREE.Vector3(0.5, 0.5, 0.5);
            };
            const slotColors = [slotColor(0), slotColor(1), slotColor(2)];

            // Emissive glow uses slot-2's emissive tint, but only when it's a
            // saturated color (galaxy/“wisp” shaders) — skip white/grey/black.
            const e = header.dyes.find((d) => d.slot === 2)?.emissive ?? [0, 0, 0];
            const eMax = Math.max(e[0], e[1], e[2]);
            const eMin = Math.min(e[0], e[1], e[2]);
            const emissiveColor = new THREE.Vector3(e[0], e[1], e[2]);
            const emissiveStrength = eMax > 0.1 && eMax - eMin > 0.2 ? 2.6 : 0;

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
              if (gearstack)
                applyDye(
                  material,
                  gearstack,
                  palette,
                  dyeslotTex[k],
                  slotColors,
                  plateRect(part.diffuse),
                  plateRect(part.dyeslot),
                  emissiveColor,
                  emissiveStrength,
                  wispTex,
                  4,
                );
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
          `${items.length} piece${items.length === 1 ? "" : "s"} · ${triangleTotal.toLocaleString()} triangles`,
        );
      } catch (error) {
        setStatus(`Failed: ${error instanceof Error ? error.message : String(error)}`);
      }
    })();

    const loop = () => {
      frame = requestAnimationFrame(loop);
      controls?.update();
      composer.render();
    };
    loop();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      controls?.dispose();
      composer.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [items, interactive, fill]);

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
