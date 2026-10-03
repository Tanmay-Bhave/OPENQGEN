import { useEffect, useState } from "react";
import { Shield, User } from "lucide-react";
import Badge from "../../components/ui/Badge";

export default function AuditLogs() {
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/audit-logs"
        );

        const data = await response.json();

        if (data.success) {
          setAuditLogs(data.logs);
        }
      } catch (error) {
        console.error("Failed to fetch audit logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditLogs();
  }, []);

  const filtered = auditLogs.filter(
    (log) =>
      log.action?.toLowerCase().includes(search.toLowerCase()) ||
      log.user?.toLowerCase().includes(search.toLowerCase()) ||
      log.module?.toLowerCase().includes(search.toLowerCase()) ||
      log.email?.toLowerCase().includes(search.toLowerCase()) ||
      log.department?.toLowerCase().includes(search.toLowerCase()) ||
      log.facultyId?.toLowerCase().includes(search.toLowerCase()) ||
      log.employeeCode?.toLowerCase().includes(search.toLowerCase()) ||
      log.designation?.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor: Record<
    string,
    "success" | "warning" | "error"
  > = {
    Success: "success",
    Warning: "warning",
    Error: "error",
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-700 text-slate-900">
          Audit Logs
        </h1>

        <p className="text-slate-500 mt-1 text-sm">
          Complete activity trail for all system events.
        </p>
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
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-8 text-slate-500"
                >
                  Loading audit logs...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-8 text-slate-500"
                >
                  No audit logs found.
                </td>
              </tr>
            ) : (
              filtered.map((log) => (
                <tr key={log._id}>
                  <td>
                    <span className="font-mono-data text-xs text-slate-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          log.role === "admin"
                            ? "bg-indigo-100"
                            : "bg-green-100"
                        }`}
                      >
                        {log.role === "admin" ? (
                          <Shield
                            size={12}
                            className="text-indigo-600"
                          />
                        ) : (
                          <User
                            size={12}
                            className="text-green-600"
                          />
                        )}
                      </div>

                      <span className="text-sm font-500 text-slate-800">
                        {log.user}
                      </span>
                    </div>
                  </td>

                  <td>
                    <Badge
                      variant={
                        log.role === "admin"
                          ? "purple"
                          : "success"
                      }
                      size="sm"
                    >
                      {log.role === "admin" ? "Admin" : "Faculty"}
                    </Badge>
                  </td>

                  <td className="text-sm text-slate-700 max-w-xs">
                    {log.action}
                  </td>

                  <td>
                    <Badge variant="default" size="sm">
                      {log.module}
                    </Badge>
                  </td>

                  <td>
                    <Badge
                      variant={statusColor[log.status] || "success"}
                      size="sm"
                    >
                      {log.status}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="px-5 py-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">
            Showing {filtered.length} of {auditLogs.length} log entries
          </span>
        </div>
      </div>
    </div>
  );
}