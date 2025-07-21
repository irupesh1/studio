"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Link as LinkIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";

const shortcutButtonSchema = z.object({
  enabled: z.boolean(),
  text: z.string(),
  link: z.string(),
  bgColor: z.string(),
  textColor: z.string(),
  hoverBgColor: z.string(),
  hoverTextColor: z.string(),
});
const shortcutsFormSchema = z.object({
  shortcuts: z.array(shortcutButtonSchema),
});
type ShortcutsFormValues = z.infer<typeof shortcutsFormSchema>;

export default function ShortcutsPage() {
  const { toast } = useToast();
  
  const getInitialShortcuts = (): ShortcutsFormValues => {
    try {
      const storedShortcuts = localStorage.getItem("shortcutButtons");
      if (storedShortcuts) {
        const parsed = JSON.parse(storedShortcuts);
        if(Array.isArray(parsed) && parsed.length === 4) {
            return { shortcuts: parsed };
        }
      }
    } catch (e) {
        console.error("Failed to parse shortcuts from localStorage", e);
    }

    return {
      shortcuts: Array(4).fill({
        enabled: false,
        text: "Learn More",
        link: "#",
        bgColor: "#3B82F6",
        textColor: "#FFFFFF",
        hoverBgColor: "#2563EB",
        hoverTextColor: "#FFFFFF",
      }),
    };
  };

  const shortcutsForm = useForm<ShortcutsFormValues>({
    resolver: zodResolver(shortcutsFormSchema),
    defaultValues: getInitialShortcuts(),
  });
  
  const handleShortcutsSubmit = (data: ShortcutsFormValues) => {
    localStorage.setItem("shortcutButtons", JSON.stringify(data.shortcuts));
    toast({ title: "Success", description: "Shortcut buttons updated." });
  };
  
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><LinkIcon/> Shortcut Buttons</CardTitle>
            <CardDescription>Configure up to 4 shortcut buttons for the welcome screen.</CardDescription>
        </CardHeader>
        <CardContent>
           <Form {...shortcutsForm}>
             <form onSubmit={shortcutsForm.handleSubmit(handleShortcutsSubmit)} className="space-y-4">
                <Accordion type="multiple" className="w-full">
                   {Array.from({ length: 4 }).map((_, index) => (
                     <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger><h4 className="font-semibold">Button {index + 1}</h4></AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-4">
                             <FormField control={shortcutsForm.control} name={`shortcuts.${index}.enabled`} render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"><div className="space-y-0.5"><FormLabel>Enable Button</FormLabel><FormDescription>Show this button on the welcome screen.</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange}/></FormControl></FormItem>)} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={shortcutsForm.control} name={`shortcuts.${index}.text`} render={({ field }) => (<FormItem><FormLabel>Button Text</FormLabel><FormControl><Input placeholder="e.g., View Docs" {...field} /></FormControl></FormItem>)} />
                                <FormField control={shortcutsForm.control} name={`shortcuts.${index}.link`} render={({ field }) => (<FormItem><FormLabel>Navigation Link</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl></FormItem>)} />
                                <FormField control={shortcutsForm.control} name={`shortcuts.${index}.bgColor`} render={({ field }) => (<FormItem><FormLabel>Background Color</FormLabel><FormControl><Input type="color" {...field} /></FormControl></FormItem>)} />
                                <FormField control={shortcutsForm.control} name={`shortcuts.${index}.textColor`} render={({ field }) => (<FormItem><FormLabel>Text Color</FormLabel><FormControl><Input type="color" {...field} /></FormControl></FormItem>)} />
                                <FormField control={shortcutsForm.control} name={`shortcuts.${index}.hoverBgColor`} render={({ field }) => (<FormItem><FormLabel>Hover BG Color</FormLabel><FormControl><Input type="color" {...field} /></FormControl></FormItem>)} />
                                <FormField control={shortcutsForm.control} name={`shortcuts.${index}.hoverTextColor`} render={({ field }) => (<FormItem><FormLabel>Hover Text Color</FormLabel><FormControl><Input type="color" {...field} /></FormControl></FormItem>)} />
                            </div>
                        </AccordionContent>
                     </AccordionItem>
                    ))}
                </Accordion>
                <Button type="submit">Update Shortcut Buttons</Button>
             </form>
           </Form>
        </CardContent>
    </Card>
  );
}
