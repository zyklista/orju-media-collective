import { useState, useRef, useEffect } from "react";
import { SEO } from "../SEO";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

export default function Buy() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get cart from localStorage
  const cart = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cart") || "[]") : [];
  const defaultCurrency = typeof window !== 'undefined' ? (localStorage.getItem('currency') || 'CZK') : 'CZK';
  const [currency] = useState<string>(defaultCurrency);
  const rates = { USD: 1, CZK: 24, EUR: 0.95, PHP: 58 } as Record<string, number>;
  const formatPrice = (usd: number) => {
    const rate = (rates as any)[currency] ?? 1;
    const converted = usd * rate;
    const locale = currency === 'CZK' ? 'cs-CZ' : currency === 'EUR' ? 'de-DE' : currency === 'PHP' ? 'en-PH' : 'en-US';
    return converted.toLocaleString(locale, { style: 'currency', currency });
  };

  const total = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Call our local server to create a Stripe Checkout session
      const resp = await fetch((import.meta.env.VITE_STRIPE_SERVER_URL || 'http://localhost:4242') + '/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart,
          currency,
          success_url: window.location.origin + '/buy?success=true',
          cancel_url: window.location.origin + '/buy?canceled=true',
          customer: { name, email, address },
        }),
      })

      const json = await resp.json()
      if (resp.ok && json.url) {
        // Redirect to Stripe Checkout
        window.location.href = json.url
        return
      }

      throw new Error(json.error || 'Failed to create Stripe session')
    } catch (err: any) {
      setError(err?.message || String(err))
      setSubmitting(false)
    }
  }

  // Stripe buy button control
  const [showStripe, setShowStripe] = useState(false);
  const stripeContainerRef = useRef<HTMLDivElement | null>(null);

  // Replace these values with the ones you provided
  const STRIPE_BUY_BUTTON_ID = "buy_btn_1SItwgFsXX1us0sbEYaGuiq6";
  const STRIPE_PUBLISHABLE_KEY = "pk_live_51QiNNmFsXX1us0sboYAox4i1XbKp8iTMJN09EsZ65f2gZ6UI89MZru9coC0fHNkSvdBd2okwJyxgrGb4woDBblNN00L3E8d5gq";

  useEffect(() => {
    if (!showStripe) return;

    // Load the Stripe buy-button script if it's not already present
    const existing = document.querySelector('script[data-stripe-buy-button]');
    if (!existing) {
      const s = document.createElement('script');
      s.setAttribute('async', '');
      s.setAttribute('data-stripe-buy-button', '1');
      s.src = 'https://js.stripe.com/v3/buy-button.js';
      document.head.appendChild(s);
      s.onload = () => {
        // once loaded, insert the custom element
        if (stripeContainerRef.current) {
          stripeContainerRef.current.innerHTML = `<stripe-buy-button buy-button-id="${STRIPE_BUY_BUTTON_ID}" publishable-key="${STRIPE_PUBLISHABLE_KEY}"></stripe-buy-button>`;
        }
      };
    } else {
      // script exists — just insert the element
      if (stripeContainerRef.current) {
        stripeContainerRef.current.innerHTML = `<stripe-buy-button buy-button-id="${STRIPE_BUY_BUTTON_ID}" publishable-key="${STRIPE_PUBLISHABLE_KEY}"></stripe-buy-button>`;
      }
    }
  }, [showStripe]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-32 right-16 opacity-10 animate-pulse" style={{ animationDuration: '2.5s' }}>
          <svg className="w-24 h-24 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <div className="absolute bottom-32 left-20 opacity-8 animate-bounce" style={{ animationDuration: '3.5s' }}>
          <svg className="w-28 h-28 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <SEO title="Checkout | Orju Merchandise" description="Checkout for your Orju merchandise order." />
      <Navigation />
      <main className="container mx-auto py-8 px-4 relative z-10">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
        {success ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded mb-8">
            Thank you for your order! We will contact you soon.
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Your Order</h2>
              {cart.length === 0 ? (
                <p className="text-muted-foreground">Your cart is empty.</p>
              ) : (
                <ul className="mb-6 space-y-4">
                  {cart.map((item: any, idx: number) => (
                    <li key={item.id + idx} className="flex items-center gap-4 border-b pb-4">
                      <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <div className="font-bold">{item.name}</div>
                        <div className="text-muted-foreground text-sm">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-bold">{formatPrice(item.price)}</div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="text-xl font-bold">Total: {formatPrice(total)}</div>
            </div>
            <form className="flex-1 flex flex-col gap-4 max-w-md" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-2">Your Details</h2>
              <label className="font-semibold">
                Name
                <input type="text" className="border rounded px-3 py-2 w-full mt-1" value={name} onChange={e => setName(e.target.value)} required />
              </label>
              <label className="font-semibold">
                Email
                <input type="email" className="border rounded px-3 py-2 w-full mt-1" value={email} onChange={e => setEmail(e.target.value)} required />
              </label>
              <label className="font-semibold">
                Address
                <textarea className="border rounded px-3 py-2 w-full mt-1" value={address} onChange={e => setAddress(e.target.value)} required />
              </label>
              {error && <div className="text-red-600">{error}</div>}
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-6 py-3 rounded font-bold text-xl hover:bg-primary/90 transition-colors mt-4"
                disabled={submitting || cart.length === 0}
              >
                {submitting ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
