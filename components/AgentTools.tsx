import React, { useState, useEffect } from 'react';
import { Tool } from '../types';
import { mockAgentService } from '../services/mockAgentService';
import { Terminal, Globe, Code, Play } from 'lucide-react';

const ToolIcon = ({ iconName, className }: { iconName?: string, className?: string }) => {
  switch (iconName) {
    case 'Terminal': return <Terminal className={className} size={20} />;
    case 'Globe': return <Globe className={className} size={20} />;
    case 'Code': return <Code className={className} size={20} />;
    default: return <Play className={className} size={20} />;
  }
};

export const AgentTools: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    const fetchTools = async () => {
      const data = await mockAgentService.getTools();
      setTools(data);
    };
    fetchTools();
  }, []);

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-800 bg-gray-900 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Available Tools</h3>
        <span className="text-xs text-gray-500">{tools.length} Ready</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {tools.map(tool => (
          <div key={tool.id} className="bg-gray-900 border border-gray-800 p-3 rounded-lg flex items-start space-x-3 hover:bg-gray-800/50 transition-colors group cursor-pointer">
            <div className="p-2 bg-gray-800 rounded-md text-teal-400 group-hover:text-teal-300 transition-colors">
              <ToolIcon iconName={tool.icon} />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-200">{tool.name}</h4>
              <p className="text-xs text-gray-500 mt-1 leading-snug">{tool.description}</p>
              <div className="mt-2 flex items-center space-x-2">
                 <span className="w-2 h-2 rounded-full bg-green-500"></span>
                 <span className="text-[10px] text-gray-400 uppercase">{tool.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
