import { useState } from "react";
import { Plus, Search, Edit, Trash2, UserPlus } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { StatusBadge } from "../../components/ui/Badge";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import { ConfirmDialog } from "../../components/ui/Modal";
import { subjects as initialSubjects, departments, semesters } from "../../data/mock";

export default function SubjectManagement() {
  const { toast, navigate } = useApp();
  const [subjectList, setSubjectList] = useState(initialSubjects);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [form, setForm] = useState({ name:"", courseCode:"", department:"", semester:"", credits:"4", subjectType:"Core" as const, academicYear:"2026–27" });
  const [done, setDone] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const filtered = subjectList.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.courseCode.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    if (!form.name || !form.courseCode || !form.department) return;
    setSubjectList((prev) => [...prev, {
      id: Math.random().toString(36).slice(2), courseCode: form.courseCode, name: form.name,
      department: form.department, semester: form.semester || "VII", credits: Number(form.credits),
      subjectType: form.subjectType as any, status: "Active",
    }]);
    toast("success", "Subject created successfully.");
    setDone(true);
  };

  const typeColors: Record<string, string> = {
    Core: "purple", Theory: "info", Practical: "warning", Elective: "default",
  };

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-700 text-slate-900">Subject Management</h1>
          <p className="text-slate-500 mt-1 text-sm">Create and manage all subjects across departments.</p>
        </div>
        <button className="btn-primary" onClick={() => { setShowAdd(true); setDone(false); }}>
          <Plus size={16} /> Add Subject
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="form-input pl-9" placeholder="Search subjects..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="form-select w-auto">
          <option>All Departments</option>
          {departments.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select className="form-select w-auto">
          <option>All Semesters</option>
          {semesters.map((s) => <option key={s}>Sem {s}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Subject Name</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Credits</th>
                <th>Type</th>
                <th>Assigned Faculty</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td><span className="font-mono-data text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{s.courseCode}</span></td>
                  <td><span className="font-500 text-slate-900">{s.name}</span></td>
                  <td><span className="text-sm text-slate-600">{s.department}</span></td>
                  <td><span className="text-sm text-slate-600">Sem {s.semester}</span></td>
                  <td><span className="text-sm text-slate-600">{s.credits}</span></td>
                  <td><Badge variant={typeColors[s.subjectType] as any} size="sm">{s.subjectType}</Badge></td>
                  <td><span className="text-sm text-slate-600">{s.assignedFaculty ?? <span className="text-slate-400 italic">Unassigned</span>}</span></td>
                  <td><StatusBadge status={s.status} /></td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button className="btn-ghost p-1.5" title="Edit"><Edit size={14} /></button>
                      <button className="btn-ghost p-1.5" title="Assign Faculty" onClick={() => navigate("admin/assignments")}><UserPlus size={14} /></button>
                      <button className="btn-ghost p-1.5 text-red-500 hover:bg-red-50" title="Delete" onClick={() => setDeleteTarget(s.id)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">Showing {filtered.length} of {subjectList.length} subjects</span>
        </div>
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Create Subject" subtitle="Add a new subject to the system" width="max-w-lg">
        {!done ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="form-label">Subject Name *</label>
                <input className="form-input" placeholder="e.g. Machine Learning" value={form.name} onChange={(e) => set("name", e.target.value)} />
              </div>
              <div>
                <label className="form-label">Course Code *</label>
                <input className="form-input font-mono-data" placeholder="e.g. IT501" value={form.courseCode} onChange={(e) => set("courseCode", e.target.value)} />
              </div>
              <div>
                <label className="form-label">Credits</label>
                <select className="form-select" value={form.credits} onChange={(e) => set("credits", e.target.value)}>
                  {[1,2,3,4,5,6].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Department *</label>
                <select className="form-select" value={form.department} onChange={(e) => set("department", e.target.value)}>
                  <option value="">Select department</option>
                  {departments.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Semester</label>
                <select className="form-select" value={form.semester} onChange={(e) => set("semester", e.target.value)}>
                  <option value="">Select semester</option>
                  {semesters.map((s) => <option key={s}>Sem {s}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Subject Type</label>
                <select className="form-select" value={form.subjectType} onChange={(e) => set("subjectType", e.target.value)}>
                  {["Core","Theory","Practical","Elective"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Academic Year</label>
                <input className="form-input" value={form.academicYear} onChange={(e) => set("academicYear", e.target.value)} />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button className="btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleCreate}>Save Subject</button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <p className="font-display font-600 text-slate-900 mb-1">Subject Created!</p>
            <p className="text-sm text-slate-500 mb-4">{form.courseCode} — {form.name} has been added.</p>
            <button className="btn-primary" onClick={() => setShowAdd(false)}>Done</button>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => { setSubjectList((prev) => prev.filter((s) => s.id !== deleteTarget)); toast("success", "Subject deleted."); }}
        title="Delete this subject?"
        message="This will permanently remove the subject and all associated data."
        confirmLabel="Delete Subject"
        confirmClass="btn-danger"
      />
    </div>
  );
}
