import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const posts = [
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

const BlogSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="blog" className="py-20 md:py-32 bg-card">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts.map((post) => (
            <Card key={post.title} className="border border-border bg-background group hover:shadow-md transition-shadow duration-300 cursor-pointer">
              <div className="h-40 bg-gradient-to-br from-primary/8 to-primary/3" />
              <CardHeader className="pb-2">
                <p className="text-xs text-muted-foreground font-body">{post.date}</p>
                <h3 className="font-heading text-lg font-semibold text-foreground leading-snug">
                  {post.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm font-body mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-accent text-sm font-semibold font-heading group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={14} />
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
