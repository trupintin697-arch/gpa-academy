"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { fetchMockTests, fetchTeacherVideos, publishTeacherTest, publishTeacherVideo, fetchTeacherSubmissions, } from "@/api/apiClient";
import { LayoutDashboard, PlusCircle, Award, Users, Video, Trash2, ChevronRight, CheckCircle2, Upload, Eye, Plus, FileText, ArrowRight, ShieldAlert, Save, Edit3, X, User } from "lucide-react";
const TABS = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={15}/> },
    { id: "builder", label: "Build Exam Paper", icon: <PlusCircle size={15}/> },
    { id: "tests", label: "My Tests", icon: <Award size={15}/> },
    { id: "students", label: "Students", icon: <Users size={15}/> },
    { id: "videos", label: "Assign Video", icon: <Video size={15}/> },
];
const SECTIONS = ["Quantitative Aptitude", "Reasoning Ability", "English Language", "General Awareness", "Current Affairs"];
const BATCHES = ["All Students", "Banking Batch (SBI/IBPS)", "SSC Super 50 Batch", "UPSC CSAT 2026 Batch", "Railway NTPC Batch"];
const SUBJECTS = ["Banking", "SSC", "UPSC CSAT", "Railway", "General"];
const blankQuestion = () => ({
    uid: `q_${Date.now()}_${Math.random()}`,
    section: SECTIONS[0],
    text: "",
    optionA: "", optionB: "", optionC: "", optionD: "",
    correct: 0,
    marks: 1,
    negativeMarks: 0.25,
    explanation: "",
    textHi: "",
    optionAHi: "", optionBHi: "", optionCHi: "", optionDHi: "",
    explanationHi: "",
});
export default function TeacherDashboard() {
    const { user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryTab = searchParams?.get("tab");
    const [tab, setTab] = useState("overview");

    useEffect(() => {
        if (queryTab && ["overview", "builder", "tests", "students", "videos"].includes(queryTab)) {
            setTab(queryTab);
        } else if (typeof window !== "undefined") {
            const hash = window.location.hash;
            if (hash === "#assign-video" || hash === "#videos") setTab("videos");
            else if (hash === "#create-test" || hash === "#builder") setTab("builder");
            else if (hash === "#student-results" || hash === "#students") setTab("students");
        }
    }, [queryTab]);

    const handleTabChange = (nextTab) => {
        setTab(nextTab);
        if (router) {
            router.push(nextTab === "overview" ? "/dashboard/teacher" : `/dashboard/teacher?tab=${nextTab}`);
        }
    };
    const [tests, setTests] = useState([]);
    const [videos, setVideos] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    // ── Paper Builder state ──
    const [step, setStep] = useState(1);
    const [testTitle, setTestTitle] = useState("");
    const [testSubject, setTestSubject] = useState(SUBJECTS[0]);
    const [testDuration, setTestDuration] = useState("120");
    const [testBatch, setTestBatch] = useState(BATCHES[0]);
    const [testSummary, setTestSummary] = useState("");
    const [passingPct, setPassingPct] = useState("35");
    const [questions, setQuestions] = useState([]);
    const [editingQ, setEditingQ] = useState(null);
    const [publishSuccess, setPublishSuccess] = useState(false);
    // ── Video form state ──
    const [videoTitle, setVideoTitle] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [videoBatch, setVideoBatch] = useState(BATCHES[0]);
    const [videoSuccess, setVideoSuccess] = useState(false);
    useEffect(() => {
        async function loadTeacherData() {
            const t = await fetchMockTests();
            setTests(t);
            const v = await fetchTeacherVideos();
            setVideos(v);
            const s = await fetchTeacherSubmissions();
            setSubmissions(s);
        }
        loadTeacherData();
    }, []);
    const totalMarks = questions.reduce((s, q) => s + q.marks, 0);
    // ── Publish test ──
    const handlePublish = async () => {
        if (!testTitle || questions.length === 0)
            return;
        const sectionMap = {};
        questions.forEach((q) => { sectionMap[q.section] = (sectionMap[q.section] ?? 0) + 1; });
        const sections = Object.entries(sectionMap).map(([name, count]) => ({
            id: `sec_${name.replace(/\s+/g, "_").toLowerCase()}`,
            name,
            questionsCount: count,
        }));
        const finalQuestions = questions.map((q, i) => {
            const optionsHiComplete = q.optionAHi.trim() && q.optionBHi.trim() && q.optionCHi.trim() && q.optionDHi.trim();
            return {
                id: i + 1,
                sectionId: `sec_${q.section.replace(/\s+/g, "_").toLowerCase()}`,
                sectionName: q.section,
                question: q.text,
                questionHi: q.textHi.trim() || undefined,
                options: [`A) ${q.optionA}`, `B) ${q.optionB}`, `C) ${q.optionC}`, `D) ${q.optionD}`],
                optionsHi: optionsHiComplete
                    ? [`A) ${q.optionAHi}`, `B) ${q.optionBHi}`, `C) ${q.optionCHi}`, `D) ${q.optionDHi}`]
                    : undefined,
                correctAnswer: q.correct,
                explanation: q.explanation,
                explanationHi: q.explanationHi.trim() || undefined,
            };
        });
        const newTest = {
            id: `test_${Date.now()}`,
            title: testTitle,
            subject: testSubject,
            duration: parseInt(testDuration),
            totalMarks,
            totalQuestions: questions.length,
            summary: testSummary || `${questions.length}-question ${testSubject} exam paper. ${testDuration}-minute timed test.`,
            instructions: [
                "Read all questions carefully before answering.",
                `Each question carries ${questions[0]?.marks ?? 1} mark(s). Negative marking of ${questions[0]?.negativeMarks ?? 0.25} marks for wrong answers.`,
                `Passing marks: ${Math.ceil(totalMarks * parseInt(passingPct) / 100)} / ${totalMarks} (${passingPct}%)`,
                "Do not switch tabs — violations are recorded.",
                "Camera monitoring is active throughout the exam.",
            ],
            sections,
            questions: finalQuestions,
            batch: testBatch,
            createdBy: user?.id ?? "tch_1",
            submissions: 0,
            avgScore: "Pending",
            violationsDetected: 0,
            publishedAt: new Date().toISOString(),
        };
        await publishTeacherTest(newTest);
        setTests((prev) => [newTest, ...prev.filter((t) => t.id !== newTest.id)]);
        setPublishSuccess(true);
        setStep(1);
        setTestTitle("");
        setTestSummary("");
        setTestSubject(SUBJECTS[0]);
        setTestDuration("120");
        setTestBatch(BATCHES[0]);
        setQuestions([]);
        setTimeout(() => setPublishSuccess(false), 6000);
    };
    // ── Add / save question ──
    const saveQuestion = (q) => {
        if (!q.text || !q.optionA || !q.optionB || !q.optionC || !q.optionD)
            return;
        setQuestions((prev) => {
            const idx = prev.findIndex((p) => p.uid === q.uid);
            if (idx >= 0) {
                const n = [...prev];
                n[idx] = q;
                return n;
            }
            return [...prev, q];
        });
        setEditingQ(null);
    };
    // ── Assign video ──
    const handleAssignVideo = async (e) => {
        e.preventDefault();
        if (!videoTitle || !videoUrl)
            return;
        const v = {
            id: `vid_${Date.now()}`,
            title: videoTitle,
            youtubeUrl: videoUrl,
            batch: videoBatch,
            createdBy: user?.id ?? "tch_1",
            views: 0,
            publishedAt: new Date().toISOString(),
        };
        await publishTeacherVideo(v);
        setVideos((prev) => [v, ...prev.filter((item) => item.id !== v.id)]);
        setVideoTitle("");
        setVideoUrl("");
        setVideoSuccess(true);
        setTimeout(() => setVideoSuccess(false), 4000);
    };
    const totalSubmissions = tests.reduce((s, t) => s + t.submissions, 0);
    const totalViolations = tests.reduce((s, t) => s + t.violationsDetected, 0);
    return (<div className="max-w-6xl mx-auto pb-14 space-y-0">
      {/* Tab Nav */}
      <div className="sticky top-0 z-20 bg-slate-50 dark:bg-slate-950 pt-1 pb-3 border-b border-slate-200 dark:border-slate-800 mb-6">
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (<button key={t.id} onClick={() => handleTabChange(t.id)} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${tab === t.id
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
              {t.icon} {t.label}
              {t.id === "builder" && (<span className="ml-1 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-black">NEW</span>)}
            </button>))}
        </div>
      </div>

      {/* ════════ OVERVIEW ════════ */}
      {tab === "overview" && (<div className="space-y-6">
          {/* Header Banner */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-800 text-white p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none"/>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-600 to-slate-800 flex items-center justify-center font-black text-xl shadow-lg border-2 border-white/20 shrink-0">
                {user?.avatar
                ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover"/>
                : user?.name?.slice(0, 2).toUpperCase() ?? "TC"}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Faculty Portal</p>
                <h1 className="text-xl md:text-2xl font-black text-white">{user?.name || "Dr. Rajesh Kumar"}</h1>
                <p className="text-xs text-slate-400 mt-0.5">Gyan Prapti Academy — Instructor</p>
              </div>
              <Link href="/dashboard/teacher/profile" className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20">
                <User size={13}/> My Profile
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 relative z-10">
              <button onClick={() => handleTabChange("builder")} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-lg shadow-emerald-600/30">
                <PlusCircle size={13}/> Build Exam Paper
              </button>
              <button onClick={() => handleTabChange("videos")} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20">
                <Video size={13}/> Assign Video Lecture
              </button>
            </div>
          </div>

          {/* KPI */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
                { label: "Total Tests Published", value: tests.length, sub: "Active on platform", icon: <Award size={16} className="text-emerald-500"/>, border: "border-l-emerald-500" },
                { label: "Videos Assigned", value: videos.length, sub: "YouTube lectures", icon: <Video size={16} className="text-blue-500"/>, border: "border-l-blue-500" },
                { label: "Total Submissions", value: totalSubmissions, sub: "Test attempts received", icon: <Users size={16} className="text-purple-500"/>, border: "border-l-purple-500" },
                { label: "Violations Flagged", value: totalViolations, sub: "Tab-switch alerts", icon: <ShieldAlert size={16} className="text-red-500"/>, border: "border-l-red-500" },
            ].map((s, i) => (<div key={i} className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 ${s.border} p-4 shadow-sm`}>
                <div className="flex items-center justify-between mb-2">{s.icon}<span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{s.label}</span></div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">{s.value}</div>
                <div className="text-[11px] font-semibold text-slate-500 mt-0.5">{s.sub}</div>
              </div>))}
          </div>

          {/* Recent Tests */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-black text-slate-900 dark:text-white">Recent Published Tests</h2>
              <button onClick={() => handleTabChange("tests")} className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">All Tests <ChevronRight size={13}/></button>
            </div>
            <div className="space-y-2">
              {tests.slice(0, 3).map((t) => (<div key={t.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0"><FileText size={16} className="text-emerald-600 dark:text-emerald-400"/></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{t.title}</p>
                    <p className="text-[11px] text-slate-500">{t.totalQuestions} Qs · {t.duration}m · {t.batch}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-slate-900 dark:text-white">{t.submissions}</div>
                    <div className="text-[10px] text-slate-400">submissions</div>
                  </div>
                </div>))}
              {tests.length === 0 && (<div className="rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center">
                  <FileText size={32} className="mx-auto text-slate-300 dark:text-slate-600 mb-2"/>
                  <p className="text-sm font-bold text-slate-500">No tests published yet</p>
                  <button onClick={() => handleTabChange("builder")} className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition">
                    <PlusCircle size={12}/> Build First Exam
                  </button>
                </div>)}
            </div>
          </div>
        </div>)}

      {/* ════════ PAPER BUILDER ════════ */}
      {tab === "builder" && (<div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Exam Paper Builder</h2>
              <p className="text-xs text-slate-500 mt-0.5">Create MCQ exam papers and publish for students</p>
            </div>
          </div>

          {publishSuccess && (<div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-3">
              <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0"/>
              <div>
                <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Exam paper published successfully!</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">Students can now attempt it from their dashboard.</p>
              </div>
            </div>)}

          {/* Step indicator */}
          <div className="flex items-center gap-2">
            {[
                { n: 1, label: "Test Config" },
                { n: 2, label: "Add Questions" },
                { n: 3, label: "Preview & Publish" },
            ].map((s, i) => (<div key={s.n} className="flex items-center gap-2">
                <button onClick={() => { if (step > s.n || (s.n === 2 && testTitle))
                setStep(s.n); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${step === s.n ? "bg-emerald-600 text-white" : step > s.n ? "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}>
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${step === s.n ? "bg-white text-emerald-700" : step > s.n ? "bg-emerald-600 text-white" : "bg-slate-300 text-white"}`}>{s.n}</span>
                  {s.label}
                </button>
                {i < 2 && <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 shrink-0"/>}
              </div>))}
          </div>

          {/* ── STEP 1: Test Config ── */}
          {step === 1 && (<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-5">
              <h3 className="text-sm font-black text-slate-900 dark:text-white">Step 1 — Test Configuration</h3>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">Test Title *</label>
                <input value={testTitle} onChange={(e) => setTestTitle(e.target.value)} placeholder="e.g. SBI PO Prelims Mock Test 01 — 2026" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 dark:focus:bg-slate-900 transition"/>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">Subject / Category *</label>
                  <select value={testSubject} onChange={(e) => setTestSubject(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition">
                    {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">Duration (minutes) *</label>
                  <select value={testDuration} onChange={(e) => setTestDuration(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition">
                    {["30", "45", "60", "90", "120", "150", "180"].map((d) => <option key={d} value={d}>{d} minutes</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">Assign to Batch *</label>
                  <select value={testBatch} onChange={(e) => setTestBatch(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition">
                    {BATCHES.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">Passing Percentage</label>
                  <select value={passingPct} onChange={(e) => setPassingPct(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition">
                    {["25", "33", "35", "40", "45", "50"].map((p) => <option key={p}>{p}%</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">Test Description / Summary</label>
                <textarea value={testSummary} onChange={(e) => setTestSummary(e.target.value)} rows={3} placeholder="Brief description shown to students before the exam..." className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition resize-none"/>
              </div>

              <button onClick={() => { if (testTitle)
                setStep(2); }} disabled={!testTitle} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold transition">
                Next: Add Questions <ChevronRight size={15}/>
              </button>
            </div>)}

          {/* ── STEP 2: Question Builder ── */}
          {step === 2 && (<div className="space-y-4">
              {/* Progress bar */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 flex flex-wrap gap-4 items-center shadow-sm">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{testTitle}</p>
                  <p className="text-[11px] text-slate-500">{testSubject} · {testDuration}m · {testBatch}</p>
                </div>
                <div className="flex gap-3">
                  <div className="text-center">
                    <div className="text-lg font-black text-slate-900 dark:text-white">{questions.length}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Questions</div>
                  </div>
                  <div className="w-px bg-slate-200 dark:bg-slate-700"/>
                  <div className="text-center">
                    <div className="text-lg font-black text-slate-900 dark:text-white">{totalMarks}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Total Marks</div>
                  </div>
                </div>
              </div>

              {/* Question form */}
              {editingQ && (<div className="bg-white dark:bg-slate-900 rounded-2xl border border-emerald-200 dark:border-emerald-500/30 p-5 shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">
                      {questions.find((q) => q.uid === editingQ.uid) ? "Edit Question" : "Add Question"}
                    </h3>
                    <button onClick={() => setEditingQ(null)} className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition"><X size={14}/></button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">Section</label>
                      <select value={editingQ.section} onChange={(e) => setEditingQ({ ...editingQ, section: e.target.value })} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition">
                        {SECTIONS.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">+Marks</label>
                        <input type="number" min={1} max={10} value={editingQ.marks} onChange={(e) => setEditingQ({ ...editingQ, marks: Number(e.target.value) })} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition"/>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">−Marks</label>
                        <input type="number" min={0} max={5} step={0.25} value={editingQ.negativeMarks} onChange={(e) => setEditingQ({ ...editingQ, negativeMarks: Number(e.target.value) })} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition"/>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">Question Text *</label>
                    <textarea value={editingQ.text} onChange={(e) => setEditingQ({ ...editingQ, text: e.target.value })} rows={3} placeholder="Type the question here..." className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition resize-none"/>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {["A", "B", "C", "D"].map((letter, idx) => {
                        const field = `option${letter}`;
                        const isCorrect = editingQ.correct === idx;
                        return (<div key={letter} className={`relative rounded-xl border-2 transition ${isCorrect ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : "border-slate-200 dark:border-slate-700"}`}>
                          <button type="button" onClick={() => setEditingQ({ ...editingQ, correct: idx })} className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition ${isCorrect ? "bg-emerald-600 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-400"}`}>{letter}</button>
                          <input value={editingQ[field]} onChange={(e) => setEditingQ({ ...editingQ, [field]: e.target.value })} placeholder={`Option ${letter}...`} className="w-full bg-transparent px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none pr-8"/>
                        </div>);
                    })}
                  </div>
                  <p className="text-[11px] text-slate-400 -mt-1">Click the letter button to mark the correct answer</p>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">Explanation (optional)</label>
                    <input value={editingQ.explanation} onChange={(e) => setEditingQ({ ...editingQ, explanation: e.target.value })} placeholder="Solution hint shown after test..." className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition"/>
                  </div>

                  {/* Hindi translation — optional. Leave blank and Hindi-medium students just see the English text. */}
                  <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-700 space-y-4">
                    <p className="flex items-center gap-1.5 text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                      हिंदी अनुवाद (Hindi Translation) — Optional
                    </p>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">प्रश्न (Question in Hindi)</label>
                      <textarea value={editingQ.textHi} onChange={(e) => setEditingQ({ ...editingQ, textHi: e.target.value })} rows={3} placeholder="यहाँ प्रश्न हिंदी में लिखें..." className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-white outline-none focus:border-orange-500 transition resize-none"/>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {["A", "B", "C", "D"].map((letter) => {
                        const field = `option${letter}Hi`;
                        return (<div key={letter} className="rounded-xl border border-slate-200 dark:border-slate-700">
                            <input value={editingQ[field]} onChange={(e) => setEditingQ({ ...editingQ, [field]: e.target.value })} placeholder={`विकल्प ${letter}...`} className="w-full bg-transparent px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none"/>
                          </div>);
                    })}
                    </div>
                    <p className="text-[11px] text-slate-400 -mt-1">Correct answer stays whichever letter you marked above — fill in all four to enable the Hindi toggle for this question.</p>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">व्याख्या (Explanation in Hindi, optional)</label>
                      <input value={editingQ.explanationHi} onChange={(e) => setEditingQ({ ...editingQ, explanationHi: e.target.value })} placeholder="हिंदी में समाधान..." className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-orange-500 transition"/>
                    </div>
                  </div>

                  <button onClick={() => saveQuestion(editingQ)} disabled={!editingQ.text || !editingQ.optionA || !editingQ.optionB || !editingQ.optionC || !editingQ.optionD} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold transition">
                    <Save size={14}/> Save Question
                  </button>
                </div>)}

              {/* Add Question button */}
              {!editingQ && (<button onClick={() => setEditingQ(blankQuestion())} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-400 text-sm font-bold hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:border-emerald-500 transition">
                  <Plus size={16}/> Add Question
                </button>)}

              {/* Questions list */}
              {questions.length > 0 && (<div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Added Questions ({questions.length})</h3>
                  {questions.map((q, i) => (<div key={q.uid} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-3.5 flex items-start gap-3 shadow-sm">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-xs font-black shrink-0">{i + 1}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">{q.text}</p>
                        <div className="flex gap-1.5 mt-1.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">{q.section}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">+{q.marks} / -{q.negativeMarks}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400">Ans: {["A", "B", "C", "D"][q.correct]}</span>
                          {q.textHi.trim() && (q.optionAHi.trim() && q.optionBHi.trim() && q.optionCHi.trim() && q.optionDHi.trim()) && (<span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400">हिं Available</span>)}
                        </div>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button onClick={() => setEditingQ({ ...q })} className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition"><Edit3 size={12}/></button>
                        <button onClick={() => setQuestions((prev) => prev.filter((p) => p.uid !== q.uid))} className="p-1.5 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 transition"><Trash2 size={12}/></button>
                      </div>
                    </div>))}
                </div>)}

              {questions.length > 0 && !editingQ && (<button onClick={() => setStep(3)} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition">
                  Preview & Publish <ChevronRight size={15}/>
                </button>)}
            </div>)}

          {/* ── STEP 3: Preview & Publish ── */}
          {step === 3 && (<div className="space-y-4">
              {/* Summary card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">Exam Paper Summary</h3>
                  <button onClick={() => setStep(2)} className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline"><Edit3 size={12}/> Edit</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Title", val: testTitle },
                    { label: "Subject", val: testSubject },
                    { label: "Duration", val: `${testDuration} mins` },
                    { label: "Batch", val: testBatch },
                    { label: "Questions", val: questions.length },
                    { label: "Total Marks", val: totalMarks },
                    { label: "Passing Marks", val: `${Math.ceil(totalMarks * parseInt(passingPct) / 100)} (${passingPct}%)` },
                    { label: "Sections", val: [...new Set(questions.map((q) => q.section))].length },
                ].map((s) => (<div key={s.label} className="rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">{s.label}</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{s.val}</div>
                    </div>))}
                </div>
              </div>

              {/* Question preview */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">Question Preview ({questions.length} questions)</h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto">
                  {questions.map((q, i) => (<div key={q.uid} className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[11px] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{q.text}</p>
                          <div className="grid grid-cols-2 gap-1.5 mt-2">
                            {[q.optionA, q.optionB, q.optionC, q.optionD].map((opt, oi) => (<div key={oi} className={`text-[10px] px-2 py-1 rounded-lg font-medium ${oi === q.correct ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold" : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}>
                                {["A", "B", "C", "D"][oi]}) {opt}
                              </div>))}
                          </div>
                        </div>
                      </div>
                    </div>))}
                </div>
              </div>

              <button onClick={handlePublish} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-bold transition shadow-lg shadow-emerald-600/25">
                <Upload size={15}/> Publish Exam Paper to {testBatch}
              </button>
            </div>)}
        </div>)}

      {/* ════════ MY TESTS ════════ */}
      {tab === "tests" && (<div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Published Tests</h2>
              <p className="text-xs text-slate-500 mt-0.5">{tests.length} active on platform</p>
            </div>
            <button onClick={() => { handleTabChange("builder"); setStep(1); }} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition">
              <PlusCircle size={13}/> New Exam
            </button>
          </div>

          {tests.length === 0 ? (<div className="rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
              <FileText size={36} className="mx-auto text-slate-300 dark:text-slate-600 mb-3"/>
              <p className="text-sm font-bold text-slate-500">No tests published yet</p>
            </div>) : (<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      {["#", "Title", "Subject", "Duration", "Qs", "Marks", "Batch", "Submissions", "Avg Score", "Violations", ""].map((h) => (<th key={h} className="px-3 py-3 text-left font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {tests.map((t, i) => (<tr key={t.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition">
                        <td className="px-3 py-3 font-black text-slate-400">{i + 1}</td>
                        <td className="px-3 py-3 font-bold text-slate-900 dark:text-white max-w-[180px] truncate">{t.title}</td>
                        <td className="px-3 py-3 text-slate-500">{t.subject}</td>
                        <td className="px-3 py-3 text-slate-500 whitespace-nowrap">{t.duration}m</td>
                        <td className="px-3 py-3 font-semibold text-slate-700 dark:text-slate-300">{t.totalQuestions}</td>
                        <td className="px-3 py-3 font-semibold text-slate-700 dark:text-slate-300">{t.totalMarks}</td>
                        <td className="px-3 py-3 text-slate-500 whitespace-nowrap max-w-[100px] truncate">{t.batch}</td>
                        <td className="px-3 py-3 font-bold text-emerald-700 dark:text-emerald-400">{t.submissions}</td>
                        <td className="px-3 py-3 font-bold text-slate-700 dark:text-slate-300">{t.avgScore}</td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-0.5 rounded-full font-bold ${t.violationsDetected > 0 ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400" : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"}`}>
                            {t.violationsDetected}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <Link href={`/mock-tests/${t.id}/take`} target="_blank" className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold transition whitespace-nowrap">
                            Preview <Eye size={10}/>
                          </Link>
                        </td>
                      </tr>))}
                  </tbody>
                </table>
              </div>
            </div>)}
        </div>)}

      {/* ════════ STUDENTS ════════ */}
      {tab === "students" && (<div className="space-y-5">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Student Performance</h2>
            <p className="text-xs text-slate-500 mt-0.5">Across all published tests · {totalSubmissions} total attempts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tests.slice(0, 6).map((t) => (<div key={t.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{t.title}</h3>
                    <p className="text-[11px] text-slate-500">{t.totalQuestions} Qs · {t.duration}m · {t.subject}</p>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">{t.batch}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800 py-2">
                    <div className="text-base font-black text-slate-900 dark:text-white">{t.submissions}</div>
                    <div className="text-[9px] text-slate-400 uppercase font-bold">Attempts</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800 py-2">
                    <div className="text-base font-black text-slate-900 dark:text-white">{t.avgScore}</div>
                    <div className="text-[9px] text-slate-400 uppercase font-bold">Avg Score</div>
                  </div>
                  <div className={`rounded-xl py-2 ${t.violationsDetected > 0 ? "bg-red-50 dark:bg-red-500/10" : "bg-emerald-50 dark:bg-emerald-500/10"}`}>
                    <div className={`text-base font-black ${t.violationsDetected > 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`}>{t.violationsDetected}</div>
                    <div className="text-[9px] text-slate-400 uppercase font-bold">Violations</div>
                  </div>
                </div>
              </div>))}
          </div>

          {/* Detailed Candidate Submissions & Proctoring Violations */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden mt-6">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldAlert size={15} className="text-red-500"/>
                  Candidate Attempts & AI Proctoring Audit Log
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Live submission records with automated tab-switch flags</p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {submissions.length} Submissions Logged
              </span>
            </div>

            {submissions.length === 0 ? (<div className="p-8 text-center text-xs text-slate-400">
                No exam submissions recorded yet. Once students submit their CBT exams, their records and webcam/tab violation flags will appear here.
              </div>) : (<div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      {["Candidate", "Exam Title", "Score", "Accuracy", "Time Spent", "Submitted", "AI Proctor Integrity"].map((h) => (<th key={h} className="px-3 py-3 text-left font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {submissions.map((sub, idx) => (<tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition">
                        <td className="px-3 py-3">
                          <div className="font-bold text-slate-900 dark:text-white">{sub.candidateName || "Aspirant"}</div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[140px]">{sub.candidateEmail || "student@gpaacademy.in"}</div>
                        </td>
                        <td className="px-3 py-3 font-semibold text-slate-800 dark:text-slate-200 max-w-[160px] truncate">
                          {sub.testTitle}
                        </td>
                        <td className="px-3 py-3 font-black text-emerald-600 dark:text-emerald-400">
                          {sub.score} <span className="text-[10px] text-slate-400">/{sub.totalMarks}</span>
                        </td>
                        <td className="px-3 py-3 font-bold text-slate-700 dark:text-slate-300">
                          {sub.accuracy}%
                        </td>
                        <td className="px-3 py-3 text-slate-500 whitespace-nowrap">
                          {Math.floor((sub.timeSpent || 0) / 60)}m {((sub.timeSpent || 0) % 60)}s
                        </td>
                        <td className="px-3 py-3 text-slate-500 whitespace-nowrap">
                          {new Date(sub.submittedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          {(sub.violations || 0) > 0 ? (<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-500/30">
                              <ShieldAlert size={12}/> {sub.violations} Tab Violation(s)
                            </span>) : (<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                              <CheckCircle2 size={12}/> 100% Clean Proctor
                            </span>)}
                        </td>
                      </tr>))}
                  </tbody>
                </table>
              </div>)}
          </div>

          {tests.length === 0 && (<div className="rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
              <Users size={36} className="mx-auto text-slate-300 dark:text-slate-600 mb-3"/>
              <p className="text-sm font-bold text-slate-500">No data yet</p>
              <p className="text-xs text-slate-400 mt-1">Publish tests first to see student performance.</p>
            </div>)}
        </div>)}

      {/* ════════ ASSIGN VIDEO ════════ */}
      {tab === "videos" && (<div className="space-y-5">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Assign Video Lectures</h2>
            <p className="text-xs text-slate-500 mt-0.5">Link YouTube videos from GPA channel to student batches</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider"><Video size={14}/> Assign New Lecture</div>

              {videoSuccess && (<div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 size={14}/> Video assigned! Students can now view it.
                </div>)}

              <form onSubmit={handleAssignVideo} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">Lecture Title *</label>
                  <input value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} required placeholder="e.g. Lec 05 — Vedic Math Fast Division" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-red-500 transition"/>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">YouTube URL *</label>
                  <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} required type="url" placeholder="https://www.youtube.com/watch?v=..." className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-red-500 transition"/>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">Assign to Batch</label>
                  <select value={videoBatch} onChange={(e) => setVideoBatch(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-red-500 transition">
                    {BATCHES.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white text-sm font-bold transition shadow-md shadow-red-500/20">
                  <Upload size={14}/> Assign to Students
                </button>
              </form>
            </div>

            {/* Videos list */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 dark:text-white mb-3">Assigned Videos ({videos.length})</h3>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {videos.length === 0 ? (<div className="text-center py-8">
                    <Video size={28} className="mx-auto text-slate-300 dark:text-slate-600 mb-2"/>
                    <p className="text-xs text-slate-400">No videos assigned yet</p>
                  </div>) : videos.map((v) => (<div key={v.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center shrink-0">
                      <Video size={14} className="text-red-600 dark:text-red-400"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{v.title}</p>
                      <p className="text-[10px] text-slate-400">{v.batch} · {v.views} views</p>
                    </div>
                    <a href={v.youtubeUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-500 hover:text-red-600 transition">
                      <ArrowRight size={12}/>
                    </a>
                  </div>))}
              </div>
            </div>
          </div>
        </div>)}
    </div>);
}
