"use client";

import { Canvas } from "@react-three/fiber";
import { EditorScene } from "@/components/3d/EditorScene";
import { useEditorStore } from "@/store/useEditorStore";

export default function ViewportCanvas() {
  const theme = useEditorStore((state) => state.theme);

  return (
    <Canvas
      shadows
      dpr={1}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "low-power",
        preserveDrawingBuffer: true,
      }}
      camera={{ position: [3.4, 2.4, 3.6], fov: 42, near: 0.1, far: 80 }}
      onCreated={({ gl }) => {
        gl.setClearColor(theme === "dark" ? "#12151a" : "#d7dde6", 1);
      }}
    >
      <EditorScene />
    </Canvas>
  );
}
