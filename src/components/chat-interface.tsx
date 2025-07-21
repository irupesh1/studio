"use client";

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { sendMessage } from '@/app/actions';
import type { Message } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2, Bot, ClipboardCopy, ThumbsUp, ThumbsDown, Volume2, Share2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from "@/components/theme-toggle";

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function ChatInterface({ messages, setMessages }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const aiMessage = await sendMessage(newMessages);
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get a response from the AI.',
      });
      setMessages(prev => prev.filter(m => m.id !== userMessage.id)); 
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col h-full">
       <header className="absolute top-4 right-4">
        <ThemeToggle />
      </header>
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div ref={viewportRef} className="h-full">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {messages.length === 0 && !isLoading ? (
              <div className="text-center mt-[20vh] text-foreground">
                  <h1 className="text-4xl font-bold">NexaAI Chat</h1>
                  <p className="mt-2 text-muted-foreground">How can I help you today?</p>
              </div>
          ) : (
            <div className="space-y-8">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex items-start gap-4 animate-in fade-in zoom-in-95',
                    message.role === 'user' && 'justify-end'
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot size={20} className="text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'flex-1 max-w-lg',
                       message.role === 'user'
                        ? 'bg-muted rounded-2xl p-3 text-foreground'
                        : ''
                    )}
                  >
                    <div className="prose text-sm max-w-none text-foreground whitespace-pre-wrap">
                      {message.content}
                    </div>
                    {message.role === 'assistant' && (
                       <div className="flex items-center gap-4 mt-3">
                          <ClipboardCopy className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                          <ThumbsUp className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                          <ThumbsDown className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                          <Volume2 className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                          <Share2 className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                          <RefreshCw className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                        </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-4 animate-in fade-in zoom-in-95">
                   <div className="flex items-center space-x-2 mt-1">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span className="text-xs text-muted-foreground">
                        NexaAI is thinking...
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
          </div>
        </div>
      </ScrollArea>

      <div className="w-full pb-8 pt-2">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="relative">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask NexaAI Anything..."
                    className="w-full h-12 pr-14 rounded-full bg-muted/50 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-primary border-0 shadow-none"
                    disabled={isLoading}
                />
                <Button
                    type="submit"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-9 h-9"
                    disabled={isLoading || !input.trim()}
                    aria-label="Send message"
                >
                    <Send className="h-5 w-5" />
                </Button>
            </form>
          </div>
      </div>
    </div>
  );
}
