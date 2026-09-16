import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { ConfirmDialog } from "../../components/ui/Modal";
import { assignments as initialAssignments, subjects, departments, semesters } from "../../data/mock";
import type { Assignment } from "../../types";

export default function CourseAssignments() {
  const { faculties, toast } = useApp();
  const [assignList, setAssignList] = useState<Assignment[]>(initialAssignments);
  const [deleteTarget, setDeleteTarget] = useState<Assignment | null>(null);
  const [form, setForm] = useState({ facultyId:"", department:"", semester:"", subjectId:"", academicYear:"2026–27" });
  const [success, setSuccess] = useState(false);
  const set = (k: string, v: string) => { setForm((f) => ({ ...f, [k]: v })); setSuccess(false); };

  const filteredSubjects = subjects.filter((s) =>
    (!form.department || s.department === form.department) &&
    (!form.semester || s.semester === form.semester)
  );

  const handleAssign = () => {
    if (!form.facultyId || !form.subjectId) return;
    const faculty = faculties.find((f) => f.id === form.facultyId)!;
    const subject = subjects.find((s) => s.id === form.subjectId)!;
    const exists = assignList.some((a) => a.facultyId === form.facultyId && a.subjectId === form.subjectId);
    if (exists) { toast("warning", "This subject is already assigned to this faculty."); return; }
    const newAssignment: Assignment = {
      id: Math.random().toString(36).slice(2),
      facultyId: faculty.id, facultyName: faculty.name,
      subjectId: subject.id, subjectName: subject.name, courseCode: subject.courseCode,
      department: subject.department, semester: subject.semester,
      academicYear: form.academicYear, assignedDate: new Date().toLocaleDateString("en-IN"),
    };
    setAssignList((prev) => [...prev, newAssignment]);
    toast("success", `${subject.name} assigned to ${faculty.name}.`);
    setSuccess(true);
    setForm({ facultyId:"", department:"", semester:"", subjectId:"", academicYear:"2026–27" });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-700 text-slate-900">Course Assignments</h1>
        <p className="text-slate-500 mt-1 text-sm">Assign subjects to faculty members.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Assignment form */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 xl:col-span-1">
          <h2 className="font-display font-600 text-slate-900 mb-5">Assign Subject to Faculty</h2>
          <div className="space-y-4">
            <div>
              <label className="form-label">Select Faculty *</label>
              <select className="form-select" value={form.facultyId} onChange={(e) => set("facultyId", e.target.value)}>
                <option value="">Choose faculty member</option>
                {faculties.map((f) => (
                  <option key={f.id} value={f.id}>{f.name} ({f.facultyId})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Department</label>
              <select className="form-select" value={form.department} onChange={(e) => set("department", e.target.value)}>
                <option value="">All Departments</option>
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Semester</label>
              <select className="form-select" value={form.semester} onChange={(e) => set("semester", e.target.value)}>
                <option value="">All Semesters</option>
                {semesters.map((s) => <option key={s}>Sem {s}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Select Subject *</label>
              <select className="form-select" value={form.subjectId} onChange={(e) => set("subjectId", e.target.value)}>
                <option value="">Choose subject</option>
                {filteredSubjects.map((s) => (
                  <option key={s.id} value={s.id}>{s.name} — {s.courseCode}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Academic Year</label>
              <input className="form-input" value={form.academicYear} onChange={(e) => set("academicYear", e.target.value)} />
            </div>
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
                Subject assigned successfully!
              </div>
            )}
            <button
              className="btn-primary w-full justify-center"
              disabled={!form.facultyId || !form.subjectId}
              onClick={handleAssign}
            >
              Assign Subject
            </button>
          </div>
        </div>

        {/* Assignment table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden xl:col-span-2">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-display font-600 text-slate-900">Current Assignments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Faculty</th>
                  <th>Subject</th>
                  <th>Code</th>
                  <th>Dept</th>
                  <th>Sem</th>
                  <th>Year</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {assignList.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <div className="font-500 text-slate-900 text-sm">{a.facultyName}</div>
                    </td>
                    <td className="text-sm text-slate-700">{a.subjectName}</td>
                    <td><span className="font-mono-data text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{a.courseCode}</span></td>
                    <td className="text-xs text-slate-500">{a.department}</td>
                    <td className="text-xs text-slate-500">{a.semester}</td>
                    <td className="text-xs text-slate-500">{a.academicYear}</td>
                    <td className="text-xs text-slate-400">{a.assignedDate}</td>
                    <td>
                      <button className="btn-ghost p-1.5 text-red-500 hover:bg-red-50" onClick={() => setDeleteTarget(a)}>
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          setAssignList((prev) => prev.filter((a) => a.id !== deleteTarget?.id));
          toast("info", "Assignment removed.");
        }}
        title="Remove this subject assignment?"
        message={`${deleteTarget?.facultyName} will no longer be able to access ${deleteTarget?.subjectName}.`}
        confirmLabel="Remove Assignment"
        confirmClass="btn-danger"
      />
    </div>
  );
}
