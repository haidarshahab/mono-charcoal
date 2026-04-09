import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Flame, Wind, Sparkles } from "lucide-react";
import shishaImg from "@/assets/shisha-charcoal.jpg";
import bbqImg from "@/assets/bbq-charcoal.jpg";

const WHATSAPP_URL = "https://wa.me/62881024922133?text=Hi%20Mono%20Charcoal%2C%20I%27m%20interested%20in%20your%20products";

const products = [
  {
    name: "Shisha Charcoal",
    image: shishaImg,
    description: "Premium cube and flat-shaped briquettes designed for hookah use. Clean burn, minimal ash, and long-lasting heat.",
    specs: [
      { icon: Flame, label: "Burn Time", value: "90+ minutes" },
      { icon: Sparkles, label: "Ash Content", value: "< 3%" },
      { icon: Wind, label: "No Odor", value: "Tasteless" },
    ],
  },
  {
    name: "BBQ Charcoal",
    image: bbqImg,
    description: "High-heat hexagonal and pillow briquettes perfect for grilling. Consistent temperature and easy to light.",
    specs: [
      { icon: Flame, label: "Burn Time", value: "120+ minutes" },
      { icon: Sparkles, label: "Ash Content", value: "< 5%" },
      { icon: Wind, label: "Heat Value", value: "7000+ kcal" },
    ],
  },
];

const ProductsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="products" className="py-20 md:py-32 bg-card">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-center mb-16">
          <p className="font-heading text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Our Products
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Premium Charcoal for Every Need
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
                    Order via WhatsApp
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
