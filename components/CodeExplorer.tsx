import React, { useState } from 'react';
import { CodeBlock } from './CodeBlock';

interface CodeExplorerProps {
  files: {
    [category: string]: {
      [filename: string]: string;
    };
  };
}

export const CodeExplorer: React.FC<CodeExplorerProps> = ({ files }) => {
  const categories = Object.keys(files);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  
  const filenames = Object.keys(files[activeCategory]);
  const [activeFile, setActiveFile] = useState(filenames[0]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveFile(Object.keys(files[category])[0]);
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700">
      {/* Category Tabs */}
      <div className="flex border-b border-gray-700">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 text-sm font-semibold transition-colors focus:outline-none ${
              activeCategory === category
                ? 'bg-gray-800 text-sky-400 border-b-2 border-sky-400'
                : 'text-gray-400 hover:bg-gray-800/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row">
        {/* File List */}
        <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-700">
          {Object.keys(files[activeCategory]).map(filename => (
            <button
              key={filename}
              onClick={() => setActiveFile(filename)}
              className={`w-full text-left px-4 py-2 text-sm font-mono transition-colors focus:outline-none ${
                activeFile === filename
                  ? 'bg-sky-500/10 text-sky-300'
                  : 'text-gray-400 hover:bg-gray-800/50'
              }`}
            >
              {filename}
            </button>
          ))}
        </div>

        {/* Code View */}
        <div className="w-full md:w-3/4">
          <CodeBlock
            code={files[activeCategory][activeFile]}
            language="python"
          />
        </div>
      </div>
    </div>
  );
};