
import { ArrowLeft, BrainCircuit, Code, Leaf, Languages, Rocket } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const highlights = [
  {
    icon: <Leaf className="h-6 w-6 text-green-500" />,
    title: "Locally Trained for Privacy",
    description: "Nexa AI respects user privacy by storing past interactions only on your local device. No data is sent to servers — your information vanishes as soon as you refresh the page."
  },
  {
    icon: <Code className="h-6 w-6 text-blue-500" />,
    title: "Designed by a Developer, Not a Corporation",
    description: "Unlike mass-produced AI platforms, Nexa AI is thoughtfully crafted by a 3rd-year B.Tech student, Rupesh, with a deep focus on usability, innovation, and ethical AI design — showing what passionate, independent minds can create."
  },
  {
    icon: <Rocket className="h-6 w-6 text-purple-500" />,
    title: "Minimalist and Modern Interface",
    description: "The UI is fast, responsive, and visually elegant — built to simplify conversations while delivering powerful AI performance behind the scenes."
  },
  {
    icon: <BrainCircuit className="h-6 w-6 text-orange-500" />,
    title: "Evolving with Every Interaction",
    description: "Nexa AI observes and adapts within sessions, offering smarter replies and better context without requiring complex setup or user data collection."
  },
  {
    icon: <Languages className="h-6 w-6 text-red-500" />,
    title: "Multi-Language and Emotion-Aware Conversations",
    description: "It supports multilingual exchanges and is being constantly improved to recognize tone, intent, and context — making every response feel natural and personalized."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <Card className="shadow-2xl rounded-xl border-0 overflow-hidden">
          <CardHeader className="p-8 bg-card">
            <div className="flex items-center gap-4">
              <Link href="/" passHref>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to Chat</span>
                </Button>
              </Link>
              <CardTitle className="text-3xl font-bold tracking-tight">About NexaAI</CardTitle>
            </div>
            <p className="text-muted-foreground mt-4">
              Nexa AI is not just another chatbot — it’s a smart, intuitive, and evolving AI companion designed to understand, learn, and grow with each interaction. What sets Nexa AI apart is its user-centric intelligence, deeply rooted in real-time responsiveness, privacy-first architecture, and adaptive learning.
            </p>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-8 text-center">Key Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0 mt-1 bg-primary/10 p-2 rounded-full">
                      {highlight.icon}
                    </div>
                    <div>
                      <h3 className="text-md font-semibold">{highlight.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mt-1">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="text-center">
              <p className="font-semibold">Thank you for being part of the NexaAI journey!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
