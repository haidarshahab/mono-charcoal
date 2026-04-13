import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoWhite from "@/assets/logo-dark.png";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/hooks/translations";

const WHATSAPP_URL = "https://wa.me/62881024922133?text=Hi%20Mono%20Charcoal%2C%20I%27m%20interested%20in%20your%20products";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const currentLang = useLanguage();
  const t = getTranslation(currentLang);

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center">
          <img src={logoWhite} alt="Mono Charcoal" className="h-10" />
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-semibold transition-colors ${
                location.pathname === link.href
                  ? "text-amber-500"
                  : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <LanguageSwitcher />
          
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading text-sm">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">{t.common.contactUs}</a>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button className="text-primary-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 text-sm font-medium transition-colors ${
                location.pathname === link.href ? "text-amber-500" : "text-primary-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="w-full mt-2 bg-accent text-accent-foreground hover:bg-accent/90 font-heading text-sm">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">{t.common.contactUs}</a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
