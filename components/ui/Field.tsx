"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface FieldProps {
  label: string;
  children: ReactNode;
}

export function Field({ label, children }: FieldProps) {
  return (
    <label className="grid gap-1">
      <span className="text-[11px] font-medium uppercase tracking-wide text-[var(--editor-muted)]">
        {label}
      </span>
      {children}
    </label>
  );
}

export function EditorInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-8 w-full rounded-md border border-[var(--editor-border)] bg-[var(--editor-input)] px-2 text-xs text-[var(--editor-text)] outline-none",
        "focus:border-[var(--editor-accent)]",
        className,
      )}
      {...props}
    />
  );
}
