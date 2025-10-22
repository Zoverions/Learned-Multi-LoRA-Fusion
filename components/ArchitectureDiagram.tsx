
import React from 'react';

const Box: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-gray-700/50 border border-gray-600 rounded-md p-3 text-center text-sm ${className}`}>
    {children}
  </div>
);

const Arrow: React.FC = () => (
  <div className="flex justify-center items-center my-2">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 12L12 19L5 12" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const InnerBox: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-gray-800 border border-gray-700 rounded p-2 text-left">
        <p className="font-semibold text-sky-400">{title}</p>
        <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
);


export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="p-4 bg-gray-900 rounded-lg">
      <div className="flex flex-col items-center">
        <Box className="w-full md:w-3/4">Input Prompt</Box>
        <Arrow />
        <Box className="w-full md:w-3/4">
          <p className="font-semibold text-white">ClauseLevelChunker (PPL-based)</p>
          <ul className="text-xs text-gray-400 list-disc list-inside text-left mt-1">
            <li>Compute perplexity for each sentence</li>
            <li>Detect local minima with margin threshold</li>
            <li>Output: ["chunk1", "chunk2", ...]</li>
          </ul>
        </Box>
        <Arrow />
        <div className="w-full md:w-3/4 border-2 border-dashed border-gray-600 rounded-lg p-4">
           <p className="text-center font-semibold mb-3 text-white">For each chunk:</p>
           <div className="flex flex-col items-center space-y-2">
                <InnerBox title="PromptEmbedder (Sentence-BERT)" subtitle="→ 384-dim embedding" />
                <Arrow />
                <InnerBox title="FusionHypernetwork (MLP)" subtitle="→ logits for each expert" />
                <Arrow />
                <InnerBox title="Sparsegen Routing (λ-controlled)" subtitle="→ fusion weights: {expert_i: w_i}" />
                <Arrow />
                <InnerBox title="DynamicLoRAComposer" subtitle="→ Apply weighted LoRA combination" />
                <Arrow />
                <InnerBox title="Base Model + Fused LoRAs" subtitle="→ Generate output for chunk" />
           </div>
        </div>
        <Arrow />
        <Box className="w-full md:w-3/4">Concatenate chunk outputs → Final response</Box>
      </div>
    </div>
  );
};
