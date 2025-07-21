"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { User } from "lucide-react";

const credentialsFormSchema = z.object({
  username: z.string().min(4, { message: "Username must be at least 4 characters." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});
type CredentialsFormValues = z.infer<typeof credentialsFormSchema>;

export default function AdminDashboardPage() {
  const { toast } = useToast();

  const credentialsForm = useForm<CredentialsFormValues>({
    resolver: zodResolver(credentialsFormSchema),
    effects: (form) => {
        const storedUsername = localStorage.getItem("adminUsername");
        const storedPassword = localStorage.getItem("adminPassword");
        if(storedUsername) form.setValue("username", storedUsername || "NexaAIadmin");
        if(storedPassword) form.setValue("password", storedPassword || "NexaAIv1.0");
    }
  });

  const handleCredentialsSubmit = (data: CredentialsFormValues) => {
    localStorage.setItem("adminUsername", data.username);
    localStorage.setItem("adminPassword", data.password);
    toast({ title: "Success", description: "Admin credentials updated." });
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
    </div>
  );
}
