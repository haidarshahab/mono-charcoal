import SEO, { organizationSchema } from "@/components/SEO";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Award, CheckCircle, Shield, TestTube, FileCheck, ChevronRight } from "lucide-react";

const Quality = () => {
  const ref = useScrollReveal();
  const certifications = [
    { name: "ISO 9001:2015", description: "Quality Management System", issuer: "Certified Body" },
    { name: "Export License", description: "Indonesian Government", issuer: "Trade Ministry" },
    { name: "Factory Audit", description: "Third-Party Verified", issuer: "Independent Auditor" },
    { name: "MSDS", description: "Material Safety Data Sheet", issuer: "Laboratory" },
  ];
  const qcSteps = [
    { step: "1", title: "Raw Material Inspection", description: "Coconut shells tested for moisture content and quality" },
    { step: "2", title: "Carbonization Control", description: "Temperature and timing monitored during charcoal burning" },
    { step: "3", title: "Grinding Precision", description: "Charcoal ground to exact mesh size for consistency" },
    { step: "4", title: "Mixing Ratio", description: "Binder and water ratios precisely measured" },
    { step: "5", title: "Pressing & Shaping", description: "Hydraulic pressure applied for optimal density" },
    { step: "6", title: "Drying Process", description: "Controlled drying to achieve target moisture levels" },
    { step: "7", title: "Quality Testing", description: "Each batch tested for ash content and burn time" },
    { step: "8", title: "Final Inspection", description: "Visual inspection and packaging quality check" },
  ];
  const testingParameters = [
    { name: "Ash Content", range: "1.6% - 2.5%", method: "ISO 1171" },
    { name: "Moisture", range: "4% - 8%", method: "ISO 587" },
    { name: "Fixed Carbon", range: "75% - 80%", method: "ISO 172" },
    { name: "Calorific Value", range: "7,500 cal/g", method: "ISO 1928" },
  ];

  return (
    <>
      <SEO title="Quality & Certifications" description="Mono Charcoal quality assurance: ISO 9001 certified, 8-step QC process, independent lab testing." schema={organizationSchema} />
      <div ref={ref}>
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Quality & Certifications <span className="block text-amber-500">You Can Trust</span></h1>
              <p className="text-xl text-slate-300 mb-8">Our 8-step quality control process ensures every batch meets your specifications.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#process" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">View QC Process</a>
                <a href="https://wa.me/62881024922133" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-3 rounded-lg transition-colors">Request Lab Reports</a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">International Certifications</h2></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (<div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 text-center hover:border-amber-500 transition-colors"><Award className="w-12 h-12 text-amber-500 mx-auto mb-4" /><h3 className="font-semibold text-slate-900 mb-2">{cert.name}</h3><p className="text-slate-600 text-sm mb-1">{cert.description}</p><p className="text-slate-500 text-xs">{cert.issuer}</p></div>))}
            </div>
          </div>
        </section>

        <section id="process" className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">8-Step Quality Control Process</h2></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {qcSteps.map((step, index) => (<div key={index} className="bg-white rounded-xl p-6 shadow-md"><div className="flex items-center gap-3 mb-4"><div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">{step.step}</div><h3 className="font-semibold text-slate-900">{step.title}</h3></div><p className="text-slate-600 text-sm">{step.description}</p></div>))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Independent Laboratory Testing</h2>
                <p className="text-lg text-slate-600 mb-6">Each production batch is tested by independent laboratories.</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3"><TestTube className="w-5 h-5 text-amber-500" /><span className="text-slate-700">Ash Content Analysis</span></li>
                  <li className="flex items-center gap-3"><TestTube className="w-5 h-5 text-amber-500" /><span className="text-slate-700">Moisture Content Test</span></li>
                  <li className="flex items-center gap-3"><TestTube className="w-5 h-5 text-amber-500" /><span className="text-slate-700">Fixed Carbon Determination</span></li>
                  <li className="flex items-center gap-3"><TestTube className="w-5 h-5 text-amber-500" /><span className="text-slate-700">Calorific Value Measurement</span></li>
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Testing Parameters</h3>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Third-Party Inspection</h2>
              <p className="text-lg text-slate-300 mb-8">You can arrange independent inspection through SGS, Intertek, or Bureau Veritas.</p>
              <a href="/export" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">Export Information <ChevronRight className="w-5 h-5" /></a>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Request Quality Documentation</h2>
              <p className="text-white/90 text-lg mb-8">We provide complete lab reports and certificates with every export shipment.</p>
              <a href="https://wa.me/62881024922133" className="inline-block bg-white text-amber-600 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors">Request Sample & Reports</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Quality;