"use client";

import { useState, useEffect } from "react";
import { ChatInterface } from "@/components/chat-interface";
import { Sidebar } from "@/components/sidebar";
import type { Message } from "@/types";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    localStorage.removeItem('chatMessages');
  }, []);

  const startNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar startNewChat={startNewChat} />
      <main className="flex-1 flex flex-col">
        <ChatInterface messages={messages} setMessages={setMessages} />
      </main>
    </div>
  );
}
