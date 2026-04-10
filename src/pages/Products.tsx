import SEO, { productSchema, faqSchema } from "@/components/SEO";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronRight, CheckCircle, Flame, Shield, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const Products = () => {
  const ref = useScrollReveal();

  const shishaFeatures = ["2+ hours burning time", "Ash content 1.6% - 2.5%", "650°C burning temperature", "Odorless & chemical-free", "Multiple shapes available", "OEM packaging supported"];
  const bbqFeatures = ["High heat output", "Long-lasting burn", "Low ash production", "Natural coconut flavor", "Easy ignition", "Eco-friendly"];

  const faqs = [
    { question: "What is the minimum order quantity (MOQ)?", answer: "Our minimum order is 18 tons for a 20ft container. We also offer LCL (Less than Container Load) orders starting from 1 ton for sample purposes." },
    { question: "What payment terms do you offer?", answer: "We accept TT (Telegraph Transfer) with 50% advance payment and 50% before shipment. For orders over 10 containers, we can discuss LC (Letter of Credit) terms." },
    { question: "Do you provide OEM/private label services?", answer: "Yes, we offer complete OEM services including custom packaging, logo printing, and brand design." },
    { question: "What certifications do you have?", answer: "We are ISO 9001:2015 certified and hold export licenses from the Indonesian government." },
  ];

  return (
    <>
      <SEO title="Products" description="Explore our premium coconut shell charcoal products for shisha and BBQ. Available in cube, finger, hexagonal shapes with specifications. OEM packaging available." schema={{ ...productSchema("Coconut Shell Charcoal Briquettes", "Premium quality coconut shell charcoal for shisha and BBQ"), ...faqSchema(faqs) }} />
      <div ref={ref}>
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Premium Coconut Charcoal <span className="block text-amber-500">Products</span></h1>
              <p className="text-xl text-slate-300 mb-8">High-quality coconut shell charcoal briquettes for shisha and BBQ. Factory direct pricing with OEM packaging options.</p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Flame className="w-6 h-6" /> Shisha Charcoal</h2>
                  <p className="text-white/80">Premium hookah coals for wholesale buyers</p>
                </div>
                <div className="p-6">
                  <div className="bg-slate-100 rounded-xl h-48 flex items-center justify-center mb-6"><p className="text-slate-500">Product Image</p></div>
                  <ul className="space-y-3 mb-6">
                    {shishaFeatures.map((feature, i) => (<li key={i} className="flex items-center gap-2 text-slate-600"><CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />{feature}</li>))}
                  </ul>
                  <Link to="/products/shisha" className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors font-medium">View Details <ChevronRight className="w-5 h-5" /></Link>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Flame className="w-6 h-6" /> BBQ Charcoal</h2>
                  <p className="text-white/80">Premium grilling charcoal for global markets</p>
                </div>
                <div className="p-6">
                  <div className="bg-slate-100 rounded-xl h-48 flex items-center justify-center mb-6"><p className="text-slate-500">Product Image</p></div>
                  <ul className="space-y-3 mb-6">
                    {bbqFeatures.map((feature, i) => (<li key={i} className="flex items-center gap-2 text-slate-600"><CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />{feature}</li>))}
                  </ul>
                  <Link to="/products/bbq" className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors font-medium">View Details <ChevronRight className="w-5 h-5" /></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Quality Grades</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">We offer three quality tiers to meet different budget and quality requirements.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-slate-400">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Standard</h3>
                <p className="text-slate-500 mb-4">Entry level quality</p>
                <div className="text-3xl font-bold text-amber-600 mb-6">Ash 2.2% - 2.5%</div>
                <ul className="space-y-2 text-slate-600"><li>✓ 2+ hours burn time</li><li>✓ Moisture 6-8%</li><li>✓ Fixed carbon 75%</li></ul>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-amber-500 transform scale-105">
                <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">MOST POPULAR</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Premium</h3>
                <p className="text-slate-500 mb-4">Best value for money</p>
                <div className="text-3xl font-bold text-amber-600 mb-6">Ash 1.9% - 2.2%</div>
                <ul className="space-y-2 text-slate-600"><li>✓ 2.5+ hours burn time</li><li>✓ Moisture 5-7%</li><li>✓ Fixed carbon 78%</li></ul>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-amber-600">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Super Premium</h3>
                <p className="text-slate-500 mb-4">Luxury brand quality</p>
                <div className="text-3xl font-bold text-amber-600 mb-6">Ash 1.6% - 1.9%</div>
                <ul className="space-y-2 text-slate-600"><li>✓ 3+ hours burn time</li><li>✓ Moisture 4-6%</li><li>✓ Fixed carbon 80%</li></ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">OEM & Private Label Services</h2>
                <p className="text-lg text-slate-600 mb-6">We help brands establish their own charcoal line with custom packaging, logo design, and complete manufacturing support.</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3"><Shield className="w-6 h-6 text-amber-500" /><span className="text-slate-700">Full confidentiality & NDA</span></li>
                  <li className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-amber-500" /><span className="text-slate-700">Custom box design support</span></li>
                  <li className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-amber-500" /><span className="text-slate-700">Multiple packaging options</span></li>
                </ul>
                <Link to="/oem" className="inline-flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors font-medium">Learn More About OEM <ChevronRight className="w-5 h-5" /></Link>
              </div>
              <div className="bg-slate-100 rounded-2xl h-80 flex items-center justify-center"><p className="text-slate-500">OEM Packaging Examples</p></div>
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
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
              <p className="text-slate-300 text-lg mb-8">Contact us for a free sample and competitive quote.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://wa.me/" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">Get Free Sample</a>
                <a href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-3 rounded-lg transition-colors">Contact Sales</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;