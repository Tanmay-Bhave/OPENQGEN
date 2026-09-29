import { useEffect, useState } from "react";
import { BookMarked, FileText, Edit3, CheckCircle, Database } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { getSubjects } from "../../Api/subjectApi";

export default function FacultyDashboard() {
  const { user, navigate } = useApp();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { getSubjects().then(setSubjects).catch((e) => setError(e.message)).finally(() => setLoading(false)); }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const stats = [
    { label: "Assigned Subjects", value: loading ? "—" : subjects.length, icon: <BookMarked size={20} className="text-indigo-600" />, color: "bg-indigo-50" },
    { label: "Generated Papers", value: 0, icon: <FileText size={20} className="text-blue-600" />, color: "bg-blue-50" },
    { label: "Draft Papers", value: 0, icon: <Edit3 size={20} className="text-amber-600" />, color: "bg-amber-50" },
    { label: "Finalized Papers", value: 0, icon: <CheckCircle size={20} className="text-green-600" />, color: "bg-green-50" },
    { label: "Question Bank Items", value: "—", icon: <Database size={20} className="text-purple-600" />, color: "bg-purple-50" },
  ];

  return <div className="p-6 max-w-[1200px]">
    <div className="mb-7"><h1 className="font-display text-2xl font-700 text-slate-900">{greeting}, {user?.name}</h1><p className="text-slate-500 mt-1">Manage your assigned subjects and generate compliant question papers.</p></div>
    {error && <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">Unable to load assigned subjects: {error}</div>}
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-7">{stats.map((stat) => <div key={stat.label} className="stat-card bg-white rounded-xl p-4 border border-slate-200"><div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color} mb-3`}>{stat.icon}</div><div className="font-display text-2xl font-700 text-slate-900 mb-0.5">{stat.value}</div><div className="text-xs font-500 text-slate-500">{stat.label}</div></div>)}</div>
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden"><div className="flex items-center justify-between px-5 py-4 border-b border-slate-100"><h2 className="font-display font-600 text-slate-900">My Subjects</h2><button className="btn-ghost text-xs" onClick={() => navigate("faculty/subjects")}>View all →</button></div><div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">{loading ? <p className="text-slate-400 text-sm p-4 col-span-2 text-center">Loading your subjects…</p> : subjects.length === 0 ? <p className="text-slate-400 text-sm p-4 col-span-2 text-center">No subjects assigned yet. Contact the administrator.</p> : subjects.map((subject) => <div key={subject.id} className="p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-indigo-50 hover:border-indigo-200 border border-transparent transition-all" onClick={() => navigate("faculty/workspace", { subjectId: subject.id })}><div className="flex items-start justify-between mb-2"><span className="font-mono-data text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">{subject.courseCode}</span><span className="text-xs text-slate-400">Sem {subject.semester}</span></div><p className="font-display font-600 text-slate-900 text-sm mb-1">{subject.name}</p><p className="text-xs text-slate-500">{subject.department}</p><div className="mt-3 text-xs text-indigo-600 font-500">Open →</div></div>)}</div></div>
      <div className="space-y-4"><div className="bg-white rounded-xl border border-slate-200 overflow-hidden"><div className="px-5 py-4 border-b border-slate-100"><h2 className="font-display font-600 text-slate-900">Quick Actions</h2></div><div className="p-4 space-y-2"><button className="w-full btn-primary justify-center" onClick={() => navigate("faculty/generate")}>Generate Question Paper</button><button className="w-full btn-secondary justify-center" onClick={() => navigate("faculty/subjects")}>Browse My Subjects</button><button className="w-full btn-secondary justify-center" onClick={() => navigate("faculty/papers")}>View My Papers</button></div></div></div>
    </div>
  </div>;
}
