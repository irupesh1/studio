
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
            <Link href="/" passHref>
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Chat</span>
              </Button>
            </Link>
            <CardTitle className="text-xl font-bold">About NexaAI</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-xs max-w-none dark:prose-invert space-y-4">
            <p className="font-semibold">Nexa AI is not just another chatbot — it’s a smart, intuitive, and evolving AI companion designed to understand, learn, and grow with each interaction. What sets Nexa AI apart is its user-centric intelligence, deeply rooted in real-time responsiveness, privacy-first architecture, and adaptive learning.</p>

            <Separator />

            <div>
                <h2 className="font-semibold text-base mb-2">Key Highlights of Nexa AI:</h2>
                <ul className="list-none pl-0 space-y-3">
                    <li>
                        <h3 className="font-semibold">🔹 Locally Trained for Privacy:</h3>
                        <p>Nexa AI respects user privacy by storing past interactions only on your local device. No data is sent to servers — your information vanishes as soon as you refresh the page.</p>
                    </li>
                    <li>
                        <h3 className="font-semibold">🔹 Designed by a Developer, Not a Corporation:</h3>
                        <p>Unlike mass-produced AI platforms, Nexa AI is thoughtfully crafted by a 3rd-year B.Tech student, Rupesh, with a deep focus on usability, innovation, and ethical AI design — showing what passionate, independent minds can create.</p>
                    </li>
                    <li>
                        <h3 className="font-semibold">🔹 Minimalist and Modern Interface:</h3>
                        <p>The UI is fast, responsive, and visually elegant — built to simplify conversations while delivering powerful AI performance behind the scenes.</p>
                    </li>
                    <li>
                        <h3 className="font-semibold">🔹 Evolving with Every Interaction:</h3>
                        <p>Nexa AI observes and adapts within sessions, offering smarter replies and better context without requiring complex setup or user data collection.</p>
                    </li>
                    <li>
                        <h3 className="font-semibold">🔹 Multi-Language and Emotion-Aware Conversations:</h3>
                        <p>It supports multilingual exchanges and is being constantly improved to recognize tone, intent, and context — making every response feel natural and personalized.</p>
                    </li>
                </ul>
            </div>

            <Separator />

            <p className="text-center font-semibold">Thank you for being part of the NexaAI journey!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
