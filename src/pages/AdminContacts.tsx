import { useEffect, useState } from "react";
import { Search, Mail, MessageSquare, Check, Loader2 } from "lucide-react";
import { getContacts, updateContactStatus, Contact } from "@/lib/supabase";
import SEO from "@/components/SEO";

const AdminContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "resolved">("all");
  const [updating, setUpdating] = useState<string | null>(null);

  const loadContacts = async () => {
    try {
      const status = filter === "all" ? undefined : filter;
      const data = await getContacts(status);
      setContacts(data);
    } catch (error) {
      console.error("Failed to load contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, [filter]);

  const handleStatusChange = async (id: string, status: string) => {
    setUpdating(id);
    try {
      await updateContactStatus(id, status);
      await loadContacts();
    } catch (error) {
      console.error("Failed to update contact:", error);
    } finally {
      setUpdating(null);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(search.toLowerCase()) ||
    contact.email?.toLowerCase().includes(search.toLowerCase()) ||
    contact.message?.toLowerCase().includes(search.toLowerCase())
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
      <SEO title="Contacts" description="Manage Contact Messages" />
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Contact Messages</h1>
          <p className="text-slate-400 mt-1">View messages from your contact form</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-accent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {(["all", "unread", "resolved"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === f
                    ? "bg-accent text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Contacts List */}
        {filteredContacts.length === 0 ? (
          <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
            <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No messages</h3>
            <p className="text-slate-400">Contact form submissions will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`bg-slate-800 rounded-xl p-6 border ${
                  contact.status === "unread"
                    ? "border-accent/30"
                    : "border-slate-700"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {contact.name || "Anonymous"}
                      </h3>
                      {contact.status === "unread" && (
                        <span className="bg-accent/20 text-accent/80 px-2 py-0.5 rounded-full text-xs font-medium">
                          New
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-3">
                      {contact.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" /> {contact.email}
                        </span>
                      )}
                      {contact.company && (
                        <span>{contact.company}</span>
                      )}
                      {contact.country && (
                        <span>{contact.country}</span>
                      )}
                      <span>
                        {new Date(contact.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {contact.message && (
                      <p className="text-slate-300 mt-3 whitespace-pre-wrap">
                        {contact.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {contact.status === "unread" ? (
                      <button
                        onClick={() => handleStatusChange(contact.id, "resolved")}
                        disabled={updating === contact.id}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                      >
                        {updating === contact.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                        Mark Resolved
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(contact.id, "unread")}
                        disabled={updating === contact.id}
                        className="flex items-center gap-2 px-4 py-2 border border-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors"
                      >
                        {updating === contact.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <MessageSquare className="w-4 h-4" />
                        )}
                        Reopen
                      </button>
                    )}
                    <a
                      href={`https://wa.me/62881024922133?text=${encodeURIComponent(`Hi, I received your message: ${contact.message}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    >
                      Reply on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminContacts;