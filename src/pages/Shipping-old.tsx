import { SEO } from "../SEO";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

export default function Shipping() {
  return (
    <div className="min-h-screen">
      <SEO title="Shipping & Returns | Orju Media" description="Shipping and returns policy for Orju Media" />
      <Navigation />
      <main className="container mx-auto pt-24 pb-24 px-4">
        <article className="prose lg:prose-xl max-w-none">
          <h1>Shipping & Returns Policy</h1>
          <p>
            <strong>Last updated:</strong> October 16, 2025
          </p>

          <p>
            At Orju Media, we want you to feel confident when purchasing our
            merchandise. This Shipping & Returns Policy explains how we handle
            order processing, delivery, and returns.
          </p>

          <h2>1. Order Processing</h2>
          <ul>
            <li>Orders are typically processed within 3–5 business days after payment confirmation.</li>
            <li>You will receive an email confirmation once your order has been shipped.</li>
            <li>Please ensure your shipping address is accurate at checkout. We are not responsible for delays or losses due to incorrect addresses provided by the customer.</li>
          </ul>

          <h2>2. Shipping</h2>
          <ul>
            <li><strong>Domestic Shipping (Czechia):</strong> Estimated delivery time is 5–10 business days after dispatch.</li>
            <li><strong>International Shipping:</strong> Estimated delivery time is 10–21 business days, depending on customs clearance and local postal services.</li>
            <li><strong>Shipping Costs:</strong> Calculated at checkout and displayed before payment.</li>
            <li><strong>Customs & Duties:</strong> International customers are responsible for any customs duties, taxes, or import fees imposed by their local authorities.</li>
            <li><strong>Delays:</strong> We are not responsible for delays caused by postal services, customs, or other factors beyond our control.</li>
          </ul>

          <h2>3. Returns & Refunds</h2>
          <ul>
            <li>All sales are considered final unless the product arrives damaged, defective, or incorrect.</li>
            <li>To request a return or refund, you must contact us within 14 days of receiving your order at <a href="mailto:support@orjumedia.com">support@orjumedia.com</a>.</li>
            <li>Please include your order details, proof of purchase, and a description of the issue.</li>
            <li>Approved refunds will be processed to your original payment method. Depending on your bank or payment provider, it may take several business days for funds to appear.</li>
            <li>Return Shipping: Customers are responsible for return shipping costs unless the return is due to our error (e.g., wrong or defective item).</li>
            <li>We reserve the right to refuse returns that do not meet these conditions.</li>
          </ul>

          <h2>4. Exchanges</h2>
          <p>We do not currently offer direct exchanges. If you wish to replace an item, please request a refund (if eligible) and place a new order.</p>

          <h2>5. Contact Us</h2>
          <p>
            If you have any questions about shipping or returns, please reach out:
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
