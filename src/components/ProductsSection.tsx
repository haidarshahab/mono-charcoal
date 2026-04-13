import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Flame, Wind, Sparkles } from "lucide-react";
import shishaImg from "@/assets/shisha-charcoal.jpg";
import bbqImg from "@/assets/bbq-charcoal.jpg";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/hooks/translations";

const WHATSAPP_URL = "https://wa.me/62881024922133?text=Hi%20Mono%20Charcoal%2C%20I%27m%20interested%20in%20your%20products";

const ProductsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const currentLang = useLanguage();
  const t = getTranslation(currentLang);

  const products = [
    {
      name: t.products.shishaName,
      image: shishaImg,
      description: t.products.shishaDesc,
      specs: [
        { icon: Flame, label: t.products.burnTime, value: "120+ minutes" },
        { icon: Sparkles, label: t.products.ashContent, value: "< 1.9%" },
        { icon: Wind, label: t.products.noOdor, value: "Tasteless" },
      ],
    },
    {
      name: t.products.bbqName,
      image: bbqImg,
      description: t.products.bbqDesc,
      specs: [
        { icon: Flame, label: t.products.burnTime, value: "120+ minutes" },
        { icon: Sparkles, label: t.products.ashContent, value: "< 5%" },
        { icon: Wind, label: t.products.heatValue, value: "7000+ kcal" },
      ],
    },
  ];

  return (
    <section id="products" className="py-20 bg-card md:py-[120px]">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-center mb-16">
          <p className="font-heading text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            {t.products.title}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            {t.products.subtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product) => (
            <Card key={product.name} className="border border-border bg-[#F8F7F4] overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img src={product.image} alt={product.name} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <CardHeader>
                <CardTitle className="font-heading text-xl">{product.name}</CardTitle>
                <p className="text-muted-foreground text-sm font-body">{product.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="text-center p-3 rounded-lg bg-muted">
                      <spec.icon size={18} className="mx-auto mb-1 text-accent" />
                      <p className="text-xs text-muted-foreground font-body">{spec.label}</p>
                      <p className="text-sm font-semibold text-foreground font-heading">{spec.value}</p>
                    </div>
                  ))}
                </div>
                <Button
                  asChild
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-heading gap-2"
                >
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={18} />
                    {t.common.getSample}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
