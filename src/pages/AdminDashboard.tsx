import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Users, MessageSquare, TrendingUp, Plus, Eye } from "lucide-react";
import { getStats } from "@/lib/supabase";
import SEO from "@/components/SEO";

interface Stats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalSubscribers: number;
  totalContacts: number;
  unreadContacts: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load stats:", error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const statCards = [
    {
      label: "Published Articles",
      value: stats?.publishedArticles || 0,
      subtext: `${stats?.draftArticles || 0} drafts`,
      icon: FileText,
      color: "bg-accent",
      href: "/admin/articles",
    },
    {
      label: "Total Subscribers",
      value: stats?.totalSubscribers || 0,
      subtext: "Newsletter emails",
      icon: Users,
      color: "bg-blue-500",
      href: "/admin/subscribers",
    },
    {
      label: "Contact Messages",
      value: stats?.totalContacts || 0,
      subtext: `${stats?.unreadContacts || 0} unread`,
      icon: MessageSquare,
      color: "bg-green-500",
      href: "/admin/contacts",
    },
    {
      label: "Website Views",
      value: "1,234",
      subtext: "This month",
      icon: TrendingUp,
      color: "bg-purple-500",
      href: "/",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <>
      <SEO title="Dashboard" description="Mono Charcoal Admin Dashboard" />
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Welcome back! Here's an overview of your website.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link
                key={index}
                to={stat.href}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-accent/50 transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                    <p className="text-slate-500 text-sm mt-1">{stat.subtext}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-accent text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4 mr-1" /> View
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/articles/new"
              className="flex items-center gap-3 p-4 bg-slate-900 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <div className="bg-accent p-2 rounded-lg">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">New Article</p>
                <p className="text-slate-400 text-sm">Create a blog post</p>
              </div>
            </Link>
            <Link
              to="/admin/contacts"
              className="flex items-center gap-3 p-4 bg-slate-900 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <div className="bg-green-500 p-2 rounded-lg">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">View Messages</p>
                <p className="text-slate-400 text-sm">Check contact form</p>
              </div>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-3 p-4 bg-slate-900 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <div className="bg-blue-500 p-2 rounded-lg">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Visit Website</p>
                <p className="text-slate-400 text-sm">View live site</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;