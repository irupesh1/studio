
"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Megaphone, CalendarIcon, Trash2, Eye, X, Pencil } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import Image from "next/image";

const promoFormSchema = z.object({
  enabled: z.boolean().default(false),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  text: z.string().optional(),
  media: z.string().optional(),
  closeButtonDelay: z.coerce.number().min(0).default(15),
  allowOutsideClick: z.boolean().default(false),
  imageWidth: z.coerce.number().min(10).max(100).default(100),
  fontSize: z.coerce.number().min(8).max(48).default(16),
});
type PromoFormValues = z.infer<typeof promoFormSchema>;


export default function PromoPage() {
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  
  const getInitialPromoData = (): PromoFormValues => {
    try {
      const stored = localStorage.getItem("promoData");
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
            ...parsed,
            startDate: parsed.startDate ? new Date(parsed.startDate) : undefined,
            endDate: parsed.endDate ? new Date(parsed.endDate) : undefined,
            closeButtonDelay: parsed.closeButtonDelay ?? 15,
            allowOutsideClick: parsed.allowOutsideClick ?? false,
            imageWidth: parsed.imageWidth ?? 100,
            fontSize: parsed.fontSize ?? 16,
        };
      }
    } catch (e) {
      console.error("Failed to parse promo data from localStorage", e);
    }
    return { enabled: false, closeButtonDelay: 15, allowOutsideClick: false, imageWidth: 100, fontSize: 16 };
  };

  const form = useForm<PromoFormValues>({
    resolver: zodResolver(promoFormSchema),
    defaultValues: getInitialPromoData(),
  });
  
  const watchedValues = form.watch();

  const handleMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              const base64String = reader.result as string;
              form.setValue("media", base64String);
          };
          reader.readAsDataURL(file);
      }
  };

  const resetMedia = () => {
      form.setValue("media", "");
  };

  const handleFormSubmit = (data: PromoFormValues) => {
      localStorage.setItem("promoData", JSON.stringify(data));
      toast({ title: "Success", description: "Promotional message settings have been updated." });
  };
  
  const handleEditClick = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
        <Card className="lg:col-span-1" ref={formRef}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Megaphone/> Promotional Message</CardTitle>
            <CardDescription>Configure a timed, custom message to display on the landing page.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                <CardContent className="space-y-6">
                    <FormField control={form.control} name="enabled" render={({ field }) => ( <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"><div className="space-y-0.5"><FormLabel>Enable Promotion</FormLabel><FormDescription>Show the promotional message to users.</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange}/></FormControl></FormItem>)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="startDate" render={({ field }) => ( <FormItem className="flex flex-col"><FormLabel>Start Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormDescription>When the promotion becomes visible.</FormDescription></FormItem>)} />
                        <FormField control={form.control} name="endDate" render={({ field }) => ( <FormItem className="flex flex-col"><FormLabel>End Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormDescription>When the promotion is no longer visible.</FormDescription></FormItem>)} />
                    </div>
                    <FormField control={form.control} name="text" render={({ field }) => ( <FormItem><FormLabel>Promotional Text</FormLabel><FormControl><Textarea placeholder="Enter your message here..." {...field} value={field.value || ''} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="media" render={({ field }) => ( <FormItem><FormLabel>Image / GIF</FormLabel><div className="flex items-center gap-4">{<FormControl><Input type="file" accept="image/*,.gif" onChange={(e) => handleMediaChange(e)} className="max-w-xs"/></FormControl>}{watchedValues.media && (<><Image src={watchedValues.media} alt="Media preview" width={60} height={60} className="rounded-md border object-contain"/><Button type="button" variant="ghost" size="icon" onClick={resetMedia}><Trash2 className="h-4 w-4 text-destructive"/></Button></>)}</div><FormDescription>Upload an image or GIF for the promotion.</FormDescription></FormItem>)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="imageWidth" render={({ field }) => (<FormItem><FormLabel>Image Width (%)</FormLabel><FormControl><Input type="number" min="10" max="100" {...field} /></FormControl></FormItem>)} />
                        <FormField control={form.control} name="fontSize" render={({ field }) => (<FormItem><FormLabel>Font Size (px)</FormLabel><FormControl><Input type="number" min="8" max="48" {...field} /></FormControl></FormItem>)} />
                    </div>
                    <FormField control={form.control} name="closeButtonDelay" render={({ field }) => ( <FormItem><FormLabel>Close Button Delay (seconds)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormDescription>How long to wait before the close button appears.</FormDescription></FormItem>)} />
                    <FormField control={form.control} name="allowOutsideClick" render={({ field }) => ( <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"><div className="space-y-0.5"><FormLabel>Allow Outside Click to Close</FormLabel><FormDescription>Let users close by clicking the background.</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange}/></FormControl></FormItem>)} />
                </CardContent>
                <CardFooter>
                    <Button type="submit">Save Promotion</Button>
                </CardFooter>
            </form>
          </Form>
        </Card>
        
        <Card className="lg:col-span-1">
            <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2"><Eye/> Live Preview</CardTitle>
                <CardDescription>This is how the modal will appear to users.</CardDescription>
                 <Button variant="outline" size="icon" className="absolute top-4 right-4" onClick={handleEditClick}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit Settings</span>
                 </Button>
            </CardHeader>
            <CardContent>
                <div className="bg-muted/30 p-4 rounded-lg flex items-center justify-center min-h-[400px]">
                     <div className="relative bg-card rounded-lg shadow-xl w-full max-w-sm p-6 text-center">
                        <div className="absolute top-2 right-2 rounded-full h-8 w-8 bg-black/10 flex items-center justify-center">
                            <X className="h-5 w-5 text-white/50" />
                            <span className="sr-only">Close button placeholder</span>
                        </div>
                        <div className="space-y-4">
                            {watchedValues.media && (
                                <div className="mx-auto" style={{ width: `${watchedValues.imageWidth}%` }}>
                                    <div className="relative w-full aspect-video rounded-md overflow-hidden">
                                        <Image
                                            src={watchedValues.media}
                                            alt="Promotional media preview"
                                            layout="fill"
                                            objectFit="contain"
                                        />
                                    </div>
                                </div>
                            )}
                            {watchedValues.text && (
                                <p 
                                    className="text-card-foreground leading-relaxed whitespace-pre-wrap"
                                    style={{ fontSize: `${watchedValues.fontSize}px` }}
                                >
                                    {watchedValues.text}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
