import { MessageCircle, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logoWhite from "@/assets/logo-white.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <img src={logoWhite} alt="Mono Charcoal" className="h-12 mb-3" />
            </Link>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Indonesia's finest coconut charcoal factory. Premium shisha and BBQ briquettes for global export.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-3 uppercase tracking-wider">Products</h4>
            <div className="space-y-2">
              <Link to="/products/shisha" className="block text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">Shisha Charcoal</Link>
              <Link to="/products/bbq" className="block text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">BBQ Charcoal</Link>
              <Link to="/oem" className="block text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">OEM Services</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-3 uppercase tracking-wider">Company</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">About Us</Link>
              <Link to="/quality" className="block text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">Quality</Link>
              <Link to="/export" className="block text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">Export Info</Link>
              <Link to="/blog" className="block text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">Blog</Link>
              <Link to="/contact" className="block text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-3 uppercase tracking-wider">Get in Touch</h4>
            <div className="space-y-3">
              <a href="https://wa.me/62881024922133" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                <MessageCircle size={16} /> +62 881 0249 22133
              </a>
              <a href="mailto:admin@monocharcoal.com" className="flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                <Mail size={16} /> admin@monocharcoal.com
              </a>
              <div className="flex items-start gap-2 text-primary-foreground/60 text-sm">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>Bekasi, West Java, Indonesia</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center">
          <p className="text-primary-foreground/40 text-xs">© {currentYear} Mono Charcoal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;