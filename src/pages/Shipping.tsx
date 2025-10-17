import { SEO } from "../SEO";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Truck } from "lucide-react";

export default function Shipping() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-32 right-20 opacity-10 animate-pulse" style={{ animationDuration: '3s' }}>
          <Truck className="w-32 h-32 text-green-500" />
        </div>
        <div className="absolute bottom-28 left-16 opacity-8 animate-bounce" style={{ animationDuration: '3.5s' }}>
          <svg className="w-28 h-28 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <SEO title="Shipping & Returns | Orju Media" description="Shipping and returns policy for Orju Media" />
      <Navigation />
      <main className="container mx-auto pt-32 pb-24 px-6 max-w-4xl relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6">
            <Truck className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">Shipping & Returns Policy</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about our shipping and return process.
          </p>
        </div>

        <article className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm mb-10">
            <p className="text-sm text-muted-foreground !mb-0">
              <strong>Last Updated:</strong> October 16, 2025
            </p>
          </div>

          <div className="space-y-8">
            <p className="text-lg leading-relaxed">
              At Orju Media, we want you to feel confident when purchasing our
              merchandise. This Shipping & Returns Policy explains how we handle
              order processing, delivery, and returns.
            </p>
          </div>

          <h2 className="!mt-12 !mb-6 text-2xl">1. Order Processing</h2>
          <ul className="space-y-3 !my-4">
            <li>Orders are typically processed within 3–5 business days after payment confirmation.</li>
            <li>You will receive an email confirmation once your order has been shipped.</li>
            <li>Please ensure your shipping address is accurate at checkout. We are not responsible for delays or losses due to incorrect addresses provided by the customer.</li>
          </ul>

          <h2 className="!mt-12 !mb-6 text-2xl">2. Shipping</h2>
          <ul className="space-y-3 !my-4">
            <li><strong>Domestic Shipping (Czechia):</strong> Estimated delivery time is 5–10 business days after dispatch.</li>
            <li><strong>International Shipping:</strong> Estimated delivery time is 10–21 business days, depending on customs clearance and local postal services.</li>
            <li><strong>Shipping Costs:</strong> Calculated at checkout and displayed before payment.</li>
            <li><strong>Customs & Duties:</strong> International customers are responsible for any customs duties, taxes, or import fees imposed by their local authorities.</li>
            <li><strong>Delays:</strong> We are not responsible for delays caused by postal services, customs, or other factors beyond our control.</li>
          </ul>

          <h2 className="!mt-12 !mb-6 text-2xl">3. Returns & Refunds</h2>
          <ul className="space-y-3 !my-4">
            <li>All sales are considered final unless the product arrives damaged, defective, or incorrect.</li>
            <li>To request a return or refund, you must contact us within 14 days of receiving your order at <a href="mailto:support@orjumedia.com" className="text-primary hover:underline">support@orjumedia.com</a>.</li>
            <li>Please include your order details, proof of purchase, and a description of the issue.</li>
            <li>Approved refunds will be processed to your original payment method. Depending on your bank or payment provider, it may take several business days for funds to appear.</li>
            <li>Return Shipping: Customers are responsible for return shipping costs unless the return is due to our error (e.g., wrong or defective item).</li>
            <li>We reserve the right to refuse returns that do not meet these conditions.</li>
          </ul>

          <h2 className="!mt-12 !mb-6 text-2xl">4. Exchanges</h2>
          <p className="!my-6">We do not currently offer direct exchanges. If you wish to replace an item, please request a refund (if eligible) and place a new order.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">5. Contact Us</h2>
          <div className="bg-card border border-border rounded-xl p-6 !my-8">
            <p className="!mb-2">
              If you have any questions about shipping or returns, please reach out:
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
