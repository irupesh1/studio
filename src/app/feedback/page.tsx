
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  survey: z.enum(["excellent", "good", "neutral", "bad"], {
    required_error: "You need to select a survey option.",
  }),
});

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

const defaultValues: Partial<FeedbackFormValues> = {
  name: "",
  feedback: "",
};

export default function FeedbackPage() {
  const { toast } = useToast();
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: FeedbackFormValues) {
    toast({
      title: "Feedback Submitted!",
      description: "Thank you for your valuable feedback.",
    });
    console.log(data);
    form.reset();
  }

  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-4 p-6">
            <Link href="/" passHref>
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <div>
              <CardTitle className="text-2xl">Submit Feedback</CardTitle>
              <CardDescription className="mt-1">
                We'd love to hear your thoughts on NexaAI.
              </CardDescription>
            </div>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="p-6 pt-0 space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
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
                      <FormLabel>Feedback</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us what you think..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />
                
                <FormField
                  control={form.control}
                  name="survey"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Quick Survey</FormLabel>
                       <FormDescription>
                        How would you rate your experience?
                      </FormDescription>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="excellent" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Excellent
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="good" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Good
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="neutral" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Neutral
                            </FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="bad" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Bad
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button type="submit">Submit Feedback</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}

    