
import React, { useState } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';

interface CodeBlockProps {
  code: string;
  language: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden my-4 relative border border-gray-700">
      <div className="flex justify-between items-center px-4 py-1 bg-gray-700/50">
        <span className="text-xs font-semibold text-gray-400 uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
          aria-label="Copy code"
        >
          {copied ? (
            <span className="flex items-center text-teal-400">
              <CheckIcon className="h-4 w-4 mr-1" />
              Copied!
            </span>
          ) : (
            <span className="flex items-center">
               <ClipboardIcon className="h-4 w-4 mr-1" />
               Copy
            </span>
          )}
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
};
