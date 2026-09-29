import { useEffect, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import Badge from "../../components/ui/Badge";
import { deleteQuestion, getQuestions } from "../../Api/questionApi";
import { useApp } from "../../context/AppContext";

export default function AdminQuestionBank() {
  const { toast } = useApp(); const [questions, setQuestions] = useState<any[]>([]); const [search, setSearch] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(true);
  useEffect(() => { getQuestions().then(setQuestions).catch((e) => setError(e.message)).finally(() => setLoading(false)); }, []);
  const filtered = questions.filter((q) => `${q.questionText} ${q.subject?.name || ""}`.toLowerCase().includes(search.toLowerCase()));
  const colors: Record<string, "success" | "warning" | "error"> = { Easy: "success", Medium: "warning", Hard: "error" };
  return <div className="p-6"><div className="mb-6"><h1 className="font-display text-2xl font-700 text-slate-900">Question Bank</h1><p className="text-slate-500 mt-1 text-sm">View and manage all questions across departments and subjects.</p></div><div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 relative"><Search size={15} className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400"/><input className="form-input pl-9" placeholder="Search questions..." value={search} onChange={(e) => setSearch(e.target.value)}/></div>
    {loading ? <p className="text-slate-500">Loading questions…</p> : error ? <p className="text-red-600">Unable to load questions: {error}</p> : <div className="space-y-3">{filtered.length ? filtered.map((q) => <div key={q.id} className="bg-white rounded-xl border border-slate-200 p-5"><div className="flex justify-between gap-4"><div><p className="text-sm text-slate-800 font-500 mb-3">{q.questionText}</p><div className="flex flex-wrap gap-2"><Badge variant="default" size="sm">{q.subject?.name || q.courseCode}</Badge><Badge variant="purple" size="sm">Unit {q.unit}</Badge><Badge variant="info" size="sm">{q.co}</Badge><Badge variant="default" size="sm">{q.bloomLevel}</Badge><Badge variant={colors[q.difficulty]} size="sm">{q.difficulty}</Badge><span className="text-xs text-slate-500">{q.marks} Marks</span></div></div><button className="btn-ghost text-red-500" onClick={async () => { try { await deleteQuestion(q.id); setQuestions((v) => v.filter((x) => x.id !== q.id)); toast("success", "Question deleted."); } catch (e: any) { toast("error", e.message); } }}><Trash2 size={15}/></button></div></div>) : <div className="text-center py-12 text-slate-400">No questions found.</div>}</div>}</div>;
}
