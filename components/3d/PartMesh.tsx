"use client";

import { Outlines } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { useEditorStore } from "@/store/useEditorStore";
import type { ScenePart } from "@/types/scene";

interface PartMeshProps {
  part: ScenePart;
  onBind: (id: string, object: THREE.Object3D | null) => void;
}

export function PartMesh({ part, onBind }: PartMeshProps) {
  const selectedId = useEditorStore((state) => state.selectedId);
  const selectPart = useEditorStore((state) => state.selectPart);
  const selected = selectedId === part.id && part.visible;

  const geometry = useMemo(() => {
    if (part.geometry.kind === "box") {
      return (
        <boxGeometry
          args={[
            part.geometry.width,
            part.geometry.height,
            part.geometry.depth,
          ]}
        />
      );
    }

    return (
      <cylinderGeometry
        args={[
          part.geometry.radiusTop,
          part.geometry.radiusBottom,
          part.geometry.height,
          part.geometry.radialSegments,
        ]}
      />
    );
  }, [part.geometry]);

  return (
    <mesh
      ref={(object) => onBind(part.id, object)}
      name={part.name}
      userData={{ partId: part.id }}
      visible={part.visible}
      position={part.position}
      rotation={part.rotation}
      scale={part.scale}
      castShadow
      receiveShadow
      onClick={(event) => {
        event.stopPropagation();
        selectPart(part.id);
      }}
    >
      {geometry}
      <meshStandardMaterial
        color={part.color}
        roughness={part.roughness}
        metalness={part.metalness}
        transparent={part.opacity < 1}
        opacity={part.opacity}
        side={THREE.DoubleSide}
      />
      {selected ? (
        <Outlines thickness={2.5} color="#f59e0b" screenspace />
      ) : null}
    </mesh>
  );
}
