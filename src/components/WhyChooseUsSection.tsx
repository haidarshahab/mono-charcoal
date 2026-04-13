import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Clock, FileCheck, Ship, FlaskConical, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/hooks/translations";

const WhyChooseUsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const currentLang = useLanguage();
  const t = getTranslation(currentLang);

  const solutions = [
    { icon: Clock, number: "01", titleKey: "onTime" as const, descKey: "onTimeDesc" as const },
    { icon: FileCheck, number: "02", titleKey: "docs" as const, descKey: "docsDesc" as const },
    { icon: Ship, number: "03", titleKey: "logistics" as const, descKey: "logisticsDesc" as const },
    { icon: FlaskConical, number: "04", titleKey: "quality" as const, descKey: "qualityDesc" as const },
  ];

  return (
    <section className="py-0 md:py-0">
      <div
        ref={ref}
        className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left — Problem statement */}
          <div className="bg-primary px-8 md:px-16 lg:px-20 flex flex-col justify-center py-[80px]">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-6 font-heading">
              {t.whyChoose.title}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
              {t.whyChoose.subtitle}
              <span className="block mt-2 text-white/60 font-normal text-2xl md:text-3xl lg:text-4xl">
                {t.whyChoose.butFinding}
              </span>
            </h2>
            <div className="w-12 h-[2px] bg-accent mb-8" />
            <p className="text-white/70 text-base md:text-lg leading-relaxed font-body max-w-lg">
              {t.whyChoose.description}
            </p>
          </div>

          {/* Right — Solutions */}
          <div className="bg-[#F8F7F4] px-8 py-20 md:px-16 lg:px-20 flex flex-col justify-center">
            <div className="space-y-10">
              {solutions.map((item, i) => (
                <div
                  key={item.number}
                  className={`flex gap-6 items-start transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: `${300 + i * 150}ms` }}
                >
                  <div className="flex-shrink-0 flex items-center gap-4">
                    <span className="font-heading text-accent text-2xl font-bold">{item.number}</span>
                    <div className="w-[1px] h-12 bg-accent/30" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon size={18} className="text-accent" />
                      <h3 className="font-heading text-lg font-semibold text-foreground">{t.whyChoose[item.titleKey]}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed">{t.whyChoose[item.descKey]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Profile CTA */}
        <div className={`flex justify-center bg-[#F8F7F4] lg:bg-background transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} py-[30px]`} style={{ transitionDelay: "900ms" }}>
          <Button asChild variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-base font-heading">
            <a href="/mono-charcoal-company-profile.pdf" download>
              <Download size={18} />
              {t.whyChoose.downloadProfile}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
