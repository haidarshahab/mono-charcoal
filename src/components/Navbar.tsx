import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
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
  const [productsOpen, setProductsOpen] = useState(false);
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
    { label: t.nav.products, href: "/products", hasDropdown: true },
    { label: t.nav.oem, href: "/oem" },
    { label: t.nav.quality, href: "/quality" },
    { label: t.nav.export, href: "/export" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const productsSubLinks = [
    { label: "All Products", href: "/products" },
    { label: "Shisha Charcoal", href: "/products/shisha" },
    { label: "BBQ Charcoal", href: "/products/bbq" },
  ];

  const isAtTop = !scrolled;
  const isProductsActive = location.pathname.startsWith("/products");

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
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <div key={link.href} className="relative h-16 flex items-center">
                {link.hasDropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                        isProductsActive
                          ? "text-accent"
                          : isAtTop 
                            ? "text-white/90 hover:text-white" 
                            : "text-foreground hover:text-accent"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} />
                    </button>
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                      isProductsActive ? "w-full" : "w-0"
                    }`} />
                    {/* Dropdown */}
                    <div 
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2 overflow-hidden"
                      style={{ 
                        opacity: productsOpen ? 1 : 0, 
                        transform: productsOpen ? "translateY(0)" : "translateY(-10px)",
                        visibility: productsOpen ? "visible" : "hidden",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {productsSubLinks.map((subLink) => (
                        <Link
                          key={subLink.href}
                          to={subLink.href}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            location.pathname === subLink.href
                              ? "bg-accent/10 text-accent font-medium"
                              : "text-slate-700 hover:bg-accent/5 hover:text-accent"
                          }`}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    className={`relative text-sm font-medium transition-colors ${
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
                )}
              </div>
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
              <div key={link.href}>
                {link.hasDropdown ? (
                  <>
                    <Link
                      to="/products"
                      className={`block py-3 px-4 text-sm font-medium rounded-lg transition-colors ${
                        location.pathname === "/products" 
                          ? "bg-accent/10 text-accent" 
                          : "text-foreground hover:bg-accent/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                    <div className="ml-4 space-y-1 border-l-2 border-slate-200 pl-4">
                      {productsSubLinks.map((subLink) => (
                        <Link
                          key={subLink.href}
                          to={subLink.href}
                          className={`block py-2 px-2 text-sm transition-colors ${
                            location.pathname === subLink.href
                              ? "text-accent font-medium" 
                              : "text-slate-600 hover:text-accent"
                          }`}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.href}
                    className={`block py-3 px-4 text-sm font-medium rounded-lg transition-colors ${
                      location.pathname === link.href 
                        ? "bg-accent/10 text-accent" 
                        : "text-foreground hover:bg-accent/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
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