import { Agent, Memory, Channel, Message, TerminalLog, Tool } from '../types';

// Mock Agents
const MOCK_AGENTS: Agent[] = [
  { id: '1', name: 'Pi Agent', type: 'pi', status: 'idle', lastActive: '2 min ago', description: 'Main conversational agent for general tasks.' },
  { id: '2', name: 'Dev Executor', type: 'executor', status: 'busy', lastActive: 'Now', description: 'Executes system commands and coding tasks.' },
  { id: '3', name: 'Web Browser', type: 'browser', status: 'offline', lastActive: '1 day ago', description: 'Handles web browsing and scraping.' },
];

// Mock Memories
const MOCK_MEMORIES: Memory[] = [
  { id: '1', content: 'User prefers dark mode interfaces.', category: 'preference', timestamp: '2023-10-27T10:00:00Z', agentId: '1', score: 0.95, relatedIds: ['5'] },
  { id: '2', content: 'Project "Nexus" deadline is next Friday.', category: 'work', timestamp: '2023-10-28T14:30:00Z', agentId: '2', score: 0.88, relatedIds: ['4'] },
  { id: '3', content: 'User is located in San Francisco, CA.', category: 'user', timestamp: '2023-10-25T09:15:00Z', score: 0.75 },
  { id: '4', content: 'Default python version should be 3.11.', category: 'system', timestamp: '2023-10-26T16:20:00Z', agentId: '2', score: 0.60, relatedIds: ['2'] },
  { id: '5', content: 'User likes concise answers for coding questions.', category: 'preference', timestamp: '2023-10-29T11:45:00Z', agentId: '1', score: 0.92, relatedIds: ['1'] },
];

// Mock Channels
const MOCK_CHANNELS: Channel[] = [
  { id: '1', name: 'Web Chat', type: 'web', status: 'connected', config: {}, lastMessage: 'Hello there!' },
  { id: '2', name: 'WhatsApp', type: 'whatsapp', status: 'disconnected', config: { phoneNumber: '+1234567890' } },
  { id: '3', name: 'Discord', type: 'discord', status: 'connected', config: { serverId: '987654321' }, lastMessage: 'New PR opened.' },
];

// Mock Tools
const MOCK_TOOLS: Tool[] = [
  { id: '1', name: 'Python REPL', description: 'Executes Python code in a sandboxed environment', status: 'ready', icon: 'Terminal' },
  { id: '2', name: 'Web Browser', description: 'Navigates and scrapes web pages', status: 'ready', icon: 'Globe' },
  { id: '3', name: 'System Shell', description: 'Executes shell commands', status: 'ready', icon: 'Code' },
];

// Mock Messages
let mockMessages: Message[] = [
  { id: '1', role: 'system', content: 'System initialized. Agents ready.', timestamp: new Date().toISOString() },
  { id: '2', role: 'assistant', content: 'Hello! I am Nexus. How can I assist you today?', timestamp: new Date().toISOString() },
];

// Mock Terminal Logs
let mockLogs: TerminalLog[] = [
  { id: '1', timestamp: new Date().toISOString(), type: 'info', message: 'Gateway service started on port 3000', source: 'System' },
  { id: '2', timestamp: new Date().toISOString(), type: 'success', message: 'Connected to database successfully', source: 'Database' },
];

export const mockAgentService = {
  getAgents: async (): Promise<Agent[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_AGENTS), 500));
  },

  getMemories: async (query: string = ''): Promise<Memory[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!query) resolve(MOCK_MEMORIES);
        const lowerQuery = query.toLowerCase();
        const filtered = MOCK_MEMORIES.filter(m =>
          m.content.toLowerCase().includes(lowerQuery) ||
          m.category.toLowerCase().includes(lowerQuery)
        );
        resolve(filtered);
      }, 300);
    });
  },

  getChannels: async (): Promise<Channel[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_CHANNELS), 400));
  },

  addChannel: async (channel: Omit<Channel, 'id' | 'status'>): Promise<Channel> => {
     const newChannel: Channel = {
         ...channel,
         id: Date.now().toString(),
         status: 'connected',
         lastMessage: 'Connected just now'
     };
     // In a real app we would push to MOCK_CHANNELS but for this mock we just return it
     return new Promise(resolve => setTimeout(() => resolve(newChannel), 500));
  },

  getTools: async (): Promise<Tool[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_TOOLS), 300));
  },

  getMessages: async (): Promise<Message[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockMessages), 200));
  },

  sendMessage: async (content: string): Promise<Message> => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    mockMessages = [...mockMessages, userMsg];

    // Simulate complex response with tools
    return new Promise((resolve) => {
      setTimeout(() => {
        const isCodeRequest = content.toLowerCase().includes('code') || content.toLowerCase().includes('python');

        let responseMsg: Message;

        if (isCodeRequest) {
            responseMsg = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `I'll handle that. Executing python script...`,
                timestamp: new Date().toISOString(),
                steps: [
                    { id: '1', toolId: '1', action: 'print("Hello World")', status: 'completed', output: 'Hello World' }
                ]
            };
        } else {
             responseMsg = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `I received: "${content}". This is a mock response from the agent.`,
                timestamp: new Date().toISOString(),
            };
        }

        mockMessages = [...mockMessages, responseMsg];
        resolve(responseMsg);
      }, 1500);
    });
  },

  getLogs: async (): Promise<TerminalLog[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockLogs), 200));
  },

  addLog: (log: Omit<TerminalLog, 'id' | 'timestamp'>) => {
      const newLog: TerminalLog = {
          ...log,
          id: Date.now().toString(),
          timestamp: new Date().toISOString()
      };
      mockLogs = [newLog, ...mockLogs]; // Add to beginning
  }
};
