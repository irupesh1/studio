
import { ArrowLeft, BrainCircuit, Feather, Rocket, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  const highlights = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Locally Trained for Privacy",
      text: "Nexa AI respects user privacy by storing past interactions only on your local device. No data is sent to servers—your information vanishes as soon as you refresh the page.",
    },
    {
      icon: <Feather className="h-6 w-6 text-primary" />,
      title: "Designed by a Developer, Not a Corporation",
      text: "Unlike mass-produced AI platforms, Nexa AI is thoughtfully crafted by a 3rd-year B.Tech student, Rupesh, with a deep focus on usability, innovation, and ethical AI design.",
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Minimalist and Modern Interface",
      text: "The UI is fast, responsive, and visually elegant—built to simplify conversations while delivering powerful AI performance behind the scenes.",
    },
    {
      icon: <BrainCircuit className="h-6 w-6 text-primary" />,
      title: "Evolving with Every Interaction",
      text: "Nexa AI observes and adapts within sessions, offering smarter replies and better context without requiring complex setup or user data collection.",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <Card className="overflow-hidden shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center gap-4 p-6 bg-card border-b">
            <Link href="/" passHref>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <div>
              <CardTitle className="text-2xl font-bold tracking-tight">About NexaAI</CardTitle>
              <CardDescription className="mt-1">
                Your smart, intuitive, and evolving AI companion.
              </CardDescription>
              <Badge variant="secondary" className="mt-2">NexaAI Learner v1.0</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-2">What Makes Nexa AI Unique?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nexa AI is not just another chatbot—it’s a smart, intuitive, and evolving AI companion designed to understand, learn, and grow with each interaction. What sets Nexa AI apart is its user-centric intelligence, deeply rooted in real-time responsiveness, privacy-first architecture, and adaptive learning.
              </p>
            </section>
            
            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">Key Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-snug">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="text-center bg-primary/10 p-6 rounded-lg">
              <Rocket className="h-8 w-8 text-primary mx-auto mb-3" />
              <h2 className="text-xl font-bold mb-2">NexaAI is Just the Beginning</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                This is not the final version—it’s just the beginning. NexaAI is an evolving platform, constantly improving based on user feedback, innovation, and ambition. Our goal is to make AI more accessible, ethical, and personal—breaking away from the big tech monopoly.
              </p>
            </section>
            
            <section>
              <Card className="bg-card border-l-4 border-primary">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/40x40.png" alt="Developer" data-ai-hint="developer portrait" />
                      <AvatarFallback>D</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Crafted with Passion</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-muted-foreground italic">
                    “NexaAI was built to prove that one passionate developer can create something powerful, ethical, and user-friendly without a billion-dollar company behind them.”
                  </blockquote>
                  <CardDescription className="text-right mt-4">— Developer of NexaAI</CardDescription>
                </CardContent>
              </Card>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
