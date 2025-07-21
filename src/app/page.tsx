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

export default function Home() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Button variant="outline" className="w-full justify-start">
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
          <header className="p-2 border-b md:hidden">
            <SidebarTrigger />
          </header>
          <main className="flex-1 overflow-y-auto">
            <ChatInterface />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
