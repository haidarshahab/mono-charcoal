import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Award, Leaf, Globe, Package } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Lab-tested briquettes with consistent heat output, minimal ash, and no chemical additives.",
  },
  {
    icon: Leaf,
    title: "Sustainable Sourcing",
    description: "Made from 100% recycled coconut shells, supporting eco-friendly production and zero deforestation.",
  },
  {
    icon: Globe,
    title: "Global Export",
    description: "Trusted by clients in 30+ countries across the Middle East, Europe, Asia, and the Americas.",
  },
  {
    icon: Package,
    title: "Custom Packaging",
    description: "OEM and private label options available. We tailor packaging to your brand specifications.",
  },
];

const WhyChooseUsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 md:py-32 bg-background">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-center mb-16">
          <p className="font-heading text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Why Mono Charcoal
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Quality You Can Trust
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="text-center p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
