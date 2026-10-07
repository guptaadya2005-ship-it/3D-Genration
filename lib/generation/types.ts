/**
 * Pluggable generation contract for later phases.
 * Do not implement image/text/cloud generation in the MVP.
 */
export type GenerationInput =
  | { type: "image"; file: File }
  | { type: "text"; prompt: string };

export interface GenerationResult {
  glb: ArrayBuffer;
}

export interface GenerationProvider {
  readonly id: string;
  readonly label: string;
  generate(input: GenerationInput): Promise<GenerationResult>;
}
