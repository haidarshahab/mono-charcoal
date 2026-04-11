import SEO, { productSchema } from "@/components/SEO";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle, Package, Scale, Thermometer, Clock, ChevronRight } from "lucide-react";

const ShishaCharcoal = () => {
  const ref = useScrollReveal();

  const shapes = [
    { name: "Cube", sizes: ["20x20x20mm", "22x22x22mm", "25x25x25mm", "26x26x26mm", "28x28x28mm", "30x30x30mm"] },
    { name: "Finger / Stix", sizes: ["40x8x8mm", "50x10x10mm", "60x12x12mm"] },
    { name: "Hexagonal", sizes: ["25mm", "30mm", "35mm"] },
    { name: "Octagonal", sizes: ["25mm", "30mm", "35mm"] },
    { name: "Flat / Slab", sizes: ["50x25x15mm", "60x30x20mm"] },
    { name: "Dome", sizes: ["25mm", "30mm"] },
    { name: "Lotus / Cloud", sizes: ["2pcs", "3pcs", "4pcs"] },
  ];

  const specifications = [
    { icon: Scale, label: "Ash Content", value: "1.6% - 2.5%" },
    { icon: Thermometer, label: "Burning Temperature", value: "650°C" },
    { icon: Clock, label: "Burning Time", value: "2+ hours" },
    { icon: Package, label: "Calorific Value", value: "7,500 cal/g" },
  ];

  return (
    <>
      <SEO title="Shisha Charcoal" description="Premium shisha coconut charcoal from Indonesia. Available in cube, finger, hexagonal shapes with low ash content. Factory direct, OEM supported." schema={productSchema("Shisha Coconut Charcoal Briquettes", "Premium coconut shell charcoal for shisha/hookah. Available in cube, finger, hexagonal shapes with 1.6%-2.5% ash content.")} />
      <div ref={ref}>
        <section className="relative bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Shisha Coconut Charcoal</h1>
              <p className="text-xl text-white/90 mb-8">Premium hookah coals for wholesale buyers. Low ash, long burn time, odorless.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#specs" className="bg-white text-amber-600 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors">View Specifications</a>
                <a href="https://wa.me/62881024922133" className="border-2 border-white text-white hover:bg-white hover:text-amber-600 font-semibold px-8 py-3 rounded-lg transition-colors">Get Free Sample</a>
              </div>
            </div>
          </div>
        </section>

        <section id="specs" className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {specifications.map((spec, index) => (
                <div key={index} className="bg-slate-800 rounded-xl p-6 text-center">
                  <spec.icon className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{spec.value}</div>
                  <div className="text-slate-400 text-sm">{spec.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Available Shapes & Sizes</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">We produce various shapes to meet different customer preferences.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shapes.map((shape, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                  <div className="bg-slate-100 rounded-lg h-32 flex items-center justify-center mb-4"><span className="text-slate-400">Shape Image</span></div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{shape.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {shape.sizes.map((size, i) => (<span key={i} className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">{size}</span>))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Technical Specifications</h2></div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-900 text-white">
                    <tr><th className="px-6 py-4 text-left font-semibold">Parameter</th><th className="px-6 py-4 text-left font-semibold">Value</th><th className="px-6 py-4 text-left font-semibold">Method</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr><td className="px-6 py-4 text-slate-700 font-medium">Ash Content</td><td className="px-6 py-4 text-slate-900">1.6% - 2.5%</td><td className="px-6 py-4 text-slate-500">ISO 1171</td></tr>
                    <tr><td className="px-6 py-4 text-slate-700 font-medium">Moisture</td><td className="px-6 py-4 text-slate-900">4% - 8%</td><td className="px-6 py-4 text-slate-500">ISO 587</td></tr>
                    <tr><td className="px-6 py-4 text-slate-700 font-medium">Fixed Carbon</td><td className="px-6 py-4 text-slate-900">75% - 80%</td><td className="px-6 py-4 text-slate-500">ISO 172</td></tr>
                    <tr><td className="px-6 py-4 text-slate-700 font-medium">Volatile Matter</td><td className="px-6 py-4 text-slate-900">12% - 15%</td><td className="px-6 py-4 text-slate-500">ISO 562</td></tr>
                    <tr><td className="px-6 py-4 text-slate-700 font-medium">Calorific Value</td><td className="px-6 py-4 text-slate-900">7,500 cal/g</td><td className="px-6 py-4 text-slate-500">ISO 1928</td></tr>
                    <tr><td className="px-6 py-4 text-slate-700 font-medium">Burning Time</td><td className="px-6 py-4 text-slate-900">2+ hours</td><td className="px-6 py-4 text-slate-500">Internal</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Create Your Own Brand</h2>
              <p className="text-xl text-slate-300 mb-8">We offer complete OEM services including custom packaging, logo design, and brand development.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/oem" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center gap-2">OEM Services <ChevronRight className="w-5 h-5" /></a>
                <a href="https://wa.me/62881024922133" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-3 rounded-lg transition-colors">Request Quote</a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Get Free Sample</h2>
              <p className="text-white/90 text-lg mb-8">Order a 1kg sample to test our quality.</p>
              <a href="https://wa.me/62881024922133" className="inline-block bg-white text-amber-600 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors">Contact Us via WhatsApp</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ShishaCharcoal;