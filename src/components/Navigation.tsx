import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Contact", path: "/contact" },
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Merchandise", path: "/merchandise" },
  { name: "Careers", path: "/careers" },
];



export const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Always enable dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  const darkMode = true;
  const toggleDarkMode = () => {};

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-lg bg-background/80">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <img src="/favicon.png" alt="ORJU" className="w-6 h-6 inline-block mr-1" />
            <span className="text-gradient">ORJU</span>
            <span className="text-foreground">&nbsp;MEDIA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  item.name === 'Contact'
                    ? 'bg-gradient-to-r from-primary to-red-500 text-white font-bold shadow-lg rounded px-4 py-2 hover:scale-105 transition-transform duration-200'
                    : 'hover:text-primary'
                } ${
                  location.pathname === item.path && item.name !== 'Contact'
                    ? 'text-primary'
                    : item.name !== 'Contact'
                      ? 'text-muted-foreground'
                      : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-sm font-medium transition-colors ${
                  item.name === 'Contact'
                    ? 'bg-gradient-to-r from-primary to-red-500 text-white font-bold shadow-lg rounded px-4 py-2 hover:scale-105 transition-transform duration-200'
                    : 'hover:text-primary'
                } ${
                  location.pathname === item.path && item.name !== 'Contact'
                    ? 'text-primary'
                    : item.name !== 'Contact'
                      ? 'text-muted-foreground'
                      : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
