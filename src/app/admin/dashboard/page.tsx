
"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { User, Trash2 } from "lucide-react";
import { SiteStatusManager } from "@/components/site-status-manager";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLocalStorage } from "@/hooks/use-local-storage";

const credentialsFormSchema = z.object({
  username: z.string().min(4, { message: "Username must be at least 4 characters." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});
type CredentialsFormValues = z.infer<typeof credentialsFormSchema>;

export default function AdminDashboardPage() {
  const { toast } = useToast();

  const [username, setUsername] = useLocalStorage("adminUsername", "NexaAIadmin");
  const [password, setPassword] = useLocalStorage("adminPassword", "NexaAIv1.0");

  const credentialsForm = useForm<CredentialsFormValues>({
    resolver: zodResolver(credentialsFormSchema),
    values: { username, password }
  });


  const handleCredentialsSubmit = (data: CredentialsFormValues) => {
    setUsername(data.username);
    setPassword(data.password);
    toast({ title: "Success", description: "Admin credentials updated." });
  };
  
  const handleResetAll = () => {
    // List all keys used for customization in localStorage
    const keysToRemove = [
        "customTheme",
        "welcomeTitle",
        "welcomeDescription",
        "welcomeFontFamily",
        "mainLogo",
        "chatAvatar",
        "aboutPageAvatar",
        "chatBgImage",
        "shortcutButtons",
        "aboutPageContent",
        "versionPageContent",
        "privacyPageContent",
        "feedbackPageContent",
        "surveyPageContent",
        "promoData"
    ];

    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    // Also dispatch an event to notify components like the theme provider
    window.dispatchEvent(new Event('theme-updated'));

    toast({
      title: "All Customizations Reset",
      description: "Please reload the page to see the default settings.",
    });

    setTimeout(() => {
        window.location.reload();
    }, 1500);
  };

  return (
     <div className="grid gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><User /> Admin Credentials</CardTitle>
                <CardDescription>Change the username and password for the admin panel.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...credentialsForm}>
                    <form onSubmit={credentialsForm.handleSubmit(handleCredentialsSubmit)} className="space-y-4">
                        <FormField control={credentialsForm.control} name="username" render={({ field }) => (<FormItem><FormLabel>Username</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={credentialsForm.control} name="password" render={({ field }) => (<FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <Button type="submit">Update Credentials</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

        <Separator />

        <SiteStatusManager />
        
        <Separator />

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive"><Trash2/> Reset All Customizations</CardTitle>
                <CardDescription>This will permanently delete all customizations and restore the site to its default state.</CardDescription>
            </CardHeader>
            <CardContent>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">Reset All Settings</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently reset all themes, content, shortcuts, and other customizations to their default values.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleResetAll} className="bg-destructive hover:bg-destructive/90">Yes, reset everything</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
            </CardContent>
        </Card>
    </div>
  );
}

    