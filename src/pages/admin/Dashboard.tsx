import { useEffect, useState } from "react";
import { Users, BookOpen, FileText, Link, Clock } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { getFaculties } from "../../Api/facultyApi";
import { getSubjects } from "../../Api/subjectApi";
import { getQuestions } from "../../Api/questionApi";

function Stat({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return <div className="stat-card bg-white rounded-xl p-5 border border-slate-200"><div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-3">{icon}</div><div className="font-display text-3xl font-700 text-slate-900 mb-1">{value}</div><div className="text-sm font-500 text-slate-600">{label}</div></div>;
}

export default function AdminDashboard() {
  const { navigate } = useApp(); const [stats, setStats] = useState({ faculty: 0, active: 0, subjects: 0, assigned: 0, questions: 0 }); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { Promise.all([getFaculties(), getSubjects(), getQuestions()]).then(([faculty, subjects, questions]) => setStats({ faculty: faculty.length, active: faculty.filter((f: any) => f.status === "Active").length, subjects: subjects.length, assigned: subjects.filter((s: any) => s.assignedFaculty).length, questions: questions.length })).catch((e) => setError(e.message)).finally(() => setLoading(false)); }, []);
  const value = (n: number) => loading ? "…" : n;
  return <div className="p-6 max-w-[1400px]"><div className="mb-7"><h1 className="font-display text-2xl font-700 text-slate-900">Administrator Dashboard</h1><p className="text-slate-500 mt-1">Live institutional data from the backend.</p></div>{error && <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">Unable to load dashboard data: {error}</div>}<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-7"><Stat label="Total Faculty" value={value(stats.faculty)} icon={<Users size={20} className="text-indigo-600"/>}/><Stat label="Active Faculty" value={value(stats.active)} icon={<Users size={20} className="text-green-600"/>}/><Stat label="Total Subjects" value={value(stats.subjects)} icon={<BookOpen size={20} className="text-blue-600"/>}/><Stat label="Assigned Courses" value={value(stats.assigned)} icon={<Link size={20} className="text-purple-600"/>}/><Stat label="Questions" value={value(stats.questions)} icon={<FileText size={20} className="text-orange-600"/>}/></div><div className="grid grid-cols-1 xl:grid-cols-2 gap-6"><div className="bg-white rounded-xl border border-slate-200 p-5"><h2 className="font-display font-600 text-slate-900 mb-2">Recent Activity</h2><p className="text-sm text-slate-500">Audit activity is unavailable until the backend exposes an audit-log endpoint.</p></div><div className="bg-white rounded-xl border border-slate-200 p-5"><h2 className="font-display font-600 text-slate-900 mb-3">Quick Actions</h2><div className="space-y-2">{[["Add New Faculty", "admin/faculty"], ["Create Subject", "admin/subjects"], ["Assign Course", "admin/assignments"], ["Question Bank", "admin/question-bank"]].map(([label, page]) => <button key={page} className="w-full btn-secondary justify-between" onClick={() => navigate(page as any)}>{label}<Clock size={14}/></button>)}</div></div></div></div>;
}
