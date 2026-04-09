import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useState } from "react";

const stats = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Tons Exported" },
  { value: 30, suffix: "+", label: "Countries Served" },
];

function AnimatedCounter({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span className="font-heading text-4xl md:text-5xl font-bold text-primary">
      {count}{suffix}
    </span>
  );
}

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="font-heading text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            About Us
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
            Indonesia's Finest Coconut Charcoal Factory
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-body">
            Mono Charcoal is a leading manufacturer and exporter of premium coconut shell charcoal briquettes. Based in Indonesia, we combine traditional craftsmanship with modern production techniques to deliver the highest quality charcoal for shisha and barbecue use worldwide.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              <p className="text-muted-foreground text-sm font-medium mt-2 font-body">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-16">
          {["ISO Certified", "Halal Certified", "Eco-Friendly", "Lab Tested"].map((badge) => (
            <div
              key={badge}
              className="px-6 py-3 rounded-full border border-border bg-card text-sm font-medium text-foreground font-body"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
