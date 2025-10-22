import React from 'react';
import { Header } from './components/Header';
import { SectionCard } from './components/SectionCard';
import { BenchmarkTable } from './components/BenchmarkTable';
import { CodeExplorer } from './components/CodeExplorer';
import { CodeBlock } from './components/CodeBlock';
import {
  ABSTRACT,
  INTRODUCTION,
  MOLE_ARCHITECTURE,
  HIERARCHICAL_ROUTING,
  CONCLUSION,
  QUICK_DEMO_CODE,
  ARCHITECTURE_CODE,
  ROUTING_ENGINE_CODE,
  FUSION_ENGINE_CODE,
  INFERENCE_ENGINE_CODE
} from './constants';

const App: React.FC = () => {

  const codeFiles = {
    'Core': {
      'architecture.py': ARCHITECTURE_CODE,
      'routing_engine.py': ROUTING_ENGINE_CODE,
      'fusion_engine.py': FUSION_ENGINE_CODE,
    },
    'Serving': {
      'inference_engine.py': INFERENCE_ENGINE_CODE,
    },
    'Experiments': {
        'benchmark_evaluation.py': QUICK_DEMO_CODE
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 gap-8">
          
          <SectionCard title="Abstract" id="abstract">
            <p className="italic text-gray-400">{ABSTRACT}</p>
          </SectionCard>

          <SectionCard title="1. Introduction" id="introduction">
            <p className="mb-4">{INTRODUCTION.p1}</p>
            <h3 className="text-lg font-semibold text-teal-400 mb-2">Contributions:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              {INTRODUCTION.contributions.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </SectionCard>

          <SectionCard title="3. MoLE Architecture" id="architecture">
            <p>{MOLE_ARCHITECTURE}</p>
          </SectionCard>
          
          <SectionCard title="4. Hierarchical Routing System" id="routing">
            <p>{HIERARCHICAL_ROUTING}</p>
          </SectionCard>

          <SectionCard title="Complete Codebase" id="codebase">
             <p className="mb-4 text-gray-400">Below is an interactive explorer for the core implementation of the `mole-core` library. The code is production-structured with working stubs, ready to be wired to actual models and serving kernels.</p>
            <CodeExplorer files={codeFiles} />
          </SectionCard>

          <SectionCard title="8. Results and Analysis" id="results">
            <p className="mb-4 text-gray-400">Empirical evaluation demonstrates significant improvements over baseline MoE and LoRA Fusion approaches in multi-task accuracy, latency, and parameter efficiency.</p>
            <BenchmarkTable />
          </SectionCard>

          <SectionCard title="How to Run" id="how-to-run">
            <h3 className="text-lg font-semibold text-teal-400 mb-2">1. Install Dependencies</h3>
             <p className="font-mono text-sm bg-gray-900 p-2 rounded-md text-gray-300 border border-gray-700">pip install transformers peft numpy scipy sentence-transformers milvus pymilvus</p>
            <h3 className="text-lg font-semibold text-teal-400 mt-4 mb-2">2. Quick Demo</h3>
            <p className="mb-2 text-gray-400">Run the benchmark evaluation script to see a quick demo of the MoLE system in action:</p>
            <CodeBlock code="python experiments/benchmark_evaluation.py" language="bash" />
             <h3 className="text-lg font-semibold text-teal-400 mt-4 mb-2">3. Extend</h3>
             <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm">
                <li>Implement real PPL via a base model and tokenizer.</li>
                <li>Integrate a Milvus client in `SemanticCache`.</li>
                <li>Add SGMV kernels or link Punica/vLLM for batched LoRA serving.</li>
                <li>Replace `InferenceEngine` with a real Hugging Face + PEFT pipeline.</li>
            </ul>
          </SectionCard>
          
          <SectionCard title="10. Conclusion and Future Work" id="conclusion">
             <p>{CONCLUSION}</p>
          </SectionCard>

        </div>
      </main>
    </div>
  );
};

export default App;