
"use client";

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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Power, Server } from "lucide-react";
import { useEffect, useState } from "react";

export function SiteStatusManager() {
  const [isShutdown, setIsShutdown] = useState(false);
  const [shutdownMessage, setShutdownMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const status = localStorage.getItem("isSiteShutdown");
    const message = localStorage.getItem("shutdownMessage");
    setIsShutdown(status === "true");
    setShutdownMessage(message || "This site is currently down for maintenance.");
  }, []);
  
  const handleShutdown = () => {
    if(!shutdownMessage.trim()){
        toast({
            variant: "destructive",
            title: "Error",
            description: "Shutdown message cannot be empty.",
        });
        return;
    }
    localStorage.setItem("isSiteShutdown", "true");
    localStorage.setItem("shutdownMessage", shutdownMessage);
    setIsShutdown(true);
    toast({
      title: "Site Shutdown",
      description: "The website is now offline to the public.",
    });
    // Force a reload to show the shutdown screen immediately if the admin is on a public page
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleRecover = () => {
    localStorage.removeItem("isSiteShutdown");
    setIsShutdown(false);
    toast({
      title: "Site Recovered",
      description: "The website is now live again.",
    });
    // Force a reload to make the site accessible again
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Server /> Site Status</CardTitle>
        <CardDescription>Take the site offline for maintenance or recover it.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
                <h4 className="font-semibold">Current Status</h4>
                <p className="text-sm text-muted-foreground">
                    The site is currently{" "}
                    <span className={isShutdown ? "text-destructive font-bold" : "text-green-600 font-bold"}>
                        {isShutdown ? "SHUTDOWN" : "LIVE"}
                    </span>.
                </p>
            </div>
            <div className={`w-4 h-4 rounded-full ${isShutdown ? "bg-destructive" : "bg-green-500"}`}></div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="shutdown-message">Shutdown Message</Label>
          <Input 
            id="shutdown-message"
            value={shutdownMessage}
            onChange={(e) => setShutdownMessage(e.target.value)}
            placeholder="Enter maintenance message..."
          />
        </div>

        <div className="flex items-center gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isShutdown}>
                  <Power className="mr-2 h-4 w-4" /> Shutdown Site
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will make your site inaccessible to all public visitors. You can only recover it by logging into the admin panel again.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleShutdown}>Yes, shut it down</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button onClick={handleRecover} disabled={!isShutdown}>
             Recover Site
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
            To recover the site if you are logged out, go to{" "}
            <code className="font-mono bg-muted px-1 py-0.5 rounded">/admin/login?recover=true</code>
        </p>
      </CardContent>
    </Card>
  );
}
