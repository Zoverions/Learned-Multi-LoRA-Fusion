import React, { useState } from 'react';
import { X, MessageSquare, Phone, Slack, Monitor } from 'lucide-react';

interface ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (type: string, name: string, config: any) => void;
}

export const ConnectionModal: React.FC<ConnectionModalProps> = ({ isOpen, onClose, onConnect }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [config, setConfig] = useState<any>({});
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleConnect = () => {
    if (selectedType && name) {
      onConnect(selectedType, name, config);
      onClose();
    }
  };

  const providers = [
    { id: 'whatsapp', name: 'WhatsApp', icon: Phone, color: 'text-green-500', bg: 'bg-green-500/10' },
    { id: 'discord', name: 'Discord', icon: MessageSquare, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { id: 'slack', name: 'Slack', icon: Slack, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { id: 'web', name: 'Web Chat', icon: Monitor, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md p-6 shadow-2xl transform transition-all scale-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-100">Add New Connection</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition-colors">
            <X size={24} />
          </button>
        </div>

        {!selectedType ? (
          <div className="grid grid-cols-2 gap-4">
            {providers.map(provider => (
              <button
                key={provider.id}
                onClick={() => setSelectedType(provider.id)}
                className="flex flex-col items-center justify-center p-6 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:border-gray-600 transition-all group"
              >
                <div className={`p-4 rounded-full ${provider.bg} ${provider.color} mb-3 group-hover:scale-110 transition-transform`}>
                  <provider.icon size={28} />
                </div>
                <span className="font-medium text-gray-200">{provider.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Connection Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Work Slack"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-teal-500"
              />
            </div>

            {selectedType === 'whatsapp' && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+1234567890"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-teal-500"
                />
              </div>
            )}

            {selectedType === 'discord' && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Bot Token</label>
                <input
                  type="password"
                  placeholder="OT..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-teal-500"
                />
              </div>
            )}

            {selectedType === 'slack' && (
               <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">App Token</label>
                <input
                  type="password"
                  placeholder="xapp-..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-teal-500"
                />
              </div>
            )}

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setSelectedType(null)}
                className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleConnect}
                disabled={!name}
                className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Connect
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
