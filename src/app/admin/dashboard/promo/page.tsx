
"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Megaphone, CalendarIcon, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

const promoFormSchema = z.object({
  enabled: z.boolean().default(false),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  text: z.string().optional(),
  media: z.string().optional(),
});
type PromoFormValues = z.infer<typeof promoFormSchema>;


export default function PromoPage() {
  const { toast } = useToast();
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  const getInitialPromoData = (): PromoFormValues => {
    try {
      const stored = localStorage.getItem("promoData");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Zod needs date objects, but localStorage stores strings.
        return {
            ...parsed,
            startDate: parsed.startDate ? new Date(parsed.startDate) : undefined,
            endDate: parsed.endDate ? new Date(parsed.endDate) : undefined,
        };
      }
    } catch (e) {
      console.error("Failed to parse promo data from localStorage", e);
    }
    return { enabled: false };
  };

  const form = useForm<PromoFormValues>({
    resolver: zodResolver(promoFormSchema),
    defaultValues: getInitialPromoData(),
    effects: (form) => {
        const data = getInitialPromoData();
        if(data.media) {
            setMediaPreview(data.media);
        }
    }
  });
  
  const handleMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              const base64String = reader.result as string;
              form.setValue("media", base64String);
              setMediaPreview(base64String);
          };
          reader.readAsDataURL(file);
      }
  };

  const resetMedia = () => {
      form.setValue("media", "");
      setMediaPreview(null);
  };

  const handleFormSubmit = (data: PromoFormValues) => {
      localStorage.setItem("promoData", JSON.stringify(data));
      toast({ title: "Success", description: "Promotional message settings have been updated." });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Megaphone/> Promotional Message</CardTitle>
        <CardDescription>Configure a timed, custom message to display on the landing page.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <CardContent className="space-y-6">
                <FormField
                    control={form.control}
                    name="enabled"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Enable Promotion</FormLabel>
                                <FormDescription>Show the promotional message to users.</FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange}/>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Start Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>When the promotion becomes visible.</FormDescription>
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>End Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>When the promotion is no longer visible.</FormDescription>
                            </FormItem>
                        )}
                    />
                </div>
                
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Promotional Text</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter your message here..." {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="media"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image / GIF</FormLabel>
                            <div className="flex items-center gap-4">
                                <FormControl>
                                    <Input type="file" accept="image/*,.gif" onChange={(e) => handleMediaChange(e)} className="max-w-xs"/>
                                </FormControl>
                                {mediaPreview && (
                                    <>
                                        <Image src={mediaPreview} alt="Media preview" width={60} height={60} className="rounded-md border object-contain"/>
                                        <Button type="button" variant="ghost" size="icon" onClick={resetMedia}>
                                            <Trash2 className="h-4 w-4 text-destructive"/>
                                        </Button>
                                    </>
                                )}
                            </div>
                            <FormDescription>Upload an image or GIF for the promotion.</FormDescription>
                        </FormItem>
                    )}
                />
            </CardContent>
            <CardFooter>
                <Button type="submit">Save Promotion</Button>
            </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
