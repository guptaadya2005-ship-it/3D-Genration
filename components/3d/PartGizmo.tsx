"use client";

import { TransformControls } from "@react-three/drei";
import type { Object3D } from "three";
import { useEditorStore } from "@/store/useEditorStore";

interface PartGizmoProps {
  object: Object3D | null;
}

export function PartGizmo({ object }: PartGizmoProps) {
  const tool = useEditorStore((state) => state.tool);
  const selectedId = useEditorStore((state) => state.selectedId);
  const setGizmoDragging = useEditorStore((state) => state.setGizmoDragging);
  const setPartTransform = useEditorStore((state) => state.setPartTransform);

  if (!object || !selectedId || tool === "select") {
    return null;
  }

  const mode = tool === "move" ? "translate" : tool;

  const sync = () => {
    setPartTransform(selectedId, {
      position: [object.position.x, object.position.y, object.position.z],
      rotation: [object.rotation.x, object.rotation.y, object.rotation.z],
      scale: [object.scale.x, object.scale.y, object.scale.z],
    });
  };

  return (
    <TransformControls
      object={object}
      mode={mode}
      size={0.85}
      onMouseDown={() => setGizmoDragging(true)}
      onMouseUp={() => {
        setGizmoDragging(false);
        sync();
      }}
      onObjectChange={sync}
    />
  );
}
