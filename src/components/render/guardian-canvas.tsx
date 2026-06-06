"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function GearCanvas({ itemHash }: { itemHash: string }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState("Loading geometry…");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let frame = 0;
    let controls: OrbitControls | null = null;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.001, 100);

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
    const fill = new THREE.DirectionalLight(0xffffff, 1.1);
    fill.position.set(-1, 1, 3);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0x9fc0ff, 1.4);
    rim.position.set(-3, 1.5, -3);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

    void (async () => {
      try {
        const response = await fetch(`/api/render/gear/${itemHash}`);
        const contentType = response.headers.get("content-type") ?? "";
        if (!response.ok || !contentType.includes("octet-stream")) {
          const failure = (await response.json().catch(() => null)) as { error?: string } | null;
          setStatus(`Error: ${failure?.error ?? `HTTP ${response.status}`}`);
          return;
        }
        const buffer = await response.arrayBuffer();
        const view = new DataView(buffer);
        const vertexCount = view.getUint32(0, true);
        const indexCount = view.getUint32(4, true);
        const positions = new Float32Array(buffer, 8, vertexCount * 3);
        const indices = new Uint32Array(buffer, 8 + vertexCount * 3 * 4, indexCount);

        const material = new THREE.MeshStandardMaterial({
          color: 0xc2cad2,
          metalness: 0.6,
          roughness: 0.5,
          side: THREE.DoubleSide,
        });
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setIndex(new THREE.BufferAttribute(indices, 1));
        geometry.computeVertexNormals();
        group.add(new THREE.Mesh(geometry, material));

        const box = new THREE.Box3().setFromObject(group);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        group.position.sub(center);
        const radius = Math.max(size.x, size.y, size.z, 0.001) * 0.5;
        const distance = (radius / Math.tan((camera.fov * Math.PI) / 360)) * 2.4;
        camera.position.set(distance * 0.6, distance * 0.3, distance);
        camera.lookAt(0, 0, 0);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.6;
        controls.target.set(0, 0, 0);
        controls.update();

        const stats = JSON.parse(response.headers.get("x-mesh-stats") ?? "{}") as {
          triangleCount?: number;
        };
        setStatus(`${(stats.triangleCount ?? indexCount / 3).toLocaleString()} triangles`);
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
  }, [itemHash]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
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
    </div>
  );
}
