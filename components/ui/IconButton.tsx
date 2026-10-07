"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  label: string;
  icon: ReactNode;
}

export function IconButton({
  active,
  label,
  icon,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-md border px-2.5 text-xs font-medium transition-colors",
        "border-[var(--editor-border)] bg-[var(--editor-panel)] text-[var(--editor-muted)]",
        "hover:border-[var(--editor-accent)] hover:text-[var(--editor-text)]",
        "disabled:cursor-not-allowed disabled:opacity-40",
        active &&
          "border-[var(--editor-accent)] bg-[var(--editor-accent-soft)] text-[var(--editor-text)]",
        className,
      )}
      {...props}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
