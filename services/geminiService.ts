import type { FusionResult } from '../types';

/**
 * Historical boundary.
 *
 * The original frontend used Gemini in browser code and asked the model to
 * *simulate* clause-level LoRA routing/fusion. It did not load, route, train, or
 * fuse real LoRA adapters, and its provider credential was injected into the
 * browser bundle by Vite.
 *
 * Remote model execution is intentionally disabled in the archived source
 * state. The original implementation remains available in Git history.
 */
export async function runFusionSimulation(_prompt: string): Promise<FusionResult> {
  throw new Error(
    'Archived MoLE concept: browser-side Gemini simulation is disabled. ' +
      'This repository does not implement real LoRA fusion.'
  );
}

export async function getLoRACombinationAnalysis(_loraNames: string[]): Promise<string> {
  throw new Error(
    'Archived MoLE concept: browser-side Gemini analysis is disabled. ' +
      'A future implementation must use a server-side provider boundary and real adapter measurements.'
  );
}
