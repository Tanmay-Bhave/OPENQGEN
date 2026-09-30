You are a senior UI/UX designer and frontend architect. Design and generate a complete, production-quality frontend prototype for a college examination management application called:
# OPENQG
### AI-Powered Open-Source Question Paper Generator
The application is used by colleges to allow administrators to manage faculty accounts, assign subjects to faculty, and allow authorized faculty to generate AI-assisted question papers according to academic rules.
The design must look like a modern SaaS/EdTech enterprise application rather than a traditional college management portal.
==================================================
1. CORE USER ROLES
==================================================
There are exactly TWO roles:
1. ADMIN
2. FACULTY
The login page must allow both roles to authenticate through the same login interface.
IMPORTANT AUTHENTICATION RULE:
Faculty accounts are NOT created through public registration.
The ADMIN creates and manages faculty accounts.
Each faculty member receives a unique:
• Faculty Name
• Faculty ID
• Official College Email
• Password
• Department
• Assigned Subjects
The Admin has authority to create, edit, deactivate and manage faculty accounts.
There is ONE authorized ADMIN account/credential for the system.
Do NOT create a public admin registration page.
Do NOT create public faculty registration.
# ==================================================
2. LOGIN PAGE
Create a polished OpenQG login page.
Layout:
LEFT SIDE:
• OpenQG logo
• Application name
• Short tagline
• Academic/AI visual
• Small description:
"Intelligent question paper generation for modern academic institutions."
RIGHT SIDE:
Login card.
Elements:
• OpenQG logo
• "Welcome back"
• Email field
• Password field
• Show/hide password icon
• Remember me checkbox
• Login button
• Forgot password link
Below the login button show:
"Authorized access only"
Small text:
"Faculty credentials are provided and managed by the administrator."
DO NOT show:
• Sign Up
• Create Account
• Public Registration
Authentication behavior:
IF ADMIN CREDENTIAL IS ENTERED:
→ Navigate to ADMIN DASHBOARD
IF FACULTY CREDENTIAL IS ENTERED:
→ Navigate to FACULTY DASHBOARD
Show appropriate error states:
"Invalid email or password."
"Your account has been deactivated. Contact the administrator."
"Your session has expired. Please log in again."
Show loading state:
"Signing in..."
The visual design should make it obvious that this is a secure academic administration system.
# ==================================================
3. ADMIN ACCOUNT
There is one authorized administrator account.
The admin logs in using the administrator's unique email and password.
After successful authentication:
ADMIN → ADMIN DASHBOARD
The admin has complete authority over:
• Faculty
• Faculty credentials
• Subjects
• Departments
• Semesters
• Question papers
• Question banks
• Examination rules
• Generated paper review
• System activity
# ==================================================
4. ADMIN DASHBOARD
Create a powerful administrator dashboard.
Top navigation:
OPENQG
Admin Profile
• Admin
• Administrator
Sidebar:
Dashboard
Faculty Management
Subject Management
Question Papers
Question Bank
Departments
Semesters
Examination Rules
Audit Logs
Settings
Logout
Dashboard header:
"Good morning, Administrator"
Subtitle:
"Manage faculty, courses and generated question papers from one centralized workspace."
# ==================================================
5. ADMIN DASHBOARD STATISTICS
Create attractive statistics cards:
TOTAL FACULTY
24
ACTIVE FACULTY
21
TOTAL SUBJECTS
48
ASSIGNED COURSES
42
GENERATED PAPERS
186
PENDING REVIEWS
8
Use modern cards with icons.
Below statistics show:
RECENT ACTIVITY
Example:
• Prof. Rahul Sharma generated a Machine Learning paper
• Prof. Sneha Patil updated the DBMS question bank
• Prof. Amit Shah was assigned Data Mining
• Prof. Priya Deshmukh finalized an IA paper
# ==================================================
6. FACULTY MANAGEMENT
This is one of the MOST IMPORTANT admin pages.
Create a page:
"Faculty Management"
Subtitle:
"Create and manage authorized faculty accounts."
Top-right button:
"+ Add Faculty"
Create a professional data table.
Columns:
Faculty ID
Faculty Name
Email
Department
Assigned Subjects
Account Status
Last Login
Actions
Example:
FAC001 | Dr. Rahul Sharma | rahul.sharma@college.edu | IT | 3 Subjects | Active | Today
FAC002 | Prof. Sneha Patil | sneha.patil@college.edu | CSE | 2 Subjects | Active | Yesterday
FAC003 | Prof. Amit Shah | amit.shah@college.edu | IT | 4 Subjects | Inactive | 5 days ago
Actions:
• View
• Edit
• Manage Credentials
• Assign Subjects
• Deactivate
• Delete
Add:
Search faculty
Filter by department
Filter by status
Filter by subject
# ==================================================
7. ADD FACULTY
When admin clicks "+ Add Faculty", open a modal/drawer.
Title:
"Create Faculty Account"
Fields:
Faculty Name
Faculty ID
Official Email
Temporary Password
Department
Designation
Optional:
Phone
Employee Code
Button:
"Create Faculty Account"
After creation show:
"Faculty account created successfully."
Show generated credentials:
Faculty Email
Temporary Password
Add warning:
"Share these credentials securely with the faculty member."
The admin can later change/reset the password.
# ==================================================
8. FACULTY CREDENTIAL MANAGEMENT
Admin must have access to faculty login credentials.
Create:
"Faculty Credentials"
Table:
Faculty Name
Faculty ID
Email
Password
Account Status
Actions
For security-oriented UI, password should initially appear masked:
••••••••
Provide:
Show password icon
Reset Password
Change Password
Deactivate Account
IMPORTANT:
The frontend should visually represent that the admin controls credentials.
Do NOT expose passwords publicly or in URLs.
Show confirmation dialog before changing/resetting credentials.
Example:
"Reset faculty password?"
"This will invalidate the current password."
Buttons:
Cancel
Reset Password
# ==================================================
9. FACULTY PROFILE / DETAILS
When admin clicks a faculty member, open Faculty Details.
Header:
Dr. Rahul Sharma
FAC001
Active
Tabs:
1. Profile
2. Credentials
3. Assigned Subjects
4. Generated Papers
5. Activity
PROFILE:
Faculty Name
Faculty ID
Email
Department
Designation
Account Status
Created Date
Last Login
CREDENTIALS:
Email
Password
Last Password Change
Account Status
Actions:
Change Password
Reset Password
Deactivate Account
# ==================================================
10. SUBJECT MANAGEMENT
Admin can create and manage all subjects.
Page:
"Subject Management"
Columns:
Course Code
Subject Name
Department
Semester
Credits
Assigned Faculty
Status
Actions
Example:
IT501
Machine Learning
Information Technology
VII
4
Dr. Rahul Sharma
Active
Actions:
View
Edit
Assign Faculty
Delete
Button:
"+ Add Subject"
# ==================================================
11. CREATE SUBJECT
Form:
Subject Name
Course Code
Department
Semester
Academic Year
Credits
Subject Type
Subject Type:
• Theory
• Practical
• Elective
• Core
Buttons:
Save Subject
Cancel
# ==================================================
12. COURSE ASSIGNMENT
Create a dedicated:
page.
This is where ADMIN assigns a subject/course to a particular faculty.
Use a clean assignment interface.
Header:
"Assign Subject to Faculty"
Fields:
SELECT FACULTY
Searchable dropdown:
Dr. Rahul Sharma
Prof. Sneha Patil
Prof. Amit Shah
SELECT DEPARTMENT
Information Technology
SELECT SEMESTER
VII
SELECT SUBJECT
Machine Learning
IT501
Academic Year
2026–27
Button:
"Assign Subject"
# ==================================================
13. ASSIGNMENT TABLE
Display current assignments:
Faculty
Faculty ID
Subject
Course Code
Department
Semester
Academic Year
Assigned Date
Actions
Example:
Dr. Rahul Sharma | FAC001 | Machine Learning | IT501 | IT | VII | 2026–27
Actions:
Edit
Remove Assignment
Before removing:
Confirmation dialog:
"Remove this subject assignment?"
"Faculty will no longer be able to access this subject."
# ==================================================
14. FACULTY DASHBOARD
Faculty only sees subjects assigned by ADMIN.
IMPORTANT:
A faculty member MUST NOT see:
• Unassigned subjects
• Other faculty accounts
• Admin management pages
• Other faculty's papers
• Other faculty's private data
Faculty sidebar:
Dashboard
My Subjects
Question Bank
Generate Paper
My Papers
Previous Papers
Profile
Logout
Dashboard:
"Welcome, Dr. Rahul Sharma"
Subtitle:
"Manage your assigned subjects and generate compliant question papers."
Statistics:
Assigned Subjects
Generated Papers
Draft Papers
Finalized Papers
Question Bank Questions
# ==================================================
15. MY SUBJECTS
Display cards for ONLY assigned subjects.
Example:
Machine Learning
IT501
Semester VII
Information Technology
124 Questions
8 Previous Papers
Last Paper:
02 Sept 2026
Button:
"Open Subject"
Another:
Database Management Systems
IT502
Semester VII
No other subjects should appear.
# ==================================================
16. SUBJECT WORKSPACE
When faculty opens a subject:
Header:
Machine Learning
IT501
Semester VII
Information Technology
Tabs:
Overview
Syllabus
Course Outcomes
Program Outcomes
Question Bank
Previous Papers
Generate Paper
Paper History
# ==================================================
17. SYLLABUS
Display syllabus organized by units.
UNIT I
Introduction to Machine Learning
Topics:
• Introduction
• Supervised Learning
• Unsupervised Learning
• Reinforcement Learning
UNIT II
Regression
Topics:
• Linear Regression
• Polynomial Regression
• Evaluation Metrics
Buttons:
Upload Syllabus
Replace Syllabus
View Syllabus
File formats:
PDF
DOCX
TXT
Show upload progress and processing status.
# ==================================================
18. COURSE OUTCOMES
Create CO management page.
Table:
CO Code
Description
Bloom Level
Topics
Question Count
Example:
CO1
Understand machine learning fundamentals
Understand
Unit I
12
CO2
Apply regression techniques
Apply
Unit II
18
Provide:
Add CO
Edit
Delete
Map Topics
# ==================================================
19. PROGRAM OUTCOMES
Create PO mapping interface.
Display:
PO1
PO2
PO3
...
PO12
Create a CO → PO matrix.
Example:
    PO1 PO2 PO3 PO4

CO1 3 2 1 -
CO2 2 3 2 1
CO3 1 2 3 2
Legend:
3 = High
2 = Medium
1 = Low
- = Not mapped
# ==================================================
20. QUESTION BANK
Create a modern searchable question-bank interface.
Columns:
Question
Topic
CO
PO
Bloom
Difficulty
Marks
Usage
Actions
Filters:
Topic
Unit
CO
PO
Bloom Level
Difficulty
Marks
Used / Unused
Question card:
"Explain the difference between supervised and unsupervised learning."
Metadata:
CO1
PO1
Understand
Medium
5 Marks
Actions:
Edit
Delete
Duplicate
View History
Use in Paper
# ==================================================
21. QUESTION PAPER GENERATION
Create a prominent button:
"Generate Question Paper"
This opens a multi-step wizard.
STEP 1:
Exam Information
Exam Type:
Internal Assessment
Mid Semester
End Semester
University Examination
Custom
Subject
Course Code
Semester
Date
Duration
Total Marks
STEP 2:
Paper Structure
Section A
Number of Questions
Marks
Section B
Number of Questions
Marks
Section C
Number of Questions
Marks
Allow custom sections.
STEP 3:
Topic Coverage
For every unit/topic:
Required
Preferred
Optional
Excluded
Show percentage coverage.
STEP 4:
CO / PO Coverage
CO1 20%
CO2 30%
CO3 30%
CO4 20%
PO requirements.
STEP 5:
Bloom's Taxonomy
Remember
Understand
Apply
Analyze
Evaluate
Create
Display distribution chart.
STEP 6:
Difficulty
Easy
Medium
Hard
Example:
Easy 20%
Medium 60%
Hard 20%
STEP 7:
Question Constraints
Checkboxes:
✓ Avoid previously used questions
✓ Avoid semantically similar questions
✓ Ensure CO coverage
✓ Ensure PO coverage
✓ Ensure Bloom distribution
✓ Ensure difficulty distribution
✓ Ensure topic coverage
✓ Cover important acronyms
✓ Prefer never-used questions
STEP 8:
Review Configuration
Display complete summary.
Button:
"Generate Question Paper"
# ==================================================
22. AI GENERATION PROGRESS
After clicking Generate:
Display a visually polished AI processing screen.
Title:
"Generating Your Question Paper"
Progress indicator.
Stages:
✓ Preparing syllabus
✓ Retrieving relevant questions
● Generating questions
○ Checking duplicates
○ Mapping CO/PO
○ Validating Bloom levels
○ Optimizing paper
○ Finalizing paper
Display:
"AI is generating questions according to your selected academic constraints."
Do NOT make the faculty think the paper is automatically approved.
# ==================================================
23. GENERATED PAPER REVIEW
After generation, open:
"Question Paper Review"
Display the paper like a real examination paper.
Header:
COLLEGE NAME
INTERNAL ASSESSMENT EXAMINATION
Subject:
Machine Learning
Course Code:
IT501
Semester:
VII
Date:
Time:
Maximum Marks:
20
Instructions:
1. Answer all questions.
2. Assume suitable data wherever required.
Then:
SECTION A
Q1. Explain supervised learning with a suitable example.
5 Marks
Q2. Differentiate between classification and regression.
5 Marks
Each question has a compact metadata panel:
CO1
PO1
Understand
Easy
5 Marks
AI Generated — Review Required
Actions:
Edit
Regenerate
Delete
Move
Change Marks
# ==================================================
24. FACULTY PAPER EDITOR
Faculty can:
Edit question
Delete question
Regenerate question
Change marks
Change Bloom level
Change CO
Change PO
Change difficulty
Move question
Add question
Add from Question Bank
Add Question button:
"+ Add Question"
# ==================================================
25. VALIDATION PANEL
Create a right-side validation panel.
Show:
✓ Total marks satisfied
✓ CO coverage satisfied
✓ PO coverage satisfied
✓ Bloom distribution satisfied
✓ Difficulty distribution satisfied
✓ Topic coverage satisfied
✓ No duplicate questions
✓ Acronym coverage satisfied
Warnings:
⚠ CO3 underrepresented
⚠ Analyze target is 20%, actual is 10%
⚠ Question 7 may be similar to a previous question
Use clear success/warning indicators.
# ==================================================
26. FACULTY FINALIZATION
At the bottom of the generated paper:
Save Draft
Preview
Validate Paper
Finalize Paper
Download PDF
Download DOCX
When faculty clicks:
"Finalize Paper"
Show confirmation:
"Finalize this question paper?"
"Once finalized, the paper will be submitted to the administrator for review."
Buttons:
Cancel
Finalize Paper
After finalization:
Status:
"Submitted for Admin Review"
# ==================================================
27. ADMIN QUESTION PAPER REVIEW
THIS IS AN IMPORTANT ADMIN FEATURE.
Admin sidebar includes:
"Question Papers"
Admin can see question papers generated by ALL faculty.
Page:
"Question Paper Review"
Statistics:
Total Papers
Draft
Under Review
Approved
Finalized
Table:
Paper ID
Subject
Course Code
Faculty
Department
Exam Type
Date
Status
Actions
Example:
QP-1024
Machine Learning
IT501
Dr. Rahul Sharma
IT
Internal Assessment
05 Sept 2026
Under Review
Actions:
View
Review
Download
Approve
Reject
# ==================================================
28. ADMIN PAPER VIEW
When Admin clicks "View":
Show the complete final question paper.
Header:
Machine Learning
IT501
Internal Assessment
Generated By:
Dr. Rahul Sharma
Generated Date:
05 September 2026
Status:
Under Review
Display every question exactly as the faculty sees it.
Show metadata:
CO
PO
Bloom
Difficulty
Marks
Topic
Right-side panel:
Paper Validation
✓ Total marks
✓ CO coverage
✓ PO coverage
✓ Bloom distribution
✓ Difficulty
✓ Duplicate check
# ==================================================
29. ADMIN PAPER APPROVAL
At bottom:
Approve Paper
Reject Paper
Download PDF
Download DOCX
If Admin clicks Approve:
Confirmation:
"Approve this question paper?"
"The paper will be marked as approved."
If Reject:
Show text area:
"Reason for rejection"
Example:
"Please replace Question 6 because it is too similar to a previous paper."
Button:
"Send Back to Faculty"
Faculty then sees:
"Paper requires revision"
and the rejection reason.
# ==================================================
30. ADMIN QUESTION BANK
Admin can view the complete question bank across departments.
Filters:
Department
Subject
Faculty
Topic
CO
PO
Bloom
Difficulty
Admin can:
View
Edit
Delete
Approve
Review History
# ==================================================
31. ADMIN AUDIT LOG
Create an audit log page.
Table:
Timestamp
User
Role
Action
Module
Status
Examples:
09:42 AM
Admin
Admin
Assigned IT501 to Dr. Rahul Sharma
10:15 AM
Dr. Rahul Sharma
Faculty
Generated Question Paper QP-1024
11:20 AM
Admin
Admin
Approved QP-1024
Use timeline/table visualization.
# ==================================================
32. ADMIN SETTINGS
Admin settings:
College Name
College Logo
Departments
Semesters
Academic Year
Examination Rules
Paper Templates
Do not allow faculty to modify global college settings.
# ==================================================
33. NAVIGATION RULES
ADMIN:
Dashboard
Faculty Management
Subject Management
Question Papers
Question Bank
Departments
Semesters
Examination Rules
Audit Logs
Settings
FACULTY:
Dashboard
My Subjects
Question Bank
Generate Paper
My Papers
Previous Papers
Profile
IMPORTANT ROLE RESTRICTION:
Faculty attempting to access:
/admin
/admin/faculty
/admin/subjects
/admin/assignments
/admin/papers
must be redirected or shown:
"Access Restricted"
Similarly, Admin pages should not appear in the Faculty sidebar.
# ==================================================
34. DESIGN SYSTEM
Design style:
Modern
Professional
Academic
Enterprise SaaS
AI-powered
Use:
• Clean white/light backgrounds
• Dark professional typography
• Subtle borders
• Rounded cards
• Soft shadows
• Clear status badges
• Minimal gradients
• Consistent spacing
• Professional charts
• Accessible contrast
Avoid:
• Excessive neon colors
• Gaming-style UI
• Excessive animations
• Overly decorative graphics
• Cluttered dashboards
# ==================================================
35. COLORS
Use a professional academic color system.
Primary:
Deep Blue / Indigo
Secondary:
Slate
Success:
Green
Warning:
Amber
Error:
Red
Background:
White / Very Light Gray
Use colors primarily for:
Status
Actions
Charts
Warnings
Validation
# ==================================================
36. RESPONSIVE DESIGN
Primary:
Desktop / Laptop
Also support:
Tablet
Sidebar should collapse responsively.
Tables should become horizontally scrollable or transform into responsive cards.
Question paper preview must remain readable.
# ==================================================
37. IMPORTANT UI STATES
Every important page must contain:
Loading
Empty
Error
Success
Examples:
Loading:
"Loading faculty..."
Empty:
"No faculty accounts created yet."
Error:
"Unable to load faculty. Try again."
Success:
"Subject assigned successfully."
# ==================================================
38. CONFIRMATION DIALOGS
Use confirmation dialogs for destructive actions.
Delete Faculty:
"Delete this faculty account?"
Delete Subject:
"Delete this subject?"
Remove Assignment:
"Remove this subject assignment?"
Delete Question:
"Delete this question?"
Reject Paper:
"Send this paper back for revision?"
# ==================================================
39. NOTIFICATIONS
Create toast notifications for:
Faculty created
Password reset
Subject created
Subject assigned
Assignment removed
Question generated
Paper generated
Paper finalized
Paper approved
Paper rejected
# ==================================================
40. MOCK DATA
Use realistic demo data.
ADMIN:
Administrator
FACULTY:
Dr. Rahul Sharma
FAC001
rahul.sharma@college.edu
IT
Prof. Sneha Patil
FAC002
sneha.patil@college.edu
CSE
Prof. Amit Shah
FAC003
amit.shah@college.edu
IT
SUBJECTS:
IT501 — Machine Learning
IT502 — Database Management Systems
IT503 — Data Mining
IT504 — Web Technologies
Example assignment:
Dr. Rahul Sharma
→ Machine Learning
→ IT501
→ Semester VII
Prof. Sneha Patil
→ Database Management Systems
→ IT502
→ Semester VII
# ==================================================
41. IMPORTANT SECURITY UX
The interface must communicate role-based authorization.
Admin:
"Administrator Access"
Faculty:
"Faculty Access"
Do not show admin controls to faculty.
Do not allow faculty to manage credentials.
Do not allow faculty to assign subjects.
Do not allow faculty to view other faculty accounts.
Do not allow faculty to view other faculty's private papers unless explicitly authorized.
The backend will ultimately enforce authorization.
The frontend should only provide the correct UI experience.
# ==================================================
42. COMPONENTS
Create reusable components:
Sidebar
TopNavbar
Breadcrumbs
StatCard
DataTable
SearchBar
FilterDropdown
StatusBadge
FacultyCard
FacultyTable
CredentialPanel
SubjectCard
AssignmentTable
AssignmentDialog
QuestionCard
QuestionEditor
QuestionMetadata
PaperPreview
PaperReview
ValidationPanel
GenerationWizard
GenerationProgress
COCoverageChart
POCoverageMatrix
BloomDistributionChart
ConfirmationDialog
Toast
FileUploader
EmptyState
ErrorState
LoadingState
# ==================================================
43. FINAL FIGMA OUTPUT
Generate all major screens and connect them with realistic navigation.
Required screens:
1. Login
2. Admin Dashboard
3. Faculty Management
4. Add Faculty
5. Faculty Details
6. Faculty Credentials
7. Subject Management
8. Add Subject
10. Assignment Management
11. Admin Question Papers
12. Admin Paper Review
13. Admin Paper Approval
14. Admin Question Bank
15. Admin Audit Logs
16. Faculty Dashboard
17. My Subjects
18. Subject Workspace
19. Syllabus
20. Course Outcomes
21. Program Outcomes
22. Question Bank
23. Generate Paper Wizard
24. AI Generation Progress
25. Generated Paper Review
26. Question Editor
27. Validation Panel
28. My Papers
29. Previous Papers
30. Faculty Profile
31. Settings
32. Access Restricted page
# ==================================================
44. COMPLETE USER WORKFLOW
ADMIN WORKFLOW:
Admin Login
↓
Admin Dashboard
↓
Create Faculty Account
↓
Enter Faculty Name + Email + Password
↓
Faculty Account Created
↓
Create/Manage Subjects
↓
Assign Subject to Faculty
↓
Faculty receives credentials
↓
Faculty logs in
↓
Faculty sees ONLY assigned subjects
↓
Faculty uploads syllabus/question bank
↓
Faculty configures paper requirements
↓
AI generates paper
↓
Faculty reviews/edits paper
↓
Faculty finalizes paper
↓
Paper submitted to Admin
↓
Admin opens Question Papers
↓
Admin reviews final paper
↓
Admin Approves or Rejects
↓
Approved paper available for download/archive
FACULTY WORKFLOW:
Faculty Login
↓
Faculty Dashboard
↓
My Assigned Subjects
↓
Open Subject
↓
View Syllabus / CO / PO / Question Bank
↓
Generate Paper
↓
Configure Requirements
↓
AI Generation
↓
Review Questions
↓
Edit / Regenerate / Rearrange
↓
Validate
↓
Finalize
↓
Submit to Admin
↓
Download/Track Status
# ==================================================
45. APPLICATION IDENTITY
Logo text:
OPENQG
Main title:
AI-Powered Open-Source Question Paper Generator
Tagline:
"Generate. Validate. Review. Approve."
Supporting message:
"An intelligent academic workflow for creating unique, compliant and high-quality question papers."
# ==================================================
46. CRITICAL REQUIREMENT
The design must clearly communicate that OpenQG is NOT simply an AI question generator.
It is a complete:
ADMIN → FACULTY → AI GENERATION → REVIEW → ADMIN APPROVAL
academic workflow.
The most important relationship in the UI is:
ADMIN
↓
Creates Faculty
↓
Creates Subjects
↓
Assigns Subjects
↓
Faculty Accesses Assigned Subjects
↓
Faculty Generates Paper
↓
Faculty Finalizes Paper
↓
ADMIN REVIEWS FINAL PAPER
↓
ADMIN APPROVES / REJECTS
Design the UI around this workflow.
Create a polished, realistic, presentation-ready Figma prototype with connected screens, realistic data, clear role separation, professional academic styling and intuitive navigation. create the pages