import { SEO } from "../SEO";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

export default function Terms() {
  return (
    <div className="min-h-screen">
      <SEO title="Terms & Conditions | Orju Media" description="Terms and conditions for Orju Media" />
      <Navigation />
      <main className="container mx-auto pt-24 pb-24 px-4">
        <article className="prose lg:prose-xl max-w-none">
          <h1>Terms and Conditions</h1>
          <p>
            <strong>Last updated:</strong> October 16, 2025
          </p>

          <p>Please read these Terms and Conditions carefully before using our website and services.</p>

          <h2>1. Interpretation and Definitions</h2>
          <h3>Interpretation</h3>
          <p>Words with initial capital letters have meanings defined under the following conditions. The following definitions apply whether they appear in singular or plural.</p>

          <h3>Definitions</h3>
          <p>For the purposes of these Terms and Conditions:</p>
          <ul>
            <li><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where “control” means ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for election of directors or other managing authority.</li>
            <li><strong>Country</strong> refers to: Czechia.</li>
            <li><strong>Company</strong> (referred to as either “the Company,” “We,” “Us,” or “Our” in this Agreement) refers to Orju Media.</li>
            <li><strong>Device</strong> means any device that can access the Service, such as a computer, cellphone, or digital tablet.</li>
            <li><strong>Service</strong> refers to the Website and the merchandise offered through it.</li>
            <li><strong>Website</strong> refers to Orju Media, accessible from <a href="https://www.orjumedia.com">www.orjumedia.com</a>.</li>
            <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
          </ul>

          <h2>2. Acknowledgment</h2>
          <p>These Terms and Conditions govern the use of this Service and form the agreement between You and the Company. By accessing or using the Service, You agree to be bound by these Terms. If You disagree with any part, You may not access the Service.</p>
          <p>You represent that You are over the age of 18. The Company does not permit those under 18 to use the Service.</p>
          <p>Your use of the Service is also subject to our <a href="/privacy">Privacy Policy</a>, which explains how we handle information. Please review it carefully.</p>

          <h2>3. Merchandise Sales</h2>
          <ul>
            <li>All merchandise purchases made through our Website are one time transactions.</li>
            <li>We do not create customer accounts and we do not retain or store your personal information beyond what is necessary to process and complete your order.</li>
            <li>Payment processing may be handled by trusted third party providers. Any information you provide during checkout is used solely for completing that transaction.</li>
            <li>By making a purchase, you agree that the Company is not responsible for any issues arising from third party payment processors.</li>
          </ul>

          <h2>4. Refunds & Returns</h2>
          <ul>
            <li>All merchandise sales are considered final unless the product arrives damaged, defective, or incorrect.</li>
            <li>To request a return or refund, you must contact us within 14 days of receiving your order at <a href="mailto:support@orjumedia.com">support@orjumedia.com</a> with proof of purchase and a description of the issue.</li>
            <li>Approved refunds will be processed to your original payment method. Depending on your bank or payment provider, it may take several business days for funds to appear.</li>
            <li>Shipping costs for returns are the responsibility of the customer unless the return is due to our error (e.g., wrong or defective item).</li>
            <li>We reserve the right to refuse returns that do not meet these conditions.</li>
          </ul>

          <h2>5. Shipping Policy</h2>
          <ul>
            <li><strong>Processing Time:</strong> Orders are typically processed within 3–5 business days after payment confirmation.</li>
            <li><strong>Delivery Time:</strong> Estimated delivery times vary by destination. Domestic orders within Czechia may take 5–10 business days, while international orders may take 10–21 business days depending on customs and local postal services.</li>
            <li><strong>Shipping Costs:</strong> Shipping fees are calculated at checkout and are the responsibility of the customer unless otherwise stated.</li>
            <li><strong>International Orders:</strong> Customers outside Czechia are responsible for any customs duties, taxes, or import fees imposed by their local authorities.</li>
            <li><strong>Delays:</strong> We are not responsible for delays caused by postal services, customs clearance, or other factors beyond our control.</li>
          </ul>

          <h2>6. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law:</p>
          <ul>
            <li>The Company’s liability for any claim related to your use of the Service or purchase of merchandise shall not exceed the amount you actually paid for the product.</li>
            <li>We are not liable for indirect, incidental, or consequential damages, including but not limited to loss of profits, data, or goodwill.</li>
          </ul>

          <h2>7. “AS IS” and “AS AVAILABLE” Disclaimer</h2>
          <p>The Service and merchandise are provided “AS IS” and “AS AVAILABLE” without warranties of any kind, express or implied. We do not guarantee uninterrupted access, error free operation, or that the Service will meet your expectations.</p>

          <h2>8. Governing Law</h2>
          <p>These Terms shall be governed by the laws of Czechia, excluding its conflict of law rules.</p>

          <h2>9. Dispute Resolution</h2>
          <p>If you have any dispute or concern, you agree to first attempt to resolve it informally by contacting the Company.</p>

          <h2>10. EU and International Users</h2>
          <p>If you are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you reside.</p>

          <h2>11. Severability and Waiver</h2>
          <p>If any provision of these Terms is found invalid or unenforceable, the remaining provisions shall remain in effect. Failure to enforce any right or provision shall not be considered a waiver of those rights.</p>

          <h2>12. Changes to These Terms</h2>
          <p>We may update these Terms at any time. Material changes will be communicated by updating the “Last Updated” date. Continued use of the Service after changes take effect constitutes acceptance of the revised Terms.</p>

          <h2>13. Contact Us</h2>
          <p>If you have any questions about these Terms and Conditions, you can contact us:
            <br />
            Email: <a href="mailto:support@orjumedia.com">support@orjumedia.com</a>
            <br />
            Website: <a href="https://www.orjumedia.com">www.orjumedia.com</a>
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
