export type Vec3 = [number, number, number];

export type GeometryKind = "box" | "cylinder";

export interface BoxGeometrySpec {
  kind: "box";
  width: number;
  height: number;
  depth: number;
}

export interface CylinderGeometrySpec {
  kind: "cylinder";
  radiusTop: number;
  radiusBottom: number;
  height: number;
  radialSegments: number;
}

export type GeometrySpec = BoxGeometrySpec | CylinderGeometrySpec;

export interface ScenePart {
  id: string;
  name: string;
  visible: boolean;
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
  color: string;
  roughness: number;
  metalness: number;
  opacity: number;
  geometry: GeometrySpec;
}

export type EditorTool = "select" | "move" | "rotate" | "scale";

export type EditorTheme = "dark" | "light";

export type EditorStatus = "idle" | "loading" | "exporting" | "error";
