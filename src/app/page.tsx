"use client";

import { useState } from "react";
import { ChatInterface } from "@/components/chat-interface";
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquarePlus } from "lucide-react";
import type { Message } from "@/types";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Button variant="outline" className="w-full justify-start" onClick={handleNewChat}>
            <MessageSquarePlus className="mr-2" />
            New Chat
          </Button>
        </SidebarHeader>
        <SidebarContent>
          {/* Chat history can be listed here */}
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <header className="p-2 border-b flex items-center justify-between">
            <SidebarTrigger className="md:hidden" />
            <div className="md:hidden"></div> {/* Empty div to balance the flex layout */}
            <div className="flex-1" />
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-y-auto">
            <ChatInterface messages={messages} setMessages={setMessages} />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
