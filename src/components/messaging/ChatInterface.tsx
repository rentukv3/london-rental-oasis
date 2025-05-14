
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
}

interface ChatInterfaceProps {
  conversationId: string;
}

export const ChatInterface = ({ conversationId }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Since we don't have a messages table yet, we're using mock data for demonstration
    const mockMessages: Message[] = [
      {
        id: '1',
        content: 'Hello there! I\'m interested in your property.',
        sender_id: 'user1',
        created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      },
      {
        id: '2',
        content: 'Hi! Thanks for your interest. When would you like to view it?',
        sender_id: 'user2',
        created_at: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
      },
      {
        id: '3',
        content: 'I\'m available this Saturday afternoon. Would that work?',
        sender_id: 'user1',
        created_at: new Date(Date.now() - 21600000).toISOString() // 6 hours ago
      }
    ];
    
    setMessages(mockMessages);

    // We'll simulate real-time updates instead of subscribing to a non-existent channel
    const interval = setInterval(() => {
      // This is just for demonstration - would normally come from Supabase
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [conversationId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setLoading(true);
    try {
      // Create a mock message since we don't have a messages table
      const newMsg: Message = {
        id: Math.random().toString(36).substring(2, 15),
        content: newMessage,
        sender_id: 'user1', // Assuming current user
        created_at: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, newMsg]);
      
      // Store message in notifications as a temp solution
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('notifications').insert({
          user_id: user.id,
          type: 'message',
          message: newMessage,
          data: {
            conversation_id: conversationId
          }
        });
      }
      
      setNewMessage('');
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUserId = () => {
    // Mock function that would normally get the current user ID
    return 'user1';
  };

  return (
    <div className="flex flex-col h-[600px]">
      <ScrollArea className="flex-1 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.sender_id === getCurrentUserId()
                ? 'text-right'
                : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.sender_id === getCurrentUserId()
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};
