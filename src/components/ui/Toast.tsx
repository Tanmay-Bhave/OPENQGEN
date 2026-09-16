import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Toaster() {
  const { toasts } = useApp();
  if (!toasts.length) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  );
}

function ToastItem({ toast }: { toast: { id: string; type: string; message: string } }) {
  const styles: Record<string, { bg: string; icon: React.ReactNode }> = {
    success: { bg: "bg-white border-l-4 border-green-500", icon: <CheckCircle size={18} className="text-green-500" /> },
    error: { bg: "bg-white border-l-4 border-red-500", icon: <XCircle size={18} className="text-red-500" /> },
    warning: { bg: "bg-white border-l-4 border-amber-500", icon: <AlertTriangle size={18} className="text-amber-500" /> },
    info: { bg: "bg-white border-l-4 border-blue-500", icon: <Info size={18} className="text-blue-500" /> },
  };
  const style = styles[toast.type] ?? styles.info;

  return (
    <div className={`${style.bg} rounded-lg shadow-lg p-4 flex items-start gap-3 slide-in`}>
      {style.icon}
      <p className="flex-1 text-sm text-slate-700 font-medium">{toast.message}</p>
      <X size={14} className="text-slate-400 cursor-pointer mt-0.5 flex-shrink-0 hover:text-slate-600" />
    </div>
  );
}
