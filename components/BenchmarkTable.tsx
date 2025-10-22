import React from 'react';

const benchmarks = [
  { metric: 'Multi-task Accuracy', baseline: 'LoRA: 72.1% | MoE: 68.3%', mole: '89.7%', improvement: '+24.4% vs LoRA' },
  { metric: 'Median Latency', baseline: 'LoRA: 85ms | MoE: 120ms', mole: '45ms', improvement: '-47.1% vs LoRA' },
  { metric: 'Active Parameters', baseline: 'LoRA: ~1% | MoE: ~20%', mole: '2-8%', improvement: 'Highly Efficient' },
  { metric: 'Throughput', baseline: 'LoRA: 150 | MoE: 80', mole: '350 req/s', improvement: '+133% vs LoRA' },
];

export const BenchmarkTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left bg-gray-900 rounded-lg">
        <thead className="bg-gray-700/50">
          <tr>
            <th className="p-3 font-semibold text-white">Metric</th>
            <th className="p-3 font-semibold text-white">Baselines (LoRA | MoE)</th>
            <th className="p-3 font-semibold text-white">MoLE Result</th>
            <th className="p-3 font-semibold text-white">Improvement vs LoRA</th>
          </tr>
        </thead>
        <tbody>
          {benchmarks.map((item, index) => (
            <tr key={index} className="border-b border-gray-700 last:border-0">
              <td className="p-3 font-medium text-gray-300">{item.metric}</td>
              <td className="p-3 text-gray-400 font-mono text-xs">{item.baseline}</td>
              <td className="p-3 font-semibold text-teal-400">{item.mole}</td>
              <td className={`p-3 font-semibold ${item.improvement.startsWith('+') || item.improvement.startsWith('Highly') ? 'text-teal-400' : 'text-rose-500'}`}>
                {item.improvement}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};