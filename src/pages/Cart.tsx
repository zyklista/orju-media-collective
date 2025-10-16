import { SEO } from "../SEO";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
// Removed duplicate imports and stray code fence

type CartItem = {
  id: string;
  name: string;
  description?: string;
  price: number; // stored as USD in source data
  image_url?: string;
  sizes?: string[];
  quantity: number;
};

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState<string>(() => {
    try {
      return localStorage.getItem('currency') || 'CZK';
    } catch {
      return 'CZK';
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    setCart(stored ? JSON.parse(stored) : []);

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'cart') {
        const newVal = e.newValue;
        setCart(newVal ? JSON.parse(newVal) : []);
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const save = (next: CartItem[]) => {
    setCart(next);
    localStorage.setItem('cart', JSON.stringify(next));
  };

  const remove = (index: number) => {
    const next = cart.filter((_, i) => i !== index);
    save(next);
  };

  const changeQty = (index: number, delta: number) => {
    const next = cart.map((it, i) => i === index ? { ...it, quantity: Math.max(1, it.quantity + delta) } : it);
    save(next);
  };

  // simple static conversion rates
  const rates = { USD: 1, CZK: 24, EUR: 0.95, PHP: 58 } as Record<string, number>;
  const formatPrice = (usd: number) => {
    const rate = (rates as any)[currency] ?? 1;
    const converted = usd * rate;
    // Choose locale/currency formatting per selected currency
    const locale = currency === 'CZK' ? 'cs-CZ' : currency === 'EUR' ? 'de-DE' : currency === 'PHP' ? 'en-PH' : 'en-US';
    return converted.toLocaleString(locale, { style: 'currency', currency });
  };

  const getTotal = () => cart.reduce((s, it) => s + it.price * it.quantity, 0);

  const handleCheckout = async () => {
    if (!cart || cart.length === 0) return;
    // Build payload for the Edge Function
    const payload = {
      cart,
      currency,
      success_url: window.location.origin + '/?checkout=success',
      cancel_url: window.location.origin + '/cart?canceled=true',
    };

    try {
      // Prefer invoking the Supabase Edge Function via the supabase-js client.
      // This ensures the correct project headers are sent (anon key) and avoids
      // exposing the project's service role key in the frontend.
      if (typeof supabase !== 'undefined' && supabase.functions && supabase.functions.invoke) {
        try {
          // Invoke the Edge Function via supabase-js. Different versions/usage
          // can return either a Response-like object or a { data, error } shape.
          const res = await (supabase.functions.invoke as any)('create-checkout', { body: payload });

          // If it's a Fetch/Response-like object, it will have a .json() function.
          if (res && typeof (res as any).json === 'function') {
            const raw = res as unknown as Response;
            const json = await raw.json().catch(() => null);
            if (raw.ok && json && (json as any).url) {
              window.location.href = (json as any).url;
              return;
            }
            console.error('Supabase function (raw) error', json);
            alert('Failed to start checkout: ' + ((json && (json as any).error) || (json && (json as any).message) || 'Unknown error'));
            return;
          }

          // Otherwise, try the { data, error } shaped response or direct object.
          const shaped = res as any;
          if (shaped && shaped.data && shaped.data.url) {
            window.location.href = shaped.data.url;
            return;
          }
          if (shaped && shaped.url) {
            window.location.href = shaped.url;
            return;
          }
          if (shaped && shaped.error) {
            console.error('Supabase function error', shaped.error);
            alert('Failed to start checkout: ' + (shaped.error.message || JSON.stringify(shaped.error)));
            return;
          }

          console.error('Unknown supabase.functions.invoke response', shaped);
          alert('Failed to start checkout: Unknown response from function');
          return;
        } catch (err: any) {
          // supabase-js may throw network errors; surface details and try a
          // direct fetch fallback that includes both apikey and Authorization
          // headers (some runtimes accept both).
          console.error('supabase.functions.invoke failed:', err);
          // Attempt fallback with explicit headers (reads anon key from env)
          const anon = (import.meta.env.VITE_SUPABASE_ANON_KEY || '');
          if (!anon) {
            alert('Failed to start checkout: missing VITE_SUPABASE_ANON_KEY in environment');
            return;
          }

          try {
            const server = 'https://gakgjtaykpflknfmezez.supabase.co/functions/v1/create-checkout';
            const resp = await fetch(server, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': anon,
                'Authorization': `Bearer ${anon}`,
              },
              body: JSON.stringify(payload),
            });
            const json = await resp.json().catch(() => null);
            if (resp.ok && json && json.url) {
              window.location.href = json.url;
              return;
            }
            console.error('Fallback fetch after invoke failure failed', err, json);
            alert('Failed to start checkout: ' + (json?.error || json?.message || String(err)));
            return;
          } catch (err2: any) {
            console.error('Fallback fetch also failed', err2);
            alert('Failed to start checkout: Failed to send a request to the Edge Function (' + String(err2) + ')');
            return;
          }
        }
      }

      // Fallback: direct fetch to the function URL (requires apikey header when calling externally)
      const server = 'https://gakgjtaykpflknfmezez.supabase.co/functions/v1/create-checkout';
      const resp = await fetch(server, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await resp.json();
      if (resp.ok && json.url) {
        window.location.href = json.url;
        return;
      }
      console.error('Fallback fetch failed', json);
      alert('Failed to start checkout: ' + (json?.error || json?.message || 'Unknown error'));
    } catch (err: any) {
      console.error(err);
      alert('Failed to start checkout: ' + String(err));
    }
  };

  return (
    <div className="min-h-screen">
      <SEO title="Your Cart | Orju Merchandise" description="Review items in your cart" />
      <Navigation />
  <main className="container mx-auto pt-32 pb-32 px-4">
        <h1 className="text-4xl font-bold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-lg text-muted-foreground">
            Your cart is empty. <button className="underline text-primary" onClick={() => navigate('/merchandise')}>Shop Merchandise</button>
          </p>
        ) : (
          <div className="space-y-6">
            {cart.map((it, i) => (
              <div key={it.id + String(i)} className="flex items-center gap-4 border rounded p-4 bg-card/80">
                <img
                  src={it.image_url && (it.image_url.startsWith('http') || it.image_url.startsWith('/')) ? it.image_url : (it.image_url ? '/' + it.image_url.replace(/^\/+/, '') : '/placeholder.svg')}
                  alt={it.name}
                  className="w-28 h-28 object-cover rounded"
                  onError={(e: any) => { e.currentTarget.src = '/placeholder.svg'; }}
                />

                <div className="flex-1">
                  <div className="font-semibold text-lg">{it.name}</div>
                  {it.sizes && it.sizes.length > 0 && <div className="text-sm">Size: {it.sizes.join(', ')}</div>}
                  <div className="mt-2 text-sm text-muted-foreground">{it.description}</div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="font-bold">{formatPrice(it.price)}</div>

                  <div className="flex items-center gap-2">
                    <button className="px-2 py-1 border rounded" onClick={() => changeQty(i, -1)}>-</button>
                    <div className="px-3">{it.quantity}</div>
                    <button className="px-2 py-1 border rounded" onClick={() => changeQty(i, +1)}>+</button>
                  </div>

                  <div className="text-sm">Line: {formatPrice(it.price * it.quantity)}</div>
                  <button className="mt-2 text-sm text-red-600" onClick={() => remove(i)}>Remove</button>
                </div>
              </div>
            ))}

            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold">Total: {formatPrice(getTotal())}</div>
                <button
                  className="px-6 py-3 bg-primary text-primary-foreground rounded font-bold"
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                >
                  Checkout
                </button>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium">Currency:</label>
                <select
                  value={currency}
                  onChange={(e) => {
                    const next = e.target.value;
                    setCurrency(next);
                    try { localStorage.setItem('currency', next); } catch {}
                  }}
                  className="border rounded px-2 py-1 bg-neutral-900 text-white border-neutral-700 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-800"
                >
                  <option value="CZK">CZK</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="PHP">PHP</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}