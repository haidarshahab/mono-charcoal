import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/hooks/translations";

const stats = [
  { value: 10, suffix: "+", labelKey: "yearsExp" as const },
  { value: 1000, suffix: "+", labelKey: "tonsExported" as const },
  { value: 15, suffix: "+", labelKey: "countries" as const },
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
  const currentLang = useLanguage();
  const t = getTranslation(currentLang);

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="font-heading text-accent text-sm font-semibold uppercase tracking-widest mb-3">
            {t.about.title}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.about.subtitle}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-body">
            {t.about.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.labelKey} className="text-center p-4">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              <p className="text-muted-foreground text-sm font-medium mt-1 font-body">{t.about[stat.labelKey]}</p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {[t.about.iso, t.about.halal, t.about.eco, t.about.labTested].map((badge) => (
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
