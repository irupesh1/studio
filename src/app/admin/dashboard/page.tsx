
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { LogOut, User, KeyRound, Image as ImageIcon, MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const credentialsFormSchema = z.object({
  username: z.string().min(4, { message: "Username must be at least 4 characters." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});
type CredentialsFormValues = z.infer<typeof credentialsFormSchema>;

const personalizationFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Description is required." }),
});
type PersonalizationFormValues = z.infer<typeof personalizationFormSchema>;

export default function AdminDashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAdminAuthenticated");
    if (authStatus !== "true") {
      router.replace("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const credentialsForm = useForm<CredentialsFormValues>({
    resolver: zodResolver(credentialsFormSchema),
    defaultValues: {
      username: localStorage.getItem("adminUsername") || "NexaAIadmin",
      password: localStorage.getItem("adminPassword") || "NexaAIv1.0",
    },
  });

  const personalizationForm = useForm<PersonalizationFormValues>({
    resolver: zodResolver(personalizationFormSchema),
    defaultValues: {
      title: localStorage.getItem("welcomeTitle") || "Nexa AI",
      description: localStorage.getItem("welcomeDescription") || "Your intelligent assistant for everything.",
    },
  });

  const handleCredentialsSubmit = (data: CredentialsFormValues) => {
    localStorage.setItem("adminUsername", data.username);
    localStorage.setItem("adminPassword", data.password);
    toast({ title: "Success", description: "Admin credentials updated." });
  };

  const handlePersonalizationSubmit = (data: PersonalizationFormValues) => {
    localStorage.setItem("welcomeTitle", data.title);
    localStorage.setItem("welcomeDescription", data.description);
    toast({ title: "Success", description: "Welcome screen updated." });
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    router.push("/admin/login");
  };

  if (!isAuthenticated) {
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <p>Redirecting to login...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
        </div>

        <div className="grid gap-8">
            {/* Credentials Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><User /> Admin Credentials</CardTitle>
                    <CardDescription>Change the username and password for the admin panel.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...credentialsForm}>
                        <form onSubmit={credentialsForm.handleSubmit(handleCredentialsSubmit)} className="space-y-4">
                            <FormField
                                control={credentialsForm.control}
                                name="username"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={credentialsForm.control}
                                name="password"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl><Input type="password" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <Button type="submit">Update Credentials</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* Personalization Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><MessageSquare/> Welcome Screen</CardTitle>
                    <CardDescription>Customize the initial text shown in the chat window.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...personalizationForm}>
                        <form onSubmit={personalizationForm.handleSubmit(handlePersonalizationSubmit)} className="space-y-4">
                            <FormField
                                control={personalizationForm.control}
                                name="title"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Welcome Title</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={personalizationForm.control}
                                name="description"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Welcome Description</FormLabel>
                                    <FormControl><Textarea {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <Button type="submit">Update Welcome Screen</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

             {/* Logo Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ImageIcon/> Logo Customization</CardTitle>
                    <CardDescription>This feature requires file handling capabilities.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Logo and icon customization is planned for a future update. The current AI prototyping environment does not support file uploads.
                    </p>
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
}
