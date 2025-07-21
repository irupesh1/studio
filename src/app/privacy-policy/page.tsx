
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center gap-4 border-b bg-background p-4">
        <Link href="/" className="p-2 rounded-full hover:bg-muted">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">Privacy Policy</h1>
      </header>
      <main className="container mx-auto max-w-3xl py-8 px-4">
        <div className="space-y-10">
          <div>
            <p className="text-muted-foreground">Effective Date: October 17, 2023</p>
            <p className="mt-4 leading-relaxed">
              Welcome to NexaAI. Your privacy is important to us. This Privacy Policy outlines how we collect, use, store, and protect your data when you interact with our services through the website.
            </p>
          </div>

          <hr className="border-border" />

          <div>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="leading-relaxed text-muted-foreground">
              We are committed to minimal data collection to protect your privacy. Here's what we collect:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li><strong>User Conversations:</strong> We temporarily store your past chat interactions only on your local device storage (localStorage).</li>
              <li><strong>Technical Information:</strong> To enhance your experience, we may collect non-personal data such as browser type, device type, operating system, and usage analytics through anonymized tools.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Data</h2>
            <p className="leading-relaxed text-muted-foreground">
              Your data is used for the following purposes:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
                <li><strong>Training NexaAI Locally:</strong> Your previous messages are stored temporarily to enhance conversation continuity and context understanding. This helps NexaAI perform better during your current session.</li>
                <li><strong>Improved User Experience:</strong> We use temporary local data to personalize responses and remember preferences during the same session.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">3. Local Storage Usage</h2>
            <p className="leading-relaxed text-muted-foreground">
                Your data is not sent to any server or shared with third parties. Data is stored only in your browser’s local storage and is used exclusively by NexaAI on your device. Once you refresh, close, or leave the page, all stored conversations are automatically deleted. This ensures that no long-term personal data retention occurs unless explicitly enabled in the future with your consent.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">4. No Account or Login Required</h2>
            <p className="leading-relaxed text-muted-foreground">
                NexaAI does not require account creation or user login to interact. This helps protect your identity and ensures complete anonymity.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">5. No Third-Party Sharing</h2>
            <p className="leading-relaxed text-muted-foreground">
                We do not share, sell, or rent your data to any third parties. Your interactions are completely private and remain on your device.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking</h2>
            <p className="leading-relaxed text-muted-foreground">
                NexaAI does not use cookies for advertising or tracking purposes. We may use session-based storage for interface settings or features (e.g., theme, language).
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
            <p className="leading-relaxed text-muted-foreground">
                Our services are not intended for children under the age of 13. We do not knowingly collect personal data from minors.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">8. Data Security</h2>
            <p className="leading-relaxed text-muted-foreground">
                Although your data is stored locally, we recommend using personal devices you trust, avoiding shared or public devices for sensitive queries, and clearing browser storage if concerned about data persistence.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">9. User Control and Transparency</h2>
            <p className="leading-relaxed text-muted-foreground">
                You are in full control of your data. You can delete your data anytime by refreshing the page or clearing local storage in your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">10. Future Changes</h2>
            <p className="leading-relaxed text-muted-foreground">
                We may update this Privacy Policy in the future to reflect changes in technology, laws, or our services. Changes will be posted here with an updated effective date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
            <p className="leading-relaxed text-muted-foreground">
              If you have any questions or concerns about this policy, feel free to contact the developer:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li><strong>Developer:</strong> Rupesh</li>
              <li><strong>Email:</strong> ibefikra1@gmail.com</li>
              <li><strong>Project:</strong> NexaAI – Next-Gen Expert AI, designed by a 3rd-year B.Tech student.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
