import { useState } from "react";
import { CheckCircle, Circle, Loader, ArrowLeft, ArrowRight, AlertTriangle, Download, Send, Edit, RefreshCw, Trash2 } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { subjects, courseOutcomes, syllabus } from "../../data/mock";
import Badge from "../../components/ui/Badge";
import { ConfirmDialog } from "../../components/ui/Modal";

const STEP_LABELS = [
  "Exam Info", "Paper Structure", "Topic Coverage",
  "CO/PO Coverage", "Bloom's Taxonomy", "Difficulty",
  "Constraints", "Review & Generate",
];

function StepIndicator({ step, current }: { step: number; current: number }) {
  const done = current > step;
  const active = current === step;
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-600 transition-all ${
      done ? "bg-green-100 text-green-700" :
      active ? "bg-indigo-600 text-white" :
      "bg-slate-100 text-slate-400"
    }`}>
      {done ? <CheckCircle size={13} /> : <span className="w-4 text-center">{step + 1}</span>}
      <span className="hidden sm:inline">{STEP_LABELS[step]}</span>
    </div>
  );
}

function BloomBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-600">{label}</span>
        <span className="font-mono-data text-xs text-slate-500">{pct}%</span>
      </div>
      <input type="range" min={0} max={100} value={pct} className="w-full accent-indigo-600" readOnly />
    </div>
  );
}

const GENERATED_QUESTIONS = [
  { id: "g1", section: "A", no: 1, text: "Explain supervised learning with a suitable example.", marks: 5, co: "CO1", po: "PO1", bloom: "Understand", difficulty: "Easy" },
  { id: "g2", section: "A", no: 2, text: "Differentiate between classification and regression techniques.", marks: 5, co: "CO2", po: "PO2", bloom: "Understand", difficulty: "Easy" },
  { id: "g3", section: "B", no: 3, text: "Derive the cost function of linear regression. Explain gradient descent.", marks: 10, co: "CO2", po: "PO2", bloom: "Apply", difficulty: "Hard" },
  { id: "g4", section: "B", no: 4, text: "Compare and contrast decision trees and random forests. When is each preferred?", marks: 10, co: "CO3", po: "PO3", bloom: "Analyze", difficulty: "Hard" },
];

const GEN_STAGES = [
  "Preparing syllabus",
  "Retrieving relevant questions",
  "Generating questions",
  "Checking duplicates",
  "Mapping CO/PO",
  "Validating Bloom levels",
  "Optimizing paper",
  "Finalizing paper",
];

export default function GeneratePaper() {
  const { navigate, user, toast, faculties } = useApp();
  const faculty = faculties.find((f) => f.id === user?.id);
  const mySubjects = subjects.filter((s) => faculty?.assignedSubjects.includes(s.id));

  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [genStage, setGenStage] = useState(0);
  const [generated, setGenerated] = useState(false);
  const [confirmFinalize, setConfirmFinalize] = useState(false);
  const [finalized, setFinalized] = useState(false);

  const [form, setForm] = useState({
    examType: "Internal Assessment",
    subjectId: mySubjects[0]?.id ?? "",
    semester: mySubjects[0]?.semester ?? "VII",
    date: "",
    duration: "1 Hour",
    totalMarks: "20",
    sectionA: { count: "2", marks: "5" },
    sectionB: { count: "1", marks: "10" },
  });

  const subject = subjects.find((s) => s.id === form.subjectId) ?? mySubjects[0];

  const handleGenerate = async () => {
    setGenerating(true);
    for (let i = 0; i < GEN_STAGES.length; i++) {
      await new Promise((r) => setTimeout(r, 600));
      setGenStage(i + 1);
    }
    await new Promise((r) => setTimeout(r, 400));
    setGenerating(false);
    setGenerated(true);
  };

  if (finalized) {
    return (
      <div className="p-6 max-w-lg mx-auto text-center">
        <div className="bg-white rounded-2xl border border-slate-200 p-10">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="font-display text-xl font-700 text-slate-900 mb-2">Paper Submitted for Review</h2>
          <p className="text-slate-500 mb-2">The question paper has been submitted to the administrator for review and approval.</p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-amber-700 font-500">Status: Submitted for Admin Review</p>
          </div>
          <div className="flex gap-3 justify-center">
            <button className="btn-secondary" onClick={() => navigate("faculty/papers")}>View My Papers</button>
            <button className="btn-primary" onClick={() => { setStep(0); setGenerated(false); setFinalized(false); setGenStage(0); }}>Generate Another</button>
          </div>
        </div>
      </div>
    );
  }

  if (generating) {
    return (
      <div className="p-6 max-w-lg mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-50 border-4 border-indigo-200 flex items-center justify-center mx-auto mb-5">
            <Loader size={28} className="text-indigo-600 spin" />
          </div>
          <h2 className="font-display text-xl font-700 text-slate-900 mb-2">Generating Your Question Paper</h2>
          <p className="text-sm text-slate-500 mb-7">AI is generating questions according to your selected academic constraints.</p>

          <div className="space-y-2 text-left">
            {GEN_STAGES.map((stage, i) => (
              <div key={stage} className="flex items-center gap-3 py-1.5">
                {i < genStage ? (
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                ) : i === genStage ? (
                  <div className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent spin flex-shrink-0" />
                ) : (
                  <Circle size={16} className="text-slate-300 flex-shrink-0" />
                )}
                <span className={`text-sm ${i < genStage ? "text-green-700" : i === genStage ? "text-indigo-700 font-500" : "text-slate-400"}`}>
                  {stage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (generated) {
    const diffColor: Record<string, "success" | "warning" | "error"> = { Easy: "success", Medium: "warning", Hard: "error" };
    return (
      <div className="p-6">
        <button className="btn-ghost mb-5 text-slate-500" onClick={() => navigate("faculty/subjects")}>
          <ArrowLeft size={16} /> Back
        </button>

        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="font-display text-xl font-700 text-slate-900">Question Paper Review</h1>
            <p className="text-slate-500 text-sm mt-0.5">{subject?.name} — {form.examType}</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary"><Download size={14} /> Download PDF</button>
            <button className="btn-secondary">Save Draft</button>
            <button className="btn-primary" onClick={() => setConfirmFinalize(true)}>
              <Send size={14} /> Finalize Paper
            </button>
          </div>
        </div>

        <div className="flex gap-5">
          {/* Paper content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              {/* Exam header */}
              <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
                <h2 className="font-display text-lg font-700 text-slate-900 uppercase">Techno University</h2>
                <p className="font-600 text-slate-700 mt-1 uppercase tracking-wide text-sm">{form.examType} Examination</p>
                <div className="mt-3 grid grid-cols-2 gap-x-8 text-sm text-slate-700 max-w-sm mx-auto text-left">
                  <div><span className="font-600">Subject:</span> {subject?.name}</div>
                  <div><span className="font-600">Code:</span> {subject?.courseCode}</div>
                  <div><span className="font-600">Semester:</span> {form.semester}</div>
                  <div><span className="font-600">Duration:</span> {form.duration}</div>
                  <div><span className="font-600">Max Marks:</span> {form.totalMarks}</div>
                </div>
                <p className="text-xs text-slate-400 mt-2">Instructions: 1. Answer all questions. 2. Assume suitable data wherever required.</p>
              </div>

              {["A", "B"].map((sec) => {
                const qs = GENERATED_QUESTIONS.filter((q) => q.section === sec);
                return (
                  <div key={sec} className="mb-6">
                    <h3 className="font-display font-700 text-slate-900 mb-3">Section {sec}</h3>
                    {qs.map((q) => (
                      <div key={q.id} className="mb-4 p-4 border border-slate-200 rounded-xl hover:border-indigo-200 transition-colors">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm text-slate-800 flex-1">
                            <span className="font-600">Q{q.no}.</span> {q.text}
                          </p>
                          <span className="text-sm font-600 text-slate-600 flex-shrink-0">[{q.marks} M]</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <Badge variant="purple" size="sm">{q.co}</Badge>
                          <Badge variant="info" size="sm">{q.po}</Badge>
                          <Badge variant="default" size="sm">{q.bloom}</Badge>
                          <Badge variant={diffColor[q.difficulty]} size="sm">{q.difficulty}</Badge>
                          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">AI Generated — Review Required</span>
                          <div className="ml-auto flex gap-1">
                            <button className="btn-ghost p-1"><Edit size={12} /></button>
                            <button className="btn-ghost p-1"><RefreshCw size={12} /></button>
                            <button className="btn-ghost p-1 text-red-500 hover:bg-red-50"><Trash2 size={12} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Validation panel */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-6">
              <h3 className="font-display font-600 text-slate-900 mb-4 text-sm">Validation</h3>
              <div className="space-y-2">
                {[
                  { label: "Total marks (20/20)", ok: true },
                  { label: "CO coverage satisfied", ok: true },
                  { label: "PO coverage satisfied", ok: true },
                  { label: "Bloom distribution", ok: true },
                  { label: "Difficulty distribution", ok: true },
                  { label: "Topic coverage", ok: true },
                  { label: "No duplicate questions", ok: true },
                ].map((v) => (
                  <div key={v.label} className="validation-item">
                    <CheckCircle size={14} className="check" />
                    <span className="text-xs text-slate-600">{v.label}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-200 mt-2 space-y-2">
                  <p className="text-xs font-600 text-amber-600">Warnings</p>
                  {[
                    "CO3 underrepresented",
                    "Analyze target: 20%, actual: 10%",
                  ].map((w) => (
                    <div key={w} className="validation-item">
                      <AlertTriangle size={14} className="warn text-amber-500" />
                      <span className="text-xs text-slate-600">{w}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-400 mb-2">Total Marks</p>
                <div className="flex items-center justify-between">
                  <span className="font-display font-700 text-2xl text-slate-900">20</span>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">/ 20 ✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ConfirmDialog
          open={confirmFinalize}
          onClose={() => setConfirmFinalize(false)}
          onConfirm={() => {
            setFinalized(true);
            toast("success", "Paper submitted for admin review.");
          }}
          title="Finalize this question paper?"
          message="Once finalized, the paper will be submitted to the administrator for review. You can no longer edit it after finalization."
          confirmLabel="Finalize Paper"
          confirmClass="btn-primary"
        />
      </div>
    );
  }

  // Wizard steps
  return (
    <div className="p-6 max-w-3xl">
      <button className="btn-ghost mb-5 text-slate-500" onClick={() => navigate("faculty/subjects")}>
        <ArrowLeft size={16} /> Back
      </button>

      <div className="mb-6">
        <h1 className="font-display text-2xl font-700 text-slate-900">Generate Question Paper</h1>
        <p className="text-slate-500 mt-1 text-sm">Configure your paper requirements step by step.</p>
      </div>

      {/* Step indicators */}
      <div className="flex flex-wrap gap-2 mb-7">
        {STEP_LABELS.map((_, i) => <StepIndicator key={i} step={i} current={step} />)}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-display font-600 text-slate-900 mb-5 text-lg">
          Step {step + 1}: {STEP_LABELS[step]}
        </h2>

        {/* Step 0: Exam Info */}
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label className="form-label">Exam Type *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {["Internal Assessment","Mid Semester","End Semester","University Examination","Custom"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setForm((f) => ({ ...f, examType: t }))}
                    className={`p-3 rounded-xl border text-sm font-500 text-left transition-all ${
                      form.examType === t ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-600 hover:border-indigo-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Subject *</label>
                <select className="form-select" value={form.subjectId} onChange={(e) => setForm((f) => ({ ...f, subjectId: e.target.value }))}>
                  {mySubjects.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.courseCode})</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Semester</label>
                <input className="form-input" value={form.semester} readOnly />
              </div>
              <div>
                <label className="form-label">Exam Date</label>
                <input type="date" className="form-input" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
              </div>
              <div>
                <label className="form-label">Duration</label>
                <select className="form-select" value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}>
                  {["30 Minutes","1 Hour","1.5 Hours","2 Hours","3 Hours"].map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Total Marks</label>
                <input type="number" className="form-input" value={form.totalMarks} onChange={(e) => setForm((f) => ({ ...f, totalMarks: e.target.value }))} />
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Paper Structure */}
        {step === 1 && (
          <div className="space-y-5">
            {["Section A", "Section B", "Section C"].map((sec, si) => (
              <div key={sec} className="p-4 bg-slate-50 rounded-xl">
                <h3 className="font-display font-600 text-slate-800 mb-3">{sec}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Number of Questions</label>
                    <input type="number" className="form-input" defaultValue={si === 0 ? 2 : si === 1 ? 1 : 0} min={0} />
                  </div>
                  <div>
                    <label className="form-label">Marks per Question</label>
                    <input type="number" className="form-input" defaultValue={si === 0 ? 5 : si === 1 ? 10 : 15} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 2: Topic Coverage */}
        {step === 2 && (
          <div className="space-y-3">
            <p className="text-sm text-slate-500 mb-3">Set coverage priority for each unit.</p>
            {syllabus.map((unit) => (
              <div key={unit.unit} className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-500 text-slate-800 text-sm">{unit.unit}: {unit.title}</span>
                </div>
                <div className="flex gap-2">
                  {["Required","Preferred","Optional","Excluded"].map((opt) => (
                    <button
                      key={opt}
                      className={`text-xs px-3 py-1.5 rounded-lg font-500 border transition-colors ${
                        opt === "Required" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300"
                      }`}
                    >{opt}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 3: CO/PO Coverage */}
        {step === 3 && (
          <div className="space-y-3">
            <p className="text-sm text-slate-500 mb-3">Set percentage coverage for each Course Outcome.</p>
            {courseOutcomes.map((co, i) => (
              <div key={co.code} className="flex items-center gap-4">
                <span className="font-mono-data text-xs font-600 text-indigo-700 w-8">{co.code}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span className="text-slate-600 text-sm">{co.description.slice(0, 40)}…</span>
                    <span className="font-mono-data">{[20,30,25,15,10][i]}%</span>
                  </div>
                  <input type="range" min={0} max={100} defaultValue={[20,30,25,15,10][i]} className="w-full accent-indigo-600" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 4: Bloom's */}
        {step === 4 && (
          <div>
            <p className="text-sm text-slate-500 mb-5">Set the Bloom's Taxonomy distribution for this paper.</p>
            {["Remember","Understand","Apply","Analyze","Evaluate","Create"].map((b, i) => (
              <BloomBar key={b} label={b} pct={[5,25,30,20,10,10][i]} color="" />
            ))}
          </div>
        )}

        {/* Step 5: Difficulty */}
        {step === 5 && (
          <div className="space-y-4">
            <p className="text-sm text-slate-500">Set the difficulty distribution for the paper.</p>
            {[{label:"Easy",pct:20,color:"text-green-600 bg-green-50"},{label:"Medium",pct:60,color:"text-amber-600 bg-amber-50"},{label:"Hard",pct:20,color:"text-red-600 bg-red-50"}].map((d) => (
              <div key={d.label} className={`p-4 rounded-xl ${d.color}`}>
                <div className="flex justify-between mb-2">
                  <span className="font-600 text-sm">{d.label}</span>
                  <span className="font-mono-data text-sm">{d.pct}%</span>
                </div>
                <input type="range" min={0} max={100} defaultValue={d.pct} className="w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Step 6: Constraints */}
        {step === 6 && (
          <div className="space-y-3">
            <p className="text-sm text-slate-500 mb-3">Select the constraints to apply during AI generation.</p>
            {[
              "Avoid previously used questions",
              "Avoid semantically similar questions",
              "Ensure CO coverage",
              "Ensure PO coverage",
              "Ensure Bloom distribution",
              "Ensure difficulty distribution",
              "Ensure topic coverage",
              "Cover important acronyms",
              "Prefer never-used questions",
            ].map((c) => (
              <label key={c} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-indigo-50 transition-colors">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded accent-indigo-600" />
                <span className="text-sm text-slate-700">{c}</span>
              </label>
            ))}
          </div>
        )}

        {/* Step 7: Review */}
        {step === 7 && (
          <div>
            <div className="bg-slate-50 rounded-xl p-5 space-y-3 mb-5">
              <h3 className="font-display font-600 text-slate-900 mb-3">Configuration Summary</h3>
              {[
                ["Exam Type", form.examType],
                ["Subject", subject?.name ?? "—"],
                ["Course Code", subject?.courseCode ?? "—"],
                ["Semester", form.semester],
                ["Duration", form.duration],
                ["Total Marks", form.totalMarks],
                ["Paper Structure", `Section A (2×5M) + Section B (1×10M)`],
                ["Bloom Distribution", "Remember 5%, Understand 25%, Apply 30%, Analyze 20%…"],
                ["Difficulty", "Easy 20%, Medium 60%, Hard 20%"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-40 flex-shrink-0">{k}</span>
                  <span className="text-sm text-slate-800 font-500">{v}</span>
                </div>
              ))}
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm text-indigo-700 mb-5">
              <strong>Ready to generate.</strong> The AI will create a question paper based on your configuration. You can review and edit the paper before finalizing.
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-7 pt-5 border-t border-slate-100">
          <button
            className="btn-secondary"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
          >
            <ArrowLeft size={16} /> Previous
          </button>
          {step < 7 ? (
            <button className="btn-primary" onClick={() => setStep((s) => s + 1)}>
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button className="btn-primary px-6" onClick={handleGenerate}>
              Generate Question Paper ✨
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
