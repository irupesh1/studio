"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const aboutPageSchema = z.object({
  title: z.string(),
  description: z.string(),
  uniqueSectionTitle: z.string(),
  uniqueSectionText: z.string(),
  highlight1Title: z.string(),
  highlight1Text: z.string(),
  highlight2Title: z.string(),
  highlight2Text: z.string(),
  highlight3Title: z.string(),
  highlight3Text: z.string(),
  highlight4Title: z.string(),
  highlight4Text: z.string(),
  quote: z.string(),
});
type AboutPageValues = z.infer<typeof aboutPageSchema>;

const versionPageSchema = z.object({
    title: z.string(),
    description: z.string(),
    version: z.string(),
    status: z.string(),
    quote: z.string(),
    philosophyText: z.string(),
    coreFeatures: z.string(),
    upcomingFeatures: z.string(),
});
type VersionPageValues = z.infer<typeof versionPageSchema>;

const privacyPageSchema = z.object({
    title: z.string(),
    effectiveDate: z.string(),
    intro: z.string(),
    infoCollection: z.string(),
    dataUsage: z.string(),
    localStorage: z.string(),
    contactEmail: z.string(),
});
type PrivacyPageValues = z.infer<typeof privacyPageSchema>;

const feedbackPageSchema = z.object({
  title: z.string(),
  description: z.string(),
  nameLabel: z.string(),
  feedbackLabel: z.string(),
  featuresLabel: z.string(),
  surveyLinkText: z.string(),
});
type FeedbackPageValues = z.infer<typeof feedbackPageSchema>;

const surveyPageSchema = z.object({
    title: z.string(),
    description: z.string(),
});
type SurveyPageValues = z.infer<typeof surveyPageSchema>;


export default function ContentPage() {
  const { toast } = useToast();

  const aboutPageForm = useForm<AboutPageValues>({
    resolver: zodResolver(aboutPageSchema),
    effects: (form) => {
      const storedContent = localStorage.getItem("aboutPageContent");
      if(storedContent) {
        form.reset(JSON.parse(storedContent));
      } else {
        form.reset({
            title: "About NexaAI",
            description: "Your smart, intuitive, and evolving AI companion.",
            uniqueSectionTitle: "What Makes Nexa AI Unique?",
            uniqueSectionText: "Nexa AI is not just another chatbot—it’s a smart, intuitive, and evolving AI companion designed to understand, learn, and grow with each interaction. What sets Nexa AI apart is its user-centric intelligence, deeply rooted in real-time responsiveness, privacy-first architecture, and adaptive learning.",
            highlight1Title: "Locally Trained for Privacy",
            highlight1Text: "Nexa AI respects user privacy by storing past interactions only on your local device. No data is sent to servers—your information vanishes as soon as you refresh the page.",
            highlight2Title: "Designed by a Developer, Not a Corporation",
            highlight2Text: "Unlike mass-produced AI platforms, Nexa AI is thoughtfully crafted by a 3rd-year B.Tech student, Rupesh, with a deep focus on usability, innovation, and ethical AI design.",
            highlight3Title: "Minimalist and Modern Interface",
            highlight3Text: "The UI is fast, responsive, and visually elegant—built to simplify conversations while delivering powerful AI performance behind the scenes.",
            highlight4Title: "Evolving with Every Interaction",
            highlight4Text: "Nexa AI observes and adapts within sessions, offering smarter replies and better context without requiring complex setup or user data collection.",
            quote: "“NexaAI was built to prove that one passionate developer can create something powerful, ethical, and user-friendly without a billion-dollar company behind them.”",
        });
      }
    }
  });

    const versionPageForm = useForm<VersionPageValues>({
        resolver: zodResolver(versionPageSchema),
        effects: (form) => {
            const stored = localStorage.getItem("versionPageContent");
            if(stored) form.reset(JSON.parse(stored));
            else form.reset({
                title: "Version Details",
                description: "Information about NexaAI Learner v1.0",
                version: "NexaAI Learner v1.0",
                status: "Active | Learning Mode Enabled",
                quote: "“This is the foundation version of NexaAI — built to learn, improve, and evolve through every user interaction. Fast, lightweight, and focused on understanding you better with each session.”",
                philosophyText: "The beginning of NexaAI’s intelligence journey\nFocus on local session learning and privacy\nA foundation for future updates like memory, voice input, and intent detection\nA commitment to growing through user feedback and real-world use",
                coreFeatures: "Clean, responsive chat interface\nLocal storage for private chat history\nFast and real-time user interaction\nMultilingual support (EN, HI, UR)\nBasic adaptive learning in session",
                upcomingFeatures: "Session memory\nVoice input\nEmotional tone detection"
            })
        }
    });

    const privacyPageForm = useForm<PrivacyPageValues>({
        resolver: zodResolver(privacyPageSchema),
        effects: (form) => {
            const stored = localStorage.getItem("privacyPageContent");
            if(stored) form.reset(JSON.parse(stored));
            else form.reset({
                title: "Privacy Policy",
                effectiveDate: "October 17, 2023",
                intro: "Welcome to NexaAI. Your privacy is important to us. This Privacy Policy outlines how we collect, use, store, and protect your data when you interact with our services through the website.",
                infoCollection: "We are committed to minimal data collection to protect your privacy. Here's what we collect:\n- **User Conversations:** We temporarily store your past chat interactions only on your local device storage (localStorage).\n- **Technical Information:** To enhance your experience, we may collect non-personal data such as browser type, device type, operating system, and usage analytics through anonymized tools.",
                dataUsage: "Your data is used for the following purposes:\n- **Training NexaAI Locally:** Your previous messages are stored temporarily to enhance conversation continuity and context understanding. This helps NexaAI perform better during your current session.\n- **Improved User Experience:** We use temporary local data to personalize responses and remember preferences during the same session.",
                localStorage: "Your data is not sent to any server or shared with third parties. Data is stored only in your browser’s local storage and is used exclusively by NexaAI on your device. Once you refresh, close, or leave the page, all stored conversations are automatically deleted.",
                contactEmail: "ibefikra1@gmail.com"
            })
        }
    });

  const feedbackPageForm = useForm<FeedbackPageValues>({
    resolver: zodResolver(feedbackPageSchema),
    effects: (form) => {
      const stored = localStorage.getItem("feedbackPageContent");
      if (stored) form.reset(JSON.parse(stored));
      else form.reset({
        title: "Submit Feedback",
        description: "We'd love to hear your thoughts on NexaAI.",
        nameLabel: "Name",
        feedbackLabel: "Feedback",
        featuresLabel: "Suggest Features (Optional)",
        surveyLinkText: "Quick Survey",
      });
    }
  });

  const surveyPageForm = useForm<SurveyPageValues>({
      resolver: zodResolver(surveyPageSchema),
      effects: (form) => {
          const stored = localStorage.getItem("surveyPageContent");
          if(stored) form.reset(JSON.parse(stored));
          else form.reset({
              title: "Quick Survey",
              description: "Your feedback helps us improve NexaAI for everyone.",
          })
      }
  });

    const handleAboutPageSubmit = (data: AboutPageValues) => {
        localStorage.setItem("aboutPageContent", JSON.stringify(data));
        toast({ title: "Success", description: "About Page content updated." });
    };

    const handleVersionPageSubmit = (data: VersionPageValues) => {
        localStorage.setItem("versionPageContent", JSON.stringify(data));
        toast({ title: "Success", description: "Version Page content updated." });
    };

    const handlePrivacyPageSubmit = (data: PrivacyPageValues) => {
        localStorage.setItem("privacyPageContent", JSON.stringify(data));
        toast({ title: "Success", description: "Privacy Policy content updated." });
    };

    const handleFeedbackPageSubmit = (data: FeedbackPageValues) => {
        localStorage.setItem("feedbackPageContent", JSON.stringify(data));
        toast({ title: "Success", description: "Feedback Page content updated." });
    };

    const handleSurveyPageSubmit = (data: SurveyPageValues) => {
        localStorage.setItem("surveyPageContent", JSON.stringify(data));
        toast({ title: "Success", description: "Survey Page content updated." });
    };


  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText/> Page Content Editor</CardTitle>
            <CardDescription>Edit the content of your informational pages.</CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="multiple" className="w-full">
                <AccordionItem value="about-page">
                    <AccordionTrigger><h4 className="font-semibold">About Page</h4></AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                        <Form {...aboutPageForm}>
                            <form onSubmit={aboutPageForm.handleSubmit(handleAboutPageSubmit)} className="space-y-4">
                                <FormField control={aboutPageForm.control} name="title" render={({ field }) => (<FormItem><FormLabel>Page Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={aboutPageForm.control} name="description" render={({ field }) => (<FormItem><FormLabel>Page Description</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={aboutPageForm.control} name="uniqueSectionTitle" render={({ field }) => (<FormItem><FormLabel>Unique Section Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={aboutPageForm.control} name="uniqueSectionText" render={({ field }) => (<FormItem><FormLabel>Unique Section Text</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl></FormItem>)} />
                                <FormField control={aboutPageForm.control} name="highlight1Title" render={({ field }) => (<FormItem><FormLabel>Highlight 1 Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={aboutPageForm.control} name="highlight1Text" render={({ field }) => (<FormItem><FormLabel>Highlight 1 Text</FormLabel><FormControl><Textarea rows={2} {...field} /></FormControl></FormItem>)} />
                                <FormField control={aboutPageForm.control} name="highlight2Title" render={({ field }) => (<FormItem><FormLabel>Highlight 2 Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={aboutPageForm.control} name="highlight2Text" render={({ field }) => (<FormItem><FormLabel>Highlight 2 Text</FormLabel><FormControl><Textarea rows={2} {...field} /></FormControl></FormItem>)} />
                                <FormField control={aboutPageForm.control} name="highlight3Title" render={({ field }) => (<FormItem><FormLabel>Highlight 3 Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={aboutPageForm.control} name="highlight3Text" render={({ field }) => (<FormItem><FormLabel>Highlight 3 Text</FormLabel><FormControl><Textarea rows={2} {...field} /></FormControl></FormItem>)} />
                                <FormField control={aboutPageForm.control} name="highlight4Title" render={({ field }) => (<FormItem><FormLabel>Highlight 4 Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={aboutPageForm.control} name="highlight4Text" render={({ field }) => (<FormItem><FormLabel>Highlight 4 Text</FormLabel><FormControl><Textarea rows={2} {...field} /></FormControl></FormItem>)} />
                                <FormField control={aboutPageForm.control} name="quote" render={({ field }) => (<FormItem><FormLabel>Quote</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl></FormItem>)} />
                                <Button type="submit">Update About Page</Button>
                            </form>
                        </Form>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="version-page">
                    <AccordionTrigger><h4 className="font-semibold">Version Details Page</h4></AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                        <Form {...versionPageForm}>
                            <form onSubmit={versionPageForm.handleSubmit(handleVersionPageSubmit)} className="space-y-4">
                                <FormField control={versionPageForm.control} name="title" render={({ field }) => (<FormItem><FormLabel>Page Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={versionPageForm.control} name="description" render={({ field }) => (<FormItem><FormLabel>Page Description</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={versionPageForm.control} name="version" render={({ field }) => (<FormItem><FormLabel>Version Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={versionPageForm.control} name="status" render={({ field }) => (<FormItem><FormLabel>Version Status</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={versionPageForm.control} name="quote" render={({ field }) => (<FormItem><FormLabel>Quote</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl></FormItem>)} />
                                <FormField control={versionPageForm.control} name="philosophyText" render={({ field }) => (<FormItem><FormLabel>Philosophy Points (one per line)</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl></FormItem>)} />
                                <FormField control={versionPageForm.control} name="coreFeatures" render={({ field }) => (<FormItem><FormLabel>Core Features (one per line)</FormLabel><FormControl><Textarea rows={5} {...field} /></FormControl></FormItem>)} />
                                <FormField control={versionPageForm.control} name="upcomingFeatures" render={({ field }) => (<FormItem><FormLabel>Upcoming Features (one per line)</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl></FormItem>)} />
                                <Button type="submit">Update Version Page</Button>
                            </form>
                        </Form>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="privacy-page">
                    <AccordionTrigger><h4 className="font-semibold">Privacy Policy Page</h4></AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                        <Form {...privacyPageForm}>
                            <form onSubmit={privacyPageForm.handleSubmit(handlePrivacyPageSubmit)} className="space-y-4">
                                <FormField control={privacyPageForm.control} name="title" render={({ field }) => (<FormItem><FormLabel>Page Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={privacyPageForm.control} name="effectiveDate" render={({ field }) => (<FormItem><FormLabel>Effective Date</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={privacyPageForm.control} name="intro" render={({ field }) => (<FormItem><FormLabel>Introduction</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl></FormItem>)} />
                                <FormField control={privacyPageForm.control} name="infoCollection" render={({ field }) => (<FormItem><FormLabel>Information Collection</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl></FormItem>)} />
                                <FormField control={privacyPageForm.control} name="dataUsage" render={({ field }) => (<FormItem><FormLabel>Data Usage</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl></FormItem>)} />
                                <FormField control={privacyPageForm.control} name="localStorage" render={({ field }) => (<FormItem><FormLabel>Local Storage Policy</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl></FormItem>)} />
                                <FormField control={privacyPageForm.control} name="contactEmail" render={({ field }) => (<FormItem><FormLabel>Contact Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl></FormItem>)} />
                                <Button type="submit">Update Privacy Policy</Button>
                            </form>
                        </Form>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="feedback-page">
                    <AccordionTrigger><h4 className="font-semibold">Feedback Page</h4></AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                        <Form {...feedbackPageForm}>
                            <form onSubmit={feedbackPageForm.handleSubmit(handleFeedbackPageSubmit)} className="space-y-4">
                                <FormField control={feedbackPageForm.control} name="title" render={({ field }) => (<FormItem><FormLabel>Page Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={feedbackPageForm.control} name="description" render={({ field }) => (<FormItem><FormLabel>Page Description</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={feedbackPageForm.control} name="nameLabel" render={({ field }) => (<FormItem><FormLabel>Name Input Label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={feedbackPageForm.control} name="feedbackLabel" render={({ field }) => (<FormItem><FormLabel>Feedback Input Label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={feedbackPageForm.control} name="featuresLabel" render={({ field }) => (<FormItem><FormLabel>Suggested Features Label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={feedbackPageForm.control} name="surveyLinkText" render={({ field }) => (<FormItem><FormLabel>Survey Link Text</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <Button type="submit">Update Feedback Page</Button>
                            </form>
                        </Form>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="survey-page">
                    <AccordionTrigger><h4 className="font-semibold">Quick Survey Page</h4></AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                        <Form {...surveyPageForm}>
                            <form onSubmit={surveyPageForm.handleSubmit(handleSurveyPageSubmit)} className="space-y-4">
                                <FormField control={surveyPageForm.control} name="title" render={({ field }) => (<FormItem><FormLabel>Page Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={surveyPageForm.control} name="description" render={({ field }) => (<FormItem><FormLabel>Page Description</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <Button type="submit">Update Survey Page</Button>
                            </form>
                        </Form>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
  );
}
