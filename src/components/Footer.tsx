import { MessageCircle, Mail } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";

const Footer = () => {
  return (
    <footer className="bg-foreground py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img src={logoWhite} alt="Mono Charcoal" className="h-12 mb-3" />
            <p className="text-background/60 text-sm font-body leading-relaxed">
              Indonesia's finest coconut charcoal factory. Premium shisha and BBQ briquettes for global export.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-background mb-3 uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-2">
              {["About", "Products", "Blog", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-background/60 hover:text-background text-sm font-body transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-background mb-3 uppercase tracking-wider">Get in Touch</h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/62881024922133"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-background/60 hover:text-background text-sm font-body transition-colors"
              >
                <MessageCircle size={16} />
                +62 881 0249 22133
              </a>
              <a
                href="mailto:haidar@monocoal.com"
                className="flex items-center gap-2 text-background/60 hover:text-background text-sm font-body transition-colors"
              >
                <Mail size={16} />
                haidar@monocoal.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 text-center">
          <p className="text-background/40 text-xs font-body">
            © {new Date().getFullYear()} Mono Charcoal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
