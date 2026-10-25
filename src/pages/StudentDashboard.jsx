"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getAttemptHistory, getProfileExtra, touchStreak, hasOpenedResources, markResourcesOpened, } from "@/utils/content-store";
import { computeTalentIndex } from "@/utils/talentIndex";
import { fetchEnrollments, fetchMockTests, fetchNotes } from "@/api/apiClient";
import { mockCourses, freeNotes } from "@/data/mock-data";
import { LayoutDashboard, BookOpen, Award, BarChart3, FileText, Play, CheckCircle2, ArrowRight, User, Download, ShieldAlert, Video, Flame, Target, Star, TrendingUp, ChevronRight, Lock, Unlock, Gauge, Trophy } from "lucide-react";
const TABS = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={15}/> },
    { id: "tests", label: "My Tests", icon: <Award size={15}/> },
    { id: "courses", label: "My Courses", icon: <BookOpen size={15}/> },
    { id: "performance", label: "Performance", icon: <BarChart3 size={15}/> },
    { id: "resources", label: "Resources", icon: <FileText size={15}/> },
];
const SUBJECT_COLORS = {
    "Quantitative Aptitude": "bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400",
    "Reasoning Ability": "bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-400",
    "English Language": "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    "General Awareness": "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400",
    "Banking": "bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400",
    "SSC": "bg-orange-100 dark:bg-orange-500/15 text-orange-700 dark:text-orange-400",
};
function subjectBadge(sub) {
    return SUBJECT_COLORS[sub] ?? "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300";
}
export default function StudentDashboard() {
    const { user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryTab = searchParams?.get("tab");
    const [tab, setTab] = useState("overview");

    useEffect(() => {
        if (queryTab && ["overview", "tests", "courses", "performance", "resources"].includes(queryTab)) {
            setTab(queryTab);
        } else if (typeof window !== "undefined") {
            const hash = window.location.hash;
            if (hash === "#tests") setTab("tests");
            else if (hash === "#courses") setTab("courses");
            else if (hash === "#performance") setTab("performance");
            else if (hash === "#resources") setTab("resources");
        }
    }, [queryTab]);
    const [tests, setTests] = useState([]);
    const [history, setHistory] = useState([]);
    const [extra, setExtra] = useState({});
    const [enrolledCourses, setEnrolledCourses] = useState([...mockCourses]);
    const [notesList, setNotesList] = useState([...freeNotes]);
    const [streak, setStreak] = useState({ current: 0, longest: 0, lastActiveDay: null });
    const [resourcesOpened, setResourcesOpened] = useState(false);
    useEffect(() => {
        async function loadData() {
            // 1. Fetch live tests (server + store)
            const t = await fetchMockTests();
            setTests(t);
            // 2. Fetch notes
            const n = await fetchNotes();
            setNotesList(n);
            // 3. User attempts & profile
            if (user) {
                setHistory(getAttemptHistory(user.id));
                setExtra(getProfileExtra(user.id));
                setStreak(touchStreak(user.id));
                setResourcesOpened(hasOpenedResources(user.id));
                try {
                    const apiEnr = await fetchEnrollments(user.id);
                    const localStored = localStorage.getItem("gpa_enrolled_courses");
                    const localList = localStored ? JSON.parse(localStored) : [];
                    const combined = [...mockCourses];
                    localList.forEach((courseId) => {
                        const extraCourse = mockCourses.find((c) => c.id === courseId || c.slug === courseId);
                        if (extraCourse && !combined.some((c) => c.id === extraCourse.id)) {
                            combined.unshift(extraCourse);
                        }
                    });
                    setEnrolledCourses(combined);
                }
                catch (e) {
                    console.warn("Failed to load user enrollments:", e);
                }
            }
        }
        loadData();
    }, [user]);
    const completedIds = new Set(history.map((h) => h.testId));
    const pendingTests = tests.filter((t) => !completedIds.has(t.id));
    const avgScore = history.length
        ? Math.round(history.reduce((s, h) => s + h.accuracy, 0) / history.length)
        : 0;
    const profileInitials = user?.name?.slice(0, 2).toUpperCase() ?? "ST";
    const talentIndex = computeTalentIndex({
        history,
        enrolledCourses,
        resourcesOpened,
        streak: streak.current,
        profileExtra: extra,
    });
    function classAverageFor(testId) {
        const test = tests.find((t) => t.id === testId);
        const parsed = test ? parseFloat(test.avgScore) : NaN;
        if (Number.isNaN(parsed) || !test)
            return null;
        return { value: parsed, totalMarks: test.totalMarks };
    }
    const rankRows = history
        .map((h) => {
        const classAvg = classAverageFor(h.testId);
        if (!classAvg)
            return null;
        const classAccuracy = Math.round((classAvg.value / classAvg.totalMarks) * 100);
        return { testId: h.testId, title: h.testTitle, yourAccuracy: h.accuracy, classAccuracy, delta: h.accuracy - classAccuracy };
    })
        .filter(Boolean);
    const avgDelta = rankRows.length ? Math.round(rankRows.reduce((s, r) => s + r.delta, 0) / rankRows.length) : null;
    const classStanding = avgDelta === null
        ? { label: "—" }
        : avgDelta > 15
            ? { label: "Top Performer" }
            : avgDelta > 0
                ? { label: "Above Avg" }
                : avgDelta === 0
                    ? { label: "On Par" }
                    : { label: "Needs Focus" };
    function handleTabChange(nextTab) {
        setTab(nextTab);
        if (router) {
            router.push(nextTab === "overview" ? "/dashboard/student" : `/dashboard/student?tab=${nextTab}`);
        }
        if (nextTab === "resources" && user && !resourcesOpened) {
            markResourcesOpened(user.id);
            setResourcesOpened(true);
        }
    }
    return (<div className="max-w-6xl mx-auto pb-14 space-y-0">
      {/* ── Tab Navigation ── */}
      <div className="sticky top-0 z-20 bg-slate-50 dark:bg-slate-950 pt-1 pb-3 border-b border-slate-200 dark:border-slate-800 mb-6">
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (<button key={t.id} onClick={() => handleTabChange(t.id)} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${tab === t.id
                ? "bg-red-600 text-white shadow-md shadow-red-600/25"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
              {t.icon} {t.label}
            </button>))}
        </div>
      </div>

      {/* ════════ OVERVIEW TAB ════════ */}
      {tab === "overview" && (<div className="space-y-6">
          {/* Welcome Hero */}
          <div className="rounded-2xl bg-gradient-to-br from-[#00154D] via-slate-900 to-slate-800 text-white p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"/>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-br from-red-600 to-[#00154D] flex items-center justify-center font-black text-xl shadow-lg border-2 border-white/20 shrink-0">
                {user?.avatar
                ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover"/>
                : profileInitials}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Student Portal</p>
                <h1 className="text-xl md:text-2xl font-black text-white">Welcome back, {user?.name?.split(" ")[0] || "Aspirant"}!</h1>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {extra.targetExam && (<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-[10px] font-bold uppercase tracking-wider">
                      <Target size={10}/> {extra.targetExam}
                    </span>)}
                  {extra.batch && (<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-[10px] font-bold">
                      {extra.batch}
                    </span>)}
                  {streak.current > 0 && (<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                      <Flame size={10}/> {streak.current} Day Streak
                    </span>)}
                </div>
              </div>
              <Link href="/dashboard/student/profile" className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20">
                <User size={13}/> Edit Profile
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 relative z-10">
              <Link href="/mock-tests" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-lg shadow-red-600/30">
                <Award size={13}/> Start Proctored Test
              </Link>
              <Link href="/courses" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20">
                <Play size={13}/> Continue Learning
              </Link>
            </div>
          </div>

          {/* Talent Index */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-5">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 shrink-0">
                <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
                  <circle cx="40" cy="40" r="34" fill="none" strokeWidth="8" className="stroke-slate-100 dark:stroke-slate-800"/>
                  <circle cx="40" cy="40" r="34" fill="none" strokeWidth="8" strokeLinecap="round" className={talentIndex.tier.ring} strokeDasharray={`${(talentIndex.total / 100) * 213.6} 213.6`}/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-slate-900 dark:text-white">{talentIndex.total}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">/ 100</span>
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1"><Gauge size={11}/> Talent Index</p>
                <span className={`inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full text-xs font-black ${talentIndex.tier.bg} ${talentIndex.tier.color}`}>
                  <Trophy size={11}/> {talentIndex.tier.label}
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">Reflects your test accuracy, course progress, streak, and profile completeness.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              {talentIndex.breakdown.map((b) => (<div key={b.label}>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">{b.label}</span>
                    <span className="text-xs font-black text-slate-900 dark:text-white">{b.score}<span className="text-[9px] text-slate-400 font-bold">/{b.max}</span></span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-rose-400" style={{ width: `${(b.score / b.max) * 100}%` }}/>
                  </div>
                </div>))}
            </div>
          </div>

          {/* KPI Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
                { label: "Enrolled Courses", value: mockCourses.length, sub: "Active learning", icon: <BookOpen size={16} className="text-blue-500"/>, color: "border-l-blue-500" },
                { label: "Tests Assigned", value: tests.length, sub: `${pendingTests.length} pending`, icon: <Award size={16} className="text-red-500"/>, color: "border-l-red-500" },
                { label: "Tests Completed", value: history.length, sub: history.length > 0 ? "Keep it up!" : "Attempt one now", icon: <CheckCircle2 size={16} className="text-emerald-500"/>, color: "border-l-emerald-500" },
                { label: "Avg Accuracy", value: `${avgScore}%`, sub: avgScore >= 75 ? "Excellent!" : avgScore >= 50 ? "Good effort" : "Needs focus", icon: <TrendingUp size={16} className="text-amber-500"/>, color: "border-l-amber-500" },
            ].map((s, i) => (<div key={i} className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 ${s.color} p-4 shadow-sm`}>
                <div className="flex items-center justify-between mb-2">{s.icon}<span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{s.label}</span></div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">{s.value}</div>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{s.sub}</div>
              </div>))}
          </div>

          {/* Upcoming Tests */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block"></span> Upcoming Tests
              </h2>
              <button onClick={() => handleTabChange("tests")} className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1">
                View All <ChevronRight size={13}/>
              </button>
            </div>
            {pendingTests.length === 0 ? (<div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 text-center">
                <CheckCircle2 size={32} className="mx-auto text-emerald-500 mb-2"/>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">All tests completed!</p>
                <p className="text-xs text-slate-500 mt-1">Check back later for new tests from your teacher.</p>
              </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingTests.slice(0, 2).map((test) => (<div key={test.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:border-red-300 dark:hover:border-red-500/30 transition">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${subjectBadge(test.subject)}`}>{test.subject}</span>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1.5 line-clamp-2">{test.title}</h3>
                      </div>
                      <div className="shrink-0 text-center bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl px-3 py-2">
                        <div className="text-sm font-black text-red-600 dark:text-red-400">{test.duration}</div>
                        <div className="text-[9px] font-bold text-red-400 uppercase">mins</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400">{test.totalQuestions} Questions</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400">{test.totalMarks} Marks</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center gap-1"><ShieldAlert size={9}/> Proctored</span>
                    </div>
                    <Link href={`/mock-tests/${test.id}/take`} className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 text-white text-xs font-bold transition hover:from-red-700 hover:to-rose-600 shadow-sm shadow-red-600/20">
                      <Award size={13}/> Start Exam Room
                    </Link>
                  </div>))}
              </div>)}
          </div>

          {/* Continue Learning */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-black text-slate-900 dark:text-white">Continue Learning</h2>
              <button onClick={() => handleTabChange("courses")} className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1">
                All Courses <ChevronRight size={13}/>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockCourses.slice(0, 3).map((course, i) => {
                const progress = [65, 30, 100][i] ?? 0;
                return (<div key={course.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-1.5">{course.category}</div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mb-3">{course.title}</h3>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-500">Progress</span>
                      <span className="text-[11px] font-black text-slate-700 dark:text-slate-300">{progress}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-4">
                      <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-rose-400 transition-all" style={{ width: `${progress}%` }}/>
                    </div>
                    <Link href={`/courses/${course.slug}/learn`} className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-900 dark:bg-red-600 text-white text-xs font-bold hover:bg-[#00154D] dark:hover:bg-red-700 transition">
                      <Play size={12}/> {progress === 100 ? "Review" : "Continue"}
                    </Link>
                  </div>);
            })}
            </div>
          </div>
        </div>)}

      {/* ════════ MY TESTS TAB ════════ */}
      {tab === "tests" && (<div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">My Assigned Tests</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{tests.length} tests assigned · {history.length} completed · {pendingTests.length} pending</p>
            </div>
          </div>

          {/* Completed History */}
          {history.length > 0 && (<div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Completed</h3>
              <div className="space-y-2">
                {history.map((h) => (<div key={h.testId} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-4 flex items-center gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{h.testTitle}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{new Date(h.submittedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-black text-slate-900 dark:text-white">{h.score}<span className="text-xs text-slate-400">/{h.totalMarks}</span></div>
                      <div className={`text-[11px] font-bold ${h.accuracy >= 75 ? "text-emerald-600" : h.accuracy >= 50 ? "text-amber-600" : "text-red-600"}`}>{h.accuracy}% accuracy</div>
                    </div>
                    <Link href={`/mock-tests/${h.testId}/result`} className="ml-2 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                      <ArrowRight size={14}/>
                    </Link>
                  </div>))}
              </div>
            </div>)}

          {/* Pending Tests */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Available Now</h3>
            {pendingTests.length === 0 ? (<div className="rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
                <Award size={36} className="mx-auto text-slate-300 dark:text-slate-600 mb-3"/>
                <p className="text-sm font-bold text-slate-500">No pending tests</p>
                <p className="text-xs text-slate-400 mt-1">Your teacher will assign new tests soon.</p>
              </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingTests.map((test) => (<div key={test.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${subjectBadge(test.subject)}`}>{test.subject}</span>
                      <span className="text-[10px] font-bold text-slate-400">{test.batch}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1 mb-2 line-clamp-2">{test.title}</h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mb-4">{test.summary}</p>

                    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                      {[
                        { label: "Duration", val: `${test.duration}m` },
                        { label: "Questions", val: test.totalQuestions },
                        { label: "Total Marks", val: test.totalMarks },
                    ].map((s) => (<div key={s.label} className="rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2">
                          <div className="text-sm font-black text-slate-900 dark:text-white">{s.val}</div>
                          <div className="text-[10px] text-slate-400 font-semibold">{s.label}</div>
                        </div>))}
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1 flex flex-wrap gap-1">
                        {test.sections.slice(0, 2).map((sec) => (<span key={sec.id} className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">{sec.name}</span>))}
                      </div>
                    </div>

                    <Link href={`/mock-tests/${test.id}/take`} className="mt-3 w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 text-white text-xs font-bold hover:from-red-700 hover:to-rose-600 transition shadow-sm shadow-red-600/20">
                      <Award size={13}/> Enter Exam Room
                    </Link>
                  </div>))}
              </div>)}
          </div>
        </div>)}

      {/* ════════ MY COURSES TAB ════════ */}
      {tab === "courses" && (<div className="space-y-5">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">My Enrolled Courses</h2>
            <p className="text-xs text-slate-500 mt-0.5">{enrolledCourses.length} courses · Powered by GPA YouTube Channel</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {enrolledCourses.map((course, i) => {
                const progress = [65, 30, 100, 15, 80][i] ?? 0;
                const completed = Math.round((progress / 100) * course.lessons);
                return (<div key={course.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-[#00154D] flex items-center justify-center text-white font-black text-lg shrink-0 shadow">
                      {course.title[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">{course.category}</div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mt-0.5">{course.title}</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">{course.duration} · Dr. Rajesh Kumar</p>
                    </div>
                    {progress === 100 && (<span className="shrink-0 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-200 dark:border-emerald-500/20">Done</span>)}
                  </div>

                  <div className="mb-1.5 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-500">{completed}/{course.lessons} lectures</span>
                    <span className="font-black text-slate-700 dark:text-slate-300">{progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-4">
                    <div className={`h-full rounded-full transition-all ${progress === 100 ? "bg-emerald-500" : "bg-gradient-to-r from-red-500 to-rose-400"}`} style={{ width: `${progress}%` }}/>
                  </div>

                  <div className="flex gap-2">
                    {course.videos?.slice(0, 2).map((v) => (<div key={v.id} className="flex-1 min-w-0">
                        <div className={`flex items-center gap-1.5 p-2 rounded-xl text-[10px] font-semibold ${v.isFree ? "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300" : "bg-slate-100 dark:bg-slate-800/50 text-slate-400"}`}>
                          {v.isFree ? <Unlock size={10} className="text-emerald-500 shrink-0"/> : <Lock size={10} className="text-slate-400 shrink-0"/>}
                          <span className="truncate">{v.title}</span>
                        </div>
                      </div>))}
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Link href={`/courses/${course.slug}/learn`} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 dark:bg-red-600 text-white text-xs font-bold hover:bg-[#00154D] dark:hover:bg-red-700 transition">
                      <Play size={12}/> {progress === 100 ? "Review Lectures" : "Continue"}
                    </Link>
                    <a href={`https://www.youtube.com/playlist?list=${course.youtubePlaylistId}`} target="_blank" rel="noreferrer" className="px-3 py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold border border-red-200 dark:border-red-500/20 hover:bg-red-100 dark:hover:bg-red-500/20 transition">
                      <Video size={13}/>
                    </a>
                  </div>
                </div>);
            })}
          </div>
        </div>)}

      {/* ════════ PERFORMANCE TAB ════════ */}
      {tab === "performance" && (<div className="space-y-5">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Performance Analytics</h2>
            <p className="text-xs text-slate-500 mt-0.5">Based on {history.length} test attempt{history.length !== 1 ? "s" : ""}</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
                { label: "Tests Attempted", value: history.length, icon: <Award size={16} className="text-red-500"/> },
                { label: "Average Score", value: `${avgScore}%`, icon: <TrendingUp size={16} className="text-emerald-500"/> },
                { label: "Best Score", value: history.length ? `${Math.max(...history.map(h => h.accuracy))}%` : "—", icon: <Star size={16} className="text-amber-500"/> },
                { label: "Class Standing", value: classStanding.label, icon: <Trophy size={16} className="text-amber-500"/> },
            ].map((s, i) => (<div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 text-center shadow-sm">
                <div className="flex justify-center mb-2">{s.icon}</div>
                <div className="text-xl font-black text-slate-900 dark:text-white">{s.value}</div>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</div>
              </div>))}
          </div>

          {/* Rank Analytics vs Class Average */}
          {rankRows.length > 0 && (<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 dark:text-white mb-1">Rank Analytics</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">How you compare against the class average for each test you've attempted.</p>
              <div className="space-y-3">
                {rankRows.map((r) => (<div key={r.testId} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{r.title}</p>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 mt-1.5 relative">
                        <div className={`h-full rounded-full ${r.delta >= 0 ? "bg-emerald-500" : "bg-red-500"}`} style={{ width: `${Math.min(100, r.yourAccuracy)}%` }}/>
                        <div className="w-0.5 h-3 bg-slate-500 dark:bg-slate-300 absolute -top-0.5 rounded-full" style={{ left: `${Math.min(100, r.classAccuracy)}%` }} title="Class average"/>
                      </div>
                    </div>
                    <div className={`shrink-0 text-xs font-black ${r.delta >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {r.delta >= 0 ? "+" : ""}{r.delta}%
                    </div>
                  </div>))}
              </div>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] font-semibold text-slate-500">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"/> Your score</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 inline-block"/> Class average</span>
              </div>
            </div>)}

          {/* Subject breakdown */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 dark:text-white mb-4">Subject-wise Strength</h3>
            {[
                { subject: "Quantitative Aptitude", score: 72, color: "bg-blue-500" },
                { subject: "Reasoning Ability", score: 84, color: "bg-purple-500" },
                { subject: "English Language", score: 91, color: "bg-emerald-500" },
                { subject: "General Awareness", score: 58, color: "bg-amber-500" },
            ].map((s) => (<div key={s.subject} className="mb-3 last:mb-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{s.subject}</span>
                  <span className={`text-xs font-black ${s.score >= 80 ? "text-emerald-600" : s.score >= 60 ? "text-amber-600" : "text-red-600"}`}>{s.score}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className={`h-full rounded-full ${s.color} transition-all`} style={{ width: `${s.score}%` }}/>
                </div>
              </div>))}
          </div>

          {/* Test History Table */}
          {history.length > 0 ? (<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-black text-slate-900 dark:text-white">Test History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      {["Test Name", "Date", "Score", "Accuracy", "Result"].map((h) => (<th key={h} className="px-4 py-3 text-left font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {history.map((h) => (<tr key={h.testId} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition">
                        <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200 max-w-[200px] truncate">{h.testTitle}</td>
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{new Date(h.submittedAt).toLocaleDateString("en-IN")}</td>
                        <td className="px-4 py-3 font-black text-slate-900 dark:text-white font-variant-numeric tabular-nums">{h.score}/{h.totalMarks}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full font-bold ${h.accuracy >= 75 ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : h.accuracy >= 50 ? "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400" : "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400"}`}>
                            {h.accuracy}%
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Link href={`/mock-tests/${h.testId}/result`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold transition">
                            View <ArrowRight size={11}/>
                          </Link>
                        </td>
                      </tr>))}
                  </tbody>
                </table>
              </div>
            </div>) : (<div className="rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
              <BarChart3 size={36} className="mx-auto text-slate-300 dark:text-slate-600 mb-3"/>
              <p className="text-sm font-bold text-slate-500">No attempts yet</p>
              <p className="text-xs text-slate-400 mt-1">Complete your first test to see performance analytics.</p>
              <button onClick={() => handleTabChange("tests")} className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition">
                <Award size={12}/> Go to Tests
              </button>
            </div>)}
        </div>)}

      {/* ════════ RESOURCES TAB ════════ */}
      {tab === "resources" && (<div className="space-y-5">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Study Resources & Notes</h2>
            <p className="text-xs text-slate-500 mt-0.5">{freeNotes.length} items in your library</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {freeNotes.map((note, i) => (<div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-md hover:border-red-200 dark:hover:border-red-500/20 transition flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${note.type === "PDF" || note.type === "Notes" ? "bg-red-50 dark:bg-red-500/10" : "bg-blue-50 dark:bg-blue-500/10"}`}>
                    {note.type === "PDF" || note.type === "Notes" ? <FileText size={16} className="text-red-600 dark:text-red-400"/> : <Video size={16} className="text-blue-600 dark:text-blue-400"/>}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{note.type}</div>
                    <div className="text-[11px] font-semibold text-red-600 dark:text-red-400 truncate">{note.subject || note.category}</div>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 flex-1 mb-3">{note.title}</h4>
                {note.description && (<p className="text-[11px] text-slate-500 line-clamp-2 mb-3">{note.description}</p>)}
                <Link href="/free-notes" className="mt-auto flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                  <Download size={12}/> Open Resource
                </Link>
              </div>))}
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-[#00154D] to-slate-900 text-white p-6 text-center">
            <Flame size={28} className="mx-auto text-red-400 mb-3"/>
            <h3 className="text-base font-black">Want more resources?</h3>
            <p className="text-xs text-slate-300 mt-1 mb-4">Access the full GPA e-library with 200+ PDFs, formula sheets, and previous year papers.</p>
            <Link href="/free-notes" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-lg shadow-red-600/30">
              Open Full E-Library <ArrowRight size={12}/>
            </Link>
          </div>
        </div>)}
    </div>);
}
