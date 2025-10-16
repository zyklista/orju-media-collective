import { SEO } from "../SEO";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { ShoppingCart } from "lucide-react";

type MerchandiseItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  sizes?: string[];
};

export default function Merchandise() {
  const [items, setItems] = useState<MerchandiseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currency, setCurrency] = useState<'USD' | 'CZK' | 'EUR' | 'PHP'>('CZK');
  const [cartCount, setCartCount] = useState<number>(0);
  const navigate = useNavigate();

  // Add to cart logic using localStorage
  const addToCart = (item: MerchandiseItem) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ ...item, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartCount(Array.isArray(cart) ? cart.length : 0);
  };

  // Buy now: add to cart then go to cart page
  const buyNow = (item: MerchandiseItem) => {
    addToCart(item);
    navigate('/cart');
  };

  // Example static conversion rates
  const rates = {
    USD: 1,
    PHP: 58,
    EUR: 0.95,
    CZK: 24,
  };

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        setError(error.message);
      } else {
        setItems(data || []);
      }
      setLoading(false);
    };
    fetchItems();
  }, []);

  // initialize cart count and listen for storage changes (other tabs)
  useEffect(() => {
    const readCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartCount(Array.isArray(cart) ? cart.length : 0);
      } catch (e) {
        setCartCount(0);
      }
    };
    readCount();
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key === 'cart') readCount();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        title="Orju Merchandise | T-Shirts, Caps, and More"
        description="Shop Orju Media Collective merchandise: T-shirts, caps, and more. Select your currency and order your favorite Orju Media gear!"
      />
      <Navigation />
      {/* Hero Section */}
      <section className="gradient-hero pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-7xl md:text-8xl font-bold mb-8">
              Orju <span className="text-gradient">Merchandise</span>
            </h1>
            <p className="text-3xl text-muted-foreground">
              Shop our exclusive T-shirts, caps, and more. Select your size, currency, and order your favorite Orju Media gear!
            </p>
          </div>
        </div>
      </section>
      {/* Merchandise Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 animate-fade-in-up">
            <h2 className="text-5xl font-bold mb-6 md:mb-0">Our Products</h2>
            <div className="flex items-center gap-4">
              <label htmlFor="currency" className="mr-2 font-semibold text-xl">Currency:</label>
              <select
                id="currency"
                value={currency}
                onChange={e => setCurrency(e.target.value as 'USD' | 'CZK' | 'EUR' | 'PHP')}
                className="border rounded px-3 py-2 text-lg bg-gray-800 text-white font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ minWidth: 120 }}
              >
                <option value="USD" className="bg-gray-900 text-white">USD ($)</option>
                <option value="CZK" className="bg-gray-900 text-white">CZK (Kč)</option>
                <option value="EUR" className="bg-gray-900 text-white">EUR (€)</option>
                <option value="PHP" className="bg-gray-900 text-white">PHP (₱)</option>
              </select>
              <button
                className="ml-2 relative p-2 rounded-full hover:bg-muted border border-border transition-colors"
                aria-label="View Cart"
                onClick={() => navigate('/cart')}
              >
                <ShoppingCart className="w-7 h-7" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full shadow"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center animate-fade-in-up">
            {items.map((item) => {
              const convertedPrice = item.price * rates[currency];
              let priceString = '';
              if (currency === 'CZK') {
                priceString = convertedPrice.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' });
              } else if (currency === 'EUR') {
                priceString = convertedPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
              } else if (currency === 'PHP') {
                priceString = '₱' + Math.round(convertedPrice).toLocaleString('en-PH');
              } else {
                priceString = '$' + convertedPrice.toFixed(2);
              }
              return (
                <div key={item.id} className="bg-card/80 rounded-lg border border-border/50 shadow-card p-10 w-full max-w-md flex flex-col items-center">
                  <img
                    src={
                      item.image_url
                        ? item.image_url.startsWith("http") || item.image_url.startsWith("/")
                          ? item.image_url
                          : "/" + item.image_url.replace(/^\/+/, "")
                        : "/placeholder.svg"
                    }
                    alt={item.name}
                    className="w-full h-72 object-cover mb-6 rounded shadow-lg"
                    style={{ maxWidth: 320 }}
                    onError={e => { e.currentTarget.src = "/placeholder.svg"; }}
                  />
                  <h2 className="text-2xl font-bold mb-2 text-center">{item.name}</h2>
                  <p className="text-base text-muted-foreground text-center mb-2">{item.description}</p>
                  <span className="text-lg font-bold mb-3">{priceString}</span>
                  {item.sizes && item.sizes.length > 0 && (
                    <div className="mb-3 w-full">
                      <span className="font-semibold text-base">Sizes: </span>
                      <span className="text-base font-semibold">{item.sizes.join(", ")}</span>
                    </div>
                  )}
                  <div className="mt-4 w-full grid grid-cols-2 gap-4">
                    <button
                      className="px-4 py-2 bg-card/80 text-card-foreground rounded font-semibold text-sm hover:bg-card/70 transition-colors w-full shadow-sm"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="px-4 py-2 bg-primary text-primary-foreground rounded font-semibold text-sm hover:bg-primary/90 transition-colors w-full shadow-glow"
                      onClick={() => buyNow(item)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
