import {
  LayoutDashboard, Users, BookOpen, Link, FileText, Database,
  ClipboardList, Settings, LogOut,
  BookMarked, PenSquare, History, User, ChevronLeft, ChevronRight,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import { useApp } from "../../context/AppContext";
import type { Page } from "../../types";

const adminNav: { label: string; icon: React.ReactNode; page: Page }[] = [
  { label: "Dashboard", icon: <LayoutDashboard size={18} />, page: "admin/dashboard" },
  { label: "Faculty Management", icon: <Users size={18} />, page: "admin/faculty" },
  { label: "Subject Management", icon: <BookOpen size={18} />, page: "admin/subjects" },
  { label: "Question Papers", icon: <FileText size={18} />, page: "admin/papers" },
  { label: "Question Bank", icon: <Database size={18} />, page: "admin/question-bank" },
  { label: "Audit Logs", icon: <ClipboardList size={18} />, page: "admin/audit-logs" },
];

const facultyNav: { label: string; icon: React.ReactNode; page: Page }[] = [
  { label: "Dashboard", icon: <LayoutDashboard size={18} />, page: "faculty/dashboard" },
  { label: "My Subjects", icon: <BookMarked size={18} />, page: "faculty/subjects" },
  { label: "Question Bank", icon: <Database size={18} />, page: "faculty/workspace" },
  { label: "Generate Paper", icon: <PenSquare size={18} />, page: "faculty/generate" },
  { label: "My Papers", icon: <FileText size={18} />, page: "faculty/papers" },
  { label: "Previous Papers", icon: <History size={18} />, page: "faculty/papers" },
  { label: "Profile", icon: <User size={18} />, page: "faculty/profile" },
];

export default function Sidebar() {
  const { user, page, navigate, logout } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const nav = user?.role === "admin" ? adminNav : facultyNav;

  return (
    <aside
      className="flex flex-col h-full transition-all duration-200 relative"
      style={{ width: collapsed ? 64 : 240, background: "#1e1b4b", flexShrink: 0 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-display font-700 text-sm">Q</span>
        </div>
        {!collapsed && (
          <div>
            <div className="font-display font-700 text-white text-sm tracking-wide">OPENQG</div>
            <div className="text-indigo-300 text-[10px] font-medium">AI Question Generator</div>
          </div>
        )}
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 pt-4 pb-2">
          <span className="text-[10px] font-600 uppercase tracking-wider text-indigo-400">
            {user?.role === "admin" ? "Administrator" : "Faculty Access"}
          </span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        {nav.map((item) => (
          <div
            key={item.label}
            className={`sidebar-item ${page === item.page ? "active" : ""}`}
            onClick={() => navigate(item.page)}
            title={collapsed ? item.label : undefined}
          >
            <span className="icon flex-shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-2 pb-4 border-t border-white/10 pt-3">
        {!collapsed && user && (
          <div className="px-3 py-2 mb-2">
            <div className="text-white text-sm font-500 truncate">{user.name}</div>
            <div className="text-indigo-400 text-xs truncate">{user.email}</div>
          </div>
        )}
        <div className="sidebar-item text-red-300 hover:bg-red-900/30" onClick={logout}>
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-16 w-6 h-6 rounded-full bg-white border border-slate-200 shadow flex items-center justify-center text-slate-500 hover:bg-slate-50 z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
