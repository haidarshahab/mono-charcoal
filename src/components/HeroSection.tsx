import { Button } from "@/components/ui/button";
import { MessageCircle, Mail } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/62881024922133?text=Hi%20Mono%20Charcoal%2C%20I%27m%20interested%20in%20your%20products";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-primary overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(155,37%,12%)] opacity-90" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />

      <div className="container relative mx-auto px-4 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          <p className="font-heading text-accent text-sm font-semibold uppercase tracking-widest mb-4 animate-fade-in">
            Premium Coconut Charcoal
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            The Best Coconut Charcoal from Indonesia
          </h1>
          <p className="text-primary-foreground/70 text-lg md:text-xl max-w-xl mb-10 font-body animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Crafted from 100% natural coconut shells. Superior quality shisha and BBQ briquettes, sustainably produced and exported worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading text-base gap-2"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="border-2 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 font-heading text-base gap-2"
            >
              <a href="mailto:haidar@monocoal.com">
                <Mail size={20} />
                Send Email
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
