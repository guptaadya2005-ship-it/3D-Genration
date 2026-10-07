import type { ScenePart } from "@/types/scene";

const WHEEL_ROTATION: ScenePart["rotation"] = [0, 0, Math.PI / 2];

function wheel(
  id: string,
  name: string,
  x: number,
  z: number,
): ScenePart {
  return {
    id,
    name,
    visible: true,
    position: [x, 0.22, z],
    rotation: [...WHEEL_ROTATION],
    scale: [1, 1, 1],
    color: "#1f2933",
    roughness: 0.72,
    metalness: 0.18,
    opacity: 1,
    geometry: {
      kind: "cylinder",
      radiusTop: 0.22,
      radiusBottom: 0.22,
      height: 0.16,
      radialSegments: 28,
    },
  };
}

export function createSampleCar(): ScenePart[] {
  return [
    {
      id: "body",
      name: "Body",
      visible: true,
      position: [0, 0.46, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: "#3b82f6",
      roughness: 0.38,
      metalness: 0.42,
      opacity: 1,
      geometry: { kind: "box", width: 1.85, height: 0.42, depth: 0.92 },
    },
    wheel("wheel-fl", "Wheel Front Left", 0.58, 0.52),
    wheel("wheel-fr", "Wheel Front Right", 0.58, -0.52),
    wheel("wheel-rl", "Wheel Rear Left", -0.58, 0.52),
    wheel("wheel-rr", "Wheel Rear Right", -0.58, -0.52),
    {
      id: "windows",
      name: "Windows",
      visible: true,
      position: [-0.08, 0.84, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: "#93c5fd",
      roughness: 0.08,
      metalness: 0.12,
      opacity: 0.42,
      geometry: { kind: "box", width: 1.05, height: 0.34, depth: 0.78 },
    },
  ];
}
