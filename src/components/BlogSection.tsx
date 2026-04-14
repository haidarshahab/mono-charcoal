import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getArticles, Article } from "@/lib/supabase";
import blogImage1 from "@/assets/mono-shisha-bbq-charcoal-blog-1.png";
import blogImage2 from "@/assets/mono-shisha-bbq-charcoal-blog-2.png";
import blogImage3 from "@/assets/mono-shisha-bbq-charcoal-blog-3.png";

const blogImages = [blogImage1, blogImage2, blogImage3];

const BlogSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles(true);
        setArticles(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const fallbackPosts = [
    {
      title: "Why Coconut Charcoal is the Future of Shisha",
      date: "March 15, 2025",
      excerpt: "Discover why more hookah enthusiasts are switching to coconut shell briquettes for a cleaner, longer-lasting smoke experience.",
    },
    {
      title: "How to Choose the Best BBQ Charcoal for Grilling",
      date: "February 28, 2025",
      excerpt: "Not all charcoal is created equal. Learn what to look for in heat output, ash content, and burn consistency.",
    },
    {
      title: "Sustainability in Charcoal Production",
      date: "January 10, 2025",
      excerpt: "How Mono Charcoal is leading the way in eco-friendly manufacturing using 100% recycled coconut shells.",
    },
  ];

  const displayPosts = articles.length > 0 ? articles : fallbackPosts;

  return (
    <section id="blog" className="py-20 bg-card md:py-[120px]">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-center mb-16">
          <p className="font-heading text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Insights
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            From Our Blog
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {displayPosts.map((post, index) => (
                <Card key={index} className="border border-border bg-background group hover:shadow-md transition-shadow duration-300 overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={blogImages[index]} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <p className="text-xs text-muted-foreground font-body">
                      {formatDate(post.date) || post.date}
                    </p>
                    <h3 className="font-heading text-lg font-semibold text-foreground leading-snug">
                      {post.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm font-body mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    {"slug" in post ? (
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-accent text-sm font-semibold font-heading group-hover:gap-2 transition-all"
                      >
                        Read More <ArrowRight size={14} />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-accent text-sm font-semibold font-heading group-hover:gap-2 transition-all">
                        Read More <ArrowRight size={14} />
                      </span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                See All Blog <ArrowRight size={18} />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;