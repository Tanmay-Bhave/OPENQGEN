import type { Assignment, AuditLog, Question, QuestionPaper, Subject } from "../types";

// These empty compatibility values prevent legacy pages from displaying invented records.
// Data-enabled pages obtain their records from the API services.
export const subjects: Subject[] = [];
export const questions: Question[] = [];
export const questionPapers: QuestionPaper[] = [];
export const assignments: Assignment[] = [];
export const auditLogs: AuditLog[] = [];
export const recentActivity: never[] = [];
export const syllabus: never[] = [];
export const courseOutcomes: never[] = [];
export const departments: never[] = [];
export const semesters: never[] = [];
