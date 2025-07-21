
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function FeedbackPage() {
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
            <div className="flex flex-col">
              <CardTitle className="text-xl font-bold">Submit Feedback</CardTitle>
              <p className="text-muted-foreground text-xs">
                We'd love to hear what you think!
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <p>
                This is a placeholder for the feedback form. You can build out your feedback submission UI here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    