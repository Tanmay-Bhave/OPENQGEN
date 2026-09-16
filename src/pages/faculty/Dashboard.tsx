import { BookMarked, FileText, Edit3, CheckCircle, Database } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { subjects, questionPapers } from "../../data/mock";

export default function FacultyDashboard() {
  const { user, navigate, faculties } = useApp();
  const faculty = faculties.find((f) => f.id === user?.id);
  const assignedSubjects = subjects.filter((s) => faculty?.assignedSubjects.includes(s.id));
  const myPapers = questionPapers.filter((p) => p.facultyId === user?.id);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-6 max-w-[1200px]">
      <div className="mb-7">
        <h1 className="font-display text-2xl font-700 text-slate-900">{greeting}, {user?.name}</h1>
        <p className="text-slate-500 mt-1">Manage your assigned subjects and generate compliant question papers.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-7">
        {[
          { label: "Assigned Subjects", value: assignedSubjects.length, icon: <BookMarked size={20} className="text-indigo-600" />, color: "bg-indigo-50" },
          { label: "Generated Papers", value: myPapers.length, icon: <FileText size={20} className="text-blue-600" />, color: "bg-blue-50" },
          { label: "Draft Papers", value: myPapers.filter((p) => p.status === "Draft").length, icon: <Edit3 size={20} className="text-amber-600" />, color: "bg-amber-50" },
          { label: "Finalized Papers", value: myPapers.filter((p) => p.status === "Approved").length, icon: <CheckCircle size={20} className="text-green-600" />, color: "bg-green-50" },
          { label: "Question Bank Items", value: 63, icon: <Database size={20} className="text-purple-600" />, color: "bg-purple-50" },
        ].map((s) => (
          <div key={s.label} className="stat-card bg-white rounded-xl p-4 border border-slate-200">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.color} mb-3`}>{s.icon}</div>
            <div className="font-display text-2xl font-700 text-slate-900 mb-0.5">{s.value}</div>
            <div className="text-xs font-500 text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Assigned subjects preview */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-display font-600 text-slate-900">My Subjects</h2>
            <button className="btn-ghost text-xs" onClick={() => navigate("faculty/subjects")}>View all →</button>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {assignedSubjects.length === 0 ? (
              <p className="text-slate-400 text-sm p-4 col-span-2 text-center">No subjects assigned yet. Contact the administrator.</p>
            ) : assignedSubjects.map((s) => (
              <div
                key={s.id}
                className="p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-indigo-50 hover:border-indigo-200 border border-transparent transition-all"
                onClick={() => navigate("faculty/workspace", { subjectId: s.id })}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-mono-data text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">{s.courseCode}</span>
                  <span className="text-xs text-slate-400">Sem {s.semester}</span>
                </div>
                <p className="font-display font-600 text-slate-900 text-sm mb-1">{s.name}</p>
                <p className="text-xs text-slate-500">{s.department}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-400">8 Previous Papers</span>
                  <span className="text-xs text-indigo-600 font-500">Open →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent papers + Quick actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-display font-600 text-slate-900">Quick Actions</h2>
            </div>
            <div className="p-4 space-y-2">
              <button className="w-full btn-primary justify-center" onClick={() => navigate("faculty/generate")}>
                Generate Question Paper
              </button>
              <button className="w-full btn-secondary justify-center" onClick={() => navigate("faculty/subjects")}>
                Browse My Subjects
              </button>
              <button className="w-full btn-secondary justify-center" onClick={() => navigate("faculty/papers")}>
                View My Papers
              </button>
            </div>
          </div>

          {myPapers.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-display font-600 text-slate-900">Recent Papers</h2>
              </div>
              <div className="divide-y divide-slate-50">
                {myPapers.slice(0, 3).map((p) => (
                  <div key={p.id} className="px-5 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-500 text-slate-800">{p.subjectName}</p>
                        <p className="text-xs text-slate-400 font-mono-data">{p.paperId}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-500 ${
                        p.status === "Approved" ? "bg-green-100 text-green-700" :
                        p.status === "Under Review" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"
                      }`}>{p.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
