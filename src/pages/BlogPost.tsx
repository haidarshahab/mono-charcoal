import { useEffect, useState } from "react";
import SEO from "@/components/SEO";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Share2, MessageCircle, Loader2 } from "lucide-react";
import { getArticleBySlug, getArticles, Article } from "@/lib/supabase";

const WHATSAPP_URL = "https://wa.me/62881024922133?text=Hi%20Mono%20Charcoal%2C%20I%27m%20interested%20in%20your%20blog%20content";

const BlogPost = () => {
  const { slug } = useParams();
  const { ref } = useScrollReveal();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      try {
        if (slug) {
          const data = await getArticleBySlug(slug);
          setArticle(data || null);
          
          // Load related articles
          const allArticles = await getArticles(true);
          const related = allArticles
            .filter(a => a.slug !== slug)
            .slice(0, 2);
          setRelatedArticles(related);
        }
      } catch (error) {
        console.error("Failed to load article:", error);
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!article) {
    return (
      <>
        <SEO title="Article Not Found" description="The requested article could not be found." />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
            <Link to="/blog" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90">
              <ArrowLeft className="w-5 h-5" /> Back to Blog
            </Link>
          </div>
        </div>
      </>
    );
  }

  const contentSections = (article.content || "").split('\n\n').filter(section => section.trim());

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <SEO 
        title={article.title} 
        description={article.excerpt || undefined}
        keywords={article.keywords?.join(', ') || undefined}
      />
      <div ref={ref}>
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-5 h-5" /> Back to Blog
            </Link>
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full">{article.category || "Article"}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(article.date)}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{article.read_time || "5 min read"}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{article.title}</h1>
              <p className="text-xl text-slate-300">{article.excerpt}</p>
              <div className="flex items-center gap-4 mt-6">
                <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  <Share2 className="w-5 h-5" /> Share
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2">
              {article.keywords?.map((keyword, index) => (
                <span key={index} className="bg-white text-slate-600 px-3 py-1 rounded-full text-sm border border-slate-200">#{keyword}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {contentSections.map((section, index) => {
                const trimmed = section.trim();
                if (trimmed.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">{trimmed.replace('## ', '')}</h2>;
                }
                if (trimmed.startsWith('### ')) {
                  return <h3 key={index} className="text-xl font-bold text-slate-900 mt-8 mb-4">{trimmed.replace('### ', '')}</h3>;
                }
                if (trimmed.startsWith('- **')) {
                  const items = trimmed.split('\n').filter(line => line.trim());
                  return (
                    <ul key={index} className="space-y-2 mb-6">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-700">
                          <span className="text-amber-500 mt-2">•</span>
                          <span dangerouslySetInnerHTML={{ __html: item.replace('- **', '').replace('**', '<strong class="text-slate-900">').replace('**:', '</strong>:') }} />
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (trimmed.startsWith('| ')) {
                  const rows = trimmed.split('\n').filter(row => row.trim());
                  if (rows.length > 1) {
                    return (
                      <div key={index} className="overflow-x-auto mb-8">
                        <table className="w-full border-collapse">
                          {rows.map((row, i) => {
                            const cols = row.split('|').filter(c => c.trim()).map(c => c.trim());
                            if (i === 0) {
                              return (
                                <thead key={i}>
                                  <tr className="bg-slate-900 text-white">
                                    {cols.map((col, j) => (
                                      <th key={j} className="px-4 py-3 text-left font-semibold">{col}</th>
                                    ))}
                                  </tr>
                                </thead>
                              );
                            }
                            return (
                              <tbody key={i}>
                                <tr className={i % 2 === 0 ? "bg-slate-100" : "bg-white"}>
                                  {cols.map((col, j) => (
                                    <td key={j} className="px-4 py-3 text-slate-700 border-t border-slate-200">{col}</td>
                                  ))}
                                </tr>
                              </tbody>
                            );
                          })}
                        </table>
                      </div>
                    );
                  }
                }
                if (trimmed.startsWith('```')) {
                  return null;
                }
                if (trimmed.match(/^\d+\./)) {
                  const items = trimmed.split('\n').filter(line => line.trim());
                  return (
                    <ol key={index} className="space-y-3 mb-6 ml-4">
                      {items.map((item, i) => (
                        <li key={i} className="text-slate-700 list-decimal ml-4">{item.replace(/^\d+\.\s+/, '')}</li>
                      ))}
                    </ol>
                  );
                }
                return <p key={index} className="text-slate-700 text-lg leading-relaxed mb-6">{trimmed}</p>;
              })}
            </div>
          </div>
        </section>

        {article.takeaways && article.takeaways.length > 0 && (
          <section className="py-16 bg-amber-50">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Takeaways</h2>
                <ul className="space-y-4">
                  {article.takeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg">
                      <span className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">{index + 1}</span>
                      <span className="text-slate-700">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
              <p className="text-slate-300 text-lg mb-8">Contact us for more information about our charcoal products and OEM services.</p>
              <a href={WHATSAPP_URL} className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                <MessageCircle className="w-5 h-5" /> Contact Us on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {relatedArticles.length > 0 && (
          <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedArticles.map((related) => (
                  <article key={related.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                        <span>{related.category || "Article"}</span>
                        <span>{related.read_time || "5 min read"}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 hover:text-amber-600 transition-colors">{related.title}</h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{related.excerpt}</p>
                      <Link to={`/blog/${related.slug}`} className="inline-flex items-center gap-2 text-amber-600 font-medium hover:text-amber-700 transition-colors">
                        Read Article <ArrowLeft className="w-4 h-4 -rotate-90" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default BlogPost;