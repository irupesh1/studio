
"use client";

import { useState, useEffect } from "react";
import { ChatInterface } from "@/components/chat-interface";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import type { Message } from "@/types";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [feedbackPromptShown, setFeedbackPromptShown] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!feedbackPromptShown) {
      const timer = setTimeout(() => {
        toast({
          title: "Enjoying NexaAI?",
          description: "Your feedback helps us improve. Would you like to share your thoughts?",
          action: (
            <Link href="/feedback">
              <Button variant="outline" size="sm">
                Give Feedback
              </Button>
            </Link>
          ),
        });
        setFeedbackPromptShown(true);
      }, 30000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, [feedbackPromptShown, toast]);

  const startNewChat = () => {
    setMessages([]);
    setIsSidebarOpen(false); 
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="hidden md:flex md:w-64 flex-shrink-0">
        <Sidebar startNewChat={startNewChat} />
      </div>
      <main className="flex-1 flex flex-col">
        <Header onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="md:hidden">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetContent side="left" className="w-64 p-0">
              <Sidebar startNewChat={startNewChat} />
            </SheetContent>
          </Sheet>
        </div>
        <ChatInterface messages={messages} setMessages={setMessages} />
      </main>
    </div>
  );
}
