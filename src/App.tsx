import { useApp } from "./context/AppContext";
import AppLayout from "./components/layout/AppLayout";
import Toaster from "./components/ui/Toast";

// Pages
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import FacultyManagement from "./pages/admin/FacultyManagement";
import FacultyDetails from "./pages/admin/FacultyDetails";
import SubjectManagement from "./pages/admin/SubjectManagement";
import CourseAssignments from "./pages/admin/CourseAssignments";
import AdminQuestionPapers from "./pages/admin/QuestionPapers";
import AdminQuestionBank from "./pages/admin/QuestionBank";
import AuditLogs from "./pages/admin/AuditLogs";
import Settings from "./pages/admin/Settings";
import FacultyDashboard from "./pages/faculty/Dashboard";
import MySubjects from "./pages/faculty/MySubjects";
import SubjectWorkspace from "./pages/faculty/SubjectWorkspace";
import GeneratePaper from "./pages/faculty/GeneratePaper";
import MyPapers from "./pages/faculty/MyPapers";
import FacultyProfile from "./pages/faculty/Profile";

function AccessRestricted() {
  const { navigate, user } = useApp();
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-5">
        <span className="text-3xl">🚫</span>
      </div>
      <h2 className="font-display text-2xl font-700 text-slate-900 mb-2">Access Restricted</h2>
      <p className="text-slate-500 mb-6">You do not have permission to access this page.</p>
      <button
        className="btn-primary"
        onClick={() => navigate(user?.role === "admin" ? "admin/dashboard" : "faculty/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  );
}

function Router() {
  const { page, user } = useApp();

  if (!user || page === "login") return <Login />;

  const content = (() => {
    switch (page) {
      // Admin pages
      case "admin/dashboard": return user.role === "admin" ? <AdminDashboard /> : <AccessRestricted />;
      case "admin/faculty": return user.role === "admin" ? <FacultyManagement /> : <AccessRestricted />;
      case "admin/faculty-details": return user.role === "admin" ? <FacultyDetails /> : <AccessRestricted />;
      case "admin/subjects": return user.role === "admin" ? <SubjectManagement /> : <AccessRestricted />;
      case "admin/assignments": return user.role === "admin" ? <CourseAssignments /> : <AccessRestricted />;
      case "admin/papers": return user.role === "admin" ? <AdminQuestionPapers /> : <AccessRestricted />;
      case "admin/question-bank": return user.role === "admin" ? <AdminQuestionBank /> : <AccessRestricted />;
      case "admin/audit-logs": return user.role === "admin" ? <AuditLogs /> : <AccessRestricted />;
      case "admin/settings": return user.role === "admin" ? <Settings /> : <AccessRestricted />;

      // Faculty pages
      case "faculty/dashboard": return user.role === "faculty" ? <FacultyDashboard /> : <AccessRestricted />;
      case "faculty/subjects": return user.role === "faculty" ? <MySubjects /> : <AccessRestricted />;
      case "faculty/workspace": return user.role === "faculty" ? <SubjectWorkspace /> : <AccessRestricted />;
      case "faculty/generate": return user.role === "faculty" ? <GeneratePaper /> : <AccessRestricted />;
      case "faculty/papers": return user.role === "faculty" ? <MyPapers /> : <AccessRestricted />;
      case "faculty/profile": return user.role === "faculty" ? <FacultyProfile /> : <AccessRestricted />;

      case "access-restricted": return <AccessRestricted />;
      default: return user.role === "admin" ? <AdminDashboard /> : <FacultyDashboard />;
    }
  })();

  return (
    <AppLayout>
      {content}
    </AppLayout>
  );
}

export default function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}
