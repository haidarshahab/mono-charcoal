import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/62881024922133?text=Hi%20Mono%20Charcoal%2C%20I%27m%20interested%20in%20your%20products";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <a href="#" className="font-heading text-xl font-bold text-primary-foreground tracking-tight">
          Mono Charcoal
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button
            asChild
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading text-sm"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Get in Touch
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10 px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button
            asChild
            className="w-full mt-2 bg-accent text-accent-foreground hover:bg-accent/90 font-heading text-sm"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Get in Touch
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
