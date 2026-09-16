import { useState } from "react";
import { ArrowLeft, Upload, Plus, Edit, Trash2, Search, FileText } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { subjects, syllabus, courseOutcomes, questions } from "../../data/mock";
import Badge from "../../components/ui/Badge";

const tabs = ["Overview", "Syllabus", "Course Outcomes", "Program Outcomes", "Question Bank", "Previous Papers", "Generate Paper", "Paper History"];

const blooms = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"];
const bloomColors = ["bg-slate-400","bg-blue-400","bg-green-400","bg-yellow-400","bg-orange-400","bg-red-400"];

function POMatrix() {
  const cos = ["CO1","CO2","CO3","CO4","CO5"];
  const pos = ["PO1","PO2","PO3","PO4","PO5","PO6"];
  const data: Record<string, number[]> = {
    CO1: [3,2,1,0,0,0], CO2: [2,3,2,1,0,0], CO3: [1,2,3,2,1,0],
    CO4: [0,1,2,3,2,1], CO5: [0,0,1,2,3,2],
  };
  const cellColor = (v: number) =>
    v === 3 ? "bg-indigo-600 text-white" : v === 2 ? "bg-indigo-200 text-indigo-800" : v === 1 ? "bg-indigo-50 text-indigo-600" : "bg-slate-50 text-slate-300";

  return (
    <div>
      <h3 className="font-display font-600 text-slate-900 mb-4">CO → PO Mapping Matrix</h3>
      <div className="overflow-x-auto">
        <table className="text-sm border-collapse">
          <thead>
            <tr>
              <th className="w-16 p-2 text-left text-xs text-slate-500">CO \ PO</th>
              {pos.map((p) => <th key={p} className="w-16 p-2 text-center text-xs text-slate-600 font-600">{p}</th>)}
            </tr>
          </thead>
          <tbody>
            {cos.map((co) => (
              <tr key={co}>
                <td className="p-2 font-600 text-xs text-slate-700">{co}</td>
                {data[co].map((v, i) => (
                  <td key={i} className="p-1">
                    <div className={`w-12 h-10 rounded-lg flex items-center justify-center font-700 text-sm ${cellColor(v)}`}>
                      {v === 0 ? "—" : v}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-4 mt-4">
        {[{v:3,l:"High"},{v:2,l:"Medium"},{v:1,l:"Low"},{v:0,l:"Not mapped"}].map(({v,l}) => (
          <div key={l} className="flex items-center gap-1.5">
            <div className={`w-5 h-5 rounded flex items-center justify-center text-xs font-600 ${cellColor(v)}`}>{v===0?"—":v}</div>
            <span className="text-xs text-slate-500">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SubjectWorkspace() {
  const { params, navigate } = useApp();
  const subject = subjects.find((s) => s.id === params.subjectId) ?? subjects[0];
  const [tab, setTab] = useState(0);
  const [qSearch, setQSearch] = useState("");

  const myQuestions = questions.filter((q) => q.subjectId === subject.id);
  const filteredQ = myQuestions.filter((q) => q.text.toLowerCase().includes(qSearch.toLowerCase()));

  return (
    <div className="p-6">
      <button className="btn-ghost mb-5 text-slate-500" onClick={() => navigate("faculty/subjects")}>
        <ArrowLeft size={16} /> Back to My Subjects
      </button>

      {/* Subject header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono-data text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg">{subject.courseCode}</span>
              <span className="text-sm text-slate-400">Semester {subject.semester}</span>
            </div>
            <h1 className="font-display text-2xl font-700 text-slate-900">{subject.name}</h1>
            <p className="text-slate-500 text-sm mt-1">{subject.department} · {subject.credits} Credits · {subject.subjectType}</p>
          </div>
          <button className="btn-primary" onClick={() => navigate("faculty/generate", { subjectId: subject.id })}>
            Generate Paper
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 mb-5">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`px-4 py-2 rounded-lg text-sm font-500 whitespace-nowrap transition-all flex-shrink-0 ${
              tab === i ? "bg-indigo-600 text-white shadow-sm" : "bg-white text-slate-500 hover:text-slate-700 border border-slate-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        {/* Overview */}
        {tab === 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Questions in Bank", value: myQuestions.length },
              { label: "Course Outcomes", value: courseOutcomes.length },
              { label: "Syllabus Units", value: syllabus.length },
              { label: "Previous Papers", value: 8 },
            ].map((s) => (
              <div key={s.label} className="bg-slate-50 rounded-xl p-4 text-center">
                <p className="font-display text-3xl font-700 text-indigo-600">{s.value}</p>
                <p className="text-sm text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Syllabus */}
        {tab === 1 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-600 text-slate-900">Syllabus</h2>
              <div className="flex gap-2">
                <button className="btn-secondary text-sm"><Upload size={14} /> Upload Syllabus</button>
                <button className="btn-secondary text-sm">View PDF</button>
              </div>
            </div>
            <div className="space-y-4">
              {syllabus.map((unit, i) => (
                <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-indigo-50 px-5 py-3 flex items-center gap-3">
                    <span className="font-mono-data text-xs font-600 text-indigo-600">{unit.unit}</span>
                    <span className="font-display font-600 text-slate-900">{unit.title}</span>
                  </div>
                  <ul className="p-4 space-y-1.5">
                    {unit.topics.map((t) => (
                      <li key={t} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Course Outcomes */}
        {tab === 2 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-600 text-slate-900">Course Outcomes</h2>
              <button className="btn-primary text-sm"><Plus size={14} /> Add CO</button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>CO Code</th>
                  <th>Description</th>
                  <th>Bloom Level</th>
                  <th>Topics</th>
                  <th>Questions</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {courseOutcomes.map((co) => (
                  <tr key={co.code}>
                    <td><span className="font-mono-data text-xs font-600 text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">{co.code}</span></td>
                    <td className="text-sm text-slate-700 max-w-xs">{co.description}</td>
                    <td><Badge variant="info" size="sm">{co.bloom}</Badge></td>
                    <td className="text-xs text-slate-500">{co.topics}</td>
                    <td className="font-mono-data text-sm text-slate-600">{co.questionCount}</td>
                    <td>
                      <div className="flex gap-1">
                        <button className="btn-ghost p-1.5"><Edit size={13} /></button>
                        <button className="btn-ghost p-1.5 text-red-500 hover:bg-red-50"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Program Outcomes */}
        {tab === 3 && <POMatrix />}

        {/* Question Bank */}
        {tab === 4 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-600 text-slate-900">Question Bank</h2>
              <button className="btn-primary text-sm"><Plus size={14} /> Add Question</button>
            </div>
            <div className="mb-4 relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="form-input pl-9" placeholder="Search questions..." value={qSearch} onChange={(e) => setQSearch(e.target.value)} />
            </div>
            <div className="space-y-3">
              {filteredQ.map((q) => (
                <div key={q.id} className="p-4 bg-slate-50 rounded-xl hover:bg-indigo-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm text-slate-800 flex-1">{q.text}</p>
                    <span className="text-xs font-mono-data text-slate-500 flex-shrink-0">{q.marks} M</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <Badge variant="default" size="sm">{q.unit}</Badge>
                    <Badge variant="purple" size="sm">{q.co}</Badge>
                    <Badge variant="info" size="sm">{q.po}</Badge>
                    <Badge variant="default" size="sm">{q.bloom}</Badge>
                    <Badge variant={q.difficulty === "Easy" ? "success" : q.difficulty === "Hard" ? "error" : "warning"} size="sm">{q.difficulty}</Badge>
                    <span className="text-xs text-slate-400">Used {q.usageCount}×</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Previous Papers / Paper History / Generate */}
        {(tab === 5 || tab === 7) && (
          <div className="text-center py-12 text-slate-400">
            <FileText size={40} className="mx-auto mb-3 opacity-30" />
            <p>No previous papers found for this subject.</p>
          </div>
        )}

        {tab === 6 && (
          <div className="text-center py-12">
            <p className="text-slate-500 mb-4">Ready to generate a new question paper for <strong>{subject.name}</strong>?</p>
            <button className="btn-primary" onClick={() => navigate("faculty/generate", { subjectId: subject.id })}>
              Launch Generation Wizard →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
