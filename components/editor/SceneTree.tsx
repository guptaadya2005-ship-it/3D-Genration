"use client";

import { Box, Eye, EyeOff } from "lucide-react";
import { Panel } from "@/components/ui/Panel";
import { cn } from "@/lib/cn";
import { useEditorStore } from "@/store/useEditorStore";

export function SceneTree() {
  const parts = useEditorStore((state) => state.parts);
  const selectedId = useEditorStore((state) => state.selectedId);
  const selectPart = useEditorStore((state) => state.selectPart);
  const toggleVisibility = useEditorStore((state) => state.toggleVisibility);

  return (
    <Panel title="Scene">
      {parts.length === 0 ? (
        <p className="rounded-md border border-dashed border-[var(--editor-border)] px-3 py-6 text-center text-xs text-[var(--editor-muted)]">
          No parts left. Reset the sample model to restore the car.
        </p>
      ) : (
        <ul className="grid gap-1">
          {parts.map((part) => {
            const active = part.id === selectedId;
            return (
              <li key={part.id}>
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm",
                    active
                      ? "bg-[var(--editor-accent-soft)] text-[var(--editor-text)]"
                      : "text-[var(--editor-muted)] hover:bg-[var(--editor-hover)]",
                  )}
                >
                  <button
                    type="button"
                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                    onClick={() => selectPart(part.id)}
                  >
                    <Box size={14} className="shrink-0" />
                    <span
                      className={cn(
                        "truncate",
                        !part.visible && "line-through opacity-60",
                      )}
                    >
                      {part.name}
                    </span>
                  </button>
                  <button
                    type="button"
                    title={part.visible ? "Hide part" : "Show part"}
                    aria-label={part.visible ? `Hide ${part.name}` : `Show ${part.name}`}
                    className="rounded p-1 hover:text-[var(--editor-text)]"
                    onClick={() => toggleVisibility(part.id)}
                  >
                    {part.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Panel>
  );
}
