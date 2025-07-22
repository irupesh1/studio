
"use client";

import { Power, ServerCrash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

interface ShutdownOverlayProps {
  message: string;
}

export function ShutdownOverlay({ message }: ShutdownOverlayProps) {
  return (
    <div className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
       <Card className="w-full max-w-lg text-center shadow-2xl animate-in fade-in-50 zoom-in-95">
          <CardHeader>
            <div className="mx-auto bg-destructive text-destructive-foreground rounded-full p-4 w-fit mb-4">
                <ServerCrash className="h-8 w-8" />
            </div>
            <CardTitle className="text-3xl font-bold">Site Temporarily Unavailable</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">We'll be back soon!</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg whitespace-pre-wrap">{message}</p>
          </CardContent>
       </Card>
    </div>
  );
}
