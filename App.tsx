
import React from 'react';
import { Header } from './components/Header';
import { SectionCard } from './components/SectionCard';
import { CodeBlock } from './components/CodeBlock';
import { InteractiveDemo } from './components/InteractiveDemo';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { BenchmarkTable } from './components/BenchmarkTable';
import { TrainingDashboard } from './components/TrainingDashboard';
import { DeepDive } from './components/DeepDive';
import { LiveAnalysisDashboard } from './components/LiveAnalysisDashboard';
import {
  quickStartCode,
  trainingCode,
  inferenceCode,
  pplCode,
  sparsegenCode,
  mdsCode,
  sparsegenFixCode,
  pplFixCode,
  mdsFixCode,
  mathLoRATrainingCode,
  codeLoRATrainingCode,
  validationCode,
  ttestCode,
  addLoRAExpertCode,
  tuneHypernetworkCode,
  createHybridDatasetCode,
  contributionCodeExample,
} from './constants';

const App: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 gap-8">
          
          <SectionCard title="🎯 Welcome to the Open-Source Fusion Framework" id="quick-start">
            <p className="mb-4">This open-source framework provides the tools to implement clause-level fusion of multiple LoRA adapters. We're building this in the open to democratize access to dynamic, on-demand AI. This guide will get you started with the core concepts and code.</p>
            <h3 className="text-xl font-semibold text-teal-400 mb-2">Installation (5 minutes)</h3>
            <CodeBlock code={quickStartCode} language="bash" />
            <h3 className="text-xl font-semibold text-teal-400 mt-6 mb-2">Training (6-12 hours on GPU)</h3>
            <CodeBlock code={trainingCode} language="bash" />
            <h3 className="text-xl font-semibold text-teal-400 mt-6 mb-2">Quick Inference Test</h3>
            <CodeBlock code={inferenceCode} language="python" />
          </SectionCard>

          <SectionCard title="❤️ Our Open-Source Philosophy" id="philosophy">
            <p className="mb-4">We believe the future of AI shouldn't be built in silos. This project is open-source because we want to empower developers, researchers, and creators to build powerful, efficient, and transparent AI systems together.</p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li><strong className="text-gray-300">Democratize Access:</strong> Give everyone the tools to create highly specialized models without the massive cost of training from scratch.</li>
              <li><strong className="text-gray-300">Foster Collaboration:</strong> The best ideas come from collaboration. By building in the open, we can learn from each other and push the boundaries of what's possible faster.</li>
              <li><strong className="text-gray-300">Ensure Transparency:</strong> Open code is auditable code. We want to build systems that are understandable, trustworthy, and aligned with community values.</li>
            </ul>
            <p className="mt-4">This isn't just a tool; it's a community project. Welcome aboard.</p>
          </SectionCard>


          <InteractiveDemo />

           <SectionCard title="⚡ Live System Analysis & Simulation" id="live-analysis">
            <LiveAnalysisDashboard />
          </SectionCard>

          <SectionCard title="🏗️ System Architecture" id="architecture">
            <p className="mb-6">The system processes input by first segmenting it into semantic chunks. Each chunk is then analyzed to determine the optimal blend of LoRA experts, which are dynamically combined to generate a response for that specific segment. Finally, all segment responses are concatenated.</p>
            <ArchitectureDiagram />
            <h3 className="text-xl font-semibold text-teal-400 mt-8 mb-2">Key Algorithms</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-sky-400">1. PPL-Based Clause Chunking</h4>
                <p className="mt-1 mb-2">Perplexity drops at semantic boundaries where context strongly predicts the next sentence. This is used to find natural breaking points in the text.</p>
                <CodeBlock code={pplCode} language="python" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-sky-400">2. Sparsegen Routing</h4>
                <p className="mt-1 mb-2">A differentiable alternative to Top-K routing that provides smooth gradients and learnable sparsity, adapting the number of active experts based on input.</p>
                <CodeBlock code={sparsegenCode} language="python" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-sky-400">3. MDS Task Positioning</h4>
                <p className="mt-1 mb-2">Multi-Dimensional Scaling (MDS) is used to embed LoRA experts into a 2D space based on their performance correlation, allowing for a fusion cost penalty that discourages combining dissimilar experts.</p>
                <CodeBlock code={mdsCode} language="python" />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="🔧 Critical Fixes Implemented" id="fixes">
             <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-sky-400">Fix 1: Sparsegen Indexing ✅</h4>
                <p className="mt-1 mb-2"><span className="font-bold text-rose-500">Problem:</span> `scatter_` operation failed with non-contiguous tensors. <br/><span className="font-bold text-teal-400">Solution:</span> Use direct assignment `p_original[indices] = p_sorted`.</p>
                <CodeBlock code={sparsegenFixCode} language="python" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-sky-400">Fix 2: PPL Margin Detection ✅</h4>
                <p className="mt-1 mb-2"><span className="font-bold text-rose-500">Problem:</span> Detected too many noisy boundaries. <br/><span className="font-bold text-teal-400">Solution:</span> Require a margin threshold `ppls[i±1] - ppls[i] > threshold`.</p>
                <CodeBlock code={pplFixCode} language="python" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-sky-400">Fix 3: MDS Distance Formula ✅</h4>
                <p className="mt-1 mb-2"><span className="font-bold text-rose-500">Problem:</span> Incorrect distance metric `1 - corr`. <br/><span className="font-bold text-teal-400">Solution:</span> Proper mapping `(1 - corr) / 2` ensures distance is in [0, 1].</p>
                <CodeBlock code={mdsFixCode} language="python" />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="📚 Training Pipeline" id="training">
            <TrainingDashboard />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div>
                <h3 className="text-xl font-semibold text-teal-400 mb-2">Math LoRA (MetaMathQA)</h3>
                <CodeBlock code={mathLoRATrainingCode} language="python" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-400 mb-2">Code LoRA (CodeFeedback)</h3>
                <CodeBlock code={codeLoRATrainingCode} language="python" />
              </div>
            </div>
             <h3 className="text-xl font-semibold text-teal-400 mt-8 mb-2">Week 4: Validation & Benchmarking</h3>
            <CodeBlock code={validationCode} language="python" />
          </SectionCard>

          <SectionCard title="📊 Validation & Benchmarks" id="benchmarks">
            <p className="mb-4">The fusion model demonstrates statistically significant improvements over baseline models on both math and code generation tasks, albeit with a slight increase in latency and memory usage.</p>
            <BenchmarkTable />
            <h3 className="text-xl font-semibold text-teal-400 mt-8 mb-2">Statistical Validation</h3>
            <p className="mb-2">A paired t-test is used to confirm that the observed improvements are not due to chance. A p-value less than 0.05 indicates a statistically significant result.</p>
            <CodeBlock code={ttestCode} language="python" />
          </SectionCard>
          
          <SectionCard title="🛠️ Customization & Extensibility" id="customization">
            <p className="mb-4">The Multi-LoRA Fusion system is designed for extensibility. You can easily add new specialized LoRA experts, tune the fusion logic, and adapt the system to novel tasks. This section provides a guide to these custom building mechanisms.</p>
            
            <h3 className="text-xl font-semibold text-teal-400 mt-6 mb-2">Adding a New LoRA Expert</h3>
            <p className="mb-2">Integrating a new LoRA expert involves three main steps: training the LoRA on a specialized dataset, registering it with the fusion engine, and re-computing the MDS task positions to ensure it's correctly placed within the expert ecosystem.</p>
            <CodeBlock code={addLoRAExpertCode} language="python" />

            <h3 className="text-xl font-semibold text-teal-400 mt-6 mb-2">Tuning Fusion Parameters</h3>
            <p className="mb-2">The behavior of the Sparsegen router can be controlled via the <code className="font-mono text-sm bg-gray-700/50 text-amber-300 py-0.5 px-1.5 rounded">lambda_val</code> hyperparameter, which governs sparsity. Higher values lead to fewer, more specialized experts being selected. You can also retrain the Fusion Hypernetwork to better handle new task combinations.</p>
            <CodeBlock code={tuneHypernetworkCode} language="python" />

            <h3 className="text-xl font-semibold text-teal-400 mt-6 mb-2">Creating Hybrid Datasets</h3>
            <p className="mb-2">Effective training of the Fusion Hypernetwork requires hybrid datasets that mix prompts from different domains. This teaches the router to identify task switches and assign appropriate weights. The system includes utilities for creating these datasets.</p>
            <CodeBlock code={createHybridDatasetCode} language="python" />
          </SectionCard>
          
          <SectionCard title="🔬 Comprehensive Technical Deep Dive & Validation Analysis" id="deep-dive">
            <DeepDive />
          </SectionCard>

          <SectionCard title="🙌 How to Contribute" id="contribute">
            <p className="mb-4">This project thrives on community contributions. Whether you're fixing a bug, adding a new feature, or improving the documentation, your help is welcome! Check out the contribution guidelines on our GitHub repo.</p>
            <a href="https://github.com/example/multi-lora-fusion" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 mb-4 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors">
              View on GitHub
            </a>
            <h3 className="text-xl font-semibold text-teal-400 mt-6 mb-2">Getting Started</h3>
            <p className="mb-2">Ready to contribute? Here's how to get started with the code:</p>
            <CodeBlock code={contributionCodeExample} language="bash" />
          </SectionCard>


        </div>
      </main>
    </div>
  );
};

export default App;