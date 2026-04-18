import { MessageCircle, Mail, MapPin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import logoWhite from "@/assets/logo-dark.png";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/hooks/translations";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const currentLang = useLanguage();
  const t = getTranslation(currentLang);

  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <img src={logoWhite} alt="Mono Charcoal" className="h-12 mb-3" />
            </Link>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              {t.footer.description}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-3 uppercase tracking-wider">{t.footer.products}</h4>
            <div className="space-y-2">
              <Link to="/products/shisha" className="block text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">{t.footer.shisha}</Link>
              <Link to="/products/bbq" className="block text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">{t.footer.bbq}</Link>
              <Link to="/oem" className="block text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">{t.footer.oem}</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-3 uppercase tracking-wider">{t.footer.company}</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">{t.footer.about}</Link>
              <Link to="/quality" className="block text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">{t.footer.quality}</Link>
              <Link to="/export" className="block text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">{t.footer.export}</Link>
              <Link to="/blog" className="block text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">{t.nav.blog}</Link>
              <Link to="/contact" className="block text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">{t.footer.contact}</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-3 uppercase tracking-wider">{t.footer.getInTouch}</h4>
            <div className="space-y-3">
              <a href="https://wa.me/62881024922133" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                <MessageCircle size={16} /> +62 881 0249 22133
              </a>
              <a href="mailto:admin@monocharcoal.com" className="flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                <Mail size={16} /> admin@monocharcoal.com
              </a>
              <a href="https://www.instagram.com/mono.coal/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                <Instagram size={16} /> @mono.coal
              </a>
              <div className="flex items-start gap-2 text-primary-foreground/60 text-sm">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>{t.footer.factoryAddress}</span>
              </div>
              <div className="flex items-start gap-2 text-primary-foreground/60 text-sm">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>{t.footer.officeAddress}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center">
          <p className="text-primary-foreground/40 text-xs">© {currentYear} Mono Charcoal. {t.footer.allRights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;