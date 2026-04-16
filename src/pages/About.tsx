import SEO, { organizationSchema } from "@/components/SEO";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Award, Factory, MapPin, Phone, Mail, Globe, User } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/hooks/translations";
import teamHaidar from "@/assets/team-haidar-ali.png";
import teamAbdullah from "@/assets/team-abdullah-alatas.png";
import teamJoko from "@/assets/team-joko.png";

const About = () => {
  const { ref } = useScrollReveal();
  const currentLang = useLanguage();
  const t = getTranslation(currentLang);

  const stats = [
    { label: t.about.productionCapacity || "Production Capacity", value: "1,000+", suffix: "tons/month" },
    { label: t.about.exportCountries || "Export Countries", value: "15", suffix: "countries" },
    { label: t.about.yearsExp || "Years Experience", value: "10+", suffix: "years" },
    { label: t.about.clients || "Clients Served", value: "50+", suffix: "brands" },
  ];

  return (
    <>
      <SEO 
        title={t.pages.about} 
        description="Mono Charcoal - Indonesia premium coconut shell charcoal manufacturer. Factory in Bekasi, 1000+ tons monthly capacity. Exporting to 20+ countries worldwide."
        keywords="about mono charcoal, Indonesia charcoal factory, coconut charcoal manufacturer Bekasi, charcoal exporter Indonesia"
        schema={organizationSchema} />
      <div ref={ref}>
        <section className="relative bg-gradient-to-br from-[#1D3F30] via-[#143728] to-[#1D3F30] text-white py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t.aboutHero?.title || t.hero.title} <span className="block text-accent">{t.aboutHero?.subtitle || t.hero.subtitle}</span></h1>
              <p className="text-xl text-slate-300 mb-8">{t.about.description}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/contact" className="bg-accent hover:bg-accent/90 font-semibold px-8 py-3 rounded-lg transition-colors text-white">{t.common.getSample}</a>
                <a href="/products" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-3 rounded-lg transition-colors">{t.nav.products}</a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                  <div className="text-slate-500 text-sm">{stat.suffix}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{t.about.factoryTitle || "Our Factory in Bekasi"}</h2>
                <p className="text-lg text-slate-600 mb-6">{t.about.factoryDesc || "Located in Bekasi, West Java, our state-of-the-art manufacturing facility operates with a monthly production capacity of over 1,000 metric tons."}</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Factory className="w-6 h-6 text-accent mt-1" />
                    <div><h3 className="font-semibold text-slate-900">{t.about.modernEquip || "Modern Equipment"}</h3><p className="text-slate-600 text-sm">{t.about.modernEquipDesc || "Industrial-grade machinery for precise production"}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-accent mt-1" />
                    <div><h3 className="font-semibold text-slate-900">{t.about.qcCert || "Quality Certified"}</h3><p className="text-slate-600 text-sm">{t.about.qcCertDesc || "ISO 9001:2015 certified production process"}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-6 h-6 text-accent mt-1" />
                    <div><h3 className="font-semibold text-slate-900">{t.about.globalReady || "Global Export Ready"}</h3><p className="text-slate-600 text-sm">{t.about.globalReadyDesc || "Experienced in international shipping and logistics"}</p></div>
                  </div>
                </div>
              </div>
              <img src="/assets/factory-exterior.jpg" alt="Mono Charcoal Factory" className="rounded-2xl w-full h-full object-cover" />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Team</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Meet the people behind Mono Charcoal's success</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <img src={teamHaidar} alt="Haidar Ali" className="w-48 h-48 mx-auto rounded-full object-cover mb-4 border-4 border-secondary" />
                <h3 className="text-xl font-bold text-slate-900">Haidar Ali</h3>
                <p className="text-accent font-medium">Managing Director</p>
              </div>
              <div className="text-center">
                <img src={teamAbdullah} alt="Abdullah Alatas" className="w-48 h-48 mx-auto rounded-full object-cover mb-4 border-4 border-secondary" />
                <h3 className="text-xl font-bold text-slate-900">Abdullah Alatas</h3>
                <p className="text-accent font-medium">Director of Business Development</p>
              </div>
              <div className="text-center">
                <img src={teamJoko} alt="Joko" className="w-48 h-48 mx-auto rounded-full object-cover mb-4 border-4 border-secondary" />
                <h3 className="text-xl font-bold text-slate-900">Joko</h3>
                <p className="text-accent font-medium">Director of Operations</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{t.about.whyIndo || "Why Indonesian Coconut Charcoal?"}</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div><h3 className="font-semibold text-lg mb-2">{t.about.richPotassium || "Rich in Potassium"}</h3><p className="text-slate-300">{t.about.richPotassiumDesc || "Indonesian coconut shells contain high potassium content, resulting in lower ash content and cleaner burn."}</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div><h3 className="font-semibold text-lg mb-2">{t.about.highCarbon || "High Carbon Content"}</h3><p className="text-slate-300">{t.about.highCarbonDesc || "Our coconut charcoal achieves 75-80% fixed carbon content, ensuring longer burn time and higher heat output."}</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div><h3 className="font-semibold text-lg mb-2">{t.about.odorless || "Odorless & Chemical-Free"}</h3><p className="text-slate-300">{t.about.odorlessDesc || "100% natural coconut shell with no additives, ensuring pure flavor for shisha and BBQ."}</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                  <div><h3 className="font-semibold text-lg mb-2">{t.about.sustainable || "Sustainable Sourcing"}</h3><p className="text-slate-300">{t.about.sustainableDesc || "Indonesia is the world's largest coconut producer, ensuring consistent supply and competitive pricing."}</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-accent to-accent rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.about.visitFactory || "Visit Our Factory"}</h2>
              <p className="text-white/90 text-lg mb-8">{t.about.visitFactoryDesc || "We welcome wholesale buyers to visit our factory in Bekasi, Indonesia."}</p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/20 rounded-lg p-4"><MapPin className="w-6 h-6 text-white mx-auto mb-2" /><p className="text-white text-sm">Bekasi, West Java, Indonesia</p></div>
                <div className="bg-white/20 rounded-lg p-4"><Phone className="w-6 h-6 text-white mx-auto mb-2" /><p className="text-white text-sm">+62 (WhatsApp)</p></div>
                <div className="bg-white/20 rounded-lg p-4"><Mail className="w-6 h-6 text-white mx-auto mb-2" /><p className="text-white text-sm">admin@monocharcoal.com</p></div>
              </div>
              <a href="https://wa.me/62881024922133" className="inline-block bg-white text-accent font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors">{t.contact.whatsapp}</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;