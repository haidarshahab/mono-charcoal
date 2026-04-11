import SEO, { organizationSchema } from "@/components/SEO";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Shield, CheckCircle, Palette, Package, FileText, ChevronRight, Lock } from "lucide-react";

const OEM = () => {
  const ref = useScrollReveal();
  const benefits = [
    { icon: Shield, title: "Full Confidentiality", description: "We sign NDA agreements and protect your brand identity." },
    { icon: Palette, title: "Custom Design Support", description: "Our design team helps create packaging that matches your brand." },
    { icon: Package, title: "Flexible Packaging Options", description: "Choose from various box sizes, materials, and printing options." },
    { icon: FileText, title: "Complete Documentation", description: "We provide all necessary export documents and certifications." },
  ];
  const process = [
    { step: "1", title: "Inquiry", description: "Send us your requirements and brand guidelines" },
    { step: "2", title: "Sample", description: "We produce sample products for your approval" },
    { step: "3", title: "Design", description: "Our team creates packaging design based on your brand" },
    { step: "4", title: "Production", description: "Full production with your custom packaging" },
    { step: "5", title: "Shipping", description: "Worldwide delivery to your warehouse" },
  ];
  const packagingOptions = [
    { category: "Inner Box", options: ["250g", "500g", "1kg"], features: ["Full color print", "Lamination", "Embossing"] },
    { category: "Master Box", options: ["5kg", "10kg", "15kg", "20kg"], features: ["Color print", "UV coating", "Custom size"] },
    { category: "Plastic", options: ["Heat seal", "Zip lock", "Stand-up pouch"], features: ["Various sizes", "Custom printing"] },
  ];
  const faqs = [
    { question: "What is the minimum order for OEM?", answer: "OEM orders require a minimum of one 20ft container (18 tons)." },
    { question: "How long does custom packaging take?", answer: "Custom packaging design takes 1-2 weeks. Production takes 2-3 weeks. Total lead time is approximately 4-6 weeks." },
    { question: "Do you keep my design confidential?", answer: "Absolutely. We sign NDA agreements with all OEM clients." },
    { question: "Can I provide my own packaging design?", answer: "Yes! You can provide print-ready files in AI, PDF, or CDR formats." },
  ];

  return (
    <>
      <SEO title="OEM & Private Label" description="Mono Charcoal offers OEM and private label services for coconut charcoal. Custom packaging, branding, and manufacturing." schema={organizationSchema} />
      <div ref={ref}>
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">OEM & Private Label <span className="block text-amber-500">Charcoal Manufacturing</span></h1>
              <p className="text-xl text-slate-300 mb-8">Create your own brand of premium coconut charcoal. Full customization from product to packaging.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#process" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">How It Works</a>
                <a href="https://wa.me/62881024922133" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-3 rounded-lg transition-colors">Request Quote</a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Partner With Us for OEM?</h2></div>
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (<div key={index} className="bg-white rounded-xl p-8 shadow-lg"><benefit.icon className="w-12 h-12 text-amber-500 mb-4" /><h3 className="text-xl font-semibold text-slate-900 mb-3">{benefit.title}</h3><p className="text-slate-600">{benefit.description}</p></div>))}
            </div>
          </div>
        </section>

        <section id="process" className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">OEM Process</h2></div>
            <div className="grid md:grid-cols-5 gap-4">
              {process.map((p, index) => (<div key={index} className="bg-white rounded-xl p-6 text-center shadow-md"><div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">{p.step}</div><h3 className="font-semibold text-slate-900 mb-2">{p.title}</h3><p className="text-slate-600 text-sm">{p.description}</p></div>))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Packaging Options</h2></div>
            <div className="grid md:grid-cols-3 gap-8">
              {packagingOptions.map((pkg, index) => (<div key={index} className="bg-white rounded-xl p-8 shadow-lg"><h3 className="text-xl font-semibold text-slate-900 mb-4">{pkg.category}</h3><div className="mb-4"><p className="text-sm text-slate-500 mb-2">Sizes:</p><div className="flex flex-wrap gap-2">{pkg.options.map((opt, i) => (<span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-sm">{opt}</span>))}</div></div><div><p className="text-sm text-slate-500 mb-2">Features:</p><div className="flex flex-wrap gap-2">{pkg.features.map((f, i) => (<span key={i} className="bg-amber-50 text-amber-700 px-3 py-1 rounded text-sm">{f}</span>))}</div></div></div>))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Lock className="w-16 h-16 text-amber-500 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Brand is Safe With Us</h2>
              <p className="text-xl text-slate-300 mb-8">All OEM partners receive Non-Disclosure Agreements (NDA).</p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 bg-slate-800 px-6 py-3 rounded-lg"><CheckCircle className="w-5 h-5 text-amber-500" /><span>Signed NDA</span></div>
                <div className="flex items-center gap-2 bg-slate-800 px-6 py-3 rounded-lg"><CheckCircle className="w-5 h-5 text-amber-500" /><span>Dedicated production line</span></div>
                <div className="flex items-center gap-2 bg-slate-800 px-6 py-3 rounded-lg"><CheckCircle className="w-5 h-5 text-amber-500" /><span>Design confidentiality</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2></div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (<div key={index} className="bg-white rounded-xl p-6 shadow-sm"><h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3><p className="text-slate-600">{faq.answer}</p></div>))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Start Your Own Brand</h2>
              <p className="text-white/90 text-lg mb-8">Let's discuss how we can help you build your private label charcoal business.</p>
              <a href="https://wa.me/62881024922133" className="inline-block bg-white text-amber-600 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors">Contact Us for OEM</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OEM;