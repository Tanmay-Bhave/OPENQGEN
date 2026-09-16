import { Bell, ChevronDown, Shield } from "lucide-react";
import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function TopNav() {
  const { user, logout } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 z-10">
      <div />
      <div className="flex items-center gap-3">
        <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 relative">
          <Bell size={17} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-xs font-600">
                {user?.name.charAt(0)}
              </span>
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-sm font-600 text-slate-900 leading-tight">{user?.name}</div>
              <div className="text-[11px] text-slate-500 leading-tight flex items-center gap-1">
                <Shield size={9} />
                {user?.role === "admin" ? "Administrator" : "Faculty"}
              </div>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 slide-in">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-600 text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <button
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                onClick={() => { setOpen(false); logout(); }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
