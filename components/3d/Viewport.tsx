"use client";

import dynamic from "next/dynamic";
import { CanvasErrorBoundary } from "@/components/3d/CanvasErrorBoundary";
import { useEditorStore } from "@/store/useEditorStore";

const ViewportCanvas = dynamic(() => import("./ViewportCanvas"), {
  ssr: false,
  loading: () => <ViewportLoading />,
});

function ViewportLoading() {
  return (
    <div className="flex h-full items-center justify-center bg-[var(--editor-viewport)]">
      <div className="flex flex-col items-center gap-3 text-[var(--editor-muted)]">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--editor-accent)] border-t-transparent" />
        <p className="text-xs tracking-wide">Loading 3D viewport…</p>
      </div>
    </div>
  );
}

export function Viewport() {
  const status = useEditorStore((state) => state.status);
  const errorMessage = useEditorStore((state) => state.errorMessage);
  const viewportReady = useEditorStore((state) => state.viewportReady);

  return (
    <div className="relative h-full min-h-[280px] overflow-hidden bg-[var(--editor-viewport)]">
      <CanvasErrorBoundary
        onError={(message) =>
          useEditorStore.setState({
            status: "error",
            errorMessage: message,
            statusMessage: "Viewport error",
          })
        }
      >
        <ViewportCanvas />
      </CanvasErrorBoundary>

      {!viewportReady && status !== "error" ? (
        <div className="pointer-events-none absolute inset-0">
          <ViewportLoading />
        </div>
      ) : null}

      {errorMessage ? (
        <div className="absolute bottom-4 left-1/2 z-10 w-[min(420px,calc(100%-2rem))] -translate-x-1/2 rounded-md border border-red-500/40 bg-[var(--editor-panel)] px-3 py-2 shadow-lg">
          <p className="text-xs font-semibold text-red-400">Something went wrong</p>
          <p className="mt-1 text-xs text-[var(--editor-muted)]">{errorMessage}</p>
          <button
            type="button"
            className="mt-2 text-xs text-[var(--editor-accent)]"
            onClick={() => useEditorStore.getState().clearError()}
          >
            Dismiss
          </button>
        </div>
      ) : null}

      <div className="pointer-events-none absolute left-3 top-3 rounded-md bg-[var(--editor-panel)]/80 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--editor-muted)] backdrop-blur">
        Viewport
      </div>
    </div>
  );
}
