import SEO from "@/components/SEO";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Clock, ArrowRight, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Blog = () => {
  const ref = useScrollReveal();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const mailtoUrl = `mailto:admin@monocharcoal.com?subject=Newsletter%20Subscription&body=I%20want%20to%20subscribe%20to%20the%20Mono%20Charcoal%20newsletter.%20My%20email%20is:%20${encodeURIComponent(email)}`;
      window.location.href = mailtoUrl;
      setSubscribed(true);
    }
  };

  const blogPosts = [
    { slug: "why-indonesian-coconut-charcoal-is-superior", title: "Why Indonesian Coconut Charcoal is Superior for Shisha", excerpt: "Discover what makes Indonesian coconut shell charcoal the preferred choice for hookah lounges worldwide.", date: "2025-04-10", readTime: "8 min read", category: "Industry Knowledge" },
    { slug: "coconut-charcoal-factory-vs-middleman", title: "Coconut Charcoal Factory vs Middleman: The Hidden Costs", excerpt: "Buying from a middleman adds 20-30% to your costs. Learn how to source directly from factories.", date: "2025-04-05", readTime: "6 min read", category: "Sourcing Guide" },
    { slug: "how-to-start-charcoal-import-business", title: "How to Start a Charcoal Import Business: Complete Guide", excerpt: "Step-by-step guide to importing coconut charcoal from Indonesia.", date: "2025-03-28", readTime: "12 min read", category: "Business Guide" },
    { slug: "understanding-ash-content", title: "Understanding Ash Content: What It Means for Your Business", excerpt: "Ash content affects burn time, heat output, and customer satisfaction.", date: "2025-03-20", readTime: "7 min read", category: "Quality Guide" },
    { slug: "oem-charcoal-manufacturing-guide", title: "OEM Charcoal Manufacturing: Private Label Guide", excerpt: "Everything you need to know about starting your own charcoal brand.", date: "2025-03-15", readTime: "10 min read", category: "OEM" },
    { slug: "shipping-charcoal-international", title: "Shipping Charcoal Internationally: FOB vs CIF Explained", excerpt: "Understanding shipping terms can save you thousands.", date: "2025-03-10", readTime: "9 min read", category: "Logistics" },
  ];
  const categories = ["All Posts", "Industry Knowledge", "Sourcing Guide", "Business Guide", "Quality Guide", "OEM", "Logistics"];

  return (
    <>
      <SEO title="Blog" description="Insights and guides about coconut charcoal industry, sourcing from Indonesia, OEM manufacturing, and charcoal business development." />
      <div ref={ref}>
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Charcoal Industry <span className="block text-amber-500">Insights & Guides</span></h1>
              <p className="text-xl text-slate-300 mb-8">Expert insights on sourcing, manufacturing, and growing your charcoal business.</p>
            </div>
          </div>
        </section>

        <section className="py-8 bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat, index) => (<button key={index} className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${index === 0 ? "bg-amber-500 text-white" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`}>{cat}</button>))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <article key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 h-32 flex items-center justify-center"><span className="text-white/80 text-sm font-medium px-4 text-center">{post.category}</span></div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3"><span>{post.date}</span><span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span></div>
                    <h2 className="text-xl font-bold text-slate-900 mb-3 hover:text-amber-600 transition-colors">{post.title}</h2>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-amber-600 font-medium hover:text-amber-700 transition-colors">Read Article <ArrowRight className="w-4 h-4" /></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Stay Updated</h2>
              <p className="text-slate-600 mb-8">Subscribe to our newsletter for the latest industry insights, sourcing tips, and charcoal business guides.</p>
              {subscribed ? (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                  <p className="text-amber-800 font-medium mb-4">Thank you for subscribing! Check your email for confirmation.</p>
                  <a href="https://wa.me/62881024922133" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700">
                    <MessageCircle className="w-5 h-5" /> Or contact us on WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500" 
                  />
                  <button type="submit" className="bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center gap-2">
                    <Mail className="w-5 h-5" /> Subscribe
                  </button>
                </form>
              )}
              <p className="text-slate-500 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;