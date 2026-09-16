import type { Faculty, Subject, Assignment, Question, QuestionPaper, AuditLog } from "../types";

export const ADMIN_CREDENTIALS = {
  email: "admin@openqg.com",
  password: "Admin@123"
};
export const faculties: Faculty[] = [
  {
    id: "f1", facultyId: "FAC001", name: "Dr. Rahul Sharma",
    email: "rahul.sharma@college.edu", department: "Information Technology",
    designation: "Associate Professor", phone: "9876543210", employeeCode: "EMP001",
    status: "Active", lastLogin: "Today, 09:42 AM", createdDate: "15 Jan 2024",
    assignedSubjects: ["s1", "s3"], password: "Faculty@123",
  },
  {
    id: "f2", facultyId: "FAC002", name: "Prof. Sneha Patil",
    email: "sneha.patil@college.edu", department: "Computer Science Engineering",
    designation: "Assistant Professor", phone: "9876543211", employeeCode: "EMP002",
    status: "Active", lastLogin: "Yesterday, 04:15 PM", createdDate: "20 Feb 2024",
    assignedSubjects: ["s2"], password: "Faculty@123",
  },
  {
    id: "f3", facultyId: "FAC003", name: "Prof. Amit Shah",
    email: "amit.shah@college.edu", department: "Information Technology",
    designation: "Assistant Professor", phone: "9876543212", employeeCode: "EMP003",
    status: "Inactive", lastLogin: "5 days ago", createdDate: "10 Mar 2024",
    assignedSubjects: ["s3", "s4"], password: "Faculty@123",
  },
  {
    id: "f4", facultyId: "FAC004", name: "Dr. Priya Deshmukh",
    email: "priya.deshmukh@college.edu", department: "Computer Science Engineering",
    designation: "Professor", phone: "9876543213", employeeCode: "EMP004",
    status: "Active", lastLogin: "Today, 11:20 AM", createdDate: "05 Apr 2024",
    assignedSubjects: ["s2", "s4"], password: "Faculty@123",
  },
];

export const subjects: Subject[] = [
  {
    id: "s1", courseCode: "IT501", name: "Machine Learning",
    department: "Information Technology", semester: "VII", credits: 4,
    subjectType: "Core", assignedFaculty: "Dr. Rahul Sharma", status: "Active",
  },
  {
    id: "s2", courseCode: "IT502", name: "Database Management Systems",
    department: "Computer Science Engineering", semester: "V", credits: 4,
    subjectType: "Core", assignedFaculty: "Prof. Sneha Patil", status: "Active",
  },
  {
    id: "s3", courseCode: "IT503", name: "Data Mining",
    department: "Information Technology", semester: "VII", credits: 3,
    subjectType: "Elective", assignedFaculty: "Prof. Amit Shah", status: "Active",
  },
  {
    id: "s4", courseCode: "IT504", name: "Web Technologies",
    department: "Computer Science Engineering", semester: "VI", credits: 3,
    subjectType: "Theory", assignedFaculty: "Dr. Priya Deshmukh", status: "Active",
  },
  {
    id: "s5", courseCode: "IT505", name: "Cloud Computing",
    department: "Information Technology", semester: "VIII", credits: 4,
    subjectType: "Elective", status: "Active",
  },
];

export const assignments: Assignment[] = [
  {
    id: "a1", facultyId: "f1", facultyName: "Dr. Rahul Sharma",
    subjectId: "s1", subjectName: "Machine Learning", courseCode: "IT501",
    department: "IT", semester: "VII", academicYear: "2026–27", assignedDate: "01 Jun 2026",
  },
  {
    id: "a2", facultyId: "f2", facultyName: "Prof. Sneha Patil",
    subjectId: "s2", subjectName: "Database Management Systems", courseCode: "IT502",
    department: "CSE", semester: "V", academicYear: "2026–27", assignedDate: "01 Jun 2026",
  },
  {
    id: "a3", facultyId: "f3", facultyName: "Prof. Amit Shah",
    subjectId: "s3", subjectName: "Data Mining", courseCode: "IT503",
    department: "IT", semester: "VII", academicYear: "2026–27", assignedDate: "05 Jun 2026",
  },
  {
    id: "a4", facultyId: "f4", facultyName: "Dr. Priya Deshmukh",
    subjectId: "s4", subjectName: "Web Technologies", courseCode: "IT504",
    department: "CSE", semester: "VI", academicYear: "2026–27", assignedDate: "08 Jun 2026",
  },
];

export const questions: Question[] = [
  {
    id: "q1", text: "Explain the difference between supervised and unsupervised learning with suitable examples.",
    topic: "Introduction to ML", unit: "Unit I", co: "CO1", po: "PO1",
    bloom: "Understand", difficulty: "Medium", marks: 5, usageCount: 3, subjectId: "s1",
  },
  {
    id: "q2", text: "Describe the working principle of a linear regression model and derive its cost function.",
    topic: "Regression", unit: "Unit II", co: "CO2", po: "PO2",
    bloom: "Apply", difficulty: "Hard", marks: 10, usageCount: 1, subjectId: "s1",
  },
  {
    id: "q3", text: "What is reinforcement learning? Explain with the help of a real-world application.",
    topic: "Introduction to ML", unit: "Unit I", co: "CO1", po: "PO1",
    bloom: "Understand", difficulty: "Easy", marks: 5, usageCount: 5, subjectId: "s1",
  },
  {
    id: "q4", text: "Compare and contrast decision trees and random forests. When would you prefer one over the other?",
    topic: "Classification", unit: "Unit III", co: "CO3", po: "PO3",
    bloom: "Analyze", difficulty: "Hard", marks: 10, usageCount: 0, subjectId: "s1",
  },
  {
    id: "q5", text: "Define overfitting and underfitting. How can regularization techniques help mitigate overfitting?",
    topic: "Model Evaluation", unit: "Unit II", co: "CO2", po: "PO2",
    bloom: "Evaluate", difficulty: "Medium", marks: 5, usageCount: 2, subjectId: "s1",
  },
  {
    id: "q6", text: "Explain k-means clustering algorithm with a step-by-step example.",
    topic: "Clustering", unit: "Unit IV", co: "CO4", po: "PO4",
    bloom: "Apply", difficulty: "Medium", marks: 5, usageCount: 4, subjectId: "s1",
  },
  {
    id: "q7", text: "What are Support Vector Machines? Explain the concept of hyperplane and margin.",
    topic: "Classification", unit: "Unit III", co: "CO3", po: "PO3",
    bloom: "Understand", difficulty: "Hard", marks: 10, usageCount: 1, subjectId: "s1",
  },
  {
    id: "q8", text: "Define precision, recall, and F1-score. When is each metric preferred?",
    topic: "Model Evaluation", unit: "Unit II", co: "CO2", po: "PO2",
    bloom: "Evaluate", difficulty: "Easy", marks: 5, usageCount: 6, subjectId: "s1",
  },
];

export const questionPapers: QuestionPaper[] = [
  {
    id: "p1", paperId: "QP-1024",
    subjectName: "Machine Learning", courseCode: "IT501",
    facultyId: "f1", facultyName: "Dr. Rahul Sharma",
    department: "IT", examType: "Internal Assessment",
    semester: "VII", date: "05 Sept 2026",
    duration: "1 Hour", totalMarks: 20,
    status: "Under Review", generatedDate: "03 Sept 2026",
    sections: [
      {
        name: "Section A",
        marksPerQuestion: 5,
        questions: [
          { ...questions[0], section: "A", isAiGenerated: true, status: "pending" },
          { ...questions[2], section: "A", isAiGenerated: true, status: "pending" },
        ],
      },
      {
        name: "Section B",
        marksPerQuestion: 10,
        questions: [
          { ...questions[1], section: "B", isAiGenerated: true, status: "pending" },
        ],
      },
    ],
  },
  {
    id: "p2", paperId: "QP-1023",
    subjectName: "Database Management Systems", courseCode: "IT502",
    facultyId: "f2", facultyName: "Prof. Sneha Patil",
    department: "CSE", examType: "Mid Semester",
    semester: "V", date: "10 Sept 2026",
    duration: "2 Hours", totalMarks: 40,
    status: "Approved", generatedDate: "01 Sept 2026",
    sections: [],
  },
  {
    id: "p3", paperId: "QP-1022",
    subjectName: "Data Mining", courseCode: "IT503",
    facultyId: "f3", facultyName: "Prof. Amit Shah",
    department: "IT", examType: "End Semester",
    semester: "VII", date: "20 Sept 2026",
    duration: "3 Hours", totalMarks: 80,
    status: "Draft", generatedDate: "28 Aug 2026",
    sections: [],
  },
];

export const auditLogs: AuditLog[] = [
  { id: "al1", timestamp: "09:42 AM, 09 Sep 2026", user: "Administrator", role: "admin", action: "Assigned IT501 (Machine Learning) to Dr. Rahul Sharma", module: "Course Assignments", status: "Success" },
  { id: "al2", timestamp: "10:15 AM, 09 Sep 2026", user: "Dr. Rahul Sharma", role: "faculty", action: "Generated Question Paper QP-1024 for Machine Learning", module: "Question Papers", status: "Success" },
  { id: "al3", timestamp: "11:20 AM, 09 Sep 2026", user: "Administrator", role: "admin", action: "Approved Question Paper QP-1023 (DBMS)", module: "Question Papers", status: "Success" },
  { id: "al4", timestamp: "01:30 PM, 09 Sep 2026", user: "Prof. Sneha Patil", role: "faculty", action: "Updated the DBMS question bank — added 12 new questions", module: "Question Bank", status: "Success" },
  { id: "al5", timestamp: "02:45 PM, 09 Sep 2026", user: "Administrator", role: "admin", action: "Created faculty account for Prof. Amit Shah (FAC003)", module: "Faculty Management", status: "Success" },
  { id: "al6", timestamp: "03:10 PM, 09 Sep 2026", user: "Dr. Priya Deshmukh", role: "faculty", action: "Uploaded syllabus for Web Technologies (IT504)", module: "Syllabus", status: "Success" },
  { id: "al7", timestamp: "04:05 PM, 09 Sep 2026", user: "Administrator", role: "admin", action: "Reset password for FAC002 (Prof. Sneha Patil)", module: "Credentials", status: "Success" },
  { id: "al8", timestamp: "04:55 PM, 09 Sep 2026", user: "Prof. Amit Shah", role: "faculty", action: "Failed login attempt — account inactive", module: "Authentication", status: "Warning" },
];

export const recentActivity = [
  { id: 1, text: "Dr. Rahul Sharma generated a Machine Learning paper", time: "2 hours ago", type: "paper" },
  { id: 2, text: "Prof. Sneha Patil updated the DBMS question bank", time: "4 hours ago", type: "bank" },
  { id: 3, text: "Prof. Amit Shah was assigned Data Mining (IT503)", time: "Yesterday", type: "assignment" },
  { id: 4, text: "Dr. Priya Deshmukh finalized an IA paper for Web Technologies", time: "Yesterday", type: "paper" },
  { id: 5, text: "Administrator approved QP-1023 (Database Management Systems)", time: "2 days ago", type: "approval" },
];

export const syllabus = [
  {
    unit: "Unit I",
    title: "Introduction to Machine Learning",
    topics: ["Introduction to ML concepts", "Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Applications of ML"],
  },
  {
    unit: "Unit II",
    title: "Regression Techniques",
    topics: ["Linear Regression", "Polynomial Regression", "Logistic Regression", "Evaluation Metrics (MSE, RMSE, R²)"],
  },
  {
    unit: "Unit III",
    title: "Classification Algorithms",
    topics: ["Decision Trees", "Random Forests", "Support Vector Machines", "Naive Bayes", "k-Nearest Neighbors"],
  },
  {
    unit: "Unit IV",
    title: "Clustering & Dimensionality Reduction",
    topics: ["k-Means Clustering", "Hierarchical Clustering", "DBSCAN", "Principal Component Analysis (PCA)"],
  },
  {
    unit: "Unit V",
    title: "Neural Networks",
    topics: ["Perceptron Model", "Backpropagation", "Activation Functions", "Introduction to Deep Learning"],
  },
];

export const courseOutcomes = [
  { code: "CO1", description: "Understand fundamental machine learning concepts and paradigms", bloom: "Understand", topics: "Unit I", questionCount: 12 },
  { code: "CO2", description: "Apply regression and classification techniques to real-world datasets", bloom: "Apply", topics: "Unit II, III", questionCount: 18 },
  { code: "CO3", description: "Analyze and compare different ML algorithms for a given problem", bloom: "Analyze", topics: "Unit III", questionCount: 15 },
  { code: "CO4", description: "Evaluate model performance using appropriate metrics and techniques", bloom: "Evaluate", topics: "Unit II, IV", questionCount: 10 },
  { code: "CO5", description: "Design and implement neural network solutions for complex problems", bloom: "Create", topics: "Unit V", questionCount: 8 },
];

export const departments = ["Information Technology", "Computer Science Engineering", "Electronics & Communication", "Mechanical Engineering", "Civil Engineering"];

export const semesters = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
