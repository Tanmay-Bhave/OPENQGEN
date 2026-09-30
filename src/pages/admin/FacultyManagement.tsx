import {
  getFaculties,
  createFaculty,
  updateFaculty,
  updateFacultyStatus,
  updateFacultyPassword,
  deleteFaculty,
} from "../../Api/facultyApi";
import { useState } from "react";
import { Plus, Search, Eye, KeyRound, Trash2, EyeOff } from "lucide-react";
import { useApp } from "../../context/AppContext";
import Badge, { StatusBadge } from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import { ConfirmDialog } from "../../components/ui/Modal";
import type { Faculty } from "../../types";

const departments = ["Information Technology", "Computer Science Engineering", "Electronics & Communication", "Mechanical Engineering", "Civil Engineering"];


function AddFacultyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { refreshFaculties, toast } = useApp();
  const [form, setForm] = useState({
    name: "", facultyId: "", email: "", password: "", department: "",
    designation: "", phone: "", employeeCode: "",
  });
  const [done, setDone] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleCreate = async () => {
    if (!form.name || !form.email || !form.password || !form.department) return;
    try { await createFaculty(form); await refreshFaculties(); setDone(true); toast("success", "Faculty account created successfully."); } catch (error: any) { toast("error", error.message); }
  };

  const handleClose = () => { setDone(false); setForm({ name:"",facultyId:"",email:"",password:"",department:"",designation:"",phone:"",employeeCode:"" }); onClose(); };

  return (
    <Modal open={open} onClose={handleClose} title="Create Faculty Account" subtitle="Fill in the details to create a new faculty account" width="max-w-xl">
      {!done ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="form-label">Faculty Name *</label>
              <input className="form-input" placeholder="Dr. Firstname Lastname" value={form.name} onChange={(e) => set("name", e.target.value)} />
            </div>
            <div>
              <label className="form-label">Faculty ID</label>
              <input className="form-input font-mono-data" placeholder="FAC005" value={form.facultyId} onChange={(e) => set("facultyId", e.target.value)} />
            </div>
            <div>
              <label className="form-label">Employee Code</label>
              <input className="form-input font-mono-data" placeholder="EMP005" value={form.employeeCode} onChange={(e) => set("employeeCode", e.target.value)} />
            </div>
            <div className="col-span-2">
              <label className="form-label">Official College Email *</label>
              <input type="email" className="form-input" placeholder="name@college.edu" value={form.email} onChange={(e) => set("email", e.target.value)} />
            </div>
            <div className="col-span-2">
              <label className="form-label">Temporary Password *</label>
              <input type="password" className="form-input" placeholder="Create a strong password" value={form.password} onChange={(e) => set("password", e.target.value)} />
            </div>
            <div>
              <label className="form-label">Department *</label>
              <select className="form-select" value={form.department} onChange={(e) => set("department", e.target.value)}>
                <option value="">Select department</option>
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Designation</label>
              <select className="form-select" value={form.designation} onChange={(e) => set("designation", e.target.value)}>
                <option value="">Select designation</option>
                {["Professor","Associate Professor","Assistant Professor","Lecturer"].map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Phone (Optional)</label>
              <input className="form-input" placeholder="10-digit mobile" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button className="btn-secondary" onClick={handleClose}>Cancel</button>
            <button className="btn-primary" onClick={handleCreate}>Create Faculty Account</button>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <h3 className="font-display text-lg font-600 text-slate-900 mb-1">Faculty Account Created</h3>
          <p className="text-sm text-slate-500 mb-5">Share these credentials securely with the faculty member.</p>
          <div className="bg-slate-50 rounded-xl p-4 text-left space-y-3 mb-4">
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Email</p>
              <p className="text-sm font-mono-data font-500 text-slate-800">{form.email}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Temporary Password</p>
              <p className="text-sm font-mono-data font-500 text-slate-800">{form.password}</p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700 mb-5">
            ⚠️ Share these credentials securely with the faculty member. Ask them to change their password after first login.
          </div>
          <button className="btn-primary" onClick={handleClose}>Done</button>
        </div>
      )}
    </Modal>
  );
}

function CredentialsModal({ faculty, open, onClose }: { faculty: Faculty | null; open: boolean; onClose: () => void }) {
  const { toast, refreshFaculties } = useApp();
  const [showPw, setShowPw] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  if (!faculty) return null;

  return (
    <Modal open={open} onClose={onClose} title="Faculty Credentials" subtitle={`Manage login credentials for ${faculty.name}`}>
      <div className="space-y-4">
        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
          <div>
            <p className="text-xs text-slate-400 mb-1">Faculty Email</p>
            <p className="text-sm font-mono-data text-slate-800">{faculty.email}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Password</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-mono-data text-slate-800">{showPw ? faculty.password : "••••••••"}</p>
              <button onClick={() => setShowPw(!showPw)} className="text-slate-400 hover:text-slate-600">
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Account Status</p>
            <StatusBadge status={faculty.status} />
          </div>
        </div>
        <div>
          <label className="form-label">Set New Password</label>
          <input type="password" className="form-input" placeholder="Enter new password" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <button
            className="btn-primary flex-1 justify-center"
            disabled={!newPw}
            onClick={() => {
              updateFacultyPassword(faculty.id, newPw).then(() => { toast("success", "Password updated successfully."); setNewPw(""); onClose(); }).catch((e) => toast("error", e.message));
            }}
          >
            Update Password
          </button>
          <button className="btn-danger flex-1 justify-center" onClick={() => setConfirmReset(true)}>
            Reset Password
          </button>
        </div>
        <button
          className="w-full btn-secondary justify-center text-slate-600"
          onClick={() => {
            updateFacultyStatus(faculty.id, faculty.status === "Active" ? "Inactive" : "Active").then(() => { refreshFaculties(); toast("info", `Account ${faculty.status === "Active" ? "deactivated" : "activated"}.`); onClose(); }).catch((e) => toast("error", e.message));
          }}
        >
          {faculty.status === "Active" ? "Deactivate Account" : "Activate Account"}
        </button>
      </div>
      <ConfirmDialog
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        onConfirm={() => { toast("success", "Password reset email sent."); }}
        title="Reset Faculty Password?"
        message="This will invalidate the current password. A temporary password will be generated."
        confirmLabel="Reset Password"
        confirmClass="btn-danger"
      />
    </Modal>
  );
}

export default function FacultyManagement() {
  const { faculties, navigate, toast, refreshFaculties } = useApp();
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [credFaculty, setCredFaculty] = useState<Faculty | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Faculty | null>(null);

  const filtered = faculties.filter((f) => {
const searchTerm = search.toLowerCase();

const matchSearch =
  (f.name || "").toLowerCase().includes(searchTerm) ||
  (f.email || "").toLowerCase().includes(searchTerm) ||
  (f.facultyId || "").toLowerCase().includes(searchTerm);    const matchDept = deptFilter === "All" || f.department === deptFilter;
    const matchStatus = statusFilter === "All" || f.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-700 text-slate-900">Faculty Management</h1>
          <p className="text-slate-500 mt-1 text-sm">Create and manage authorized faculty accounts.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAdd(true)}>
          <Plus size={16} /> Add Faculty
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="form-input pl-9"
            placeholder="Search faculty by name, ID or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="form-select w-auto" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
          <option value="All">All Departments</option>
          {departments.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select className="form-select w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Faculty ID</th>
                <th>Faculty Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    {search ? "No faculty matching your search." : "No faculty accounts created yet."}
                  </td>
                </tr>
              ) : filtered.map((f) => (
                <tr key={f.id}>
                  <td>
                    <span className="font-mono-data text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{f.facultyId}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-700 text-xs font-600">{f.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-500 text-slate-900">{f.name}</div>
                        <div className="text-xs text-slate-400">{f.designation}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-slate-600">{f.email}</td>
                  <td>
                    <Badge variant="info" size="sm">{(f.department || "").length > 22 ? (f.department || "").slice(0,20)+"…" : f.department}</Badge>
                  </td>
                  <td><StatusBadge status={f.status} /></td>
                  <td className="text-slate-500 text-xs">{f.lastLogin}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button className="btn-ghost p-1.5" title="View" onClick={() => navigate("admin/faculty-details", { facultyId: f.id })}><Eye size={14} /></button>
                      <button className="btn-ghost p-1.5" title="Credentials" onClick={() => setCredFaculty(f)}><KeyRound size={14} /></button>
                      <button className="btn-ghost p-1.5 text-red-500 hover:bg-red-50" title="Delete" onClick={() => setDeleteTarget(f)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">Showing {filtered.length} of {faculties.length} faculty members</span>
          <div className="flex gap-1">
            <button className="btn-secondary text-xs py-1 px-3">← Prev</button>
            <button className="btn-primary text-xs py-1 px-3">Next →</button>
          </div>
        </div>
      </div>

      <AddFacultyModal open={showAdd} onClose={() => setShowAdd(false)} />
      <CredentialsModal faculty={credFaculty} open={!!credFaculty} onClose={() => setCredFaculty(null)} />
      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => { if (deleteTarget) deleteFaculty(deleteTarget.id).then(() => { refreshFaculties(); setDeleteTarget(null); toast("success", `${deleteTarget.name}'s account has been deleted.`); }).catch((e) => toast("error", e.message)); }}
        title="Delete Faculty Account?"
        message={`This will permanently delete ${deleteTarget?.name}'s account and all associated data. This action cannot be undone.`}
        confirmLabel="Delete Faculty"
        confirmClass="btn-danger"
      />
    </div>
  );
}
