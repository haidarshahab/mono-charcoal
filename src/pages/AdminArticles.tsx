import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, Eye, EyeOff, Search, FileText, Clock } from "lucide-react";
import { getArticles, deleteArticle, Article } from "@/lib/supabase";
import SEO from "@/components/SEO";

const AdminArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadArticles = async () => {
    try {
      const data = await getArticles(false);
      setArticles(data);
    } catch (error) {
      console.error("Failed to load articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article? This cannot be undone.")) {
      return;
    }
    setDeleting(id);
    try {
      await deleteArticle(id);
      await loadArticles();
    } catch (error) {
      console.error("Failed to delete article:", error);
    } finally {
      setDeleting(null);
    }
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase()) ||
    article.category?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <>
      <SEO title="Articles" description="Manage Blog Articles" />
      <div>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Articles</h1>
            <p className="text-slate-400 mt-1">Manage your blog articles</p>
          </div>
          <Link
            to="/admin/articles/new"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" /> New Article
          </Link>
        </div>

        {/* Search */}
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Articles List */}
        {filteredArticles.length === 0 ? (
          <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No articles yet</h3>
            <p className="text-slate-400 mb-6">Create your first blog article to get started.</p>
            <Link
              to="/admin/articles/new"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" /> Create Article
            </Link>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">Title</th>
                  <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">Category</th>
                  <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">Status</th>
                  <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">Date</th>
                  <th className="text-right text-slate-400 text-sm font-medium px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-700/50">
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">{article.title}</p>
                      <p className="text-slate-500 text-sm truncate max-w-md">{article.excerpt}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-400">{article.category || "—"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`
                        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                        ${article.published 
                          ? "bg-green-500/20 text-green-400" 
                          : article.scheduled_publish 
                            ? "bg-accent/20 text-accent/80"
                            : "bg-slate-600/50 text-slate-400"}
                      `}>
                        {article.published ? (
                          <>
                            <Eye className="w-3.5 h-3.5" /> Published
                          </>
                        ) : article.scheduled_publish ? (
                          <>
                            <Clock className="w-3.5 h-3.5" /> Scheduled
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5" /> Draft
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-400 text-sm">
                        {article.published 
                          ? (article.date || new Date(article.created_at).toLocaleDateString())
                          : article.scheduled_publish 
                            ? (() => {
                                const wibDate = new Date(new Date(article.scheduled_publish).getTime() + 7 * 60 * 60 * 1000);
                                const pad = (n: number) => n.toString().padStart(2, '0');
                                return `${wibDate.getUTCFullYear()}-${pad(wibDate.getUTCMonth() + 1)}-${pad(wibDate.getUTCDate())} ${pad(wibDate.getUTCHours())}:${pad(wibDate.getUTCMinutes())} WIB`;
                              })()
                            : (article.date || new Date(article.created_at).toLocaleDateString())
                        }
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/articles/${article.id}`}
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <Link
                          to={`/blog/${article.slug}`}
                          target="_blank"
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id)}
                          disabled={deleting === article.id}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-600 rounded-lg transition-colors"
                          title="Delete"
                        >
                          {deleting === article.id ? (
                            <div className="w-5 h-5 animate-spin rounded-full border-b-2 border-red-400"></div>
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminArticles;