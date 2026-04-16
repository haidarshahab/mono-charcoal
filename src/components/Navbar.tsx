import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoWhite from "@/assets/logo-dark.png";
import logoGreen from "@/assets/logo-green.png";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/hooks/translations";

const WHATSAPP_URL = "https://wa.me/62881024922133?text=Hi%20Mono%20Charcoal%2C%20I%27m%20interested%20in%20your%20products";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const currentLang = useLanguage();
  const t = getTranslation(currentLang);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.products, href: "/products" },
    { label: t.nav.oem, href: "/oem" },
    { label: t.nav.quality, href: "/quality" },
    { label: t.nav.export, href: "/export" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.contact, href: "/contact" },
  ];

  // At top: dark green bg, white text
  // Scrolled: white bg, dark green text
  const isAtTop = !scrolled;

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isAtTop 
            ? "bg-primary md:bg-primary" 
            : "bg-white md:bg-background/98 md:backdrop-blur-md md:shadow-md"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
          <Link to="/" className="flex items-center z-50">
            <img 
              src={isAtTop ? logoWhite : logoGreen} 
              alt="Mono Charcoal" 
              className="h-9 transition-opacity duration-300" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative text-sm font-medium transition-colors group ${
                  location.pathname === link.href
                    ? "text-accent"
                    : isAtTop 
                      ? "text-white/90 hover:text-white" 
                      : "text-foreground hover:text-accent"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                  location.pathname === link.href 
                    ? "w-full" 
                    : "w-0 group-hover:w-full"
                }`} />
              </Link>
            ))}
            
            <LanguageSwitcher 
              className={isAtTop ? "text-white/90" : "text-foreground"}
            />
            
            <Button 
              asChild 
              className={`${
                isAtTop 
                  ? "bg-accent text-white hover:bg-accent/90" 
                  : "bg-accent text-white hover:bg-accent/90"
              } font-heading text-xs px-4 py-2 rounded-full`}
            >
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {t.common.contactUs}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden z-50">
            <LanguageSwitcher className={isAtTop ? "text-white" : "text-foreground"} />
            <button 
              className={`p-2 ${isAtTop ? "text-white" : "text-foreground"}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Slide in from right */}
        <div 
          className={`fixed top-16 right-0 bottom-0 w-72 bg-card z-40 transform transition-transform duration-300 md:hidden ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block py-3 px-4 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.href 
                    ? "bg-accent/10 text-accent" 
                    : "text-foreground hover:bg-accent/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <Button 
                asChild 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-heading text-sm"
              >
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {t.common.contactUs}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;