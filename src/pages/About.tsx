import SEO, { organizationSchema } from "@/components/SEO";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Award, Users, Factory, MapPin, Phone, Mail, Clock, Globe } from "lucide-react";

const About = () => {
  const ref = useScrollReveal();

  const stats = [
    { label: "Production Capacity", value: "1,000+", suffix: "tons/month" },
    { label: "Export Countries", value: "11", suffix: "countries" },
    { label: "Years Experience", value: "6+", suffix: "years" },
    { label: "Clients Served", value: "100+", suffix: "brands" },
  ];

  const team = [
    { name: "Founder & CEO", role: "Leadership", description: "Leading Mono Charcoal's vision to become the premier Indonesian charcoal exporter." },
    { name: "Production Director", role: "Operations", description: "Overseeing manufacturing processes ensuring consistent quality across all batches." },
    { name: "Quality Control Manager", role: "Quality", description: "Ensuring every shipment meets international standards and customer specifications." },
    { name: "Export Manager", role: "Sales", description: "Managing global logistics and building lasting relationships with international buyers." },
  ];

  const certifications = [
    { name: "ISO 9001:2015", description: "Quality Management System" },
    { name: "Export License", description: "Indonesian Government Certified" },
    { name: "Factory Audit", description: "Third-Party Verified" },
    { name: "MSDS", description: "Material Safety Data Sheet" },
  ];

  return (
    <>
      <SEO title="About Us" description="Learn about Mono Charcoal - Indonesia's leading coconut shell charcoal manufacturer and exporter. Our factory in Bekasi produces 1000+ tons monthly for global markets." schema={organizationSchema} />
      <div ref={ref}>
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Premium Coconut Charcoal <span className="block text-amber-500">From Indonesia to the World</span></h1>
              <p className="text-xl text-slate-300 mb-8">Mono Charcoal is a leading manufacturer and exporter of high-quality coconut shell charcoal briquettes for shisha and BBQ applications. Based in Bekasi, Indonesia, we serve wholesale buyers across 11 countries.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/contact" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-3 rounded-lg transition-colors">Get Free Sample</a>
                <a href="/products" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-3 rounded-lg transition-colors">View Products</a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-amber-600 mb-2">{stat.value}</div>
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
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Our Factory in Bekasi</h2>
                <p className="text-lg text-slate-600 mb-6">Located in Bekasi, West Java, our state-of-the-art manufacturing facility operates with a monthly production capacity of over 1,000 metric tons. We utilize modern equipment and stringent quality control processes to deliver consistent, premium-quality charcoal to global markets.</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Factory className="w-6 h-6 text-amber-600 mt-1" />
                    <div><h3 className="font-semibold text-slate-900">Modern Equipment</h3><p className="text-slate-600 text-sm">Industrial-grade machinery for precise production</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-amber-600 mt-1" />
                    <div><h3 className="font-semibold text-slate-900">Quality Certified</h3><p className="text-slate-600 text-sm">ISO 9001:2015 certified production process</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-6 h-6 text-amber-600 mt-1" />
                    <div><h3 className="font-semibold text-slate-900">Global Export Ready</h3><p className="text-slate-600 text-sm">Experienced in international shipping and logistics</p></div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-200 rounded-2xl h-96 flex items-center justify-center"><p className="text-slate-500">Factory Image Placeholder</p></div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Leadership Team</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">Our experienced team ensures every order meets the highest standards of quality and service.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center"><Users className="w-10 h-10 text-slate-400" /></div>
                  <h3 className="text-xl font-semibold text-slate-900 text-center mb-1">{member.name}</h3>
                  <p className="text-amber-600 text-center text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-slate-600 text-center text-sm">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Certifications & Compliance</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">We maintain international quality standards and certifications.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="border-2 border-slate-200 rounded-xl p-6 text-center hover:border-amber-500 transition-colors">
                  <Award className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-slate-900 mb-2">{cert.name}</h3>
                  <p className="text-slate-600 text-sm">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Why Indonesian Coconut Charcoal?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div><h3 className="font-semibold text-lg mb-2">Rich in Potassium</h3><p className="text-slate-300">Indonesian coconut shells contain high potassium content, resulting in lower ash content and cleaner burn.</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div><h3 className="font-semibold text-lg mb-2">High Carbon Content</h3><p className="text-slate-300">Our coconut charcoal achieves 75-80% fixed carbon content, ensuring longer burn time and higher heat output.</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div><h3 className="font-semibold text-lg mb-2">Odorless & Chemical-Free</h3><p className="text-slate-300">100% natural coconut shell with no additives, ensuring pure flavor for shisha and BBQ.</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                  <div><h3 className="font-semibold text-lg mb-2">Sustainable Sourcing</h3><p className="text-slate-300">Indonesia is the world's largest coconut producer, ensuring consistent supply and competitive pricing.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Visit Our Factory</h2>
              <p className="text-white/90 text-lg mb-8">We welcome wholesale buyers to visit our factory in Bekasi, Indonesia. See our production process firsthand.</p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/20 rounded-lg p-4"><MapPin className="w-6 h-6 text-white mx-auto mb-2" /><p className="text-white text-sm">Bekasi, West Java, Indonesia</p></div>
                <div className="bg-white/20 rounded-lg p-4"><Phone className="w-6 h-6 text-white mx-auto mb-2" /><p className="text-white text-sm">+62 (WhatsApp)</p></div>
                <div className="bg-white/20 rounded-lg p-4"><Mail className="w-6 h-6 text-white mx-auto mb-2" /><p className="text-white text-sm">haidar@monocoal.com</p></div>
              </div>
              <a href="https://wa.me/" className="inline-block bg-white text-amber-600 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors">Contact Us via WhatsApp</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;