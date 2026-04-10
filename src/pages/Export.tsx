import SEO, { organizationSchema } from "@/components/SEO";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Globe, Truck, Ship, CreditCard, FileText, Clock, MapPin, Calendar } from "lucide-react";

const Export = () => {
  const ref = useScrollReveal();
  const shippingInfo = [
    { country: "Australia", port: "Sydney, Melbourne", time: "25-35 days" },
    { country: "New Zealand", port: "Auckland", time: "30-40 days" },
    { country: "Turkey", port: "Istanbul, Izmir", time: "30-40 days" },
    { country: "Canada", port: "Vancouver, Montreal", time: "35-50 days" },
    { country: "Ukraine", port: "Odessa", time: "25-35 days" },
    { country: "Russia", port: "Vladivostok, St. Petersburg", time: "20-30 days" },
    { country: "Brazil", port: "Santos", time: "40-50 days" },
    { country: "Japan", port: "Tokyo, Nagoya", time: "20-30 days" },
    { country: "Jordan", port: "Aqaba", time: "25-35 days" },
    { country: "Iraq", port: "Umm Qasr", time: "25-35 days" },
    { country: "Saudi Arabia", port: "Jeddah, Dammam", time: "25-35 days" },
  ];
  const containerInfo = [
    { type: "20ft Container", capacity: "18-20 tons", dims: "5.9m x 2.35m x 2.39m" },
    { type: "40ft Container", capacity: "25-26 tons", dims: "12.03m x 2.35m x 2.39m" },
    { type: "40ft HQ Container", capacity: "26-28 tons", dims: "12.03m x 2.35m x 2.69m" },
  ];
  const paymentTerms = [
    { title: "Telegraph Transfer (TT)", description: "50% advance, 50% before shipment", details: ["Available for all orders", "USD, EUR accepted"] },
    { title: "Letter of Credit (LC)", description: "For orders over 10 containers", details: ["Subject to bank approval", "Extended terms possible"] },
  ];
  const documents = ["Bill of Lading", "Commercial Invoice", "Packing List", "Certificate of Origin", "Export Declaration", "MSDS", "Quality Certificate"];

  return (
    <>
      <SEO title="Export Information" description="Mono Charcoal export information: shipping to 11 countries, MOQ 18 tons, container options, payment terms." schema={organizationSchema} />
      <div ref={ref}>
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Export Information <span className="block text-amber-500">Global Shipping</span></h1>
              <p className="text-xl text-slate-300 mb-8">Reliable worldwide shipping from Indonesia with comprehensive documentation.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#shipping" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">View Shipping Routes</a>
                <a href="https://wa.me/" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-3 rounded-lg transition-colors">Get Shipping Quote</a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Export Destinations</h2></div>
            <div className="flex flex-wrap justify-center gap-4">
              {shippingInfo.map((item, index) => (<div key={index} className="bg-white rounded-lg px-6 py-4 shadow-md border border-slate-200"><Globe className="w-6 h-6 text-amber-500 mb-2 mx-auto" /><h3 className="font-semibold text-slate-900 text-center">{item.country}</h3><p className="text-slate-500 text-sm text-center">{item.port}</p><p className="text-slate-600 text-sm text-center font-medium">{item.time}</p></div>))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Container Options</h2></div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {containerInfo.map((container, index) => (<div key={index} className="bg-white rounded-xl p-6 shadow-lg"><Ship className="w-10 h-10 text-amber-500 mb-4" /><h3 className="text-xl font-semibold text-slate-900 mb-2">{container.type}</h3><div className="space-y-2"><div className="flex justify-between"><span className="text-slate-500">Capacity:</span><span className="text-slate-900 font-medium">{container.capacity}</span></div><div className="flex justify-between"><span className="text-slate-500">Dimensions:</span><span className="text-slate-900 font-medium">{container.dims}</span></div></div></div>))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16"><Clock className="w-12 h-12 text-amber-500 mx-auto mb-4" /><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Production & Delivery Time</h2></div>
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-center py-4 border-b border-slate-100"><span className="text-slate-700 font-medium">20ft Container (18-20 tons)</span><span className="text-amber-600 font-semibold">10-14 days</span></div>
              <div className="flex justify-between items-center py-4 border-b border-slate-100"><span className="text-slate-700 font-medium">40ft Container (25-26 tons)</span><span className="text-amber-600 font-semibold">14-21 days</span></div>
              <div className="flex justify-between items-center py-4"><span className="text-slate-700 font-medium">Custom packaging</span><span className="text-amber-600 font-semibold">+14-21 days</span></div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12"><MapPin className="w-12 h-12 text-amber-500 mx-auto mb-4" /><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Loading Ports</h2></div>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[{name: "Tanjung Priok", city: "Jakarta", code: "IDTPP"}, {name: "Tanjung Emas", city: "Semarang", code: "IDSRG"}, {name: "Tanjung Perak", city: "Surabaya", code: "IDSUB"}].map((port, index) => (<div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center"><h3 className="text-lg font-semibold text-slate-900 mb-1">{port.name}</h3><p className="text-slate-500 text-sm mb-2">{port.city}</p><span className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-sm">Code: {port.code}</span></div>))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16"><CreditCard className="w-12 h-12 text-amber-500 mx-auto mb-4" /><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Payment Terms</h2></div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {paymentTerms.map((term, index) => (<div key={index} className="bg-white rounded-xl p-8 shadow-lg"><h3 className="text-xl font-semibold text-slate-900 mb-3">{term.title}</h3><p className="text-slate-600 mb-4">{term.description}</p><ul className="space-y-2">{term.details.map((detail, i) => (<li key={i} className="flex items-center gap-2 text-slate-600"><span className="w-2 h-2 bg-amber-500 rounded-full"></span>{detail}</li>))}</ul></div>))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12"><FileText className="w-12 h-12 text-amber-500 mx-auto mb-4" /><h2 className="text-3xl md:text-4xl font-bold mb-4">Export Documentation</h2></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {documents.map((doc, index) => (<div key={index} className="bg-slate-800 rounded-lg p-4 flex items-center gap-3"><FileText className="w-5 h-5 text-amber-500 flex-shrink-0" /><span className="text-slate-200">{doc}</span></div>))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Calendar className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Minimum Order Quantity</h2>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center"><div className="text-4xl font-bold text-amber-600 mb-2">18 tons</div><p className="text-slate-600">20ft Container (FCL)</p></div>
                  <div className="text-center"><div className="text-4xl font-bold text-slate-600 mb-2">1 ton</div><p className="text-slate-600">LCL (Sample Order)</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-amber-500">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
              <p className="text-white/90 text-lg mb-8">Contact us for a detailed shipping quote.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://wa.me/" className="bg-white text-amber-600 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors">Get Shipping Quote</a>
                <a href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-amber-600 font-semibold px-8 py-3 rounded-lg transition-colors">Contact Sales</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Export;