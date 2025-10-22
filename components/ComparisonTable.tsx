import React from 'react';

interface ComparisonTableProps {
  headers: string[];
  rows: string[][];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full text-sm text-left bg-gray-900 rounded-lg">
        <thead className="bg-gray-700/50">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="p-3 font-semibold text-white">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-700 last:border-0">
              {row.map((cell, cellIndex) => (
                 <td key={cellIndex} className={`p-3 align-top ${cellIndex === 0 ? 'font-medium text-gray-300' : 'text-gray-400'}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
