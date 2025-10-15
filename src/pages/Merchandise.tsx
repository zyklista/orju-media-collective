import { SEO } from "../SEO";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { useState } from "react";

const products = [
  // T-Shirts
  {
    name: "Orju T-Shirt",
    image: "/placeholder.svg",
    price: "$25",
    description: "High-quality cotton t-shirt with Orju Media branding.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    name: "Diary Shirt Powder Blue",
    image: "/placeholder.svg",
    price: "$27",
    description: "Powder blue t-shirt with Diary logo.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    name: "Diary Shirt Peach",
    image: "/placeholder.svg",
    price: "$27",
    description: "Peach t-shirt with Diary logo.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    name: "Diary Shirt Black",
    image: "/placeholder.svg",
    price: "$27",
    description: "Black t-shirt with Diary logo.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  // Caps
  {
    name: "Orju Cap",
    image: "/placeholder.svg",
    price: "$18",
    description: "Classic cap with embroidered Orju Media logo.",
    quantity: 5,
  },
  {
    name: "Diary Baseball Cap Blue",
    image: "/placeholder.svg",
    price: "$20",
    description: "Blue baseball cap with Diary logo.",
    quantity: 5,
  },
  {
    name: "Diary Baseball Cap Navy Blue",
    image: "/placeholder.svg",
    price: "$20",
    description: "Navy blue baseball cap with Diary logo.",
    quantity: 5,
  },
  {
    name: "Diary Baseball Cap Black",
    image: "/placeholder.svg",
    price: "$20",
    description: "Black baseball cap with Diary logo.",
    quantity: 5,
  },
  {
    name: "Diary Denim Cap Dark Gray",
    image: "/placeholder.svg",
    price: "$22",
    description: "Denim cap in dark gray with Diary logo.",
    quantity: 5,
  },
  {
    name: "Diary Denim Cap Light Gray",
    image: "/placeholder.svg",
    price: "$22",
    description: "Denim cap in light gray with Diary logo.",
    quantity: 5,
  },
];


function Merchandise() {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [capCount, setCapCount] = useState(1);
  const [currency, setCurrency] = useState("USD");

  // Example static conversion rates
  const rates = {
    USD: 1,
    PHP: 58,
    EUR: 0.95,
    CZK: 24,
  };

  const currencySymbols = {
    USD: "$",
    PHP: "₱",
    EUR: "€",
    CZK: "Kč",
  };

  const handleSizeChange = (productName: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productName]: size }));
  };

  const convertPrice = (usdPrice: string) => {
    const num = parseFloat(usdPrice.replace("$", ""));
    const converted = num * rates[currency];
    return currency === "PHP" ? Math.round(converted) : converted.toFixed(2);
  };

  return (
    <div className="min-h-screen">
      <SEO title="Merchandise | Orju Media Collective" description="Shop Orju Media Collective merchandise: T-shirts in all sizes and classic caps. Limited stock available!" />
      <Navigation />
      {/* Hero Section */}
      <section className="relative gradient-hero pt-28 pb-14 px-3 sm:px-6 overflow-hidden">
        <img
          src="/hero-bg.svg"
          alt="Decorative background"
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] max-w-none opacity-60 pointer-events-none select-none"
          style={{ left: '50%', transform: 'translateX(-50%)', top: 20 }}
          aria-hidden="true"
        />
        <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
          <h1 className="text-5xl xs:text-7xl md:text-8xl font-bold mb-8 xs:mb-10 leading-tight animate-fade-in">
            Orju <span className="text-gradient">Merchandise</span>
          </h1>
          <p className="text-2xl xs:text-3xl text-muted-foreground max-w-2xl mb-10 xs:mb-14 animate-fade-in" style={{animationDelay: '100ms'}}>
            Shop our exclusive T-shirts and caps. Select your size, currency, and order your favorite Orju Media gear!
          </p>
        </div>
      </section>
      {/* Merchandise Section */}
      <section className="py-0 px-0">
        <div className="w-full">
          <div className="flex justify-center mb-12 xs:mb-20 animate-fade-in-up">
            <label htmlFor="currency" className="mr-4 text-2xl xs:text-3xl font-bold">Currency:</label>
            <select
              id="currency"
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              className="border rounded px-4 py-2 text-2xl xs:text-3xl"
            >
              <option value="USD">USD ($)</option>
              <option value="PHP">PHP (₱)</option>
              <option value="EUR">EUR (€)</option>
              <option value="CZK">CZK (Kč)</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center animate-fade-in-up">
            {products.map((product) => (
              <div key={product.name} className="bg-card/80 rounded-lg border border-border/50 shadow-card p-8 w-full max-w-xs flex flex-col items-center">
                <img src={product.image} alt={product.name} className="w-40 h-40 object-contain mb-6" />
                <h2 className="text-3xl font-bold mb-3 text-center">{product.name}</h2>
                <p className="text-xl text-muted-foreground text-center mb-3">{product.description}</p>
                <span className="text-2xl font-bold mb-4">
                  {currencySymbols[currency]}{convertPrice(product.price)}
                </span>
                {product.sizes && (
                  <div className="mb-4 w-full">
                    <label className="block text-lg font-bold mb-2">Select Size:</label>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {product.sizes.map((size: string) => (
                        <button
                          key={size}
                          className={`px-4 py-2 rounded border text-lg font-bold ${selectedSizes[product.name] === size ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
                          onClick={() => handleSizeChange(product.name, size)}
                          type="button"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {product.quantity && (
                  <div className="mb-4 w-full">
                    <label className="block text-lg font-bold mb-2">Quantity (max {product.quantity}):</label>
                    <input
                      type="number"
                      min={1}
                      max={product.quantity}
                      value={capCount}
                      onChange={e => setCapCount(Math.max(1, Math.min(product.quantity, Number(e.target.value))))}
                      className="w-24 px-3 py-2 border rounded text-center text-lg"
                    />
                  </div>
                )}
                <button className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded font-bold text-xl hover:bg-primary/90 transition-colors w-full shadow-glow">Contact to Order</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Merchandise;