import { useEffect, useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { createSubject, deleteSubject, getSubjects, updateSubjectStatus } from "../../Api/subjectApi";
import { StatusBadge } from "../../components/ui/Badge";
import Modal, { ConfirmDialog } from "../../components/ui/Modal";

const semesters = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

const initialForm = {
  name: "",
  courseCode: "",
  department: "",
  semester: "",
  credits: "4",
  subjectType: "Core",
  academicYear: "2026-27",
  assignedFaculty: "",
};

export default function SubjectManagement() {
  const { toast, faculties } = useApp();
  const [list, setList] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState<any>(null);
  const [form, setForm] = useState(initialForm);

  const activeFaculties = faculties.filter((faculty) => faculty.status === "Active");

  const load = () => {
    setLoading(true);
    getSubjects()
      .then(setList)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const submit = async () => {
    try {
      const subject = await createSubject({
        ...form,
        credits: Number(form.credits),
        assignedFaculty: form.assignedFaculty || null,
      });

      setList((items) => [subject, ...items]);
      setForm(initialForm);
      setAdd(false);
      toast("success", "Subject created successfully.");
    } catch (e: any) {
      toast("error", e.message);
    }
  };

  const filtered = list.filter((subject) =>
    `${subject.name} ${subject.courseCode} ${subject.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-700 text-slate-900">
            Subject Management
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Create subjects and assign them to faculty members.
          </p>
        </div>

        <button className="btn-primary" onClick={() => setAdd(true)}>
          <Plus size={16} /> Add Subject
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 relative">
        <Search
          size={15}
          className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          className="form-input pl-9"
          placeholder="Search subjects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-slate-500">Loading subjects…</p>
      ) : error ? (
        <p className="text-red-600">
          Unable to load subjects: {error}
        </p>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Subject</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Credits</th>
                <th>Faculty</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {filtered.length ? (
                filtered.map((subject) => (
                  <tr key={subject.id}>
                    <td>{subject.courseCode}</td>
                    <td>{subject.name}</td>
                    <td>{subject.department}</td>
                    <td>{subject.semester}</td>
                    <td>{subject.credits}</td>

                    <td>
                      {subject.assignedFaculty ? (
                        <div>
                          <div className="font-500">
                            {subject.assignedFaculty.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {subject.assignedFaculty.facultyId ||
                              subject.assignedFaculty.email}
                          </div>
                        </div>
                      ) : (
                        "Unassigned"
                      )}
                    </td>

                    <td>
                      <button
                        onClick={async () => {
                          try {
                            const updated = await updateSubjectStatus(
                              subject.id,
                              subject.status === "Active"
                                ? "Inactive"
                                : "Active"
                            );

                            setList((items) =>
                              items.map((item) =>
                                item.id === subject.id ? updated : item
                              )
                            );

                            toast("success", "Subject status updated.");
                          } catch (e: any) {
                            toast("error", e.message);
                          }
                        }}
                      >
                        <StatusBadge status={subject.status} />
                      </button>
                    </td>

                    <td>
                      <button
                        className="btn-ghost text-red-500"
                        onClick={() => setRemove(subject)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-12 text-slate-400"
                  >
                    No subjects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={add}
        onClose={() => {
          setForm(initialForm);
          setAdd(false);
        }}
        title="Create Subject"
        subtitle="Add details and optionally assign the faculty member."
      >
        <div className="space-y-3">
          <input
            className="form-input"
            placeholder="Subject name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="form-input"
            placeholder="Course code"
            value={form.courseCode}
            onChange={(e) =>
              setForm({ ...form, courseCode: e.target.value })
            }
          />

          <select
            className="form-select"
            value={form.assignedFaculty}
            onChange={(e) => {
              const faculty = activeFaculties.find(
                (item) => item.id === e.target.value
              );

              setForm({
                ...form,
                assignedFaculty: e.target.value,
                department: faculty?.department || form.department,
              });
            }}
          >
            <option value="">Assign faculty</option>

            {activeFaculties.map((faculty) => (
              <option key={faculty.id} value={faculty.id}>
                {faculty.name} (
                {faculty.facultyId || faculty.email}) —{" "}
                {faculty.department}
              </option>
            ))}
          </select>

          <input
            className="form-input"
            placeholder="Department"
            value={form.department}
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
          />

          <select
            className="form-select"
            value={form.semester}
            onChange={(e) =>
              setForm({ ...form, semester: e.target.value })
            }
          >
            <option value="">Select semester</option>

            {semesters.map((semester) => (
              <option key={semester}>{semester}</option>
            ))}
          </select>

       

          <select
            className="form-select"
            value={form.subjectType}
            onChange={(e) =>
              setForm({
                ...form,
                subjectType: e.target.value,
              })
            }
          >
            {["Core", "Theory", "Practical", "Elective"].map(
              (type) => (
                <option key={type}>{type}</option>
              )
            )}
          </select>

          <button
            className="btn-primary"
            disabled={
              !form.name ||
              !form.courseCode ||
              !form.department ||
              !form.semester
            }
            onClick={submit}
          >
            Create Subject
          </button>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!remove}
        onClose={() => setRemove(null)}
        title="Delete Subject?"
        message="This action cannot be undone."
        confirmLabel="Delete"
        confirmClass="btn-danger"
        onConfirm={async () => {
          try {
            await deleteSubject(remove.id);

            setList((items) =>
              items.filter(
                (subject) => subject.id !== remove.id
              )
            );

            setRemove(null);
            toast("success", "Subject deleted.");
          } catch (e: any) {
            toast("error", e.message);
          }
        }}
      />
    </div>
  );
}