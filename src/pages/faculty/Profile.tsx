import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { StatusBadge } from "../../components/ui/Badge";

export default function FacultyProfile() {
  const { user, faculties, updateFaculty, toast } = useApp();
  const faculty = faculties.find((f) => f.id === user?.id);
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  if (!faculty) return null;

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-700 text-slate-900">My Profile</h1>
        <p className="text-slate-500 mt-1 text-sm">View your profile information and manage your account.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-5">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
            <span className="font-display text-2xl font-700 text-indigo-600">{faculty.name.charAt(0)}</span>
          </div>
          <div>
            <h2 className="font-display text-xl font-700 text-slate-900">{faculty.name}</h2>
            <p className="text-slate-500 text-sm">{faculty.designation} · {faculty.department}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono-data text-xs text-indigo-600">{faculty.facultyId}</span>
              <StatusBadge status={faculty.status} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {[
            ["Full Name", faculty.name],
            ["Faculty ID", faculty.facultyId],
            ["Email Address", faculty.email],
            ["Department", faculty.department],
            ["Designation", faculty.designation],
            ["Employee Code", faculty.employeeCode ?? "—"],
            ["Phone", faculty.phone ?? "—"],
            ["Account Created", faculty.createdDate],
            ["Last Login", faculty.lastLogin],
          ].map(([k, v]) => (
            <div key={k as string}>
              <p className="text-xs text-slate-400 font-500 uppercase tracking-wide mb-1">{k}</p>
              <p className="text-sm text-slate-800 font-500">{v}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="font-display font-600 text-slate-900 mb-5">Change Password</h3>
        <div className="space-y-4 max-w-sm">
          <div>
            <label className="form-label">New Password</label>
            <input type="password" className="form-input" placeholder="Enter new password" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
          </div>
          <div>
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-input" placeholder="Confirm new password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} />
          </div>
          {newPw && confirmPw && newPw !== confirmPw && (
            <p className="text-xs text-red-600">Passwords do not match.</p>
          )}
          <button
            className="btn-primary"
            disabled={!newPw || newPw !== confirmPw}
            onClick={() => {
              updateFaculty({ ...faculty, password: newPw });
              toast("success", "Password updated successfully.");
              setNewPw(""); setConfirmPw("");
            }}
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
