import * as THREE from "three";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import { createGeometry } from "@/lib/geometry";
import type { ScenePart } from "@/types/scene";

export function buildExportScene(parts: ScenePart[]) {
  const scene = new THREE.Scene();

  for (const part of parts) {
    const geometry = createGeometry(part.geometry);
    const material = new THREE.MeshStandardMaterial({
      color: part.color,
      roughness: part.roughness,
      metalness: part.metalness,
      transparent: part.opacity < 1,
      opacity: part.opacity,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = part.name;
    mesh.position.set(...part.position);
    mesh.rotation.set(...part.rotation);
    mesh.scale.set(...part.scale);
    mesh.visible = part.visible;
    scene.add(mesh);
  }

  return scene;
}

export function exportSceneToGlb(parts: ScenePart[]): Promise<ArrayBuffer> {
  if (parts.length === 0) {
    return Promise.reject(new Error("There is nothing to export."));
  }

  const scene = buildExportScene(parts);
  const exporter = new GLTFExporter();

  return new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (result) => {
        disposeScene(scene);
        if (result instanceof ArrayBuffer) {
          resolve(result);
          return;
        }
        reject(new Error("GLB export did not return binary data."));
      },
      (error) => {
        disposeScene(scene);
        reject(error instanceof Error ? error : new Error("GLB export failed."));
      },
      { binary: true },
    );
  });
}

export function downloadArrayBuffer(buffer: ArrayBuffer, filename: string) {
  const blob = new Blob([buffer], { type: "model/gltf-binary" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function disposeScene(scene: THREE.Scene) {
  scene.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (mesh.isMesh) {
      mesh.geometry.dispose();
      const material = mesh.material;
      if (Array.isArray(material)) {
        material.forEach((item) => item.dispose());
      } else {
        material.dispose();
      }
    }
  });
}
