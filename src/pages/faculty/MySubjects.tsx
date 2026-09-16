import { BookOpen, Clock, FileText, ChevronRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { subjects } from "../../data/mock";

export default function MySubjects() {
  const { user, navigate, faculties } = useApp();
  const faculty = faculties.find((f) => f.id === user?.id);
  const mySubjects = subjects.filter((s) => faculty?.assignedSubjects.includes(s.id));

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-700 text-slate-900">My Subjects</h1>
        <p className="text-slate-500 mt-1 text-sm">Subjects assigned to you for this academic year.</p>
      </div>

      {mySubjects.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
          <BookOpen size={40} className="text-slate-300 mx-auto mb-4" />
          <h3 className="font-display font-600 text-slate-500 mb-1">No subjects assigned</h3>
          <p className="text-sm text-slate-400">Contact the administrator to get subjects assigned to you.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {mySubjects.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => navigate("faculty/workspace", { subjectId: s.id })}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <BookOpen size={20} className="text-indigo-600" />
                </div>
                <span className="font-mono-data text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">{s.courseCode}</span>
              </div>

              <h3 className="font-display font-700 text-slate-900 mb-1">{s.name}</h3>
              <p className="text-xs text-slate-500 mb-4">{s.department}</p>

              <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  Semester {s.semester}
                </span>
                <span className="flex items-center gap-1">
                  <FileText size={12} />
                  {s.credits} Credits
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Questions", value: "63" },
                  { label: "Papers", value: "8" },
                  { label: "Last Paper", value: "02 Sep" },
                ].map((m) => (
                  <div key={m.label} className="bg-slate-50 rounded-lg p-2 text-center">
                    <p className="font-display font-700 text-slate-800 text-sm">{m.value}</p>
                    <p className="text-[10px] text-slate-400">{m.label}</p>
                  </div>
                ))}
              </div>

              <button className="w-full btn-primary justify-center group-hover:bg-indigo-700">
                Open Subject <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
