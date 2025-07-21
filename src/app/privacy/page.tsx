import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
            <Link href="/" passHref>
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Chat</span>
              </Button>
            </Link>
            <div className="flex flex-col">
              <CardTitle className="text-2xl font-bold">Privacy Policy</CardTitle>
              <p className="text-muted-foreground text-sm">
                Effective Date: July 20, 2025
              </p>
            </div>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert space-y-4">
            <p>Welcome to NexaAI. Your privacy is important to us. This Privacy Policy outlines how we collect, use, store, and protect your data when you interact with our services through the website.</p>

            <div>
                <h2 className="font-semibold text-lg mb-2">1. Information We Collect</h2>
                <p>We are committed to minimal data collection to protect your privacy. Here's what we collect:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><strong>User Conversations:</strong> We temporarily store your past chat interactions only on your local device storage (localStorage).</li>
                <li><strong>Technical Information:</strong> To enhance your experience, we may collect non-personal data such as browser type, device type, operating system, and usage analytics through anonymized tools.</li>
                </ul>
            </div>
            
            <div>
                <h2 className="font-semibold text-lg mb-2">2. How We Use Your Data</h2>
                <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Training NexaAI Locally:</strong> Your previous messages are stored temporarily to enhance conversation continuity and context understanding. This helps NexaAI perform better during your current session.</li>
                    <li><strong>Improved User Experience:</strong> We use temporary local data to personalize responses and remember preferences during the same session.</li>
                </ul>
            </div>
            
            <div>
                <h2 className="font-semibold text-lg mb-2">3. Local Storage Usage</h2>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Your data is not sent to any server or shared with third parties.</li>
                    <li>Data is stored only in your browser’s local storage and is used exclusively by NexaAI on your device.</li>
                    <li>Once you refresh, close, or leave the page, all stored conversations are automatically deleted.</li>
                    <li>This ensures that no long-term personal data retention occurs unless explicitly enabled in the future with your consent.</li>
                </ul>
            </div>
            
            <div>
                <h2 className="font-semibold text-lg mb-2">4. No Account or Login Required</h2>
                <p>NexaAI does not require account creation or user login to interact. This helps protect your identity and ensures complete anonymity.</p>
            </div>
            
            <div>
                <h2 className="font-semibold text-lg mb-2">5. No Third-Party Sharing</h2>
                <p>We do not share, sell, or rent your data to any third parties. Your interactions are completely private and remain on your device.</p>
            </div>
            
            <div>
                <h2 className="font-semibold text-lg mb-2">6. Cookies and Tracking</h2>
                <ul className="list-disc pl-6 space-y-1">
                    <li>NexaAI does not use cookies for advertising or tracking purposes.</li>
                    <li>We may use session-based storage for interface settings or features (e.g., theme, language).</li>
                </ul>
            </div>
            
            <div>
                <h2 className="font-semibold text-lg mb-2">7. Children's Privacy</h2>
                <p>Our services are not intended for children under the age of 13. We do not knowingly collect personal data from minors.</p>
            </div>
            
            <div>
                <h2 className="font-semibold text-lg mb-2">8. Data Security</h2>
                <p>Although your data is stored locally, we recommend:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Using personal devices you trust.</li>
                    <li>Avoiding shared or public devices for sensitive queries.</li>
                    <li>Clearing browser storage if concerned about data persistence.</li>
                </ul>
            </div>

            <div>
                <h2 className="font-semibold text-lg mb-2">9. User Control and Transparency</h2>
                <p>You are in full control of your data.</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>You can delete your data anytime by refreshing the page or clearing local storage in your browser settings.</li>
                </ul>
            </div>
            
            <div>
                <h2 className="font-semibold text-lg mb-2">10. Future Changes</h2>
                <p>We may update this Privacy Policy in the future to reflect changes in technology, laws, or our services. Changes will be posted here with an updated effective date.</p>
            </div>

            <div>
                <h2 className="font-semibold text-lg mb-2">11. Contact Us</h2>
                <p>If you have any questions or concerns about this policy, feel free to contact the developer:</p>
                <ul className="list-none pl-0 space-y-1 mt-2">
                    <li><strong>Developer:</strong> Team NexaAI</li>
                    <li><strong>Email:</strong> ibefikra1@gmail.com</li>
                    <li><strong>Project:</strong> NexaAI – Next-Gen Expert AI, designed by a 3rd-year B.Tech student.</li>
                </ul>
            </div>
            
            <Separator className="my-6" />

            <p className="text-center font-semibold">🔐 Your privacy is our priority. No data leaves your device unless you choose to share it.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}