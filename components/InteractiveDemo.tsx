
import React, { useState } from 'react';
import { SectionCard } from './SectionCard';
import type { FusionResult, FusionChunk } from '../types';
import { runFusionSimulation } from '../services/geminiService';

const WeightBar: React.FC<{ expert: string; weight: number; color: string }> = ({ expert, weight, color }) => (
  <div className="flex items-center space-x-2 text-sm">
    <span className="w-16 capitalize text-gray-400">{expert}</span>
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div className={color} style={{ width: `${weight * 100}%`, transition: 'width 0.5s ease-in-out' }}></div>
    </div>
    <span className="w-10 text-right font-mono text-white">{(weight * 100).toFixed(0)}%</span>
  </div>
);


const ChunkCard: React.FC<{ chunk: FusionChunk; index: number }> = ({ chunk, index }) => {
  return (
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 transition-all duration-300">
      <p className="text-gray-300 italic mb-4">"{chunk.text}"</p>
      <div className="space-y-2">
        <WeightBar expert="Math" weight={chunk.weights.math} color="bg-sky-400 rounded-full h-2.5" />
        <WeightBar expert="Code" weight={chunk.weights.code} color="bg-teal-400 rounded-full h-2.5" />
        <WeightBar expert="Creative" weight={chunk.weights.creative} color="bg-rose-500 rounded-full h-2.5" />
      </div>
    </div>
  );
};


export const InteractiveDemo: React.FC = () => {
  const [prompt, setPrompt] = useState('Write a python function to calculate 15% of 200, then write a short poem about it.');
  const [result, setResult] = useState<FusionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const fusionResult = await runFusionSimulation(prompt);
      setResult(fusionResult);
    } catch (err) {
      setError('Failed to get response from the model. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionCard title="🚀 Interactive Fusion Demo" id="demo">
      <p className="mb-4">Enter a prompt below to see the Multi-LoRA Fusion system in action. The model will segment your prompt, assign fusion weights for each chunk, and generate a final response.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none transition-shadow"
          rows={3}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Fusing LoRAs...
            </>
          ) : (
            'Generate Response'
          )}
        </button>
      </form>
      {error && <p className="text-rose-500 mt-4">{error}</p>}
      
      {result && (
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-teal-400 mb-2">1. Semantic Chunks & Fusion Weights</h3>
            <div className="space-y-4">
              {result.chunks.map((chunk, i) => (
                <ChunkCard key={i} chunk={chunk} index={i} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-teal-400 mb-2">2. Final Generated Response</h3>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 prose prose-invert max-w-none prose-p:text-gray-300">
                <p>{result.finalResponse}</p>
            </div>
          </div>
        </div>
      )}
    </SectionCard>
  );
};
