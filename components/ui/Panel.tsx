"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PanelProps {
  title: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}

export function Panel({ title, children, className, actions }: PanelProps) {
  return (
    <section
      className={cn(
        "flex h-full min-h-0 flex-col border-[var(--editor-border)] bg-[var(--editor-panel)]",
        className,
      )}
    >
      <header className="flex h-10 shrink-0 items-center justify-between border-b border-[var(--editor-border)] px-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--editor-muted)]">
          {title}
        </h2>
        {actions}
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto p-3">{children}</div>
    </section>
  );
}
