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
      
      // Check if environment variables are set
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      console.log('🛍️ Merchandise Page - Environment Check:');
      console.log('VITE_SUPABASE_URL:', supabaseUrl ? 'SET ✓' : 'MISSING ✗');
      console.log('VITE_SUPABASE_ANON_KEY:', supabaseKey ? 'SET ✓' : 'MISSING ✗');
      
      if (!supabaseUrl || !supabaseKey) {
        console.error('❌ Supabase configuration missing!');
        setError('Configuration Error: Please check environment variables in deployment settings.');
        setLoading(false);
        return;
      }
      
      try {
        console.log('📦 Fetching products from Supabase...');
        
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });
          
        if (error) {
          console.error('❌ Supabase error:', error);
          console.error('Error code:', error.code);
          console.error('Error message:', error.message);
          console.error('Error details:', error.details);
          
          // Provide helpful error messages
          if (error.code === 'PGRST116') {
            setError('Products table not found. Please contact support.');
          } else if (error.message.includes('JWT')) {
            setError('Authentication error. Please check API configuration.');
          } else {
            setError(`Database Error: ${error.message}`);
          }
        } else {
          console.log('✅ Products fetched successfully:', data?.length || 0, 'items');
          
          if (data && data.length > 0) {
            setItems(data);
            setError(null);
          } else {
            setError('No products available at the moment');
          }
        }
      } catch (err) {
        console.error('❌ Unexpected error:', err);
        setError(`Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
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
      <section className="gradient-hero pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Floating shopping icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 right-16 opacity-15 animate-pulse" style={{ animationDuration: '2.5s' }}>
            <ShoppingCart className="w-20 h-20 text-primary" />
          </div>
          <div className="absolute bottom-24 left-20 opacity-10 animate-bounce" style={{ animationDuration: '3.5s' }}>
            <svg className="w-24 h-24 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
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
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
              <p className="text-lg text-muted-foreground">Loading products...</p>
            </div>
          )}
          {error && (
            <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-6 text-center">
              <p className="text-destructive font-semibold text-lg">Error loading products</p>
              <p className="text-muted-foreground mt-2">{error}</p>
            </div>
          )}
          {!loading && !error && items.length === 0 && (
            <div className="text-center py-20">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">No products available at the moment</p>
            </div>
          )}
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
                  <div className="w-full h-72 mb-6 rounded shadow-lg bg-muted/30 flex items-center justify-center overflow-hidden" style={{ maxWidth: 320 }}>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
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
