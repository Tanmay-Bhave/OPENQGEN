import { Users, BookOpen, FileText, Link, CheckCircle, Clock, TrendingUp, Activity } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { recentActivity } from "../../data/mock";

function StatCard({
  label, value, icon, color, sub, trend,
}: {
  label: string; value: string | number; icon: React.ReactNode;
  color: string; sub?: string; trend?: string;
}) {
  return (
    <div className="stat-card bg-white rounded-xl p-5 border border-slate-200">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-500 text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
            <TrendingUp size={10} />{trend}
          </span>
        )}
      </div>
      <div className="font-display text-3xl font-700 text-slate-900 mb-1">{value}</div>
      <div className="text-sm font-500 text-slate-600">{label}</div>
      {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
    </div>
  );
}

const activityIcons: Record<string, string> = {
  paper: "📄",
  bank: "🗃️",
  assignment: "🔗",
  approval: "✅",
};

export default function AdminDashboard() {
  const { navigate } = useApp();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-6 max-w-[1400px]">
      {/* Header */}
      <div className="mb-7">
        <h1 className="font-display text-2xl font-700 text-slate-900">{greeting}, Administrator</h1>
        <p className="text-slate-500 mt-1">Manage faculty, courses and generated question papers from one centralized workspace.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-7">
        <StatCard label="Total Faculty" value={24} icon={<Users size={20} className="text-indigo-600" />} color="bg-indigo-50" trend="+2" sub="across all departments" />
        <StatCard label="Active Faculty" value={21} icon={<Users size={20} className="text-green-600" />} color="bg-green-50" sub="3 inactive accounts" />
        <StatCard label="Total Subjects" value={48} icon={<BookOpen size={20} className="text-blue-600" />} color="bg-blue-50" trend="+5" />
        <StatCard label="Assigned Courses" value={42} icon={<Link size={20} className="text-purple-600" />} color="bg-purple-50" sub="6 unassigned" />
        <StatCard label="Generated Papers" value={186} icon={<FileText size={20} className="text-orange-600" />} color="bg-orange-50" trend="+12" />
        <StatCard label="Pending Reviews" value={8} icon={<Clock size={20} className="text-red-600" />} color="bg-red-50" sub="requires attention" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-indigo-600" />
              <h2 className="font-display font-600 text-slate-900">Recent Activity</h2>
            </div>
            <button className="btn-ghost text-xs" onClick={() => navigate("admin/audit-logs")}>View all logs →</button>
          </div>
          <div className="divide-y divide-slate-50">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                  {activityIcons[item.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700">{item.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions + System Overview */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-display font-600 text-slate-900">Quick Actions</h2>
            </div>
            <div className="p-4 space-y-2">
              {[
                { label: "Add New Faculty", page: "admin/faculty" as const, color: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100" },
                { label: "Create Subject", page: "admin/subjects" as const, color: "text-blue-600 bg-blue-50 hover:bg-blue-100" },
                { label: "Assign Course", page: "admin/assignments" as const, color: "text-green-600 bg-green-50 hover:bg-green-100" },
                { label: "Review Papers (8 pending)", page: "admin/papers" as const, color: "text-amber-700 bg-amber-50 hover:bg-amber-100" },
              ].map((a) => (
                <button
                  key={a.label}
                  onClick={() => navigate(a.page)}
                  className={`w-full text-left text-sm font-500 px-4 py-2.5 rounded-lg transition-colors ${a.color}`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-display font-600 text-slate-900">Paper Status</h2>
            </div>
            <div className="p-4 space-y-3">
              {[
                { label: "Approved", count: 142, color: "bg-green-500", pct: 76 },
                { label: "Under Review", count: 28, color: "bg-amber-500", pct: 15 },
                { label: "Draft", count: 16, color: "bg-slate-400", pct: 9 },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 font-500">{s.label}</span>
                    <span className="text-slate-500 font-mono-data text-xs">{s.count}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2 pt-2">
                <CheckCircle size={14} className="text-green-500" />
                <span className="text-xs text-slate-500">186 total papers generated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
