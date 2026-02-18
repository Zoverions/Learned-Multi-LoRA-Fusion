import React, { useState, useEffect } from 'react';
import { Channel } from '../types';
import { mockAgentService } from '../services/mockAgentService';
import { Settings, ToggleLeft, ToggleRight, CheckCircle, XCircle, Plus } from 'lucide-react';
import { ConnectionModal } from './ConnectionModal';

export const GatewayConfig: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchChannels = async () => {
      const data = await mockAgentService.getChannels();
      setChannels(data);
      setLoading(false);
    };
    fetchChannels();
  }, []);

  const toggleChannel = (id: string) => {
    setChannels(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: c.status === 'connected' ? 'disconnected' : 'connected' };
      }
      return c;
    }));
  };

  const handleAddConnection = async (type: string, name: string, config: any) => {
      const newChannel = await mockAgentService.addChannel({
          name,
          type: type as any,
          config,
          lastMessage: 'Connecting...'
      });
      setChannels(prev => [...prev, newChannel]);
  };

  if (loading) return <div>Loading Gateway Config...</div>;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
              <Plus size={18} />
              <span>Add Connection</span>
          </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 bg-gray-800/50 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-200 flex items-center">
            <Settings className="mr-2" size={20} /> Channel Configuration
          </h2>
          <span className="text-sm text-gray-500">Manage external connections</span>
        </div>

        <div className="divide-y divide-gray-800">
          {channels.map(channel => (
            <div key={channel.id} className="p-6 flex items-center justify-between hover:bg-gray-800/30 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${channel.status === 'connected' ? 'bg-green-500/10 text-green-400' : 'bg-gray-700/30 text-gray-500'}`}>
                  {channel.type === 'whatsapp' ? <span className="font-bold">WA</span> :
                   channel.type === 'discord' ? <span className="font-bold">DC</span> :
                   channel.type === 'slack' ? <span className="font-bold">SL</span> :
                   <span className="font-bold">WB</span>}
                </div>
                <div>
                  <h3 className="font-medium text-gray-200">{channel.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{channel.type} Integration</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                   {channel.status === 'connected' ?
                     <span className="text-xs text-green-500 flex items-center"><CheckCircle size={12} className="mr-1" /> Connected</span> :
                     <span className="text-xs text-gray-500 flex items-center"><XCircle size={12} className="mr-1" /> Disconnected</span>
                   }
                </div>
                <button
                  onClick={() => toggleChannel(channel.id)}
                  className={`text-2xl transition-colors ${channel.status === 'connected' ? 'text-teal-500 hover:text-teal-400' : 'text-gray-600 hover:text-gray-500'}`}
                >
                  {channel.status === 'connected' ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 bg-gray-800/50">
          <h2 className="text-lg font-semibold text-gray-200">Model Settings</h2>
        </div>
        <div className="p-6 space-y-6">
           <div>
             <label className="block text-sm font-medium text-gray-400 mb-2">Primary LLM Provider</label>
             <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-teal-500">
               <option>OpenAI (GPT-4o)</option>
               <option>Anthropic (Claude 3.5 Sonnet)</option>
               <option>Google (Gemini Pro 1.5)</option>
               <option>Local (Llama 3)</option>
             </select>
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-400 mb-2">Embedding Model</label>
             <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-teal-500">
               <option>text-embedding-3-small</option>
               <option>text-embedding-ada-002</option>
             </select>
           </div>
        </div>
         <div className="px-6 py-4 bg-gray-800/50 border-t border-gray-800 flex justify-end">
            <button className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Save Configuration
            </button>
         </div>
      </div>

      <ConnectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={handleAddConnection}
      />
    </div>
  );
};
