import { Button } from "@/components/ui/button";
import { MessageCircle, Mail } from "lucide-react";
import { usePageTranslation } from "@/hooks/usePageTranslation";

const WHATSAPP_URL = "https://wa.me/62881024922133?text=Hi%20Mono%20Charcoal%2C%20I%27m%20interested%20in%20your%20products";

const HeroSection = () => {
  const { t } = usePageTranslation();
  
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row bg-primary overflow-hidden">
      {/* Left side - Content with dark green background */}
      <div className="w-full lg:w-[40%] flex items-center order-1">
        <div className="container px-4 lg:px-8 pt-24 pb-8 lg:py-24">
          <p className="font-heading text-accent text-sm lg:text-base font-semibold uppercase tracking-widest mb-3 lg:mb-4 animate-fade-in">
            {t.hero.title}
          </p>
          <h1 className="font-heading text-3xl lg:text-5xl font-bold text-primary-foreground leading-tight mb-4 lg:mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t.hero.subtitle}
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-xl mb-10 font-body animate-fade-in md:text-lg" style={{ animationDelay: "0.2s" }}>
            {t.common.manufacturer}
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

      {/* Right side - Video */}
      <div className="w-full lg:w-[60%] h-[30vh] lg:h-screen order-2 relative overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      </section>
  );
};

export default HeroSection;