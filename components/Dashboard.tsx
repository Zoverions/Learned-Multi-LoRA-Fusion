import React, { useEffect, useState } from 'react';
import { Agent, TerminalLog } from '../types';
import { mockAgentService } from '../services/mockAgentService';
import { Activity, Cpu, Database, Zap, Clock, Users } from 'lucide-react';

const colorClasses: Record<string, string> = {
    green: 'bg-green-500/10 text-green-400',
    blue: 'bg-blue-500/10 text-blue-400',
    purple: 'bg-purple-500/10 text-purple-400',
    yellow: 'bg-yellow-500/10 text-yellow-400',
    teal: 'bg-teal-500/10 text-teal-400',
    red: 'bg-red-500/10 text-red-400',
};

const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex items-center space-x-4 hover:border-gray-600 transition-colors">
    <div className={`p-3 rounded-lg ${colorClasses[color] || colorClasses.blue}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <h3 className="text-2xl font-bold text-gray-100">{value}</h3>
    </div>
  </div>
);

const ActivityItem = ({ log }: { log: TerminalLog }) => {
  const color = log.type === 'error' ? 'text-red-400' : log.type === 'warning' ? 'text-yellow-400' : 'text-teal-400';
  return (
    <div className="flex items-start space-x-3 py-3 border-b border-gray-800 last:border-0">
      <div className={`mt-1 w-2 h-2 rounded-full ${log.type === 'error' ? 'bg-red-500' : log.type === 'warning' ? 'bg-yellow-500' : 'bg-teal-500'}`}></div>
      <div className="flex-1">
        <p className="text-sm text-gray-300 font-mono">{log.message}</p>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
          <span className="text-xs text-gray-600">•</span>
          <span className="text-xs text-gray-500">{log.source}</span>
        </div>
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [logs, setLogs] = useState<TerminalLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [agentsData, logsData] = await Promise.all([
        mockAgentService.getAgents(),
        mockAgentService.getLogs()
      ]);
      setAgents(agentsData);
      setLogs(logsData);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-12 text-gray-500">Loading Dashboard...</div>;
  }

  const activeAgentsCount = agents.filter(a => a.status === 'busy' || a.status === 'idle').length;

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Activity} label="System Status" value="Online" color="green" />
        <StatCard icon={Cpu} label="Active Agents" value={activeAgentsCount.toString()} color="blue" />
        <StatCard icon={Database} label="Memory Items" value="1,248" color="purple" />
        <StatCard icon={Zap} label="Tokens Used" value="45.2k" color="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Agents List */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
            <Users className="mr-2 text-blue-400" size={20} /> Active Agents
          </h2>
          <div className="space-y-4">
            {agents.map(agent => (
              <div key={agent.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${agent.status === 'busy' ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-700 text-gray-400'}`}>
                    <Cpu size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-200">{agent.name}</h3>
                    <p className="text-xs text-gray-500">{agent.type} • {agent.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    agent.status === 'busy' ? 'bg-amber-500/20 text-amber-400' :
                    agent.status === 'idle' ? 'bg-green-500/20 text-green-400' :
                    'bg-gray-700 text-gray-400'
                  }`}>
                    {agent.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
            <Clock className="mr-2 text-teal-400" size={20} /> Recent Activity
          </h2>
          <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {logs.map(log => <ActivityItem key={log.id} log={log} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
