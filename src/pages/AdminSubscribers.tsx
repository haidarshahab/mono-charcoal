import { useEffect, useState } from "react";
import { Search, Users, Download, Copy, Check } from "lucide-react";
import { getSubscribers, Subscriber } from "@/lib/supabase";
import SEO from "@/components/SEO";

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  const loadSubscribers = async () => {
    try {
      const data = await getSubscribers();
      setSubscribers(data);
    } catch (error) {
      console.error("Failed to load subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscribers();
  }, []);

  const handleCopyEmails = () => {
    const emails = subscribers.map(s => s.email).join(", ");
    navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredSubscribers = subscribers.filter(sub =>
    sub.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <>
      <SEO title="Subscribers" description="Newsletter Subscribers" />
      <div>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Subscribers</h1>
            <p className="text-slate-400 mt-1">
              {subscribers.length} newsletter subscribers
            </p>
          </div>
          <button
            onClick={handleCopyEmails}
            disabled={subscribers.length === 0}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copied ? "Copied!" : "Copy All Emails"}
          </button>
        </div>

        {/* Search */}
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search by email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Subscribers List */}
        {filteredSubscribers.length === 0 ? (
          <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No subscribers yet</h3>
            <p className="text-slate-400">
              Newsletter signups will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">Email</th>
                  <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">Subscribed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-slate-700/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-slate-400" />
                        </div>
                        <span className="text-white">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-400">
                        {new Date(subscriber.subscribed_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
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

export default AdminSubscribers;