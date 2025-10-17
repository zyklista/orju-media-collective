import { SEO } from "../SEO";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Scale } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-28 left-24 opacity-10 animate-pulse" style={{ animationDuration: '2.5s' }}>
          <Scale className="w-28 h-28 text-purple-500" />
        </div>
        <div className="absolute bottom-32 right-16 opacity-8 animate-bounce" style={{ animationDuration: '3.5s' }}>
          <svg className="w-24 h-24 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <SEO title="Terms & Conditions | Orju Media" description="Terms and conditions for Orju Media" />
      <Navigation />
      <main className="container mx-auto pt-32 pb-24 px-6 max-w-4xl relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-500/10 mb-6">
            <Scale className="w-10 h-10 text-purple-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text text-transparent">Terms and Conditions</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The legal agreement governing your use of our services.
          </p>
        </div>

        <article className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm mb-10">
            <p className="text-sm text-muted-foreground !mb-0">
              <strong>Last Updated:</strong> October 16, 2025
            </p>
          </div>

          <p className="text-lg leading-relaxed !my-8">Please read these Terms and Conditions carefully before using our website and services.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">1. Interpretation and Definitions</h2>
          <h3 className="!mt-8 !mb-4">Interpretation</h3>
          <p className="!mb-6">Words with initial capital letters have meanings defined under the following conditions. The following definitions apply whether they appear in singular or plural.</p>

          <h3 className="!mt-8 !mb-4">Definitions</h3>
          <p className="!mb-4">For the purposes of these Terms and Conditions:</p>
          <ul className="space-y-3 !my-4">
            <li><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for election of directors or other managing authority.</li>
            <li><strong>Country</strong> refers to: Czechia.</li>
            <li><strong>Company</strong> (referred to as either "the Company," "We," "Us," or "Our" in this Agreement) refers to Orju Media.</li>
            <li><strong>Device</strong> means any device that can access the Service, such as a computer, cellphone, or digital tablet.</li>
            <li><strong>Service</strong> refers to the Website and the merchandise offered through it.</li>
            <li><strong>Website</strong> refers to Orju Media, accessible from <a href="https://www.orjumedia.com" className="text-primary hover:underline">www.orjumedia.com</a>.</li>
            <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
          </ul>

          <h2 className="!mt-12 !mb-6 text-2xl">2. Acknowledgment</h2>
          <p className="!my-6">These Terms and Conditions govern the use of this Service and form the agreement between You and the Company. By accessing or using the Service, You agree to be bound by these Terms. If You disagree with any part, You may not access the Service.</p>
          <p className="!my-6">You represent that You are over the age of 18. The Company does not permit those under 18 to use the Service.</p>
          <p className="!my-6">Your use of the Service is also subject to our <a href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</a>, which explains how we handle information. Please review it carefully.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">3. Merchandise Sales</h2>
          <ul className="space-y-3 !my-4">
            <li>All merchandise purchases made through our Website are one time transactions.</li>
            <li>We do not create customer accounts and we do not retain or store your personal information beyond what is necessary to process and complete your order.</li>
            <li>Payment processing may be handled by trusted third party providers. Any information you provide during checkout is used solely for completing that transaction.</li>
            <li>By making a purchase, you agree that the Company is not responsible for any issues arising from third party payment processors.</li>
          </ul>

          <h2 className="!mt-12 !mb-6 text-2xl">4. Refunds & Returns</h2>
          <ul className="space-y-3 !my-4">
            <li>All merchandise sales are considered final unless the product arrives damaged, defective, or incorrect.</li>
            <li>To request a return or refund, you must contact us within 14 days of receiving your order at <a href="mailto:support@orjumedia.com" className="text-primary hover:underline">support@orjumedia.com</a> with proof of purchase and a description of the issue.</li>
            <li>Approved refunds will be processed to your original payment method. Depending on your bank or payment provider, it may take several business days for funds to appear.</li>
            <li>Shipping costs for returns are the responsibility of the customer unless the return is due to our error (e.g., wrong or defective item).</li>
            <li>We reserve the right to refuse returns that do not meet these conditions.</li>
          </ul>

          <h2 className="!mt-12 !mb-6 text-2xl">5. Shipping Policy</h2>
          <ul className="space-y-3 !my-4">
            <li><strong>Processing Time:</strong> Orders are typically processed within 3–5 business days after payment confirmation.</li>
            <li><strong>Delivery Time:</strong> Estimated delivery times vary by destination. Domestic orders within Czechia may take 5–10 business days, while international orders may take 10–21 business days depending on customs and local postal services.</li>
            <li><strong>Shipping Costs:</strong> Shipping fees are calculated at checkout and are the responsibility of the customer unless otherwise stated.</li>
            <li><strong>International Orders:</strong> Customers outside Czechia are responsible for any customs duties, taxes, or import fees imposed by their local authorities.</li>
            <li><strong>Delays:</strong> We are not responsible for delays caused by postal services, customs clearance, or other factors beyond our control.</li>
          </ul>

          <h2 className="!mt-12 !mb-6 text-2xl">6. Limitation of Liability</h2>
          <p className="!mb-4">To the maximum extent permitted by law:</p>
          <ul className="space-y-3 !my-4">
            <li>The Company's liability for any claim related to your use of the Service or purchase of merchandise shall not exceed the amount you actually paid for the product.</li>
            <li>We are not liable for indirect, incidental, or consequential damages, including but not limited to loss of profits, data, or goodwill.</li>
          </ul>

          <h2 className="!mt-12 !mb-6 text-2xl">7. "AS IS" and "AS AVAILABLE" Disclaimer</h2>
          <p className="!my-6">The Service and merchandise are provided "AS IS" and "AS AVAILABLE" without warranties of any kind, express or implied. We do not guarantee uninterrupted access, error free operation, or that the Service will meet your expectations.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">8. Governing Law</h2>
          <p className="!my-6">These Terms shall be governed by the laws of Czechia, excluding its conflict of law rules.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">9. Dispute Resolution</h2>
          <p className="!my-6">If you have any dispute or concern, you agree to first attempt to resolve it informally by contacting the Company.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">10. EU and International Users</h2>
          <p className="!my-6">If you are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you reside.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">11. Severability and Waiver</h2>
          <p className="!my-6">If any provision of these Terms is found invalid or unenforceable, the remaining provisions shall remain in effect. Failure to enforce any right or provision shall not be considered a waiver of those rights.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">12. Changes to These Terms</h2>
          <p className="!my-6">We may update these Terms at any time. Material changes will be communicated by updating the "Last Updated" date. Continued use of the Service after changes take effect constitutes acceptance of the revised Terms.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">13. Contact Us</h2>
          <div className="bg-card border border-border rounded-xl p-6 !my-8">
            <p className="!mb-2">
              If you have any questions about these Terms and Conditions, you can contact us:
            </p>
            <div className="space-y-1 text-sm mt-4">
              <p className="font-semibold">Orju Media</p>
              <p>Email: <a href="mailto:support@orjumedia.com" className="text-primary hover:underline">support@orjumedia.com</a></p>
              <p>Website: <a href="https://www.orjumedia.com" className="text-primary hover:underline">www.orjumedia.com</a></p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
