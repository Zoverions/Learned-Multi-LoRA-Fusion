import React, { useState, useEffect } from 'react';
import { Memory } from '../types';
import { mockAgentService } from '../services/mockAgentService';
import { Search, Hash, Clock, User, Briefcase, Settings, Link as LinkIcon } from 'lucide-react';

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'user': return <User size={16} className="text-blue-400" />;
    case 'work': return <Briefcase size={16} className="text-orange-400" />;
    case 'system': return <Settings size={16} className="text-gray-400" />;
    default: return <Hash size={16} className="text-teal-400" />;
  }
};

export const MemoryExplorer: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemories = async () => {
      const data = await mockAgentService.getMemories(query);
      setMemories(data);
    };
    const debounce = setTimeout(fetchMemories, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const filteredMemories = selectedCategory
    ? memories.filter(m => m.category === selectedCategory)
    : memories;

  const categories = Array.from(new Set(memories.map(m => m.category)));

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search memories..."
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors text-gray-200"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${!selectedCategory ? 'bg-teal-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            All
          </button>
          {categories.map(cat => (
             <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${selectedCategory === cat ? 'bg-teal-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
             >
                {cat}
             </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMemories.map(memory => (
          <div key={memory.id} className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all hover:shadow-lg hover:shadow-teal-900/10 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 px-2 py-1 bg-gray-800 rounded-md">
                  <CategoryIcon category={memory.category} />
                  <span className="text-xs font-medium text-gray-300 capitalize">{memory.category}</span>
                </div>
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock size={12} className="mr-1" /> {new Date(memory.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4 group-hover:text-gray-100 transition-colors">
                {memory.content}
              </p>
            </div>

            <div className="space-y-3">
              {memory.relatedIds && memory.relatedIds.length > 0 && (
                <div className="pt-3 border-t border-gray-800/50">
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <LinkIcon size={12} className="mr-1" /> Related
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {memory.relatedIds.map(rid => {
                        const relatedMem = memories.find(m => m.id === rid);
                        return relatedMem ? (
                            <span key={rid} className="px-2 py-0.5 bg-gray-800 rounded text-[10px] text-gray-400 truncate max-w-[150px]">
                                {relatedMem.content.substring(0, 15)}...
                            </span>
                        ) : null;
                    })}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                <span className="text-xs text-gray-500">Relevance: {(memory.score! * 100).toFixed(0)}%</span>
                {memory.agentId && <span className="text-xs text-gray-500">Source: Agent {memory.agentId}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
