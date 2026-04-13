import { Button } from "@/components/ui/button";
import { MessageCircle, Mail } from "lucide-react";
import { usePageTranslation } from "@/hooks/usePageTranslation";

const WHATSAPP_URL = "https://wa.me/62881024922133?text=Hi%20Mono%20Charcoal%2C%20I%27m%20interested%20in%20your%20products";

const HeroSection = () => {
  const { t } = usePageTranslation();
  
  return (
    <section className="relative min-h-screen flex items-center bg-primary overflow-hidden">
      {/* Background YouTube video */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <iframe
          src="https://www.youtube.com/embed/XSiE4uprEvg?autoplay=1&mute=1&loop=1&playlist=XSiE4uprEvg&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1"
          title="Background video"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] min-w-full min-h-full opacity-30"
          style={{ border: 'none', aspectRatio: '16/9' }}
          allow="autoplay; encrypted-media"
        />
      </div>
      {/* Dark green overlay */}
      <div className="absolute inset-0 bg-primary/70" />

      <div className="container relative mx-auto px-4 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          <p className="font-heading text-accent text-sm font-semibold uppercase tracking-widest mb-4 animate-fade-in">
            {t.hero.title}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t.hero.subtitle}
          </h1>
          <p className="text-primary-foreground/70 text-lg md:text-xl max-w-xl mb-10 font-body animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t.common.manufacturer} - {t.common.exporter}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading text-base gap-2"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={20} />
                {t.hero.cta2}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="border-2 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 font-heading text-base gap-2"
            >
              <a href="mailto:admin@monocharcoal.com">
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
