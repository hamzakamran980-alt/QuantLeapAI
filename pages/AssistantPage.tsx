import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/marketService';
import { ChatMessage } from '../types';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAppContext } from '../context/AppContext';

const AssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', content: "Hello! I'm your AI investment teacher. How can I help you understand the world of finance today? Ask me about diversification, risk, or a specific stock like 'Tell me about Apple (AAPL)'." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { riskProfile } = useAppContext();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(input, messages, riskProfile);
      const assistantMessage: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-3xl mx-auto animate-fade-in">
       <h1 className="text-3xl font-bold text-brand-primary mb-4 text-center">AI Assistant</h1>
      <Card className="flex-grow flex flex-col">
        <div className="flex-grow p-4 overflow-y-auto space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md p-3 rounded-lg shadow-sm ${message.role === 'user' ? 'bg-brand-blue text-white' : 'bg-gray-100 text-brand-primary'}`}>
                 {message.content.split('\n\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className={pIndex > 0 ? 'mt-2' : ''}>
                    {paragraph.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, partIndex) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
                      }
                      if (part.startsWith('*') && part.endsWith('*')) {
                        return <em key={partIndex}>{part.slice(1, -1)}</em>;
                      }
                      return part;
                    })}
                  </p>
                ))}
              </div>
            </div>
          ))}
           {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-md p-3 rounded-lg bg-gray-100 text-brand-primary">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t border-brand-border">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about investment concepts..."
              className="flex-grow bg-brand-surface border border-brand-border rounded-md px-3 py-2 text-brand-primary focus:ring-brand-blue focus:border-brand-blue"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AssistantPage;