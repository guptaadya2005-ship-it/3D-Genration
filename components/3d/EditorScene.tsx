"use client";

import { ContactShadows, Grid, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Object3D } from "three";
import { PartGizmo } from "@/components/3d/PartGizmo";
import { PartMesh } from "@/components/3d/PartMesh";
import { useEditorStore } from "@/store/useEditorStore";

export function EditorScene() {
  const parts = useEditorStore((state) => state.parts);
  const selectedId = useEditorStore((state) => state.selectedId);
  const gizmoDragging = useEditorStore((state) => state.gizmoDragging);
  const theme = useEditorStore((state) => state.theme);
  const selectPart = useEditorStore((state) => state.selectPart);
  const setViewportReady = useEditorStore((state) => state.setViewportReady);
  const objects = useRef<Record<string, Object3D | null>>({});
  const [gizmoTarget, setGizmoTarget] = useState<Object3D | null>(null);
  const { gl } = useThree();

  useEffect(() => {
    setViewportReady(true);
    return () => setViewportReady(false);
  }, [setViewportReady]);

  useEffect(() => {
    const onLost = (event: Event) => {
      event.preventDefault();
      useEditorStore.setState({
        status: "error",
        errorMessage:
          "The graphics context was lost. Reload the page and close extra browser tabs.",
        statusMessage: "Viewport crashed",
      });
    };
    gl.domElement.addEventListener("webglcontextlost", onLost, false);
    return () => gl.domElement.removeEventListener("webglcontextlost", onLost);
  }, [gl]);

  useLayoutEffect(() => {
    setGizmoTarget(selectedId ? objects.current[selectedId] ?? null : null);
  }, [selectedId, parts]);

  return (
    <>
      <color attach="background" args={[theme === "dark" ? "#12151a" : "#d7dde6"]} />
      <hemisphereLight args={["#dbeafe", "#1e293b", 0.7]} />
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[4, 8, 4]}
        intensity={1.35}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Grid
        infiniteGrid
        fadeDistance={18}
        fadeStrength={0.6}
        sectionColor="#3b4a63"
        cellColor="#2a3342"
        cellSize={0.5}
        sectionSize={2}
        position={[0, 0, 0]}
      />
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.35}
        scale={10}
        blur={2.2}
        far={4}
      />
      <group
        onPointerMissed={() => {
          if (!gizmoDragging) selectPart(null);
        }}
      >
        {parts.map((part) => (
          <PartMesh
            key={part.id}
            part={part}
            onBind={(id, object) => {
              objects.current[id] = object;
            }}
          />
        ))}
      </group>
      <PartGizmo object={gizmoTarget} />
      <OrbitControls
        makeDefault
        enabled={!gizmoDragging}
        minDistance={1.5}
        maxDistance={16}
        target={[0, 0.4, 0]}
      />
    </>
  );
}
