
import React from 'react';

const benchmarks = [
  { metric: 'GSM8K Accuracy', baseline: '42.3%', withFusion: '67.8%', improvement: '+60.3%', pValue: '< 0.001' },
  { metric: 'HumanEval Pass@1', baseline: '18.5%', withFusion: '34.2%', improvement: '+84.9%', pValue: '< 0.001' },
  { metric: 'Inference Latency', baseline: '125ms', withFusion: '142ms', improvement: '+13.6%', pValue: '-' },
  { metric: 'Memory Usage', baseline: '8.2GB', withFusion: '10.4GB', improvement: '+26.8%', pValue: '-' },
];

export const BenchmarkTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left bg-gray-900 rounded-lg">
        <thead className="bg-gray-700/50">
          <tr>
            <th className="p-3 font-semibold text-white">Metric</th>
            <th className="p-3 font-semibold text-white">Baseline</th>
            <th className="p-3 font-semibold text-white">With Fusion</th>
            <th className="p-3 font-semibold text-white">Improvement</th>
            <th className="p-3 font-semibold text-white">p-value</th>
          </tr>
        </thead>
        <tbody>
          {benchmarks.map((item, index) => (
            <tr key={index} className="border-b border-gray-700 last:border-0">
              <td className="p-3 font-medium text-gray-300">{item.metric}</td>
              <td className="p-3 text-gray-400">{item.baseline}</td>
              <td className="p-3 font-semibold text-teal-400">{item.withFusion}</td>
              <td className={`p-3 font-semibold ${item.improvement.startsWith('+') ? 'text-teal-400' : 'text-rose-500'}`}>
                {item.improvement}
              </td>
              <td className="p-3 font-mono text-sky-400">{item.pValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
