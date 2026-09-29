import { useState } from "react";
import { Search, Shield, User } from "lucide-react";
import { auditLogs } from "../../data/runtime";
import Badge from "../../components/ui/Badge";

export default function AuditLogs() {
  const [search, setSearch] = useState("");
  const filtered = auditLogs.filter((l) =>
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.user.toLowerCase().includes(search.toLowerCase()) ||
    l.module.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor: Record<string, "success" | "warning" | "error"> = {
    Success: "success", Warning: "warning", Error: "error",
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-700 text-slate-900">Audit Logs</h1>
        <p className="text-slate-500 mt-1 text-sm">Complete activity trail for all system events.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="form-input pl-9" placeholder="Search actions, users, modules..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="form-select w-auto">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Faculty</option>
        </select>
        <select className="form-select w-auto">
          <option>All Modules</option>
          <option>Faculty Management</option>
          <option>Question Papers</option>
          <option>Credentials</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Role</th>
              <th>Action</th>
              <th>Module</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log) => (
              <tr key={log.id}>
                <td>
                  <span className="font-mono-data text-xs text-slate-500">{log.timestamp}</span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${log.role === "admin" ? "bg-indigo-100" : "bg-green-100"}`}>
                      {log.role === "admin"
                        ? <Shield size={12} className="text-indigo-600" />
                        : <User size={12} className="text-green-600" />}
                    </div>
                    <span className="text-sm font-500 text-slate-800">{log.user}</span>
                  </div>
                </td>
                <td>
                  <Badge variant={log.role === "admin" ? "purple" : "success"} size="sm">
                    {log.role === "admin" ? "Admin" : "Faculty"}
                  </Badge>
                </td>
                <td className="text-sm text-slate-700 max-w-xs">{log.action}</td>
                <td><Badge variant="default" size="sm">{log.module}</Badge></td>
                <td><Badge variant={statusColor[log.status]} size="sm">{log.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">Showing {filtered.length} of {auditLogs.length} log entries</span>
        </div>
      </div>
    </div>
  );
}
