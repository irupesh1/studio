
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";

const feedbackFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  feedback: z.string().min(10, {
    message: "Feedback must be at least 10 characters.",
  }),
  suggestedFeatures: z.string().optional(),
});

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

const defaultValues: Partial<FeedbackFormValues> = {
  name: "",
  feedback: "",
  suggestedFeatures: "",
};

export default function FeedbackPage() {
  const { toast } = useToast();
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: FeedbackFormValues) {
    const subject = "Feedback";
    const body = `Hello,

Here is some feedback from a user:

Name: ${data.name}

Feedback:
${data.feedback}

Suggested Features:
${data.suggestedFeatures || 'N/A'}

Regards,
NexaAI Feedback System
`;

    const mailtoLink = `mailto:ibefikra1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    try {
      window.location.href = mailtoLink;
      toast({
        title: "Redirecting to Email Client",
        description: "Please send the pre-filled email to submit your feedback.",
      });
      form.reset();
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Oops! Something went wrong.",
        description: "Could not open email client. Please copy the details manually.",
      });
    }
  }

  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="overflow-hidden shadow-lg rounded-xl">
          <CardHeader className="flex flex-row items-center gap-4 p-4 bg-card border-b">
            <Link href="/" passHref>
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <div>
              <CardTitle className="text-xl font-semibold">Submit Feedback</CardTitle>
              <CardDescription className="mt-1 text-sm">
                We'd love to hear your thoughts on NexaAI.
              </CardDescription>
            </div>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="p-6 space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} className="text-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Feedback</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us what you think..."
                          className="resize-none text-sm"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="suggestedFeatures"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Suggest Features (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What new features would you like to see in NexaAI?"
                          className="resize-none text-sm"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />
                
                <div className="flex items-center justify-center gap-2">
                  <p className="text-sm text-muted-foreground">Have more time?</p>
                   <Link href="/feedback/survey" className="text-sm text-primary underline-offset-4 hover:underline">
                      Quick Survey
                    </Link>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 p-4 flex justify-center">
                <Button type="submit" className="w-full max-w-xs">Submit Feedback</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
