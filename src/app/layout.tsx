
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { ShutdownProvider } from '@/context/shutdown-provider';
import React from 'react';
import { CustomThemeProvider } from '@/context/custom-theme-provider';

export const metadata: Metadata = {
  title: 'NexaAI Chat',
  description: 'An intelligent AI chatbot created with Firebase and Next.js.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Roboto:wght@400;700&family=Lato:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CustomThemeProvider>
            <React.Suspense fallback={<div>Loading...</div>}>
              <ShutdownProvider>
                {children}
              </ShutdownProvider>
            </React.Suspense>
            <Toaster />
          </CustomThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

    