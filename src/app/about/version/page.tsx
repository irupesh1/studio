
import { ArrowLeft, BrainCircuit, Lightbulb, CheckCircle, Construction } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function VersionPage() {
  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <Card className="overflow-hidden shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center gap-4 p-6 bg-card border-b">
            <Link href="/about" passHref>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10" aria-label="Back to about page">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <div>
              <CardTitle className="text-2xl font-bold tracking-tight">Version Details</CardTitle>
              <CardDescription className="mt-1">
                Information about NexaAI Learner v1.0
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-8">
            <section className="bg-primary/10 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                    <BrainCircuit className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold">NexaAI Learner v1.0</h2>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline">Released: July 2024</Badge>
                    <Badge variant="default">Status: Active | Learning Mode Enabled</Badge>
                </div>
                <blockquote className="mt-4 text-muted-foreground italic border-l-2 border-primary/50 pl-4">
                 “This is the foundation version of NexaAI — built to learn, improve, and evolve through every user interaction. Fast, lightweight, and focused on understanding you better with each session.”
                </blockquote>
            </section>

            <Separator />
            
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Version Philosophy</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                "Learner v1.0" is not just a number — it represents:
              </p>
              <ul className="space-y-3 text-muted-foreground list-disc list-inside">
                <li>The beginning of NexaAI’s intelligence journey</li>
                <li>Focus on local session learning and privacy</li>
                <li>A foundation for future updates like memory, voice input, and intent detection</li>
                <li>A commitment to growing through user feedback and real-world use</li>
              </ul>
            </section>

            <Separator />

            <section>
                <h2 className="text-xl font-semibold mb-4">Version Changelog</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <CheckCircle className="text-green-500" />
                                Core Features
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                                <li>Clean, responsive chat interface</li>
                                <li>Local storage for private chat history</li>
                                <li>Fast and real-time user interaction</li>
                                <li>Multilingual support (EN, HI, UR)</li>
                                <li>Basic adaptive learning in session</li>
                           </ul>
                        </CardContent>
                    </Card>
                    <Card>
                         <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Construction className="text-amber-500" />
                                Upcoming
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                                <li>Session memory</li>
                                <li>Voice input</li>
                                <li>Emotional tone detection</li>
                           </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <p className="text-center text-sm text-muted-foreground pt-4">
              🔐 Your privacy is our priority. No data leaves your device unless you choose to share it.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
