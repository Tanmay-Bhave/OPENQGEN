import { useState } from "react";
import { Eye, EyeOff, Shield, Sparkles, CheckCircle } from "lucide-react";
import { useApp } from "../context/AppContext";


export default function Login() {
  const { login, navigate } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }

      // Save authentication data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update application context
      login(data.user);

      // Redirect according to role
      if (data.user.role === "admin") {
        navigate("admin/dashboard");
      } else {
        navigate("faculty/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        "Unable to connect to server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = (role: "admin" | "faculty") => {
    if (role === "admin") {
      setEmail("admin@openqg.com");
      setPassword("Admin@123");
    } else {
      setEmail("rahul.sharma@college.edu");
      setPassword("Faculty@123");
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#f1f5f9" }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 w-[44%] flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <span className="font-display font-700 text-white text-lg">Q</span>
          </div>
          <div>
            <div className="font-display font-700 text-white text-xl tracking-wide">OPENQG</div>
            <div className="text-indigo-200 text-xs">AI-Powered Question Generator</div>
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
            <Sparkles size={14} className="text-indigo-300" />
            <span className="text-indigo-200 text-xs font-500">Powered by AI</span>
          </div>
          <h1 className="font-display text-4xl font-700 text-white leading-tight mb-4">
            Generate. Validate.<br />Review. Approve.
          </h1>
          <p className="text-indigo-200 text-base leading-relaxed mb-8">
            Intelligent question paper generation for modern academic institutions.
          </p>
          <p className="text-indigo-300 text-sm leading-relaxed max-w-sm">
            An intelligent academic workflow for creating unique, compliant and high-quality question papers aligned with course outcomes and Bloom's taxonomy.
          </p>
        </div>

        <div className="space-y-3">
          {[
            "Admin → Faculty → AI Generation",
            "CO/PO Aligned Question Papers",
            "Review & Approval Workflow",
          ].map((f) => (
            <div key={f} className="flex items-center gap-3">
              <CheckCircle size={16} className="text-indigo-300 flex-shrink-0" />
              <span className="text-indigo-200 text-sm">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Logo (mobile) */}
            <div className="flex lg:hidden items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="font-display font-700 text-white">Q</span>
              </div>
              <span className="font-display font-700 text-slate-900 text-lg">OPENQG</span>
            </div>

            <h2 className="font-display text-2xl font-700 text-slate-900 mb-1">Welcome back</h2>
            <p className="text-sm text-slate-500 mb-7">Sign in to your account to continue</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="form-label">Password</label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    className="form-input pr-10"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                  />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <button type="button" className="text-sm text-indigo-600 hover:text-indigo-700 font-500">
                  Forgot password?
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 slide-in">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary w-full justify-center py-3 text-base"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spin" />
                    Signing in...
                  </>
                ) : "Sign In"}
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-slate-100">
              <div className="flex items-center gap-2 justify-center mb-3">
                <Shield size={14} className="text-slate-400" />
                <span className="text-xs font-600 text-slate-500 uppercase tracking-wide">Authorized access only</span>
              </div>
              <p className="text-xs text-slate-400 text-center leading-relaxed">
                Faculty credentials are provided and managed by the administrator.
              </p>
            </div>

            {/* Demo credentials */}
            <div className="mt-4 bg-slate-50 rounded-xl p-4">
              <p className="text-xs font-600 text-slate-500 uppercase tracking-wide mb-3">Demo Quick Login</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => demoLogin("admin")}
                  className="flex-1 text-xs py-2 px-3 bg-indigo-50 text-indigo-700 rounded-lg font-500 hover:bg-indigo-100 transition-colors border border-indigo-200"
                >
                  Admin Demo
                </button>
                <button
                  type="button"
                  onClick={() => demoLogin("faculty")}
                  className="flex-1 text-xs py-2 px-3 bg-green-50 text-green-700 rounded-lg font-500 hover:bg-green-100 transition-colors border border-green-200"
                >
                  Faculty Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
