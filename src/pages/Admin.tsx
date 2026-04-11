import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { ADMIN_PASSWORD } from "@/components/AdminLayout";
import SEO from "@/components/SEO";

const Admin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Admin Login" description="Mono Charcoal Admin Panel" />
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Mono Admin</h1>
            <p className="text-slate-400 mt-2">Enter your password to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="bg-slate-800 rounded-2xl p-8 shadow-xl">
            <div className="space-y-6">
              <div>
                <label className="block text-slate-400 text-sm mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-500" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    placeholder="Enter admin password"
                    required
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-sm mt-2">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Login"}
              </button>
            </div>
          </form>

          {/* Back link */}
          <div className="text-center mt-6">
            <a href="/" className="text-slate-400 hover:text-white text-sm">
              ← Back to website
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;