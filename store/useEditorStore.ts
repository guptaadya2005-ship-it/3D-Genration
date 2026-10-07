"use client";

import { create } from "zustand";
import { downloadArrayBuffer, exportSceneToGlb } from "@/lib/exportGlb";
import { createSampleCar } from "@/lib/sampleCar";
import type {
  EditorStatus,
  EditorTheme,
  EditorTool,
  ScenePart,
  Vec3,
} from "@/types/scene";

interface EditorState {
  parts: ScenePart[];
  selectedId: string | null;
  tool: EditorTool;
  theme: EditorTheme;
  status: EditorStatus;
  statusMessage: string;
  errorMessage: string | null;
  leftPanelOpen: boolean;
  rightPanelOpen: boolean;
  viewportReady: boolean;
  gizmoDragging: boolean;
  selectPart: (id: string | null) => void;
  setTool: (tool: EditorTool) => void;
  setTheme: (theme: EditorTheme) => void;
  toggleTheme: () => void;
  togglePanel: (side: "left" | "right") => void;
  setViewportReady: (ready: boolean) => void;
  setGizmoDragging: (dragging: boolean) => void;
  updatePart: (id: string, patch: Partial<ScenePart>) => void;
  setPartTransform: (
    id: string,
    transform: { position: Vec3; rotation: Vec3; scale: Vec3 },
  ) => void;
  toggleVisibility: (id: string) => void;
  hideSelected: () => void;
  deleteSelected: () => void;
  resetSample: () => void;
  exportGlb: () => Promise<void>;
  clearError: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  parts: createSampleCar(),
  selectedId: "body",
  tool: "select",
  theme: "dark",
  status: "loading",
  statusMessage: "Loading viewport…",
  errorMessage: null,
  leftPanelOpen: false,
  rightPanelOpen: false,
  viewportReady: false,
  gizmoDragging: false,

  selectPart: (id) => set({ selectedId: id }),

  setTool: (tool) => set({ tool }),

  setTheme: (theme) => set({ theme }),

  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),

  togglePanel: (side) =>
    set((state) =>
      side === "left"
        ? { leftPanelOpen: !state.leftPanelOpen }
        : { rightPanelOpen: !state.rightPanelOpen },
    ),

  setViewportReady: (ready) =>
    set({
      viewportReady: ready,
      status: ready ? "idle" : "loading",
      statusMessage: ready ? "Ready" : "Loading viewport…",
    }),

  setGizmoDragging: (dragging) => set({ gizmoDragging: dragging }),

  updatePart: (id, patch) =>
    set((state) => ({
      parts: state.parts.map((part) =>
        part.id === id ? { ...part, ...patch } : part,
      ),
    })),

  setPartTransform: (id, transform) =>
    set((state) => ({
      parts: state.parts.map((part) =>
        part.id === id ? { ...part, ...transform } : part,
      ),
    })),

  toggleVisibility: (id) =>
    set((state) => ({
      parts: state.parts.map((part) =>
        part.id === id ? { ...part, visible: !part.visible } : part,
      ),
    })),

  hideSelected: () => {
    const { selectedId } = get();
    if (!selectedId) return;
    set((state) => ({
      parts: state.parts.map((part) =>
        part.id === selectedId ? { ...part, visible: false } : part,
      ),
    }));
  },

  deleteSelected: () => {
    const { selectedId, parts } = get();
    if (!selectedId) return;
    const remaining = parts.filter((part) => part.id !== selectedId);
    set({
      parts: remaining,
      selectedId: remaining[0]?.id ?? null,
    });
  },

  resetSample: () =>
    set({
      parts: createSampleCar(),
      selectedId: "body",
      tool: "select",
      errorMessage: null,
      status: "idle",
      statusMessage: "Sample model restored",
    }),

  exportGlb: async () => {
    const { parts } = get();
    set({ status: "exporting", statusMessage: "Exporting GLB…", errorMessage: null });
    try {
      const buffer = await exportSceneToGlb(parts);
      downloadArrayBuffer(buffer, "ai-3d-scene.glb");
      set({ status: "idle", statusMessage: "Exported ai-3d-scene.glb" });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not export the scene.";
      set({ status: "error", errorMessage: message, statusMessage: "Export failed" });
    }
  },

  clearError: () =>
    set((state) => ({
      errorMessage: null,
      status: state.viewportReady ? "idle" : "loading",
      statusMessage: state.viewportReady ? "Ready" : "Loading viewport…",
    })),
}));

export function useSelectedPart() {
  return useEditorStore((state) =>
    state.parts.find((part) => part.id === state.selectedId) ?? null,
  );
}
