
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, Brain, MessageCircle, Palette, Star, Zap, Check, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/use-local-storage";

const surveyFormSchema = z.object({
    easeOfUse: z.string().optional(),
    intuitiveDesign: z.string().optional(),
    overallExperience: z.number().min(1).max(5).optional(),
    responseAccuracy: z.string().optional(),
    responseRelevance: z.string().optional(),
    questionUnderstanding: z.string().optional(),
    visualAppeal: z.string().optional(),
    isClean: z.string().optional(),
    responseSpeed: z.string().optional(),
    hasBugs: z.string().optional(),
    wouldRecommend: z.string().optional(),
    mostUsefulFeatures: z.string().optional(),
    featuresToImprove: z.string().optional(),
    futureUseFrequency: z.string().optional(),
    usageReason: z.string().optional(),
    otherReason: z.string().optional(),
});

type SurveyFormValues = z.infer<typeof surveyFormSchema>;

const defaultContent = {
  title: "Quick Survey",
  description: "Your feedback helps us improve NexaAI for everyone.",
};

export default function SurveyPage() {
  const { toast } = useToast();
  const [content] = useLocalStorage("surveyPageContent", defaultContent);
  const form = useForm<SurveyFormValues>({
    resolver: zodResolver(surveyFormSchema),
  });

  const [rating, setRating] = useState(0);

  function onSubmit(data: SurveyFormValues) {
    const surveyData = { ...data, overallExperience: rating || 'Not Rated' };
    
    let body = 'Hello,\n\nHere is a survey submission from a NexaAI user:\n\n';

    Object.entries(surveyData).forEach(([key, value]) => {
        if(value){
            const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            body += `${formattedKey}: ${value}\n`;
        }
    });

    body += '\nRegards,\nNexaAI Survey System';

    const subject = "Feedback";
    const mailtoLink = `mailto:ibefikra1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    try {
      window.location.href = mailtoLink;
      toast({
        title: "Redirecting to Email Client",
        description: "Please send the pre-filled email to submit your survey.",
      });
      form.reset();
      setRating(0);
    } catch(error) {
       toast({
        variant: "destructive",
        title: "Oops! Something went wrong.",
        description: "Could not open email client. Please copy the details manually.",
      });
    }
  }

  const sections = [
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "User Experience & Usability",
      fields: [
        { name: "easeOfUse", label: "1. How easy is it to use Nexa AI?", options: ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"] },
        { name: "intuitiveDesign", label: "2. How intuitive is the design and layout of Nexa AI?", options: ["Very intuitive", "Somewhat intuitive", "Neutral", "Confusing", "Very confusing"] },
        { name: "overallExperience", label: "3. How satisfied are you with the overall user experience?", type: "rating" },
      ],
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-primary" />,
      title: "Answer Generation Quality",
      fields: [
        { name: "responseAccuracy", label: "4. How accurate or helpful are the responses generated by Nexa AI?", options: ["Very helpful", "Mostly helpful", "Sometimes helpful", "Rarely helpful", "Not helpful at all"] },
        { name: "responseRelevance", label: "5. Do the answers feel human-like and relevant to your questions?", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
        { name: "questionUnderstanding", label: "6. Did Nexa AI understand your questions clearly?", options: ["Always", "Most of the time", "Sometimes", "Rarely", "Never"] },
      ],
    },
    {
      icon: <Palette className="h-6 w-6 text-primary" />,
      title: "User Interface & Design",
      fields: [
        { name: "visualAppeal", label: "7. How visually appealing is the design of Nexa AI?", options: ["Very attractive", "Moderately attractive", "Neutral", "Slightly unattractive", "Very unattractive"] },
        { name: "isClean", label: "8. Was the chatbot interface clean and distraction-free?", options: ["Yes, it was clean", "Somewhat clean", "Too cluttered or distracting"] },
      ],
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Performance & Speed",
      fields: [
        { name: "responseSpeed", label: "9. How fast did Nexa AI respond to your messages?", options: ["Instantly", "A few seconds", "A bit slow", "Very slow"] },
        { name: "hasBugs", label: "10. Did you face any lag, errors, or bugs while using Nexa AI?", options: ["No issues", "Minor bugs", "Major issues", "Crashed or didn’t work"] },
      ],
    },
    {
        icon: <ThumbsUp className="h-6 w-6 text-primary" />,
        title: "Satisfaction & Value",
        fields: [
            { name: "wouldRecommend", label: "11. Would you recommend Nexa AI to others?", options: ["Definitely", "Maybe", "Not sure", "Probably not", "Definitely not"] },
            { name: "mostUsefulFeatures", label: "12. What features do you find most useful in Nexa AI?", type: "textarea", placeholder: "e.g., fast responses, clean design..." },
            { name: "featuresToImprove", label: "13. What features would you like to see improved or added in the future?", type: "textarea", placeholder: "e.g., session memory, voice input..." },
        ],
    },
    {
        icon: <Check className="h-6 w-6 text-primary" />,
        title: "Retention & Return",
        fields: [
            { name: "futureUseFrequency", label: "14. How often do you see yourself using Nexa AI in the future?", options: ["Daily", "Weekly", "Occasionally", "Rarely", "Never"] },
            { name: "usageReason", label: "15. What was the main reason you used Nexa AI today?", options: ["To get information", "For fun or chatting", "To complete a task", "Testing the AI"], hasOther: true },
        ],
    },
  ];

  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <Card className="overflow-hidden shadow-lg rounded-2xl mb-8">
          <CardHeader className="flex flex-row items-center gap-4 p-6 bg-card border-b">
            <Link href="/feedback" passHref>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
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
          <CardContent className="p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                {sections.map((section, sectionIndex) => (
                  <Card key={sectionIndex} className="bg-card/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        {section.icon}
                        <span>{section.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {section.fields.map((field, fieldIndex) => (
                        <FormField
                          key={fieldIndex}
                          control={form.control}
                          name={field.name as any}
                          render={({ field: formField }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-base">{field.label}</FormLabel>
                              <FormControl>
                                {field.type === 'rating' ? (
                                  <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={cn("h-7 w-7 cursor-pointer", rating >= star ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground")}
                                        onClick={() => setRating(star)}
                                      />
                                    ))}
                                  </div>
                                ) : field.type === 'textarea' ? (
                                  <Textarea placeholder={field.placeholder} {...formField as any} />
                                ) : (
                                  <RadioGroup
                                    onValueChange={formField.onChange}
                                    defaultValue={formField.value}
                                    className="flex flex-col space-y-2"
                                  >
                                    {field.options?.map((option, optionIndex) => (
                                      <FormItem key={optionIndex} className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value={option} />
                                        </FormControl>
                                        <FormLabel className="font-normal">{option}</FormLabel>
                                      </FormItem>
                                    ))}
                                    {field.hasOther && (
                                        <div className="flex items-center gap-2 pt-2">
                                            <FormLabel className="font-normal">Other:</FormLabel>
                                            <FormField
                                                control={form.control}
                                                name="otherReason"
                                                render={({ field: otherField }) => (
                                                    <Input {...otherField} className="flex-1 h-10" placeholder="Please specify..."/>
                                                )}
                                            />
                                        </div>
                                    )}
                                  </RadioGroup>
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </CardContent>
                  </Card>
                ))}
                
                <Separator />

                <div className="flex justify-center">
                  <Button type="submit" size="lg" className="w-full max-w-md">Submit Survey</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    