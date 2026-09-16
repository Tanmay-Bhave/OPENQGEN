import { Download, Eye } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { StatusBadge } from "../../components/ui/Badge";
import Badge from "../../components/ui/Badge";

export default function MyPapers() {
  const { user, papers, navigate } = useApp();
  const myPapers = papers.filter((p) => p.facultyId === user?.id);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-700 text-slate-900">My Papers</h1>
        <p className="text-slate-500 mt-1 text-sm">All question papers you have generated.</p>
      </div>

      {myPapers.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
          <p className="text-slate-400">No papers generated yet.</p>
          <button className="btn-primary mt-4" onClick={() => navigate("faculty/generate")}>Generate Your First Paper</button>
        </div>
      ) : (
        <div className="space-y-4">
          {myPapers.map((p) => (
            <div key={p.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-200 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono-data text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{p.paperId}</span>
                    <Badge variant="info" size="sm">{p.examType}</Badge>
                    <StatusBadge status={p.status} />
                  </div>
                  <h3 className="font-display font-600 text-slate-900">{p.subjectName}</h3>
                  <p className="text-sm text-slate-400 mt-0.5">{p.courseCode} · Semester {p.semester} · {p.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-secondary text-sm py-1.5"><Eye size={14} /> View</button>
                  <button className="btn-secondary text-sm py-1.5"><Download size={14} /> PDF</button>
                </div>
              </div>
              {p.status === "Rejected" && p.rejectionReason && (
                <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                  <strong>Revision required:</strong> {p.rejectionReason}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
