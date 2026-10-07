"use client";

import { useEditorStore, useSelectedPart } from "@/store/useEditorStore";

export function StatusBar() {
  const parts = useEditorStore((state) => state.parts);
  const tool = useEditorStore((state) => state.tool);
  const status = useEditorStore((state) => state.status);
  const statusMessage = useEditorStore((state) => state.statusMessage);
  const selected = useSelectedPart();
  const hiddenCount = parts.filter((part) => !part.visible).length;

  return (
    <footer className="flex h-8 shrink-0 items-center justify-between gap-3 border-t border-[var(--editor-border)] bg-[var(--editor-chrome)] px-3 text-[11px] text-[var(--editor-muted)]">
      <p className="truncate">
        {parts.length} parts
        {hiddenCount ? ` · ${hiddenCount} hidden` : ""}
        {selected ? ` · ${selected.name}` : " · nothing selected"}
        {` · ${tool}`}
      </p>
      <p className="truncate">
        {status === "exporting" ? "Exporting…" : statusMessage}
      </p>
    </footer>
  );
}
