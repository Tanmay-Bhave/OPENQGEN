import { useState } from "react";
import { Search, Eye, Edit, Trash2 } from "lucide-react";
import { questions } from "../../data/mock";
import Badge from "../../components/ui/Badge";

export default function AdminQuestionBank() {
  const [search, setSearch] = useState("");
  const [bloomFilter, setBloomFilter] = useState("All");
  const [diffFilter, setDiffFilter] = useState("All");

  const filtered = questions.filter((q) => {
    const matchSearch = q.text.toLowerCase().includes(search.toLowerCase()) || q.topic.toLowerCase().includes(search.toLowerCase());
    const matchBloom = bloomFilter === "All" || q.bloom === bloomFilter;
    const matchDiff = diffFilter === "All" || q.difficulty === diffFilter;
    return matchSearch && matchBloom && matchDiff;
  });

  const diffColor: Record<string, "success" | "warning" | "error"> = {
    Easy: "success", Medium: "warning", Hard: "error",
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-700 text-slate-900">Question Bank</h1>
        <p className="text-slate-500 mt-1 text-sm">View and manage all questions across departments and subjects.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="form-input pl-9" placeholder="Search questions..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="form-select w-auto">
          <option>All Subjects</option>
          <option>Machine Learning</option>
          <option>DBMS</option>
        </select>
        <select className="form-select w-auto" value={bloomFilter} onChange={(e) => setBloomFilter(e.target.value)}>
          <option value="All">All Bloom Levels</option>
          {["Remember","Understand","Apply","Analyze","Evaluate","Create"].map((b) => <option key={b}>{b}</option>)}
        </select>
        <select className="form-select w-auto" value={diffFilter} onChange={(e) => setDiffFilter(e.target.value)}>
          <option value="All">All Difficulties</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((q) => (
          <div key={q.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-200 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm text-slate-800 font-500 mb-3">{q.text}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="default" size="sm">{q.unit}</Badge>
                  <Badge variant="purple" size="sm">{q.co}</Badge>
                  <Badge variant="info" size="sm">{q.po}</Badge>
                  <Badge variant="default" size="sm">{q.bloom}</Badge>
                  <Badge variant={diffColor[q.difficulty]} size="sm">{q.difficulty}</Badge>
                  <span className="text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full font-mono-data">{q.marks} Marks</span>
                  <span className="text-xs text-slate-400">Used {q.usageCount}×</span>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button className="btn-ghost p-1.5"><Eye size={14} /></button>
                <button className="btn-ghost p-1.5"><Edit size={14} /></button>
                <button className="btn-ghost p-1.5 text-red-500 hover:bg-red-50"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-slate-400 text-center">
        Showing {filtered.length} of {questions.length} questions in the question bank
      </div>
    </div>
  );
}
