"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Palette } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const personalizationFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Description is required." }),
});
type PersonalizationFormValues = z.infer<typeof personalizationFormSchema>;

const appearanceFormSchema = z.object({
    fontFamily: z.string(),
    titleColor: z.string(),
    descriptionColor: z.string(),
});
type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;


export default function CustomizationPage() {
  const { toast } = useToast();

  const personalizationForm = useForm<PersonalizationFormValues>({
    resolver: zodResolver(personalizationFormSchema),
    defaultValues: {
      title: "Nexa AI",
      description: "Your intelligent assistant for everything.",
    },
     effects: (form) => {
        const storedTitle = localStorage.getItem("welcomeTitle");
        const storedDescription = localStorage.getItem("welcomeDescription");
        if(storedTitle) form.setValue("title", storedTitle);
        if(storedDescription) form.setValue("description", storedDescription);
    }
  });

  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      fontFamily: "Inter",
      titleColor: "#000000",
      descriptionColor: "#6B7280",
    },
    effects: (form) => {
        const storedFont = localStorage.getItem("welcomeFontFamily");
        const storedTitleColor = localStorage.getItem("welcomeTitleColor");
        const storedDescriptionColor = localStorage.getItem("welcomeDescriptionColor");
        if(storedFont) form.setValue("fontFamily", storedFont);
        if(storedTitleColor) form.setValue("titleColor", storedTitleColor);
        if(storedDescriptionColor) form.setValue("descriptionColor", storedDescriptionColor);
    }
  });


  const handlePersonalizationSubmit = (data: PersonalizationFormValues) => {
    localStorage.setItem("welcomeTitle", data.title);
    localStorage.setItem("welcomeDescription", data.description);
    toast({ title: "Success", description: "Welcome screen updated." });
  };

  const handleAppearanceSubmit = (data: AppearanceFormValues) => {
    localStorage.setItem("welcomeFontFamily", data.fontFamily);
    localStorage.setItem("welcomeTitleColor", data.titleColor);
    localStorage.setItem("welcomeDescriptionColor", data.descriptionColor);
    toast({ title: "Success", description: "Appearance settings updated." });
  };
  
  return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">App Customization</CardTitle>
                <CardDescription>Customize the look and feel of the welcome screen.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div>
                    <Form {...personalizationForm}>
                        <form onSubmit={personalizationForm.handleSubmit(handlePersonalizationSubmit)} className="space-y-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2"><MessageSquare/> Welcome Content</h3>
                            <FormField control={personalizationForm.control} name="title" render={({ field }) => (<FormItem><FormLabel>Welcome Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={personalizationForm.control} name="description" render={({ field }) => (<FormItem><FormLabel>Welcome Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <Button type="submit">Update Content</Button>
                        </form>
                    </Form>
                </div>
                <Separator/>
                <div>
                    <Form {...appearanceForm}>
                        <form onSubmit={appearanceForm.handleSubmit(handleAppearanceSubmit)} className="space-y-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2"><Palette/> Appearance</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <FormField control={appearanceForm.control} name="fontFamily" render={({ field }) => (<FormItem><FormLabel>Font Family</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a font" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Inter">Inter</SelectItem><SelectItem value="Roboto">Roboto</SelectItem><SelectItem value="Lato">Lato</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                                <FormField control={appearanceForm.control} name="titleColor" render={({ field }) => (<FormItem><FormLabel>Welcome Title Color</FormLabel><FormControl><Input type="color" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={appearanceForm.control} name="descriptionColor" render={({ field }) => (<FormItem><FormLabel>Welcome Description Color</FormLabel><FormControl><Input type="color" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </div>
                            <Button type="submit">Update Appearance</Button>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card>
  );
}
