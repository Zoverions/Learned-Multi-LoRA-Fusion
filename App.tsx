import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { AgentControl } from './components/AgentControl';
import { MemoryExplorer } from './components/MemoryExplorer';
import { GatewayConfig } from './components/GatewayConfig';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'agents':
        return <AgentControl />;
      case 'terminal':
        return <AgentControl />; // Reusing for now
      case 'memory':
        return <MemoryExplorer />;
      case 'gateway':
        return <GatewayConfig />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;
