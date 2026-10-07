import type { Vec3 } from "@/types/scene";

export function radToDeg(radians: number) {
  return (radians * 180) / Math.PI;
}

export function degToRad(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function round(value: number, digits = 3) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function formatVec3(value: Vec3, digits = 3) {
  return value.map((n) => round(n, digits)) as Vec3;
}

export function parseFiniteNumber(raw: string, fallback: number) {
  const next = Number(raw);
  return Number.isFinite(next) ? next : fallback;
}
