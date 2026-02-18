export interface Agent {
  id: string;
  name: string;
  type: 'pi' | 'executor' | 'browser';
  status: 'idle' | 'busy' | 'offline' | 'error';
  lastActive: string;
  description: string;
}

export interface Memory {
  id: string;
  content: string;
  category: 'user' | 'work' | 'preference' | 'fact' | 'system';
  timestamp: string;
  agentId?: string;
  score?: number; // Relevance score
}

export interface Channel {
  id: string;
  name: string;
  type: 'whatsapp' | 'discord' | 'slack' | 'telegram' | 'web';
  status: 'connected' | 'disconnected' | 'error';
  config: Record<string, string>;
  lastMessage?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  timestamp: string;
  agentId?: string;
}

export interface TerminalLog {
  id: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  source: string;
}
