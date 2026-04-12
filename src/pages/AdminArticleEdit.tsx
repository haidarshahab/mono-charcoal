import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Eye, Loader2, Zap } from "lucide-react";
import { getArticleById, createArticle, updateArticle, generateSlug, Article } from "@/lib/supabase";
import SEO from "@/components/SEO";

const JARKATA_OFFSET_HOURS = 7; // UTC+7 (WIB/Jakarta Time)

const toUTC = (localDateStr: string): string | null => {
  if (!localDateStr) return null;
  const [datePart, timePart] = localDateStr.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute] = timePart.split(':').map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day, hour - JARKATA_OFFSET_HOURS, minute));
  return utcDate.toISOString();
};

const fromUTC = (isoDate: string | null): string => {
  if (!isoDate) return "";
  const utcDate = new Date(isoDate);
  const wibDate = new Date(utcDate.getTime() + JARKATA_OFFSET_HOURS * 60 * 60 * 1000);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${wibDate.getUTCFullYear()}-${pad(wibDate.getUTCMonth() + 1)}-${pad(wibDate.getUTCDate())}T${pad(wibDate.getUTCHours())}:${pad(wibDate.getUTCMinutes())}`;
};

const categories = [
  "Industry Knowledge",
  "Sourcing Guide", 
  "Business Guide",
  "Quality Guide",
  "OEM",
  "Logistics",
];

const AdminArticleEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    keywords: "",
    date: new Date().toISOString().split("T")[0],
    readTime: "5 min read",
    published: false,
    scheduled_publish: "",
  });

  useEffect(() => {
    if (isEdit && id) {
      const loadArticle = async () => {
        try {
          const article = await getArticleById(id);
          if (article) {
            setForm({
              title: article.title || "",
              slug: article.slug || "",
              excerpt: article.excerpt || "",
              content: article.content || "",
              category: article.category || "",
              keywords: article.keywords?.join(", ") || "",
              date: article.date || "",
              readTime: article.read_time || "5 min read",
              published: article.published || false,
              scheduled_publish: fromUTC(article.scheduled_publish),
            });
          }
        } catch (error) {
          console.error("Failed to load article:", error);
        } finally {
          setLoading(false);
        }
      };
      loadArticle();
    } else {
      setLoading(false);
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
    setForm(prev => ({
      ...prev,
      [name]: newValue,
      // Auto-generate slug when title changes (for new articles)
      ...(name === "title" && !isEdit ? { slug: generateSlug(value) } : {})
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const articleData: Partial<Article> = {
        title: form.title,
        slug: form.slug || generateSlug(form.title),
        excerpt: form.excerpt,
        content: form.content,
        category: form.category,
        keywords: form.keywords ? form.keywords.split(",").map(k => k.trim()) : [],
        date: form.date,
        read_time: form.readTime,
        published: form.published,
        scheduled_publish: toUTC(form.scheduled_publish),
      };

      if (isEdit && id) {
        await updateArticle(id, articleData);
      } else {
        await createArticle(articleData);
      }

      navigate("/admin/articles");
    } catch (error) {
      console.error("Failed to save article:", error);
      alert("Failed to save article. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <>
      <SEO title={isEdit ? "Edit Article" : "New Article"} description="Article Editor" />
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/articles"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {isEdit ? "Edit Article" : "New Article"}
              </h1>
              <p className="text-slate-400 mt-1">
                {isEdit ? "Update an existing article" : "Create a new blog article"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPreview(!preview)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Eye className="w-5 h-5" /> Preview
            </button>
            <button
              type="submit"
              disabled={saving || !form.title}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {saving ? "Saving..." : "Save Article"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <label className="block text-slate-400 text-sm mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-xl font-semibold"
                placeholder="Enter article title"
              />
            </div>

            {/* Slug */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <label className="block text-slate-400 text-sm mb-2">URL Slug</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                placeholder="article-url-slug"
              />
              <p className="text-slate-500 text-sm mt-2">
                URL: /blog/{form.slug || "article-slug"}
              </p>
            </div>

            {/* Excerpt */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <label className="block text-slate-400 text-sm mb-2">Excerpt</label>
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                placeholder="Brief description for article cards..."
              />
            </div>

            {/* Content */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <label className="block text-slate-400 text-sm mb-2">Content</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={20}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono text-sm"
                placeholder="Write your article content here...&#10;&#10;Use markdown for formatting:&#10;## Heading&#10;### Subheading&#10;- Bullet point&#10;| Table | Column |&#10;| --- | --- |"
              />
              <p className="text-slate-500 text-sm mt-2">
                Use Markdown for formatting
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Status */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-white font-semibold mb-4">Publishing</h3>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="published"
                  checked={form.published}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-900 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-white">Published</span>
              </label>
              <p className="text-slate-500 text-sm mt-2">
                {form.published 
                  ? "This article is visible on the blog" 
                  : "This article is a draft and hidden"}
              </p>
              {form.scheduled_publish && !form.published && (
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await updateArticle(id!, { published: true, scheduled_publish: null });
                      setForm(prev => ({ ...prev, published: true, scheduled_publish: "" }));
                      alert("Article published immediately!");
                    } catch (error) {
                      console.error("Failed to publish:", error);
                    }
                  }}
                  className="mt-3 flex items-center gap-2 text-amber-500 hover:text-amber-400 text-sm"
                >
                  <Zap className="w-4 h-4" /> Publish immediately
                </button>
              )}
            </div>

            {/* Scheduled Publish */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-white font-semibold mb-4">Schedule Publishing</h3>
              <label className="block text-slate-400 text-sm mb-2">Publish Date & Time (WIB)</label>
              <input
                type="datetime-local"
                name="scheduled_publish"
                value={form.scheduled_publish}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
              />
              <p className="text-slate-500 text-sm mt-2">
                Leave empty for manual publishing. Set date/time to auto-publish.
              </p>
            </div>

            {/* Category */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <label className="block text-slate-400 text-sm mb-2">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <label className="block text-slate-400 text-sm mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Read Time */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <label className="block text-slate-400 text-sm mb-2">Read Time</label>
              <input
                type="text"
                name="readTime"
                value={form.readTime}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                placeholder="5 min read"
              />
            </div>

            {/* Keywords */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <label className="block text-slate-400 text-sm mb-2">Keywords</label>
              <input
                type="text"
                name="keywords"
                value={form.keywords}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                placeholder="keyword 1, keyword 2, keyword 3"
              />
              <p className="text-slate-500 text-sm mt-2">
                Separate keywords with commas
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdminArticleEdit;