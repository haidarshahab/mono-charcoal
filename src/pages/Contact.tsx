import SEO, { organizationSchema, faqSchema } from "@/components/SEO";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { addContact } from "@/lib/supabase";

const Contact = () => {
  const ref = useScrollReveal();
  const [formData, setFormData] = useState({ name: "", email: "", company: "", country: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      console.log("Submitting contact form:", formData);
      await addContact({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        country: formData.country,
        message: formData.message,
      });
      setSent(true);
      setFormData({ name: "", email: "", company: "", country: "", message: "" });
      console.log("Contact submitted successfully!");
    } catch (error: any) {
      console.error("Failed to send message:", error);
      alert("Error: " + (error.message || "Failed to send. Please try WhatsApp instead."));
    } finally {
      setSending(false);
    }
  };

  const faqs = [
    { question: "What is your minimum order quantity?", answer: "Our minimum order is 18 tons for a 20ft container. For sample purposes, we can arrange LCL orders starting from 1 ton." },
    { question: "How long does production take?", answer: "Production typically takes 10-14 days for a 20ft container. Custom packaging adds 2-3 weeks." },
    { question: "What payment methods do you accept?", answer: "We accept Telegraph Transfer (TT) with 50% advance payment." },
    { question: "Do you provide samples?", answer: "Yes, we offer 1kg free samples. International shipping costs are borne by the customer." },
    { question: "Can I visit your factory?", answer: "Absolutely! We welcome wholesale buyers to visit our factory in Bekasi, Indonesia." },
    { question: "What certifications do you have?", answer: "We are ISO 9001:2015 certified and hold Indonesian government export licenses." },
  ];

  return (
    <>
      <SEO title="Contact Us" description="Contact Mono Charcoal - Indonesian coconut charcoal manufacturer. Get free sample, quote, or visit our factory." schema={{ ...organizationSchema, ...faqSchema(faqs) }} />
      <div ref={ref}>
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Contact Us <span className="block text-amber-500">Get Your Quote Today</span></h1>
              <p className="text-xl text-slate-300 mb-8">Ready to start your order? Contact us for free samples and competitive quotes.</p>
              <a href="https://wa.me/62881024922133" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center gap-2 inline-flex"><MessageCircle className="w-5 h-5" />Chat on WhatsApp</a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md text-center"><MapPin className="w-10 h-10 text-amber-500 mx-auto mb-3" /><h3 className="font-semibold text-slate-900 mb-2">Factory Location</h3><p className="text-slate-600 text-sm">Bekasi, West Java, Indonesia</p></div>
              <div className="bg-white rounded-xl p-6 shadow-md text-center"><Phone className="w-10 h-10 text-amber-500 mx-auto mb-3" /><h3 className="font-semibold text-slate-900 mb-2">Phone</h3><p className="text-slate-600 text-sm">+62 881 0249 22133</p></div>
              <div className="bg-white rounded-xl p-6 shadow-md text-center"><Mail className="w-10 h-10 text-amber-500 mx-auto mb-3" /><h3 className="font-semibold text-slate-900 mb-2">Email</h3><p className="text-slate-600 text-sm">admin@monocharcoal.com</p></div>
              <div className="bg-white rounded-xl p-6 shadow-md text-center"><Clock className="w-10 h-10 text-amber-500 mx-auto mb-3" /><h3 className="font-semibold text-slate-900 mb-2">Response Time</h3><p className="text-slate-600 text-sm">Within 24 hours</p></div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Send Us a Message</h2><p className="text-lg text-slate-600">Fill out the form below and we'll get back to you within 24 hours.</p></div>
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div><label className="block text-slate-700 font-medium mb-2">Name *</label><input type="text" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div>
                  <div><label className="block text-slate-700 font-medium mb-2">Email *</label><input type="email" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div><label className="block text-slate-700 font-medium mb-2">Company</label><input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} /></div>
                  <div><label className="block text-slate-700 font-medium mb-2">Country</label><input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} /></div>
                </div>
                <div className="mb-6"><label className="block text-slate-700 font-medium mb-2">Message *</label><textarea required rows={5} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500 resize-none" placeholder="Tell us about your requirements" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea></div>
                <button type="submit" disabled={sending} className="w-full bg-amber-500 text-white font-semibold py-4 rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {sending ? "Sending..." : "Send Message"}
              </button>
              {sent && <p className="text-green-600 text-center mt-4 font-medium">Thank you! Your message has been sent. We'll respond within 24 hours.</p>}
              </form>
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
              <h2 className="text-3xl font-bold mb-4">Prefer WhatsApp?</h2>
              <p className="text-white/90 text-lg mb-8">Contact us directly on WhatsApp for fastest response.</p>
              <a href="https://wa.me/62881024922133" className="inline-flex items-center gap-2 bg-white text-amber-600 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors"><MessageCircle className="w-5 h-5" />Chat on WhatsApp</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;