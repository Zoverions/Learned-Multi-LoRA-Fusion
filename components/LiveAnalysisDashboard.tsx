import React, { useState, useEffect, useMemo } from 'react';
import type { LoRAExpert } from '../types';
import { AVAILABLE_BASE_MODELS, AVAILABLE_LORA_EXPERTS } from '../constants';
import { getLoRACombinationAnalysis } from '../services/geminiService';

const MetricCard: React.FC<{ title: string; value: string; unit: string }> = ({ title, value, unit }) => (
  <div className="bg-gray-700/50 p-4 rounded-lg text-center">
    <p className="text-sm text-gray-400">{title}</p>
    <p className="text-2xl font-bold text-white">{value}<span className="text-base font-normal text-gray-400 ml-1">{unit}</span></p>
  </div>
);

const ChartBar: React.FC<{ height: number; isBaseline?: boolean }> = ({ height, isBaseline = false }) => (
    <div className="w-full flex items-end justify-center">
        <div
            className={`w-1/2 ${isBaseline ? 'bg-sky-500/50' : 'bg-teal-400'} rounded-t-sm`}
            style={{ height: `${height}px`, transition: 'height 0.3s ease-in-out' }}
        ></div>
    </div>
);

export const LiveAnalysisDashboard: React.FC = () => {
    const [selectedBaseModelId, setSelectedBaseModelId] = useState(AVAILABLE_BASE_MODELS[0].id);
    const [selectedLoRAs, setSelectedLoRAs] = useState<Set<string>>(new Set(['math', 'code']));
    
    const [isRunning, setIsRunning] = useState(false);
    const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

    const [metrics, setMetrics] = useState({ latency: 0, memory: 0, throughput: 0 });
    const [chartData, setChartData] = useState<number[]>([]);
    const [analysis, setAnalysis] = useState('');

    const selectedBaseModel = useMemo(() => 
        AVAILABLE_BASE_MODELS.find(m => m.id === selectedBaseModelId)!, 
        [selectedBaseModelId]
    );

    const handleLoRASelection = (loraId: string) => {
        setSelectedLoRAs(prev => {
            const newSet = new Set(prev);
            if (newSet.has(loraId)) {
                newSet.delete(loraId);
            } else {
                newSet.add(loraId);
            }
            return newSet;
        });
    };

    const runSimulation = async () => {
        setIsRunning(true);
        setIsLoadingAnalysis(true);
        
        let totalLatency = selectedBaseModel.baseLatency;
        let totalMemory = selectedBaseModel.baseMemory;
        
        const activeLoRAs = AVAILABLE_LORA_EXPERTS.filter(l => selectedLoRAs.has(l.id));

        activeLoRAs.forEach(lora => {
            totalLatency += lora.performanceImpact.latency;
            totalMemory += lora.performanceImpact.memory;
        });

        // Simplified throughput calculation
        const throughput = Math.max(10, 300 - totalLatency * 0.5);
        setMetrics({ latency: totalLatency, memory: totalMemory, throughput });

        // Generate chart data for drift simulation
        const baseline = 100;
        const newData = [baseline];
        for (let i = 1; i < 20; i++) {
            const drift = (Math.random() - 0.5) * 5;
            newData.push(Math.max(80, Math.min(120, newData[i-1] + drift)));
        }
        setChartData(newData);

        // Fetch AI analysis
        try {
            const loraNames = activeLoRAs.map(l => l.name);
            const analysisText = await getLoRACombinationAnalysis(loraNames);
            setAnalysis(analysisText);
        } catch (error) {
            setAnalysis("Could not generate analysis. Please try again.");
        } finally {
            setIsLoadingAnalysis(false);
        }
    };
    
    return (
        <div className="space-y-6">
            <p className="text-gray-400">This dashboard allows you to scaffold and analyze a custom-built model on the fly. Select a base model and fuse it with specialized LoRA experts to see how the system's performance and characteristics shift.</p>
            
            {/* --- Configuration --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <div>
                    <label htmlFor="base-model" className="block text-sm font-medium text-gray-300 mb-2">1. Select Base Model</label>
                    <select
                        id="base-model"
                        value={selectedBaseModelId}
                        onChange={e => setSelectedBaseModelId(e.target.value)}
                        className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-sky-400 focus:outline-none"
                    >
                        {AVAILABLE_BASE_MODELS.map(model => (
                            <option key={model.id} value={model.id}>{model.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">2. Select LoRA Experts to Fuse</label>
                    <div className="grid grid-cols-2 gap-2">
                        {AVAILABLE_LORA_EXPERTS.map(lora => (
                            <button
                                key={lora.id}
                                onClick={() => handleLoRASelection(lora.id)}
                                className={`p-2 text-sm rounded-md border transition-colors ${
                                    selectedLoRAs.has(lora.id) 
                                    ? 'bg-sky-500 border-sky-400 text-white' 
                                    : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
                                }`}
                            >
                                {lora.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={runSimulation}
                disabled={selectedLoRAs.size === 0}
                className="w-full flex justify-center items-center px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
                {isLoadingAnalysis ? 'Analyzing...' : 'Run Simulation & Analyze'}
            </button>

            {/* --- Results --- */}
            {isRunning && (
                <div className="space-y-6 animate-fade-in">
                    {/* --- Performance Metrics --- */}
                    <div>
                        <h4 className="text-lg font-semibold text-sky-400 mb-3">Simulated Performance Metrics</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <MetricCard title="Inference Time" value={metrics.latency.toFixed(0)} unit="ms" />
                            <MetricCard title="Memory Usage" value={metrics.memory.toFixed(1)} unit="GB" />
                            <MetricCard title="Throughput" value={metrics.throughput.toFixed(0)} unit="req/s" />
                        </div>
                    </div>

                    {/* --- Instance Alignment Shift --- */}
                     <div>
                        <h4 className="text-lg font-semibold text-sky-400 mb-3">Instance Alignment Shift (Model Drift)</h4>
                        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 h-48 flex items-end space-x-1">
                            {chartData.map((value, index) => (
                                <ChartBar key={index} height={(value / 120) * 120} />
                            ))}
                        </div>
                         <div className="flex justify-center items-center space-x-4 mt-2 text-xs text-gray-400">
                             <span>Lower Score</span>
                             <div className="w-4 h-2 rounded-sm bg-teal-400"></div><span>Live Instance</span>
                             <span>Higher Score</span>
                         </div>
                    </div>

                    {/* --- AI Analysis --- */}
                    <div>
                        <h4 className="text-lg font-semibold text-sky-400 mb-3">AI-Generated Analysis</h4>
                         <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 min-h-[100px]">
                            {isLoadingAnalysis ? (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating insights...
                                </div>
                            ) : (
                                <p className="text-gray-300 whitespace-pre-wrap">{analysis}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
