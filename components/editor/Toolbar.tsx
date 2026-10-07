"use client";

import {
  Download,
  EyeOff,
  Move,
  PanelLeft,
  PanelRight,
  RotateCcw,
  RotateCw,
  Scaling,
  SunMoon,
  Trash2,
  MousePointer2,
} from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { useEditorStore, useSelectedPart } from "@/store/useEditorStore";

export function Toolbar() {
  const tool = useEditorStore((state) => state.tool);
  const status = useEditorStore((state) => state.status);
  const setTool = useEditorStore((state) => state.setTool);
  const hideSelected = useEditorStore((state) => state.hideSelected);
  const deleteSelected = useEditorStore((state) => state.deleteSelected);
  const exportGlb = useEditorStore((state) => state.exportGlb);
  const resetSample = useEditorStore((state) => state.resetSample);
  const toggleTheme = useEditorStore((state) => state.toggleTheme);
  const togglePanel = useEditorStore((state) => state.togglePanel);
  const selected = useSelectedPart();
  const exporting = status === "exporting";

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-[var(--editor-border)] bg-[var(--editor-chrome)] px-2 sm:px-3">
      <div className="flex min-w-0 items-center gap-2 pr-2">
        <div className="h-6 w-6 rounded-md bg-[var(--editor-accent)]" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[var(--editor-text)]">
            Forge
          </p>
          <p className="hidden truncate text-[10px] uppercase tracking-[0.16em] text-[var(--editor-muted)] sm:block">
            3D Automation
          </p>
        </div>
      </div>

      <div className="mx-1 hidden h-6 w-px bg-[var(--editor-border)] sm:block" />

      <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
        <IconButton
          label="Select"
          icon={<MousePointer2 size={15} />}
          active={tool === "select"}
          onClick={() => setTool("select")}
        />
        <IconButton
          label="Move"
          icon={<Move size={15} />}
          active={tool === "move"}
          onClick={() => setTool("move")}
        />
        <IconButton
          label="Rotate"
          icon={<RotateCw size={15} />}
          active={tool === "rotate"}
          onClick={() => setTool("rotate")}
        />
        <IconButton
          label="Scale"
          icon={<Scaling size={15} />}
          active={tool === "scale"}
          onClick={() => setTool("scale")}
        />
        <IconButton
          label="Hide"
          icon={<EyeOff size={15} />}
          disabled={!selected}
          onClick={hideSelected}
        />
        <IconButton
          label="Delete"
          icon={<Trash2 size={15} />}
          disabled={!selected}
          onClick={deleteSelected}
        />
        <IconButton
          label={exporting ? "Exporting" : "Export"}
          icon={<Download size={15} />}
          disabled={exporting}
          onClick={() => void exportGlb()}
        />
      </nav>

      <div className="flex items-center gap-1">
        <IconButton
          label="Reset"
          icon={<RotateCcw size={15} />}
          onClick={resetSample}
        />
        <IconButton
          label="Theme"
          icon={<SunMoon size={15} />}
          onClick={toggleTheme}
        />
        <IconButton
          className="lg:hidden"
          label="Parts"
          icon={<PanelLeft size={15} />}
          onClick={() => togglePanel("left")}
        />
        <IconButton
          className="lg:hidden"
          label="Inspect"
          icon={<PanelRight size={15} />}
          onClick={() => togglePanel("right")}
        />
      </div>
    </header>
  );
}
