import SEO, { productSchema, faqSchema } from "@/components/SEO";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronRight, CheckCircle, Flame, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/hooks/translations";

const Products = () => {
  const { ref } = useScrollReveal();
  const currentLang = useLanguage();
  const t = getTranslation(currentLang);

  const shishaFeatures = [
    t.products.shishaFeature1 || "2+ hours burning time",
    t.products.shishaFeature2 || "Ash content 1.6% - 2.5%",
    t.products.shishaFeature3 || "500 - 650°C burning temperature",
    t.products.shishaFeature4 || "Odorless & chemical-free",
    t.products.shishaFeature5 || "Perfect shape, no-crack",
    t.products.shishaFeature6 || "Multi shapes available"
  ];
  const bbqFeatures = [
    t.products.bbqFeature1 || "High heat output",
    t.products.bbqFeature2 || "Long-lasting burn",
    t.products.bbqFeature3 || "Low ash production",
    t.products.bbqFeature4 || "Natural coconut flavor",
    t.products.bbqFeature5 || "Easy ignition",
    t.products.bbqFeature6 || "Eco-friendly"
  ];

  return (
    <>
      <SEO 
        title={t.pages.products} 
        description="Premium coconut charcoal products for shisha & BBQ."
        keywords="coconut charcoal products, shisha charcoal, BBQ charcoal"
        schema={{ ...productSchema("Coconut Shell Charcoal Briquettes", "Premium quality"), ...faqSchema([]) }} />
      <div ref={ref}>
        <section className="relative bg-gradient-to-br from-[#1D3F30] via-[#143728] to-[#1D3F30] text-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t.products.heroTitle} <span className="block text-amber-500">stake its reputation on.</span></h1>
              <p className="text-xl text-slate-300 mb-8">{t.products.heroDesc || "Every product we make is built around one idea — that when your customer lights the first piece, they shouldn't have to think twice. Clean burn, consistent heat, zero compromise. Whether you're sourcing for shisha lounges or BBQ brands, Mono delivers the kind of quality that keeps your customers coming back."}</p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Flame className="w-6 h-6" /> {t.products.shishaName}</h2>
                  <p className="text-white/80">{t.products.shishaSub || "Premium hookah coals for wholesale buyers"}</p>
                </div>
                <div className="p-6">
                  <img src="/assets/shisha-product.jpg" alt="Shisha Charcoal" className="w-full h-48 object-cover rounded-xl mb-6" />
                  <ul className="space-y-3 mb-6">
                    {shishaFeatures.map((feature, i) => (<li key={i} className="flex items-center gap-2 text-slate-600"><CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />{feature}</li>))}
                  </ul>
                  <Link to="/products/shisha" className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors font-medium">{t.common.learnMore} <ChevronRight className="w-5 h-5" /></Link>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Flame className="w-6 h-6" /> {t.products.bbqName}</h2>
                  <p className="text-white/80">{t.products.bbqSub || "Premium grilling charcoal for global markets"}</p>
                </div>
                <div className="p-6">
                  <img src="/assets/bbq-product.jpg" alt="BBQ Charcoal" className="w-full h-48 object-cover rounded-xl mb-6" />
                  <ul className="space-y-3 mb-6">
                    {bbqFeatures.map((feature, i) => (<li key={i} className="flex items-center gap-2 text-slate-600"><CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />{feature}</li>))}
                  </ul>
                  <Link to="/products/bbq" className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors font-medium">{t.common.learnMore} <ChevronRight className="w-5 h-5" /></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.products.qualityGrades || "Quality Grades"}</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t.products.qualityGradesDesc || "We offer three quality tiers."}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-slate-400">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t.products.standard || "Standard"}</h3>
                <p className="text-slate-500 mb-4">{t.products.standardDesc || "Entry level quality"}</p>
                <div className="text-3xl font-bold text-amber-600 mb-6">Ash 2.2% - 2.5%</div>
                <ul className="space-y-2 text-slate-600"><li>✓ {t.products.burn2 || "2+ hours"}</li><li>✓ {t.products.moisture1 || "Moisture 6-8%"}</li><li>✓ {t.products.carbon1 || "Fixed carbon 75%"}</li></ul>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-amber-500 transform scale-105">
                <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">{t.products.popular || "MOST POPULAR"}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t.products.premium || "Premium"}</h3>
                <p className="text-slate-500 mb-4">{t.products.premiumDesc || "Best value for money"}</p>
                <div className="text-3xl font-bold text-amber-600 mb-6">Ash 1.9% - 2.2%</div>
                <ul className="space-y-2 text-slate-600"><li>✓ {t.products.burn3 || "2.5+ hours"}</li><li>✓ {t.products.moisture2 || "Moisture 5-7%"}</li><li>✓ {t.products.carbon2 || "Fixed carbon 78%"}</li></ul>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-amber-600">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t.products.super || "Super Premium"}</h3>
                <p className="text-slate-500 mb-4">{t.products.superDesc || "Luxury brand quality"}</p>
                <div className="text-3xl font-bold text-amber-600 mb-6">Ash 1.6% - 1.9%</div>
                <ul className="space-y-2 text-slate-600"><li>✓ {t.products.burn4 || "3+ hours"}</li><li>✓ {t.products.moisture3 || "Moisture 4-6%"}</li><li>✓ {t.products.carbon3 || "Fixed carbon 80%"}</li></ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{t.products.oemTitle || "OEM & Private Label"}</h2>
                <p className="text-lg text-slate-600 mb-6">{t.products.oemDesc || "We help brands establish their own charcoal line."}</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3"><Shield className="w-6 h-6 text-amber-500" /><span className="text-slate-700">{t.products.oem1 || "Full confidentiality & NDA"}</span></li>
                  <li className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-amber-500" /><span className="text-slate-700">{t.products.oem2 || "Custom box design support"}</span></li>
                  <li className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-amber-500" /><span className="text-slate-700">{t.products.oem3 || "Multiple packaging options"}</span></li>
                </ul>
                <Link to="/oem" className="inline-flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors font-medium">{t.common.learnMore} <ChevronRight className="w-5 h-5" /></Link>
              </div>
              <img src="/assets/packaging.jpg" alt="OEM Packaging" className="w-full h-80 object-cover rounded-2xl" />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#1D3F30] to-[#143728] rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">{t.contact.readyOrder || "Ready to Order?"}</h2>
              <p className="text-slate-300 text-lg mb-8">{t.products.ctaDesc || "Contact us for a free sample and competitive quote."}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://wa.me/62881024922133" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">{t.common.getSample}</a>
                <a href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-3 rounded-lg transition-colors">{t.nav.contact}</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;