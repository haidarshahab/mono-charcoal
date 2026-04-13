import SEO, { organizationSchema } from "@/components/SEO";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Shield, CheckCircle, Palette, Package, FileText, Lock } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/hooks/translations";

const OEM = () => {
  const { ref } = useScrollReveal();
  const currentLang = useLanguage();
  const t = getTranslation(currentLang);

  const benefits = [
    { icon: Shield, title: t.oem.confidential || "Full Confidentiality", description: t.oem.confidentialDesc || "We sign NDA agreements and protect your brand identity." },
    { icon: Palette, title: t.oem.design || "Custom Design Support", description: t.oem.designDesc || "Our design team helps create packaging that matches your brand." },
    { icon: Package, title: t.oem.packaging || "Flexible Packaging Options", description: t.oem.packagingDesc || "Choose from various box sizes, materials, and printing options." },
    { icon: FileText, title: t.oem.docs || "Complete Documentation", description: t.oem.docsDesc || "We provide all necessary export documents and certifications." },
  ];

  const process = [
    { step: "1", title: t.oem.inquiry || "Inquiry", description: t.oem.inquiryDesc || "Send us your requirements and brand guidelines" },
    { step: "2", title: t.oem.sample || "Sample", description: t.oem.sampleDesc || "We produce sample products for your approval" },
    { step: "3", title: t.oem.design2 || "Design", description: t.oem.design2Desc || "Our team creates packaging design based on your brand" },
    { step: "4", title: t.oem.production || "Production", description: t.oem.productionDesc || "Full production with your custom packaging" },
    { step: "5", title: t.oem.shipping || "Shipping", description: t.oem.shippingDesc || "Worldwide delivery to your warehouse" },
  ];

  const packagingOptions = [
    { category: t.oem.innerBox || "Inner Box", options: ["250g", "500g", "1kg"], features: [t.oem.fullColor || "Full color print", t.oem.lamination || "Lamination", t.oem.embossing || "Embossing"] },
    { category: t.oem.masterBox || "Master Box", options: ["5kg", "10kg", "15kg", "20kg"], features: [t.oem.colorPrint || "Color print", t.oem.uv || "UV coating", t.oem.customSize || "Custom size"] },
    { category: t.oem.plastic || "Plastic", options: [t.oem.heatSeal || "Heat seal", t.oem.zipLock || "Zip lock", t.oem.standPouch || "Stand-up pouch"], features: [t.oem.variousSizes || "Various sizes", t.oem.customPrint || "Custom printing"] },
  ];

  return (
    <>
      <SEO 
        title={t.pages.oem} 
        description="OEM charcoal manufacturing services. Custom packaging, private label, branding. ISO certified factory Indonesia. Start from 18 tons."
        keywords="OEM charcoal, private label charcoal, custom packaging charcoal, charcoal manufacturer, charcoal OEM supplier, brand charcoal"
        schema={organizationSchema} />
      <div ref={ref}>
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t.pages.oem} <span className="block text-amber-500">{t.oem.charcoalMfg || "Charcoal Manufacturing"}</span></h1>
              <p className="text-xl text-slate-300 mb-8">{t.oem.createBrand || "Create your own brand of premium coconut charcoal. Full customization from product to packaging."}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#process" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">{t.oem.howItWorks || "How It Works"}</a>
                <a href="https://wa.me/62881024922133" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-3 rounded-lg transition-colors">{t.oem.requestQuote || "Request Quote"}</a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.oem.whyPartner || "Why Partner With Us for OEM?"}</h2></div>
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (<div key={index} className="bg-white rounded-xl p-8 shadow-lg"><benefit.icon className="w-12 h-12 text-amber-500 mb-4" /><h3 className="text-xl font-semibold text-slate-900 mb-3">{benefit.title}</h3><p className="text-slate-600">{benefit.description}</p></div>))}
            </div>
          </div>
        </section>

        <section id="process" className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.oem.oemProcess || "OEM Process"}</h2></div>
            <div className="grid md:grid-cols-5 gap-4">
              {process.map((p, index) => (<div key={index} className="bg-white rounded-xl p-6 text-center shadow-md"><div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">{p.step}</div><h3 className="font-semibold text-slate-900 mb-2">{p.title}</h3><p className="text-slate-600 text-sm">{p.description}</p></div>))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.oem.packagingOptions || "Packaging Options"}</h2></div>
            <div className="grid md:grid-cols-3 gap-8">
              {packagingOptions.map((pkg, index) => (<div key={index} className="bg-white rounded-xl p-8 shadow-lg"><h3 className="text-xl font-semibold text-slate-900 mb-4">{pkg.category}</h3><div className="mb-4"><p className="text-sm text-slate-500 mb-2">{t.oem.sizes || "Sizes:"}</p><div className="flex flex-wrap gap-2">{pkg.options.map((opt, i) => (<span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-sm">{opt}</span>))}</div></div><div><p className="text-sm text-slate-500 mb-2">{t.oem.features || "Features:"}</p><div className="flex flex-wrap gap-2">{pkg.features.map((f, i) => (<span key={i} className="bg-amber-50 text-amber-700 px-3 py-1 rounded text-sm">{f}</span>))}</div></div></div>))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Lock className="w-16 h-16 text-amber-500 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.oem.brandSafe || "Your Brand is Safe With Us"}</h2>
              <p className="text-xl text-slate-300 mb-8">{t.oem.brandSafeDesc || "All OEM partners receive Non-Disclosure Agreements (NDA)."}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 bg-slate-800 px-6 py-3 rounded-lg"><CheckCircle className="w-5 h-5 text-amber-500" /><span>{t.oem.signedNDA || "Signed NDA"}</span></div>
                <div className="flex items-center gap-2 bg-slate-800 px-6 py-3 rounded-lg"><CheckCircle className="w-5 h-5 text-amber-500" /><span>{t.oem.dedicatedLine || "Dedicated production line"}</span></div>
                <div className="flex items-center gap-2 bg-slate-800 px-6 py-3 rounded-lg"><CheckCircle className="w-5 h-5 text-amber-500" /><span>{t.oem.designConf || "Design confidentiality"}</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">{t.oem.startBrand || "Start Your Own Brand"}</h2>
              <p className="text-white/90 text-lg mb-8">{t.oem.startBrandDesc || "Let's discuss how we can help you build your private label charcoal business."}</p>
              <a href="https://wa.me/62881024922133" className="inline-block bg-white text-amber-600 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors">{t.oem.contactOEM || "Contact Us for OEM"}</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OEM;