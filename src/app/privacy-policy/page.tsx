
"use client";

import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const defaultContent = {
    title: "Privacy Policy",
    effectiveDate: "October 17, 2023",
    intro: "Welcome to NexaAI. Your privacy is important to us. This Privacy Policy outlines how we collect, use, store, and protect your data when you interact with our services through the website.",
    infoCollection: "We are committed to minimal data collection to protect your privacy. Here's what we collect:\n- **User Conversations:** We temporarily store your past chat interactions only on your local device storage (localStorage).\n- **Technical Information:** To enhance your experience, we may collect non-personal data such as browser type, device type, operating system, and usage analytics through anonymized tools.",
    dataUsage: "Your data is used for the following purposes:\n- **Training NexaAI Locally:** Your previous messages are stored temporarily to enhance conversation continuity and context understanding. This helps NexaAI perform better during your current session.\n- **Improved User Experience:** We use temporary local data to personalize responses and remember preferences during the same session.",
    localStorage: "Your data is not sent to any server or shared with third parties. Data is stored only in your browser’s local storage and is used exclusively by NexaAI on your device. Once you refresh, close, or leave the page, all stored conversations are automatically deleted. This ensures that no long-term personal data retention occurs unless explicitly enabled in the future with your consent.",
    contactEmail: "ibefikra1@gmail.com"
};

export default function PrivacyPolicy() {
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    const storedContent = localStorage.getItem("privacyPageContent");
    if (storedContent) {
      try {
        setContent(JSON.parse(storedContent));
      } catch (e) {
        console.error("Failed to parse privacy page content from localStorage", e);
        setContent(defaultContent);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-4 p-6">
            <Link href="/" passHref>
              <Button variant="outline" size="icon" className="rounded-full" aria-label="Back to chat">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <div>
              <CardTitle className="text-2xl">{content.title}</CardTitle>
              <CardDescription className="mt-1">Effective Date: {content.effectiveDate}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-6">
            <p className="leading-relaxed text-muted-foreground">
              {content.intro}
            </p>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">1. Information We Collect</h2>
                <div className="leading-relaxed text-muted-foreground whitespace-pre-wrap">
                    {content.infoCollection.split('\n').map((line, index) => (
                        <p key={index}>{line.startsWith('-') ? <span className="pl-4">{line}</span> : line}</p>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">2. How We Use Your Data</h2>
                <div className="leading-relaxed text-muted-foreground whitespace-pre-wrap">
                    {content.dataUsage.split('\n').map((line, index) => (
                        <p key={index}>{line.startsWith('-') ? <span className="pl-4">{line}</span> : line}</p>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">3. Local Storage Usage</h2>
              <p className="leading-relaxed text-muted-foreground">
                  {content.localStorage}
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">4. No Account or Login Required</h2>
              <p className="leading-relaxed text-muted-foreground">
                  NexaAI does not require account creation or user login to interact. This helps protect your identity and ensures complete anonymity.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">5. No Third-Party Sharing</h2>
              <p className="leading-relaxed text-muted-foreground">
                  We do not share, sell, or rent your data to any third parties. Your interactions are completely private and remain on your device.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">6. Cookies and Tracking</h2>
              <p className="leading-relaxed text-muted-foreground">
                  NexaAI does not use cookies for advertising or tracking purposes. We may use session-based storage for interface settings or features (e.g., theme, language).
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">7. Children's Privacy</h2>
              <p className="leading-relaxed text-muted-foreground">
                  Our services are not intended for children under the age of 13. We do not knowingly collect personal data from minors.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">8. Data Security</h2>
              <p className="leading-relaxed text-muted-foreground">
                  Although your data is stored locally, we recommend:
              </p>
               <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-4">
                <li>Using personal devices you trust.</li>
                <li>Avoiding shared or public devices for sensitive queries.</li>
                <li>Clearing browser storage if concerned about data persistence.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">9. User Control and Transparency</h2>
              <p className="leading-relaxed text-muted-foreground">
                  You are in full control of your data. You can delete your data anytime by refreshing the page or clearing local storage in your browser settings.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">10. Future Changes</h2>
              <p className="leading-relaxed text-muted-foreground">
                  We may update this Privacy Policy in the future to reflect changes in technology, laws, or our services. Changes will be posted here with an updated effective date.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">11. Contact Us</h2>
              <p className="leading-relaxed text-muted-foreground">
                If you have any questions or concerns about this policy, feel free to contact the developer:
              </p>
              <ul className="space-y-2 text-muted-foreground pl-4">
                <li><strong>Developer:</strong> Rupesh</li>
                <li><strong>Email:</strong> {content.contactEmail}</li>
                <li><strong>Project:</strong> NexaAI – Next-Gen Expert AI, designed by a 3rd-year B.Tech student.</li>
              </ul>
            </div>
            
            <Separator />
            
            <p className="text-center text-sm text-muted-foreground">
              🔐 Your privacy is our priority. No data leaves your device unless you choose to share it.
            </p>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
