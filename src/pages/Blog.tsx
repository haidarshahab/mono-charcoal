import { useEffect, useState } from "react";
import SEO from "@/components/SEO";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Clock, ArrowRight, Mail, MessageCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getArticles, addSubscriber, Article } from "@/lib/supabase";

const Blog = () => {
  const ref = useScrollReveal();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await getArticles(true); // Only published
        setArticles(data);
      } catch (error) {
        console.error("Failed to load articles:", error);
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setSubscribing(true);
    setError("");
    
    try {
      console.log("Subscribing email:", email);
      await addSubscriber(email);
      setSubscribed(true);
      console.log("Subscribed successfully!");
    } catch (err: any) {
      console.error("Subscribe error:", err);
      if (err?.message?.includes("duplicate") || err?.status === 409 || err?.message?.includes("unique constraint")) {
        setSubscribed(true); // Already subscribed, show success
      } else {
        setError("Failed: " + (err.message || "Please try again."));
      }
    } finally {
      setSubscribing(false);
    }
  };

  const categories = ["All Posts", ...new Set(articles.map(a => a.category).filter(Boolean))];
  
  const filteredArticles = selectedCategory === "All Posts" 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

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
              {categories.map((cat, index) => (
                <button 
                  key={index} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat ? "bg-amber-500 text-white" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No articles yet</h3>
                <p className="text-slate-600">Check back soon for new content!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((post) => (
                  <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="bg-gradient-to-br from-amber-500 to-amber-600 h-32 flex items-center justify-center">
                      <span className="text-white/80 text-sm font-medium px-4 text-center">{post.category || "Article"}</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                        <span>{formatDate(post.date)}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.read_time || "5 min read"}</span>
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 mb-3 hover:text-amber-600 transition-colors">{post.title}</h2>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                      <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-amber-600 font-medium hover:text-amber-700 transition-colors">Read Article <ArrowRight className="w-4 h-4" /></Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Stay Updated</h2>
              <p className="text-slate-600 mb-8">Subscribe to our newsletter for the latest industry insights, sourcing tips, and charcoal business guides.</p>
              {subscribed ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <p className="text-green-800 font-medium mb-4">Thank you for subscribing! Check your email for confirmation.</p>
                  <a href="https://wa.me/62881024922133" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700">
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
                  <button 
                    type="submit" 
                    disabled={subscribing}
                    className="bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {subscribing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
                    {subscribing ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
              )}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <p className="text-slate-500 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;