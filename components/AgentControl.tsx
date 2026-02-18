import React, { useState, useEffect, useRef } from 'react';
import { Message, TerminalLog, Agent } from '../types';
import { mockAgentService } from '../services/mockAgentService';
import { Send, Terminal, Bot, User, Clock } from 'lucide-react';

const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] rounded-lg p-4 ${isUser ? 'bg-teal-500/20 text-teal-100 border border-teal-500/30' : 'bg-gray-800 text-gray-200 border border-gray-700'}`}>
        <div className="flex items-center space-x-2 mb-1">
          {isUser ? <User size={14} className="text-teal-400" /> : <Bot size={14} className="text-blue-400" />}
          <span className="text-xs font-semibold opacity-70 capitalize">{message.role}</span>
          <span className="text-xs opacity-50">• {new Date(message.timestamp).toLocaleTimeString()}</span>
        </div>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};

const LogItem = ({ log }: { log: TerminalLog }) => {
  const colorClass =
    log.type === 'error' ? 'text-red-400' :
    log.type === 'warning' ? 'text-yellow-400' :
    log.type === 'success' ? 'text-green-400' : 'text-gray-400';

  return (
    <div className="font-mono text-xs py-1 border-b border-gray-800/50 last:border-0 hover:bg-gray-800/30">
      <span className="text-gray-600 mr-2">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
      <span className={`font-semibold ${colorClass} mr-2`}>[{log.type.toUpperCase()}]</span>
      <span className="text-gray-300">{log.message}</span>
    </div>
  );
};

export const AgentControl: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [logs, setLogs] = useState<TerminalLog[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial data fetch
    const loadData = async () => {
      const [msgs, lgs] = await Promise.all([
        mockAgentService.getMessages(),
        mockAgentService.getLogs()
      ]);
      setMessages(msgs);
      setLogs(lgs);
    };
    loadData();

    // Polling for logs (simulation of real-time stream)
    const interval = setInterval(async () => {
      const newLogs = await mockAgentService.getLogs();
      setLogs(prevLogs => {
          if (newLogs.length !== prevLogs.length) {
              return newLogs;
          }
          return prevLogs;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const content = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Optimistic update
    const tempUserMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: content,
        timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempUserMsg]);

    // Add log
    mockAgentService.addLog({
        type: 'info',
        message: `User input received: "${content.substring(0, 20)}..."`,
        source: 'Interface'
    });

    try {
        const response = await mockAgentService.sendMessage(content);
        setMessages(prev => [...prev, response]);

        mockAgentService.addLog({
            type: 'success',
            message: `Agent responded in ${(Math.random() * 1000 + 500).toFixed(0)}ms`,
            source: 'Agent'
        });
    } catch (error) {
        mockAgentService.addLog({
            type: 'error',
            message: 'Failed to get response from agent',
            source: 'Network'
        });
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isTyping && (
            <div className="flex justify-start mb-4">
               <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex items-center space-x-2">
                 <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                 <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-gray-900 border-t border-gray-800">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message or command..."
              className="flex-1 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
            />
            <button
              onClick={handleSendMessage}
              disabled={isTyping}
              className="bg-teal-600 hover:bg-teal-500 text-white p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Terminal/Log Area */}
      <div className="w-1/3 flex flex-col bg-gray-950 border border-gray-800 rounded-lg overflow-hidden font-mono">
        <div className="px-4 py-2 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-400">
            <Terminal size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">System Terminal</span>
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-black/50">
          {logs.map((log) => (
            <LogItem key={log.id} log={log} />
          ))}
          <div ref={logsEndRef} />
        </div>
      </div>
    </div>
  );
};
