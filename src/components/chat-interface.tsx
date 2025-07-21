
"use client";

import React, { useState, useRef, useEffect, type FormEvent } from 'react';
import { sendMessage, regenerateResponse, getAudioForText } from '@/app/actions';
import type { Message } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2, ClipboardCopy, ThumbsUp, ThumbsDown, Volume2, Share2, RefreshCw, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function ChatInterface({ messages, setMessages }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState<string | null>(null);
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: 'Copied to clipboard!',
        description: 'The response has been copied.',
      });
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to copy to clipboard.',
      });
    });
  };

  const handlePlayAudio = async (message: Message) => {
      if (activeAudio === message.id && audioRef.current) {
          if (audioRef.current.paused) {
              audioRef.current.play();
          } else {
              audioRef.current.pause();
          }
          return;
      }
      
      if (message.audioDataUri) {
          playAudioData(message.id, message.audioDataUri);
          return;
      }

      setAudioLoading(message.id);
      const audioDataUri = await getAudioForText(message.content);
      setAudioLoading(null);
      if (audioDataUri) {
          setMessages(prev => prev.map(m => m.id === message.id ? { ...m, audioDataUri } : m));
          playAudioData(message.id, audioDataUri);
      } else {
          toast({ variant: 'destructive', title: 'Error', description: 'Failed to generate audio.' });
      }
  };

  const playAudioData = (messageId: string, audioDataUri: string) => {
      if (audioRef.current) {
          audioRef.current.pause();
      }
      const newAudio = new Audio(audioDataUri);
      newAudio.onplay = () => setActiveAudio(messageId);
      newAudio.onpause = () => setActiveAudio(null);
      newAudio.onended = () => setActiveAudio(null);
      newAudio.onerror = () => {
          toast({ variant: 'destructive', title: 'Error', description: 'Failed to play audio.' });
          setActiveAudio(null);
      };
      audioRef.current = newAudio;
      audioRef.current.play();
  };

  const handleRegenerate = async () => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'assistant' || isLoading) return;

    setIsLoading(true);
    const historyWithoutLastResponse = messages.slice(0, -1);
    
    try {
      const aiMessage = await sendMessage(historyWithoutLastResponse);
      setMessages(prev => [...prev.slice(0, -1), aiMessage]);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get a response from the AI.',
      });
    } finally {
      setIsLoading(false);
    }
  };

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
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div ref={viewportRef} className="h-full">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {messages.length === 0 && !isLoading ? (
              <div className="text-center mt-[20vh]">
                  <h1 className="text-5xl font-bold text-primary">Nexa AI</h1>
                  <p className="mt-4 text-lg text-muted-foreground">Your intelligent assistant for everything.</p>
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
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-card flex items-center justify-center">
                       <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 218 300" preserveAspectRatio="xMidYMid meet" className="text-foreground">
                          <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                              <path d="M563 2296 c-90 -43 -141 -138 -130 -242 7 -66 51 -150 93 -177 l34 -22 0 -392 c0 -378 -1 -392 -19 -398 -32 -10 -89 -81 -102 -127 -38 -144 68 -291 211 -291 47 0 64 5 104 32 67 46 99 99 104 173 6 80 -12 130 -64 178 -24 22 -48 40 -54 40 -6 0 -10 66 -10 188 l0 187 28 -30 c36 -39 220 -256 404 -475 156 -187 183 -209 281 -231 68 -15 146 -1 198 34 44 30 96 99 109 145 6 23 10 197 10 453 l0 417 36 27 c42 32 84 114 84 164 0 130 -106 231 -231 219 -145 -14 -231 -186 -158 -318 21 -38 68 -81 100 -92 6 -2 8 -83 7 -211 l-3 -208 -105 122 c-116 135 -325 385 -499 598 -187 230 -213 251 -316 258 -49 3 -69 0 -112 -21z m137 -10 c50 -9 76 -25 130 -82 52 -56 74 -81 145 -168 17 -20 45 -54 62 -74 18 -20 33 -40 33 -43 0 -10 39 -58 232 -283 51 -60 121 -142 156 -183 71 -83 102 -116 102 -107 0 4 7 1 15 -6 16 -14 35 -6 35 16 0 8 4 14 10 14 6 0 9 70 8 187 -1 172 -2 190 -21 215 -12 16 -27 28 -36 28 -8 0 -12 3 -8 6 3 3 -3 16 -15 28 -11 11 -26 30 -33 41 -16 23 -28 138 -14 130 5 -4 6 1 3 9 -3 9 -1 16 6 16 6 0 9 4 6 9 -8 12 77 89 106 96 13 4 37 4 54 1 16 -2 38 -5 50 -5 27 -1 92 -66 111 -110 26 -61 0 -151 -61 -210 -19 -18 -32 -40 -29 -47 3 -8 1 -14 -4 -14 -6 0 -10 -157 -10 -389 -1 -385 -5 -481 -24 -481 -5 0 -9 -8 -9 -18 0 -24 -76 -102 -99 -102 -10 0 -24 -6 -30 -14 -13 -15 -150 -14 -160 2 -3 5 -18 12 -33 15 -16 5 -56 41 -103 95 -43 48 -94 106 -114 128 -20 23 -47 56 -61 75 -14 18 -35 44 -47 56 -11 13 -36 42 -55 65 -18 23 -37 46 -43 52 -5 6 -32 38 -59 71 -59 72 -135 145 -150 145 -37 -1 -40 -15 -40 -197 l0 -179 57 -58 c62 -63 74 -96 63 -173 -6 -43 -43 -108 -72 -126 -7 -4 -21 -15 -30 -24 -10 -11 -36 -18 -68 -20 -68 -3 -134 40 -171 112 -46 86 -29 166 50 240 18 16 36 41 40 54 4 14 7 156 7 315 -1 160 -2 331 -2 380 0 87 0 88 -36 124 -19 19 -47 56 -61 81 -21 39 -24 55 -21 112 3 53 9 75 32 108 40 58 124 106 166 95 8 -2 26 -5 40 -8z"/>
                              <path d="M610 2182 c-42 -21 -60 -53 -60 -111 0 -37 5 -48 35 -75 20 -19 47 -33 65 -34 128 -10 180 175 63 224 -43 18 -61 18 -103 -4z m110 -29 c40 -37 47 -78 20 -121 -37 -60 -99 -64 -145 -10 -41 49 -26 120 30 144 44 19 61 17 95 -13z"/>
                              <path d="M1646 2064 c-14 -7 -26 -10 -26 -7 0 7 -40 -38 -41 -46 -13 -104 -4 -130 57 -156 44 -18 47 -18 38 -3 -4 7 -3 8 5 4 6 -4 20 -5 30 -1 26 8 71 76 71 106 0 35 -33 80 -74 100 -30 14 -39 15 -60 3z m81 -50 c21 -21 24 -32 20 -61 -15 -88 -109 -109 -141 -31 -37 88 55 158 121 92z"/>
                              <path d="M826 1941 c-9 -10 -39 -33 -66 -52 -45 -31 -49 -37 -52 -79 -2 -25 -1 -75 2 -112 l5 -68 115 -113 c63 -62 128 -129 144 -148 40 -47 167 -200 186 -222 8 -11 27 -33 42 -50 15 -18 63 -73 105 -124 76 -89 155 -153 189 -153 26 0 93 41 111 69 12 -18 18 -54 21 -113 4 -73 1 -92 -15 -117 -17 29 -131 157 -198 225 -30 30 -242 283 -320 381 -21 28 -47 57 -57 66 -10 9 -18 19 -18 22 0 6 -48 63 -97 114 -35 37 -71 43 -97 14z m147 -116 c250 -311 555 -664 615 -712 21 -17 13 -178 -12 -215 -25 -37 -69 -51 -109 -34 -40 17 -61 40 -329 357 -119 141 -260 296 -312 345 l-96 89 0 95 0 96 35 13 c19 7 48 28 63 47 15 19 34 33 42 32 7 -2 54 -53 103 -113z"/>
                              <path d="M622 983 c-85 -17 -105 -163 -27 -205 71 -39 144 4 152 89 5 45 2 54 -23 81 -30 32 -62 43 -102 35z m63 -29 c25 -10 48 -62 40 -93 -10 -39 -44 -71 -77 -71 -41 0 -78 40 -78 83 0 65 55 104 115 81z"/>
                          </g>
                      </svg>
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
                          <ClipboardCopy onClick={() => handleCopyToClipboard(message.content)} className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                          <ThumbsUp className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                          <ThumbsDown className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                          <button onClick={() => handlePlayAudio(message)} disabled={!!audioLoading} className="disabled:opacity-50">
                            {audioLoading === message.id ? (
                                <Loader2 className="w-4 h-4 animate-spin"/>
                            ) : (
                                <Volume2 className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                            )}
                          </button>
                          <Share2 className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                          <button onClick={handleRegenerate} disabled={isLoading} className="disabled:opacity-50">
                            <RefreshCw className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                          </button>
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
            <div className="flex justify-center items-center gap-2 mt-2">
                <p className="text-[10px] text-center text-muted-foreground font-bold">
                NexaAI can make mistakes, so double-check it
                </p>
                <X className="w-3 h-3 text-muted-foreground cursor-pointer" />
            </div>
          </div>
      </div>
    </div>
  );
}
