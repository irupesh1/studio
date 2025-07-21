
"use client";

import { useState } from "react";
import { ChatInterface } from "@/components/chat-interface";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import type { Message } from "@/types";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
