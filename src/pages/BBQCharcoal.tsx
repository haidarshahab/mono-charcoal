import SEO, { productSchema } from "@/components/SEO";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Flame, CheckCircle, ChevronRight } from "lucide-react";

const BBQCharcoal = () => {
  const ref = useScrollReveal();
  const features = ["High heat output for perfect grilling", "Long burn time reduces need for frequent replacement", "Low ash production for easy cleanup", "100% natural coconut shell - no chemicals", "Consistent size for even heat distribution", "Quick ignition - ready in 10-15 minutes"];
  const specifications = [
    { label: "Fixed Carbon", value: "75-80%" },
    { label: "Moisture", value: "4-8%" },
    { label: "Ash Content", value: "2-3%" },
    { label: "Calorific Value", value: "7,000-7,500 cal/g" },
    { label: "Ignition Time", value: "10-15 minutes" },
  ];
  const shapes = [
    { name: "Pillow", description: "Standard pillow shape for kettle grills" },
    { name: "Cube", description: "Easy to stack and light" },
    { name: "Hexagonal", description: "Good airflow for BBQ pits" },
    { name: "Nugget", description: "Irregular shape for natural look" },
  ];

  return (
    <>
      <SEO title="BBQ Charcoal" description="Premium BBQ coconut charcoal from Indonesia. High heat output, long burn time, eco-friendly." schema={productSchema("BBQ Coconut Charcoal Briquettes", "Premium coconut shell charcoal for BBQ and grilling. High heat output, long burn time.")} />
      <div ref={ref}>
        <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">BBQ Coconut Charcoal <span className="block text-amber-500">Premium Grilling Fuel</span></h1>
              <p className="text-xl text-slate-300 mb-8">High-quality coconut shell charcoal for professional grilling.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#specs" className="bg-amber-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-amber-600 transition-colors">View Specifications</a>
                <a href="https://wa.me/62881024922133" className="border-2 border-white text-white hover:bg-white hover:text-slate-800 font-semibold px-8 py-3 rounded-lg transition-colors">Get Free Sample</a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why Choose Our BBQ Charcoal?</h2>
                <p className="text-lg text-slate-600 mb-6">Our coconut shell charcoal delivers superior performance compared to traditional wood charcoal.</p>
                <ul className="space-y-4">
                  {features.map((feature, index) => (<li key={index} className="flex items-start gap-3"><CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" /><span className="text-slate-700">{feature}</span></li>))}
                </ul>
              </div>
              <img src="/assets/bbq-product.jpg" alt="BBQ Charcoal" className="w-full h-80 object-cover rounded-2xl" />
            </div>
          </div>
        </section>

        <section id="specs" className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Technical Specifications</h2></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {specifications.map((spec, index) => (<div key={index} className="bg-white rounded-xl p-6 shadow-sm"><div className="text-slate-500 text-sm mb-1">{spec.label}</div><div className="text-2xl font-bold text-slate-900">{spec.value}</div></div>))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Available Shapes</h2></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {shapes.map((shape, index) => (<div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 text-center"><div className="bg-slate-100 rounded-lg h-24 flex items-center justify-center mb-4"><Flame className="w-10 h-10 text-slate-400" /></div><h3 className="text-lg font-semibold text-slate-900 mb-2">{shape.name}</h3><p className="text-slate-600 text-sm">{shape.description}</p></div>))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Custom Branding Available</h2>
              <p className="text-xl text-slate-300 mb-8">We offer private label BBQ charcoal with custom packaging.</p>
              <a href="/oem" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">Learn About OEM <ChevronRight className="w-5 h-5" /></a>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
              <p className="text-white/90 text-lg mb-8">Contact us for pricing and samples.</p>
              <a href="https://wa.me/62881024922133" className="inline-block bg-white text-amber-600 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors">Get Quote via WhatsApp</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BBQCharcoal;