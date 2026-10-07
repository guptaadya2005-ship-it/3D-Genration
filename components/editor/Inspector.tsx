"use client";

import { Field, EditorInput } from "@/components/ui/Field";
import { Panel } from "@/components/ui/Panel";
import { degToRad, parseFiniteNumber, radToDeg, round } from "@/lib/math";
import { useEditorStore, useSelectedPart } from "@/store/useEditorStore";
import type { ScenePart, Vec3 } from "@/types/scene";

export function Inspector() {
  const selected = useSelectedPart();
  const updatePart = useEditorStore((state) => state.updatePart);

  if (!selected) {
    return (
      <Panel title="Inspector">
        <p className="rounded-md border border-dashed border-[var(--editor-border)] px-3 py-6 text-center text-xs leading-5 text-[var(--editor-muted)]">
          Select a part in the viewport or scene tree to edit its properties.
        </p>
      </Panel>
    );
  }

  const patch = (next: Partial<ScenePart>) => updatePart(selected.id, next);

  return (
    <Panel title="Inspector">
      <div className="grid gap-4">
        <Field label="Part name">
          <EditorInput
            value={selected.name}
            onChange={(event) => patch({ name: event.target.value })}
          />
        </Field>

        <Vec3Fields
          label="Position"
          value={selected.position}
          onChange={(position) => patch({ position })}
        />
        <Vec3Fields
          label="Rotation"
          value={selected.rotation.map(radToDeg) as Vec3}
          onChange={(degrees) =>
            patch({ rotation: degrees.map(degToRad) as Vec3 })
          }
        />
        <Vec3Fields
          label="Scale"
          value={selected.scale}
          step={0.05}
          onChange={(scale) => patch({ scale })}
        />

        <Field label="Color">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={toHex(selected.color)}
              onChange={(event) => patch({ color: event.target.value })}
              className="h-8 w-12 cursor-pointer rounded border border-[var(--editor-border)] bg-transparent"
            />
            <EditorInput
              value={selected.color}
              onChange={(event) => patch({ color: event.target.value })}
            />
          </div>
        </Field>

        <RangeField
          label={`Roughness · ${round(selected.roughness, 2)}`}
          value={selected.roughness}
          onChange={(roughness) => patch({ roughness })}
        />
        <RangeField
          label={`Metalness · ${round(selected.metalness, 2)}`}
          value={selected.metalness}
          onChange={(metalness) => patch({ metalness })}
        />

        <Field label="Visibility">
          <button
            type="button"
            className="h-8 rounded-md border border-[var(--editor-border)] bg-[var(--editor-input)] px-2 text-left text-xs text-[var(--editor-text)]"
            onClick={() => patch({ visible: !selected.visible })}
          >
            {selected.visible ? "Visible" : "Hidden"}
          </button>
        </Field>
      </div>
    </Panel>
  );
}

function Vec3Fields({
  label,
  value,
  onChange,
  step = 0.01,
}: {
  label: string;
  value: Vec3;
  onChange: (value: Vec3) => void;
  step?: number;
}) {
  const axes: Array<{ key: "x" | "y" | "z"; index: 0 | 1 | 2 }> = [
    { key: "x", index: 0 },
    { key: "y", index: 1 },
    { key: "z", index: 2 },
  ];

  return (
    <div className="grid gap-1">
      <span className="text-[11px] font-medium uppercase tracking-wide text-[var(--editor-muted)]">
        {label}
      </span>
      <div className="grid grid-cols-3 gap-1">
        {axes.map(({ key, index }) => (
          <EditorInput
            key={key}
            aria-label={`${label} ${key}`}
            type="number"
            step={step}
            value={round(value[index], 3)}
            onChange={(event) => {
              const next: Vec3 = [...value];
              next[index] = parseFiniteNumber(event.target.value, value[index]);
              onChange(next);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function RangeField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <Field label={label}>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-[var(--editor-accent)]"
      />
    </Field>
  );
}

function toHex(color: string) {
  return /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#888888";
}
