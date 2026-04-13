import SEO, { organizationSchema } from "@/components/SEO";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/hooks/translations";
import { Award, CheckCircle, Shield, TestTube, FileCheck, ChevronRight } from "lucide-react";

const Quality = () => {
  const { ref } = useScrollReveal();
  const currentLang = useLanguage();
  const t = getTranslation(currentLang);

  const certifications = [
    { name: t.quality.iso, description: t.quality.isoDesc, issuer: "Certified Body" },
    { name: t.quality.exportLic, description: t.quality.exportLicDesc, issuer: "Trade Ministry" },
    { name: t.quality.factoryAudit, description: t.quality.factoryAuditDesc, issuer: "Independent Auditor" },
    { name: t.quality.msds, description: t.quality.msdsDesc, issuer: "Laboratory" },
  ];
  const qcSteps = [
    { step: "1", title: t.quality.rawMaterial, description: t.quality.rawMaterialDesc },
    { step: "2", title: t.quality.carbonization, description: t.quality.carbonizationDesc },
    { step: "3", title: t.quality.grinding, description: t.quality.grindingDesc },
    { step: "4", title: t.quality.mixing, description: t.quality.mixingDesc },
    { step: "5", title: t.quality.pressing, description: t.quality.pressingDesc },
    { step: "6", title: t.quality.drying, description: t.quality.dryingDesc },
    { step: "7", title: t.quality.testing, description: t.quality.testingDesc },
    { step: "8", title: t.quality.finalInspect, description: t.quality.finalInspectDesc },
  ];
  const testingParameters = [
    { name: t.quality.ashContent, range: t.quality.ashContentDesc, method: "ISO 1171" },
    { name: t.quality.moisture, range: t.quality.moistureDesc, method: "ISO 587" },
    { name: t.quality.fixedCarbon, range: t.quality.fixedCarbonDesc, method: "ISO 172" },
    { name: t.quality.calorific, range: t.quality.calorificDesc, method: "ISO 1928" },
  ];

  return (
    <>
      <SEO 
        title={t.quality.title} 
        description="ISO 9001 certified charcoal factory. 8-step QC process, lab testing. Premium quality shisha BBQ charcoal. Indonesia manufacturer."
        keywords="ISO certified charcoal, quality control charcoal, charcoal testing, charcoal factory standards, quality assurance"
        schema={organizationSchema} />
      <div ref={ref}>
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t.quality.title} <span className="block text-amber-500">{t.quality.subtitle}</span></h1>
              <p className="text-xl text-slate-300 mb-8">{t.quality.qcProcessDesc}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#process" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">{t.quality.viewQC}</a>
                <a href="https://wa.me/62881024922133" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-3 rounded-lg transition-colors">{t.quality.requestReports}</a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.quality.intCert}</h2></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (<div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 text-center hover:border-amber-500 transition-colors"><Award className="w-12 h-12 text-amber-500 mx-auto mb-4" /><h3 className="font-semibold text-slate-900 mb-2">{cert.name}</h3><p className="text-slate-600 text-sm mb-1">{cert.description}</p><p className="text-slate-500 text-xs">{cert.issuer}</p></div>))}
            </div>
          </div>
        </section>

        <section id="process" className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.quality.qcProcess}</h2></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {qcSteps.map((step, index) => (<div key={index} className="bg-white rounded-xl p-6 shadow-md"><div className="flex items-center gap-3 mb-4"><div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">{step.step}</div><h3 className="font-semibold text-slate-900">{step.title}</h3></div><p className="text-slate-600 text-sm">{step.description}</p></div>))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{t.quality.labTesting}</h2>
                <p className="text-lg text-slate-600 mb-6">{t.quality.labTestingDesc}</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3"><TestTube className="w-5 h-5 text-amber-500" /><span className="text-slate-700">{t.quality.ashContent}</span></li>
                  <li className="flex items-center gap-3"><TestTube className="w-5 h-5 text-amber-500" /><span className="text-slate-700">{t.quality.moisture}</span></li>
                  <li className="flex items-center gap-3"><TestTube className="w-5 h-5 text-amber-500" /><span className="text-slate-700">{t.quality.fixedCarbon}</span></li>
                  <li className="flex items-center gap-3"><TestTube className="w-5 h-5 text-amber-500" /><span className="text-slate-700">{t.quality.calorific}</span></li>
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">{t.quality.qcProcess}</h3>
                <div className="space-y-4">
                  {testingParameters.map((param, index) => (<div key={index} className="flex justify-between items-center border-b border-slate-100 pb-3"><span className="text-slate-700 font-medium">{param.name}</span><span className="text-slate-900 font-semibold">{param.range}</span></div>))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Shield className="w-16 h-16 text-amber-500 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.quality.thirdParty}</h2>
              <p className="text-lg text-slate-300 mb-8">{t.quality.thirdPartyDesc}</p>
              <a href="/export" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">{t.quality.thirdPartyCTA} <ChevronRight className="w-5 h-5" /></a>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">{t.quality.reqDocs}</h2>
              <p className="text-white/90 text-lg mb-8">{t.quality.reqDocsDesc}</p>
              <a href="https://wa.me/62881024922133" className="inline-block bg-white text-amber-600 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors">{t.quality.requestReports}</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Quality;