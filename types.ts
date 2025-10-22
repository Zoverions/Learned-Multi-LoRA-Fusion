
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

export interface BaseModel {
  id: string;
  name: string;
  baseLatency: number;
  baseMemory: number;
}

export interface LoRAExpert {
  id: string;
  name: string;
  performanceImpact: {
    latency: number;
    memory: number;
  };
}
