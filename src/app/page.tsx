import { ChatInterface } from "@/components/chat-interface";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <div className="w-full h-[calc(100vh-2rem)] sm:h-[calc(100vh-4rem)] flex flex-col items-center">
        <header className="mb-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight font-headline">
            NexaAI Chat
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Your intelligent conversational partner.
          </p>
        </header>
        <ChatInterface />
      </div>
    </main>
  );
}
