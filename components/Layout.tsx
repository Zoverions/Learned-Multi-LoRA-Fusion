import React from 'react';
import { LayoutDashboard, Users, BrainCircuit, Settings, Terminal, Activity } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active ? 'bg-teal-500/10 text-teal-400' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  return (
    <div className="flex h-screen bg-gray-950 text-gray-200 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800 flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-sky-500 rounded-lg flex items-center justify-center">
            <Activity className="text-gray-900" size={20} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-sky-400">
            Nexus
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            active={currentPage === 'dashboard'}
            onClick={() => onNavigate('dashboard')}
          />
          <SidebarItem
            icon={Users}
            label="Agents"
            active={currentPage === 'agents'}
            onClick={() => onNavigate('agents')}
          />
          <SidebarItem
            icon={BrainCircuit}
            label="Memory"
            active={currentPage === 'memory'}
            onClick={() => onNavigate('memory')}
          />
          <SidebarItem
            icon={Terminal}
            label="Terminal"
            active={currentPage === 'terminal'}
            onClick={() => onNavigate('terminal')}
          />
          <SidebarItem
            icon={Settings}
            label="Gateway"
            active={currentPage === 'gateway'}
            onClick={() => onNavigate('gateway')}
          />
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3 px-4 py-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm text-gray-400">System Online</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-gray-900/50 border-b border-gray-800 flex items-center justify-between px-8 backdrop-blur-sm">
          <h1 className="text-lg font-semibold text-gray-200 capitalize">{currentPage}</h1>
          <div className="flex items-center space-x-4">
             {/* Add header actions here if needed */}
             <div className="text-sm text-gray-500">v0.1.0-alpha</div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
