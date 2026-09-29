import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { StatusBadge } from "../../components/ui/Badge";
import { subjects, questionPapers } from "../../data/runtime";

const tabs = ["Profile", "Credentials", "Assigned Subjects", "Generated Papers", "Activity"];

export default function FacultyDetails() {
  const { faculties, params, navigate, toast, updateFaculty } = useApp();
  const faculty = faculties.find((f) => f.id === params.facultyId) ?? faculties[0];
  const [tab, setTab] = useState(0);
  const [showPw, setShowPw] = useState(false);
  const [newPw, setNewPw] = useState("");

  const assignedSubs = subjects.filter((s) => faculty.assignedSubjects.includes(s.id));
  const papers = questionPapers.filter((p) => p.facultyId === faculty.id);

  return (
    <div className="p-6 max-w-5xl">
      {/* Header */}
      <button className="btn-ghost mb-5 text-slate-500" onClick={() => navigate("admin/faculty")}>
        <ArrowLeft size={16} /> Back to Faculty Management
      </button>

      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <span className="font-display text-2xl font-700 text-indigo-600">{faculty.name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-display text-xl font-700 text-slate-900">{faculty.name}</h1>
                <p className="text-slate-500 text-sm mt-0.5">{faculty.designation} · {faculty.department}</p>
                <p className="font-mono-data text-xs text-indigo-600 mt-1">{faculty.facultyId}</p>
              </div>
              <StatusBadge status={faculty.status} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-6 w-fit">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`px-4 py-2 rounded-lg text-sm font-500 transition-all ${
              tab === i ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        {tab === 0 && (
          <div className="grid grid-cols-2 gap-6">
            {[
              ["Faculty Name", faculty.name],
              ["Faculty ID", faculty.facultyId],
              ["Email Address", faculty.email],
              ["Department", faculty.department],
              ["Designation", faculty.designation],
              ["Employee Code", faculty.employeeCode ?? "—"],
              ["Phone", faculty.phone ?? "—"],
              ["Account Status", null],
              ["Created Date", faculty.createdDate],
              ["Last Login", faculty.lastLogin],
            ].map(([k, v]) => (
              <div key={k as string}>
                <p className="text-xs text-slate-400 font-500 uppercase tracking-wide mb-1">{k}</p>
                {v === null ? <StatusBadge status={faculty.status} /> : (
                  <p className="text-sm text-slate-800 font-500">{v}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 1 && (
          <div className="space-y-5 max-w-md">
            <div className="bg-slate-50 rounded-xl p-4 space-y-4">
              <div>
                <p className="text-xs text-slate-400 mb-1">Login Email</p>
                <p className="text-sm font-mono-data text-slate-800">{faculty.email}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Password</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-mono-data text-slate-800">{showPw ? faculty.password : "••••••••••"}</p>
                  <button onClick={() => setShowPw(!showPw)} className="text-slate-400 hover:text-slate-600">
                    {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="form-label">Set New Password</label>
              <input type="password" className="form-input" placeholder="New password" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
            </div>
            <div className="flex gap-3">
              <button
                className="btn-primary"
                disabled={!newPw}
                onClick={() => { updateFaculty({ ...faculty, password: newPw }); toast("success", "Password updated."); setNewPw(""); }}
              >Update Password</button>
              <button
                className="btn-danger"
                onClick={() => { updateFaculty({ ...faculty, status: faculty.status === "Active" ? "Inactive" : "Active" }); toast("info", "Account status changed."); }}
              >
                {faculty.status === "Active" ? "Deactivate Account" : "Activate Account"}
              </button>
            </div>
          </div>
        )}

        {tab === 2 && (
          <div>
            {assignedSubs.length === 0 ? (
              <div className="text-center py-10 text-slate-400">No subjects assigned yet.</div>
            ) : (
              <div className="space-y-3">
                {assignedSubs.map((s) => (
                  <div key={s.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-500 text-slate-900">{s.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{s.courseCode} · Semester {s.semester} · {s.department}</p>
                    </div>
                    <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-500">{s.subjectType}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 3 && (
          <div>
            {papers.length === 0 ? (
              <div className="text-center py-10 text-slate-400">No papers generated by this faculty.</div>
            ) : (
              <table className="data-table">
                <thead><tr><th>Paper ID</th><th>Subject</th><th>Exam Type</th><th>Date</th><th>Status</th></tr></thead>
                <tbody>
                  {papers.map((p) => (
                    <tr key={p.id}>
                      <td><span className="font-mono-data text-xs text-slate-600">{p.paperId}</span></td>
                      <td>{p.subjectName}</td>
                      <td>{p.examType}</td>
                      <td>{p.date}</td>
                      <td><StatusBadge status={p.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === 4 && (
          <div className="text-center py-10 text-slate-400">Activity log coming soon.</div>
        )}
      </div>
    </div>
  );
}
