import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4 md:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">MoLE: Mixture of LoRA Experts</h1>
            <p className="text-sm text-gray-400">A Hybrid Architecture for Multi-Task Language Model Adaptation</p>
          </div>
           <span className="text-sm text-gray-400">October 22, 2025</span>
        </div>
      </div>
    </header>
  );
};