"use client";

import { useEffect } from "react";
import { Viewport } from "@/components/3d/Viewport";
import { Inspector } from "@/components/editor/Inspector";
import { SceneTree } from "@/components/editor/SceneTree";
import { StatusBar } from "@/components/editor/StatusBar";
import { Toolbar } from "@/components/editor/Toolbar";
import { cn } from "@/lib/cn";
import { useEditorStore } from "@/store/useEditorStore";

export function EditorShell() {
  const theme = useEditorStore((state) => state.theme);
  const leftPanelOpen = useEditorStore((state) => state.leftPanelOpen);
  const rightPanelOpen = useEditorStore((state) => state.rightPanelOpen);
  const togglePanel = useEditorStore((state) => state.togglePanel);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (event.key === "Delete" || event.key === "Backspace") {
        event.preventDefault();
        useEditorStore.getState().deleteSelected();
      }
      if (event.key === "Escape") {
        useEditorStore.getState().selectPart(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      className={cn(
        "flex h-dvh flex-col overflow-hidden bg-[var(--editor-bg)] text-[var(--editor-text)]",
        theme === "dark" ? "dark" : "light",
      )}
    >
      <Toolbar />
      <div className="relative flex min-h-0 flex-1">
        <aside
          className={cn(
            "z-20 w-[min(260px,85vw)] border-r border-[var(--editor-border)] bg-[var(--editor-panel)] transition-transform",
            "max-lg:absolute max-lg:inset-y-0 max-lg:left-0 lg:w-64",
            leftPanelOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full",
          )}
        >
          <SceneTree />
        </aside>

        <main className="min-w-0 flex-1">
          <Viewport />
        </main>

        <aside
          className={cn(
            "z-20 w-[min(300px,90vw)] border-l border-[var(--editor-border)] bg-[var(--editor-panel)] transition-transform",
            "max-lg:absolute max-lg:inset-y-0 max-lg:right-0 lg:w-72",
            rightPanelOpen ? "max-lg:translate-x-0" : "max-lg:translate-x-full",
          )}
        >
          <Inspector />
        </aside>

        {(leftPanelOpen || rightPanelOpen) && (
          <button
            type="button"
            className="absolute inset-0 z-10 bg-black/40 lg:hidden"
            aria-label="Close panels"
            onClick={() => {
              if (leftPanelOpen) togglePanel("left");
              if (rightPanelOpen) togglePanel("right");
            }}
          />
        )}
      </div>
      <StatusBar />
    </div>
  );
}
