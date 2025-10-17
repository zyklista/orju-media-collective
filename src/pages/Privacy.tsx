import { SEO } from "../SEO";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-32 right-20 opacity-10 animate-pulse" style={{ animationDuration: '3s' }}>
          <Shield className="w-24 h-24 text-primary" />
        </div>
        <div className="absolute bottom-40 left-16 opacity-5 animate-bounce" style={{ animationDuration: '4s' }}>
          <svg className="w-32 h-32 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <SEO title="Privacy Policy | Orju Media" description="Privacy policy for Orju Media" />
      <Navigation />
      <main className="container mx-auto pt-32 pb-24 px-6 max-w-4xl relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your privacy matters to us. Learn how we protect and handle your information.
          </p>
        </div>

        <article className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm mb-10">
            <p className="text-sm text-muted-foreground !mb-0">
              <strong>Effective Date:</strong> October 16, 2025
              <br />
              <strong>Last Updated:</strong> October 16, 2025
            </p>
          </div>

          <div className="space-y-8">
            <p className="text-lg leading-relaxed">
              Orju Media ("Company," "we," "our," or "us") values your privacy and is
              committed to protecting your personal information. This Privacy Policy
              describes how we collect, use, disclose, and safeguard your information
              when you visit our website <a href="https://www.orjumedia.com" className="text-primary hover:underline font-medium">www.orjumedia.com</a>, purchase merchandise, or otherwise interact with us.
            </p>

            <p className="text-lg leading-relaxed">
              By using our website or services, you agree to the terms of this
              Privacy Policy. If you do not agree, please discontinue use of our
              services.
            </p>
          </div>

          <h2 className="!mt-12 !mb-6 text-2xl">1. Information We Collect</h2>
          <p className="!mb-6">We collect information in the following ways:</p>
          <h3 className="!mt-8 !mb-4">a. Information You Provide Directly</h3>
          <ul className="space-y-3 !my-4">
            <li>Name, email address, phone number, and shipping/billing details when you make a purchase.</li>
            <li>Payment information (processed securely by third party providers; we do not store full payment card details).</li>
            <li>Information you provide when contacting us for support or inquiries.</li>
          </ul>

          <h3 className="!mt-8 !mb-4">b. Information Collected Automatically</h3>
          <ul className="space-y-3 !my-4">
            <li>IP address, browser type, operating system, device identifiers.</li>
            <li>Pages visited, time spent on pages, and other usage data.</li>
            <li>Cookies and similar technologies to improve functionality and analyze traffic.</li>
          </ul>

          <h3 className="!mt-8 !mb-4">c. Information from Third Parties</h3>
          <p className="!mb-8">Payment processors and shipping providers may share limited information necessary to complete your order.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">2. How We Use Your Information</h2>
          <p className="!mb-4">We use your information to:</p>
          <ul className="space-y-3 !my-4">
            <li>Process and fulfill merchandise orders (one time transactions only).</li>
            <li>Communicate with you regarding your order, support requests, or updates.</li>
            <li>Improve our website, services, and customer experience.</li>
            <li>Detect and prevent fraud, unauthorized transactions, or security issues.</li>
            <li>Comply with legal, tax, and regulatory obligations.</li>
          </ul>

          <h2 className="!mt-12 !mb-6 text-2xl">3. Legal Bases for Processing (GDPR Users)</h2>
          <p className="!mb-4">If you are located in the European Economic Area (EEA) or UK, we process your personal data under the following legal bases:</p>
          <ul className="space-y-3 !my-4">
            <li>Consent (when you voluntarily provide information).</li>
            <li>Contract (to fulfill merchandise orders).</li>
            <li>Legal Obligation (to comply with tax/accounting laws).</li>
            <li>Legitimate Interests (to improve services and prevent fraud).</li>
          </ul>

          <h2 className="!mt-12 !mb-6 text-2xl">4. Sharing of Information</h2>
          <p className="!mb-4">We do not sell or rent your personal information. We may share information with:</p>
          <ul className="space-y-3 !my-4">
            <li>Service Providers: Payment processors, shipping carriers, IT/hosting providers.</li>
            <li>Legal Authorities: When required by law, regulation, or legal process.</li>
            <li>Business Transfers: In the event of a merger, acquisition, or sale of assets.</li>
          </ul>

          <h2 className="!mt-12 !mb-6 text-2xl">5. Cookies and Tracking Technologies</h2>
          <p className="!mb-4">We use cookies and similar technologies to:</p>
          <ul className="space-y-3 !my-4">
            <li>Remember your preferences.</li>
            <li>Analyze website performance and traffic.</li>
            <li>Deliver relevant content.</li>
          </ul>
          <p className="!my-6">You can disable cookies in your browser settings, but some features may not function properly.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">6. Data Retention</h2>
          <ul className="space-y-3 !my-4">
            <li>We retain personal information only as long as necessary to complete your order and comply with legal obligations.</li>
            <li>We do not create customer accounts or store personal data for future marketing unless you explicitly opt in.</li>
          </ul>

          <h2 className="!mt-12 !mb-6 text-2xl">7. Your Privacy Rights</h2>
          <h3 className="!mt-8 !mb-4">a. GDPR (EEA/UK Users)</h3>
          <p className="!mb-4">You have the right to:</p>
          <ul className="space-y-3 !my-4">
            <li>Access, correct, or delete your personal data.</li>
            <li>Restrict or object to processing.</li>
            <li>Request data portability.</li>
            <li>Withdraw consent at any time.</li>
          </ul>
          <h3 className="!mt-8 !mb-4">b. CCPA/CPRA (California Users)</h3>
          <p className="!mb-4">You have the right to:</p>
          <ul className="space-y-3 !my-4">
            <li>Know what personal information we collect and how it is used.</li>
            <li>Request deletion of your personal information.</li>
            <li>Correct inaccurate information.</li>
            <li>Opt out of the sale or sharing of personal data (we do not sell personal data).</li>
            <li>Non discrimination for exercising your rights.</li>
          </ul>
          <p className="!my-6">To exercise these rights, contact us at support@orjumedia.com.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">8. International Data Transfers</h2>
          <p className="!my-6">If you access our services from outside Czechia or the EU, your information may be transferred to and processed in other countries. We implement safeguards such as Standard Contractual Clauses to protect your data.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">9. Security of Your Information</h2>
          <p className="!my-6">We use reasonable technical and organizational measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">10. Children's Privacy</h2>
          <p className="!my-6">Our services are not directed to individuals under 13 (or the age of majority in your jurisdiction). We do not knowingly collect personal data from children.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">11. Third Party Links</h2>
          <p className="!my-6">Our website may contain links to third party websites. We are not responsible for the privacy practices or content of those websites.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">12. Changes to This Privacy Policy</h2>
          <p className="!my-6">We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised "Last Updated" date.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">13. Contact Us</h2>
          <div className="bg-card border border-border rounded-xl p-6 !my-8">
            <p className="!mb-2">
              If you have any questions or concerns about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-1 text-sm mt-4">
              <p className="font-semibold">Orju Media</p>
              <p>Email: <a href="mailto:support@orjumedia.com" className="text-primary hover:underline">support@orjumedia.com</a></p>
              <p>Phone: +420 774 900 384</p>
              <p>Website: <a href="https://www.orjumedia.com" className="text-primary hover:underline">www.orjumedia.com</a></p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
