import * as THREE from "three";
import type { GeometrySpec } from "@/types/scene";

export function createGeometry(spec: GeometrySpec): THREE.BufferGeometry {
  if (spec.kind === "box") {
    return new THREE.BoxGeometry(spec.width, spec.height, spec.depth);
  }

  return new THREE.CylinderGeometry(
    spec.radiusTop,
    spec.radiusBottom,
    spec.height,
    spec.radialSegments,
  );
}
