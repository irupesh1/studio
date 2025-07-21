import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" passHref>
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Chat
          </Button>
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-xs md:prose-sm max-w-none dark:prose-invert">
            <p className="text-center text-muted-foreground">Effective Date: Date Release Soon..</p>
            <p className="text-center">Welcome to NexaAI. Your privacy is important to us. This Privacy Policy outlines how we collect, use, store, and protect your data when you interact with our services through the website.</p>

            <Separator className="my-6" />

            <h2 className="font-semibold text-lg">1. Information We Collect</h2>
            <p>We are committed to minimal data collection to protect your privacy. Here's what we collect:</p>
            <ul>
              <li><strong>User Conversations:</strong> We temporarily store your past chat interactions only on your local device storage (localStorage).</li>
              <li><strong>Technical Information:</strong> To enhance your experience, we may collect non-personal data such as browser type, device type, operating system, and usage analytics through anonymized tools.</li>
            </ul>

            <Separator className="my-6" />

            <h2 className="font-semibold text-lg">2. How We Use Your Data</h2>
            <ul>
                <li><strong>Training NexaAI Locally:</strong> Your previous messages are stored temporarily to enhance conversation continuity and context understanding. This helps NexaAI perform better during your current session.</li>
                <li><strong>Improved User Experience:</strong> We use temporary local data to personalize responses and remember preferences during the same session.</li>
            </ul>

            <Separator className="my-6" />

            <h2 className="font-semibold text-lg">3. Local Storage Usage</h2>
            <ul>
                <li>Your data is not sent to any server or shared with third parties.</li>
                <li>Data is stored only in your browser’s local storage and is used exclusively by NexaAI on your device.</li>
                <li>Once you refresh, close, or leave the page, all stored conversations are automatically deleted.</li>
                <li>This ensures that no long-term personal data retention occurs unless explicitly enabled in the future with your consent.</li>
            </ul>

            <Separator className="my-6" />

            <h2 className="font-semibold text-lg">4. No Account or Login Required</h2>
            <p>NexaAI does not require account creation or user login to interact. This helps protect your identity and ensures complete anonymity.</p>

            <Separator className="my-6" />

            <h2 className="font-semibold text-lg">5. No Third-Party Sharing</h2>
            <p>We do not share, sell, or rent your data to any third parties. Your interactions are completely private and remain on your device.</p>

            <Separator className="my-6" />

            <h2 className="font-semibold text-lg">6. Cookies and Tracking</h2>
            <ul>
                <li>NexaAI does not use cookies for advertising or tracking purposes.</li>
                <li>We may use session-based storage for interface settings or features (e.g., theme, language).</li>
            </ul>
            
            <Separator className="my-6" />

            <h2 className="font-semibold text-lg">7. Children's Privacy</h2>
            <p>Our services are not intended for children under the age of 13. We do not knowingly collect personal data from minors.</p>
            
            <Separator className="my-6" />

            <h2 className="font-semibold text-lg">8. Data Security</h2>
            <p>Although your data is stored locally, we recommend:</p>
            <ul>
                <li>Using personal devices you trust.</li>
                <li>Avoiding shared or public devices for sensitive queries.</li>
                <li>Clearing browser storage if concerned about data persistence.</li>
            </ul>
            
            <Separator className="my-6" />

            <h2 className="font-semibold text-lg">9. User Control and Transparency</h2>
            <p>You are in full control of your data.</p>
            <ul>
                <li>You can delete your data anytime by refreshing the page or clearing local storage in your browser settings.</li>
            </ul>
            
            <Separator className="my-6" />
            
            <h2 className="font-semibold text-lg">10. Future Changes</h2>
            <p>We may update this Privacy Policy in the future to reflect changes in technology, laws, or our services. Changes will be posted here with an updated effective date.</p>
            
            <Separator className="my-6" />

            <h2 className="font-semibold text-lg">11. Contact Us</h2>
            <p>If you have any questions or concerns about this policy, feel free to contact the developer:</p>
            <ul>
                <li><strong>Developer:</strong> Team NexaAI</li>
                <li><strong>Email:</strong> ibefikra1@gmail.com</li>
                <li><strong>Project:</strong> NexaAI – Next-Gen Expert AI, designed by a 3rd-year B.Tech student.</li>
            </ul>

            <Separator className="my-6" />

            <p className="text-center font-semibold">🔐 Your privacy is our priority. No data leaves your device unless you choose to share it.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
