import React, { useState, useEffect } from 'react';

const ProgressBar: React.FC<{ progress: number; label: string }> = ({ progress, label }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-300">{label}</span>
      <span className="text-sm font-medium text-sky-400">{progress.toFixed(0)}%</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
    </div>
  </div>
);

export const TrainingDashboard: React.FC = () => {
  const [mathProgress, setMathProgress] = useState(0);
  const [codeProgress, setCodeProgress] = useState(0);
  const [stage, setStage] = useState('idle');

  useEffect(() => {
    // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setInterval> for browser environment.
    let mathInterval: ReturnType<typeof setInterval>;
    // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setInterval> for browser environment.
    let codeInterval: ReturnType<typeof setInterval>;

    if (stage === 'math') {
      mathInterval = setInterval(() => {
        setMathProgress(prev => {
          if (prev >= 100) {
            clearInterval(mathInterval);
            setStage('code');
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    } else if (stage === 'code') {
      codeInterval = setInterval(() => {
        setCodeProgress(prev => {
          if (prev >= 100) {
            clearInterval(codeInterval);
            setStage('done');
            return 100;
          }
          return prev + 2.5;
        });
      }, 100);
    }

    return () => {
      clearInterval(mathInterval);
      clearInterval(codeInterval);
    };
  }, [stage]);

  const startTraining = () => {
    setMathProgress(0);
    setCodeProgress(0);
    setStage('math');
  };

  const getStatusText = () => {
    if (stage === 'idle') return 'Ready to start.';
    if (stage === 'math') return 'Training Math LoRA on MetaMathQA...';
    if (stage === 'code') return 'Training Code LoRA on CodeFeedback...';
    if (stage === 'done') return 'Training complete! Models ready for validation.';
    return '';
  };

  return (
    <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Live Training Monitor</h3>
        <button
          onClick={startTraining}
          disabled={stage === 'math' || stage === 'code'}
          className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg text-sm hover:bg-teal-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          {stage === 'done' || stage === 'idle' ? 'Start Training' : 'Training...'}
        </button>
      </div>

      <div className="space-y-4 mb-4">
        <ProgressBar progress={mathProgress} label="Math LoRA Training" />
        <ProgressBar progress={codeProgress} label="Code LoRA Training" />
      </div>
      
      <div className="p-3 bg-black/30 rounded-md font-mono text-sm text-gray-400 h-24 overflow-y-auto">
        <p><span className="text-teal-400 mr-2">[STATUS]</span>{getStatusText()}</p>
        {mathProgress > 20 && stage === 'math' && <p>Epoch 1/3 | Loss: 1.234</p>}
        {mathProgress > 80 && stage === 'math' && <p>Epoch 2/3 | Loss: 0.876</p>}
        {codeProgress > 10 && stage === 'code' && <p>Math LoRA saved to ./models/math_lora</p>}
        {codeProgress > 30 && stage === 'code' && <p>Epoch 1/3 | Loss: 1.012</p>}
        {stage === 'done' && <p className="text-teal-400">All tasks finished successfully.</p>}
      </div>
    </div>
  );
};