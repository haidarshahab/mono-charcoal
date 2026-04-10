import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Clock, FileCheck, Ship, FlaskConical } from "lucide-react";

const solutions = [
  {
    icon: Clock,
    number: "01",
    title: "On-Time Production",
    description: "Structured workflow, real deadlines, no excuses. Your order ships when we say it will.",
  },
  {
    icon: FileCheck,
    number: "02",
    title: "Full Documentation",
    description: "Packing lists, COA, fumigation certificates — always ready before your shipment leaves.",
  },
  {
    icon: Ship,
    number: "03",
    title: "Managed Logistics",
    description: "We handle freight, customs, and tracking end-to-end. You just receive the goods.",
  },
  {
    icon: FlaskConical,
    number: "04",
    title: "Consistent Quality",
    description: "Lab-tested every batch. Same specs, same performance, every single shipment.",
  },
];

const WhyChooseUsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-0 md:py-0">
      <div
        ref={ref}
        className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left — Problem statement */}
          <div className="bg-primary px-8 py-20 md:px-16 lg:px-20 flex flex-col justify-center">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-6 font-heading">
              Why Mono Charcoal
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
              Indonesia produces the world's best coconut charcoal.
              <span className="block mt-2 text-white/60 font-normal text-2xl md:text-3xl lg:text-4xl">
                But finding a manufacturer you can actually rely on? That's the hard part.
              </span>
            </h2>
            <div className="w-12 h-[2px] bg-accent mb-8" />
            <p className="text-white/70 text-base md:text-lg leading-relaxed font-body max-w-lg">
              Hundreds of factories. But most lack real management — leading to extreme production delays, 
              incomplete export documents, shipping problems, and inconsistent product quality. 
              We built Mono Charcoal to be different.
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
                      <h3 className="font-heading text-lg font-semibold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
