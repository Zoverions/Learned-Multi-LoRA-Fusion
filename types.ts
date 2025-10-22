
export interface FusionChunk {
  text: string;
  weights: {
    math: number;
    code: number;
    creative: number;
  };
}

export interface FusionResult {
  chunks: FusionChunk[];
  finalResponse: string;
}
