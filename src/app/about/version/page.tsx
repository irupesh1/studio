
"use client";

import { useEffect, useState } from 'react';
import { ArrowLeft, BrainCircuit, Lightbulb, CheckCircle, Construction } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const defaultContent = {
    title: "Version Details",
    description: "Information about NexaAI Learner v1.0",
    version: "NexaAI Learner v1.0",
    status: "Active | Learning Mode Enabled",
    quote: "“This is the foundation version of NexaAI — built to learn, improve, and evolve through every user interaction. Fast, lightweight, and focused on understanding you better with each session.”",
    philosophyText: "The beginning of NexaAI’s intelligence journey\nFocus on local session learning and privacy\nA foundation for future updates like memory, voice input, and intent detection\nA commitment to growing through user feedback and real-world use",
    coreFeatures: "Clean, responsive chat interface\nLocal storage for private chat history\nFast and real-time user interaction\nMultilingual support (EN, HI, UR)\nBasic adaptive learning in session",
    upcomingFeatures: "Session memory\nVoice input\nEmotional tone detection"
};

export default function VersionPage() {
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    const storedContent = localStorage.getItem("versionPageContent");
    if (storedContent) {
      try {
        const parsedContent = JSON.parse(storedContent);
        setContent(parsedContent);
      } catch (e) {
        console.error("Failed to parse version page content from localStorage", e);
        setContent(defaultContent);
      }
    }
  }, []);

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
              <CardTitle className="text-2xl font-bold tracking-tight">{content.title}</CardTitle>
              <CardDescription className="mt-1">
                {content.description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-8">
            <section className="bg-primary/10 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                    <BrainCircuit className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold">{content.version}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline">Released: July 2024</Badge>
                    <Badge variant="default">Status: {content.status}</Badge>
                </div>
                <blockquote className="mt-4 text-muted-foreground italic border-l-2 border-primary/50 pl-4">
                 {content.quote}
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
                {(content.philosophyText || '').split('\n').map((item, i) => item && <li key={i}>{item}</li>)}
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
                               {(content.coreFeatures || '').split('\n').map((item, i) => item && <li key={i}>{item}</li>)}
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
                               {(content.upcomingFeatures || '').split('\n').map((item, i) => item && <li key={i}>{item}</li>)}
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

  