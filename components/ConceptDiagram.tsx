import React from 'react';

interface ConceptDiagramProps {
  title: string;
  diagram: string;
  children: React.ReactNode;
}

export const ConceptDiagram: React.FC<ConceptDiagramProps> = ({ title, diagram, children }) => {
  return (
    <div className="mt-4 first:mt-0">
      <h3 className="text-xl font-semibold text-sky-400 mb-2">{title}</h3>
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 font-mono text-sm text-gray-300 overflow-x-auto">
        <pre><code>{diagram}</code></pre>
      </div>
      <div className="mt-3 text-gray-400">{children}</div>
    </div>
  );
};
