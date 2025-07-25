
"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Palette, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

const themeCustomizationSchema = z.object({
    headerBg: z.string(),
    headerText: z.string(),
    messageAreaBg: z.string(),
    inputBg: z.string(),
    inputBorder: z.string(),
    inputText: z.string(),
    inputPlaceholder: z.string(),
    sendButtonBg: z.string(),
    sendButtonIcon: z.string(),
});
type ThemeCustomizationValues = z.infer<typeof themeCustomizationSchema>;


export default function ThemePage() {
  const { toast } = useToast();
  
  const defaultTheme = {
    headerBg: "#ffffff",
    headerText: "#0f172a",
    messageAreaBg: "#ffffff",
    inputBg: "#f1f5f9",
    inputBorder: "#e2e8f0",
    inputText: "#0f172a",
    inputPlaceholder: "Ask NexaAI Anything...",
    sendButtonBg: "#0f172a",
    sendButtonIcon: "#f8fafc",
  };

  const [customTheme, setCustomTheme] = useLocalStorage("customTheme", defaultTheme);

  const themeForm = useForm<ThemeCustomizationValues>({
      resolver: zodResolver(themeCustomizationSchema),
      values: customTheme,
  });

  const handleThemeSubmit = (data: ThemeCustomizationValues) => {
      setCustomTheme(data);
      toast({ title: "Success", description: "Theme updated. Refresh to see changes." });
      window.dispatchEvent(new Event('theme-updated'));
  }
  
  const handleResetTheme = () => {
    setCustomTheme(defaultTheme);
    themeForm.reset(defaultTheme);
    toast({ title: "Theme Reset", description: "Custom theme has been reset to default." });
    window.dispatchEvent(new Event('theme-updated'));
  };

  return (
     <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Palette /> Theme Customization</CardTitle>
            <CardDescription>Override the default theme colors and styles.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...themeForm}>
                <form onSubmit={themeForm.handleSubmit(handleThemeSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={themeForm.control} name="headerBg" render={({ field }) => (<FormItem><FormLabel>Header Background</FormLabel><FormControl><Input type="color" {...field} /></FormControl></FormItem>)} />
                        <FormField control={themeForm.control} name="headerText" render={({ field }) => (<FormItem><FormLabel>Header Text</FormLabel><FormControl><Input type="color" {...field} /></FormControl></FormItem>)} />
                        <FormField control={themeForm.control} name="messageAreaBg" render={({ field }) => (<FormItem><FormLabel>Message Area BG</FormLabel><FormControl><Input type="color" {...field} /></FormControl></FormItem>)} />
                        <FormField control={themeForm.control} name="inputBg" render={({ field }) => (<FormItem><FormLabel>Input BG</FormLabel><FormControl><Input type="color" {...field} /></FormControl></FormItem>)} />
                        <FormField control={themeForm.control} name="inputBorder" render={({ field }) => (<FormItem><FormLabel>Input Border</FormLabel><FormControl><Input type="color" {...field} /></FormControl></FormItem>)} />
                        <FormField control={themeForm.control} name="inputText" render={({ field }) => (<FormItem><FormLabel>Input Text</FormLabel><FormControl><Input type="color" {...field} /></FormControl></FormItem>)} />
                        <FormField control={themeForm.control} name="sendButtonBg" render={({ field }) => (<FormItem><FormLabel>Send Button BG</FormLabel><FormControl><Input type="color" {...field} /></FormControl></FormItem>)} />
                        <FormField control={themeForm.control} name="sendButtonIcon" render={({ field }) => (<FormItem><FormLabel>Send Button Icon</FormLabel><FormControl><Input type="color" {...field} /></FormControl></FormItem>)} />
                    </div>
                    <FormField control={themeForm.control} name="inputPlaceholder" render={({ field }) => ( <FormItem><FormLabel>Input Placeholder Text</FormLabel><FormControl><Input placeholder="Ask anything..." {...field} /></FormControl></FormItem>)} />
                    <div className="flex items-center gap-4"><Button type="submit">Save Theme</Button></div>
                </form>
            </Form>
        </CardContent>
        <CardFooter><Button variant="destructive" onClick={handleResetTheme}><Trash2 className="mr-2 h-4 w-4" />Reset Theme to Default</Button></CardFooter>
    </Card>
  );
}

    