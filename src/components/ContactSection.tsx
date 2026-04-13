import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Mail, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/hooks/translations";

const WHATSAPP_URL = "https://wa.me/62881024922133?text=Hi%20Mono%20Charcoal%2C%20I%27m%20interested%20in%20your%20products";

const ContactSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { toast } = useToast();
  const currentLang = useLanguage();
  const t = getTranslation(currentLang);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.open(`mailto:admin@monocharcoal.com?subject=${subject}&body=${body}`);
    toast({ title: t.contact.openingEmail, description: "Your message is being prepared." });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-primary">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: CTA */}
          <div>
            <p className="font-heading text-accent text-sm font-semibold uppercase tracking-widest mb-4">
              {t.contact.title}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              {t.contact.subtitle}
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-10 font-body leading-relaxed">
              {t.contact.cta}
            </p>

            <div className="space-y-4 px-0">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 font-heading gap-2"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={20} />
                  {t.contact.whatsapp}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto border-2 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 font-heading gap-2 ml-0 sm:ml-4 mx-0"
              >
                <a href="mailto:admin@monocharcoal.com">
                  <Mail size={20} />
                  {t.contact.email}
                </a>
              </Button>
            </div>
          </div>

          {/* Right: Contact form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder={t.contact.yourName}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              maxLength={100}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
            />
            <Input
              type="email"
              placeholder={t.contact.yourEmail}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              maxLength={255}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
            />
            <Textarea
              placeholder={t.contact.yourMessage}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              maxLength={1000}
              rows={5}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 resize-none"
            />
            <Button
              type="submit"
              size="lg"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-heading gap-2"
            >
              <Send size={18} />
              {t.contact.send}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
