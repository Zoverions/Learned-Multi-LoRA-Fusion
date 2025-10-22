
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

export interface LoRAExpert {
  id: string;
  name: string;
  description: string;
  performanceImpact: {
    latency: number; // ms
    memory: number; // GB
  };
}

export interface BaseModel {
  id: string;
  name: string;
  baseLatency: number; // ms
  baseMemory: number; // GB
}
