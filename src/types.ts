export type Role = "admin" | "faculty";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  facultyId?: string;
  department?: string;
  designation?: string;
}

export interface Faculty {
  id: string;
  facultyId: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  phone?: string;
  employeeCode?: string;
  status: "Active" | "Inactive";
  lastLogin: string;
  createdDate: string;
  assignedSubjects: string[];
  password: string;
}

export interface Subject {
  id: string;
  courseCode: string;
  name: string;
  department: string;
  semester: string;
  credits: number;
  subjectType: "Theory" | "Practical" | "Elective" | "Core";
  assignedFaculty?: string;
  status: "Active" | "Inactive";
}

export interface Assignment {
  id: string;
  facultyId: string;
  facultyName: string;
  subjectId: string;
  subjectName: string;
  courseCode: string;
  department: string;
  semester: string;
  academicYear: string;
  assignedDate: string;
}

export interface Question {
  id: string;
  text: string;
  topic: string;
  unit: string;
  co: string;
  po: string;
  bloom: string;
  difficulty: "Easy" | "Medium" | "Hard";
  marks: number;
  usageCount: number;
  subjectId: string;
}

export interface PaperQuestion extends Question {
  section: string;
  isAiGenerated: boolean;
  status: "pending" | "reviewed";
}

export interface QuestionPaper {
  id: string;
  paperId: string;
  subjectName: string;
  courseCode: string;
  facultyId: string;
  facultyName: string;
  department: string;
  examType: string;
  semester: string;
  date: string;
  duration: string;
  totalMarks: number;
  status: "Draft" | "Under Review" | "Approved" | "Rejected" | "Finalized";
  generatedDate: string;
  sections: PaperSection[];
  rejectionReason?: string;
}

export interface PaperSection {
  name: string;
  questions: PaperQuestion[];
  marksPerQuestion: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: Role;
  action: string;
  module: string;
  status: "Success" | "Warning" | "Error";
}

export type Page =
  | "login"
  | "admin/dashboard"
  | "admin/faculty"
  | "admin/faculty-details"
  | "admin/subjects"
  | "admin/assignments"
  | "admin/papers"
  | "admin/paper-view"
  | "admin/question-bank"
  | "admin/audit-logs"
  | "admin/settings"
  | "faculty/dashboard"
  | "faculty/subjects"
  | "faculty/workspace"
  | "faculty/generate"
  | "faculty/papers"
  | "faculty/profile"
  | "access-restricted";

export interface NavParams {
  facultyId?: string;
  subjectId?: string;
  paperId?: string;
  workspaceTab?: string;
}
