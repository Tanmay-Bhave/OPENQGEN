import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { departments } from "../../data/mock";

export default function Settings() {
  const { toast } = useApp();
  const [collegeName, setCollegeName] = useState("Techno University");
  const [academicYear, setAcademicYear] = useState("2026–27");

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-700 text-slate-900">System Settings</h1>
        <p className="text-slate-500 mt-1 text-sm">Configure global college settings and examination rules.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-display font-600 text-slate-900 mb-5">College Information</h2>
          <div className="space-y-4">
            <div>
              <label className="form-label">College Name</label>
              <input className="form-input" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} />
            </div>
            <div>
              <label className="form-label">Academic Year</label>
              <input className="form-input" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} />
            </div>
            <div>
              <label className="form-label">College Logo</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">
                <p className="text-sm text-slate-400">Drag & drop or click to upload logo</p>
                <p className="text-xs text-slate-300 mt-1">PNG, JPG up to 2MB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-display font-600 text-slate-900 mb-5">Departments</h2>
          <div className="space-y-2">
            {departments.map((d, i) => (
              <div key={d} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-800">{d}</span>
                <button className="text-xs text-red-500 hover:text-red-700">Remove</button>
              </div>
            ))}
          </div>
          <button className="btn-secondary mt-3 text-sm">+ Add Department</button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-display font-600 text-slate-900 mb-5">Examination Rules</h2>
          <div className="space-y-4">
            {[
              ["Minimum questions per section", "2"],
              ["Maximum marks per paper", "100"],
              ["Minimum CO coverage (%)", "80"],
              ["Minimum PO coverage (%)", "60"],
            ].map(([label, val]) => (
              <div key={label} className="grid grid-cols-2 items-center gap-4">
                <label className="text-sm text-slate-600">{label}</label>
                <input className="form-input" defaultValue={val} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button className="btn-secondary">Reset to Defaults</button>
          <button className="btn-primary" onClick={() => toast("success", "Settings saved successfully.")}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
