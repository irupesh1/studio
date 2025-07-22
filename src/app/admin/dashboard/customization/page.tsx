
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
import { MessageSquare, Palette, Image as ImageIcon, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

const personalizationFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Description is required." }),
});
type PersonalizationFormValues = z.infer<typeof personalizationFormSchema>;

const appearanceFormSchema = z.object({
    fontFamily: z.string(),
});
type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

const imageFormSchema = z.object({
    mainLogo: z.string().optional(),
    chatAvatar: z.string().optional(),
    aboutPageAvatar: z.string().optional(),
    chatBgImage: z.string().optional(),
});
type ImageFormValues = z.infer<typeof imageFormSchema>;


export default function CustomizationPage() {
  const { toast } = useToast();
  const [imagePreviews, setImagePreviews] = useState({
    mainLogo: "",
    chatAvatar: "",
    aboutPageAvatar: "",
    chatBgImage: "",
  });

  const personalizationForm = useForm<PersonalizationFormValues>({
    resolver: zodResolver(personalizationFormSchema),
    defaultValues: {
      title: "Nexa AI",
      description: "Your intelligent assistant for everything.",
    },
  });

  useEffect(() => {
    const storedTitle = localStorage.getItem("welcomeTitle");
    const storedDescription = localStorage.getItem("welcomeDescription");
    if(storedTitle) personalizationForm.setValue("title", storedTitle);
    if(storedDescription) personalizationForm.setValue("description", storedDescription);
  }, [personalizationForm]);

  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      fontFamily: "Inter",
    },
  });

  useEffect(() => {
    const storedFont = localStorage.getItem("welcomeFontFamily");
    if(storedFont) appearanceForm.setValue("fontFamily", storedFont);
  }, [appearanceForm]);
  
  const imageForm = useForm<ImageFormValues>({
    resolver: zodResolver(imageFormSchema),
  });
  
  useEffect(() => {
    const mainLogo = localStorage.getItem("mainLogo");
    const chatAvatar = localStorage.getItem("chatAvatar");
    const aboutPageAvatar = localStorage.getItem("aboutPageAvatar");
    const chatBgImage = localStorage.getItem("chatBgImage");
    
    if (mainLogo) { imageForm.setValue("mainLogo", mainLogo); setImagePreviews(p => ({...p, mainLogo})); }
    if (chatAvatar) { imageForm.setValue("chatAvatar", chatAvatar); setImagePreviews(p => ({...p, chatAvatar})); }
    if (aboutPageAvatar) { imageForm.setValue("aboutPageAvatar", aboutPageAvatar); setImagePreviews(p => ({...p, aboutPageAvatar})); }
    if (chatBgImage) { imageForm.setValue("chatBgImage", chatBgImage); setImagePreviews(p => ({...p, chatBgImage})); }
  }, [imageForm]);


  const handlePersonalizationSubmit = (data: PersonalizationFormValues) => {
    localStorage.setItem("welcomeTitle", data.title);
    localStorage.setItem("welcomeDescription", data.description);
    toast({ title: "Success", description: "Welcome screen updated." });
  };

  const handleAppearanceSubmit = (data: AppearanceFormValues) => {
    localStorage.setItem("welcomeFontFamily", data.fontFamily);
    toast({ title: "Success", description: "Appearance settings updated." });
  };
  
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, fieldName: keyof ImageFormValues) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              const base64String = reader.result as string;
              imageForm.setValue(fieldName, base64String);
              setImagePreviews(prev => ({...prev, [fieldName]: base64String}));
          };
          reader.readAsDataURL(file);
      }
  };

  const handleImageSubmit = (data: ImageFormValues) => {
    Object.entries(data).forEach(([key, value]) => {
        if(value) {
            localStorage.setItem(key, value);
        } else {
            localStorage.removeItem(key);
        }
    });
    toast({ title: "Success", description: "Images have been updated." });
    window.dispatchEvent(new Event('theme-updated'));
  };

  const resetImage = (fieldName: keyof ImageFormValues) => {
      imageForm.setValue(fieldName, "");
      setImagePreviews(prev => ({...prev, [fieldName]: ""}));
      localStorage.removeItem(fieldName);
      toast({ title: "Image Reset", description: `The ${fieldName} has been reset.` });
      window.dispatchEvent(new Event('theme-updated'));
  };

  return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">App Customization</CardTitle>
                <CardDescription>Customize the look, feel, and branding of your application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
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
                            </div>
                            <Button type="submit">Update Appearance</Button>
                        </form>
                    </Form>
                </div>
                 <Separator/>
                 <div>
                    <Form {...imageForm}>
                        <form onSubmit={imageForm.handleSubmit(handleImageSubmit)} className="space-y-6">
                            <h3 className="font-semibold text-lg flex items-center gap-2"><ImageIcon/> Logo & Image Customization</h3>
                            <div className="space-y-4">
                                {Object.keys(imagePreviews).map((key) => (
                                    <FormField
                                        key={key}
                                        control={imageForm.control}
                                        name={key as keyof ImageFormValues}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</FormLabel>
                                                <div className="flex items-center gap-4">
                                                    <FormControl>
                                                        <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e, key as keyof ImageFormValues)} className="max-w-xs"/>
                                                    </FormControl>
                                                    {imagePreviews[key as keyof typeof imagePreviews] && (
                                                        <>
                                                            <Image src={imagePreviews[key as keyof typeof imagePreviews]} alt={`${key} preview`} width={40} height={40} className="rounded-md border object-contain"/>
                                                            <Button type="button" variant="ghost" size="icon" onClick={() => resetImage(key as keyof ImageFormValues)}>
                                                                <Trash2 className="h-4 w-4 text-destructive"/>
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                            <Button type="submit">Update Images</Button>
                        </form>
                    </Form>
                 </div>
            </CardContent>
        </Card>
  );
}
