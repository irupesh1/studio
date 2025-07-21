
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LogOut, User, MessageSquare, Palette, Link as LinkIcon, Edit, Settings } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

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

const appearanceFormSchema = z.object({
    fontFamily: z.string(),
    titleColor: z.string().optional(),
});
type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

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


  const credentialsForm = useForm<CredentialsFormValues>({
    resolver: zodResolver(credentialsFormSchema),
    defaultValues: {
      username:  "NexaAIadmin",
      password: "NexaAIv1.0",
    },
     effects: () => {
        const storedUsername = localStorage.getItem("adminUsername");
        const storedPassword = localStorage.getItem("adminPassword");
        if(storedUsername) credentialsForm.setValue("username", storedUsername);
        if(storedPassword) credentialsForm.setValue("password", storedPassword);
    }
  });

  const personalizationForm = useForm<PersonalizationFormValues>({
    resolver: zodResolver(personalizationFormSchema),
    defaultValues: {
      title: "Nexa AI",
      description: "Your intelligent assistant for everything.",
    },
     effects: () => {
        const storedTitle = localStorage.getItem("welcomeTitle");
        const storedDescription = localStorage.getItem("welcomeDescription");
        if(storedTitle) personalizationForm.setValue("title", storedTitle);
        if(storedDescription) personalizationForm.setValue("description", storedDescription);
    }
  });

  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      fontFamily: "Inter",
      titleColor: "#000000",
    },
    effects: () => {
        const storedFont = localStorage.getItem("welcomeFontFamily");
        const storedColor = localStorage.getItem("welcomeTitleColor");
        if(storedFont) appearanceForm.setValue("fontFamily", storedFont);
        if(storedColor) appearanceForm.setValue("titleColor", storedColor);
    }
  });

  const shortcutsForm = useForm<ShortcutsFormValues>({
    resolver: zodResolver(shortcutsFormSchema),
    defaultValues: getInitialShortcuts(),
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

  const handleAppearanceSubmit = (data: AppearanceFormValues) => {
    localStorage.setItem("welcomeFontFamily", data.fontFamily);
    localStorage.setItem("welcomeTitleColor", data.titleColor || '#000000');
    toast({ title: "Success", description: "Appearance settings updated." });
  };
  
  const handleShortcutsSubmit = (data: ShortcutsFormValues) => {
    localStorage.setItem("shortcutButtons", JSON.stringify(data.shortcuts));
    toast({ title: "Success", description: "Shortcut buttons updated." });
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
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Settings/> App Customization</CardTitle>
                    <CardDescription>Customize the look and feel of the welcome screen.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     <div>
                        <Form {...personalizationForm}>
                            <form onSubmit={personalizationForm.handleSubmit(handlePersonalizationSubmit)} className="space-y-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2"><MessageSquare/> Welcome Content</h3>
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
                                <Button type="submit">Update Content</Button>
                            </form>
                        </Form>
                    </div>

                    <Separator/>

                    <div>
                        <Form {...appearanceForm}>
                            <form onSubmit={appearanceForm.handleSubmit(handleAppearanceSubmit)} className="space-y-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2"><Palette/> Appearance</h3>
                                <FormField
                                    control={appearanceForm.control}
                                    name="fontFamily"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Font Family</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                            <SelectValue placeholder="Select a font" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Inter">Inter</SelectItem>
                                            <SelectItem value="Roboto">Roboto</SelectItem>
                                            <SelectItem value="Lato">Lato</SelectItem>
                                        </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={appearanceForm.control}
                                    name="titleColor"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Welcome Title Color</FormLabel>
                                        <FormControl><Input type="color" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <Button type="submit">Update Appearance</Button>
                            </form>
                        </Form>
                    </div>
                </CardContent>
            </Card>

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
                                <AccordionTrigger>
                                    <h4 className="font-semibold">Button {index + 1}</h4>
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4 pt-4">
                                     <FormField
                                        control={shortcutsForm.control}
                                        name={`shortcuts.${index}.enabled`}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                <div className="space-y-0.5">
                                                    <FormLabel>Enable Button</FormLabel>
                                                    <FormDescription>
                                                        Show this button on the welcome screen.
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={shortcutsForm.control}
                                            name={`shortcuts.${index}.text`}
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Button Text</FormLabel>
                                                <FormControl><Input placeholder="e.g., View Docs" {...field} /></FormControl>
                                            </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={shortcutsForm.control}
                                            name={`shortcuts.${index}.link`}
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Navigation Link</FormLabel>
                                                <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                                            </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={shortcutsForm.control}
                                            name={`shortcuts.${index}.bgColor`}
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Background Color</FormLabel>
                                                <FormControl><Input type="color" {...field} /></FormControl>
                                            </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={shortcutsForm.control}
                                            name={`shortcuts.${index}.textColor`}
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Text Color</FormLabel>
                                                <FormControl><Input type="color" {...field} /></FormControl>
                                            </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={shortcutsForm.control}
                                            name={`shortcuts.${index}.hoverBgColor`}
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Hover BG Color</FormLabel>
                                                <FormControl><Input type="color" {...field} /></FormControl>
                                            </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={shortcutsForm.control}
                                            name={`shortcuts.${index}.hoverTextColor`}
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Hover Text Color</FormLabel>
                                                <FormControl><Input type="color" {...field} /></FormControl>
                                            </FormItem>
                                            )}
                                        />
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
        </div>
      </div>
    </div>
  );
}
