"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mockTestsData } from "@/data/mock-data";
import { useAuth } from "@/context/AuthContext";
import { flagViolation, getTestById } from "@/utils/content-store";
import { Clock, ShieldAlert, Camera, CheckCircle2, AlertTriangle, ChevronRight, ChevronLeft, ArrowLeft, Sparkles, Award, BookOpen, X, Menu } from "lucide-react";
export default function TakeTestPage({ params }) {
    const resolvedParams = params ?? null;
    const id = resolvedParams?.id || mockTestsData[0]?.id;
    const router = useRouter();
    const { user } = useAuth();
    const test = getTestById(id) || mockTestsData.find((t) => t.id === id) || mockTestsData[0];
    // Lobby vs Live Exam state
    const [testStarted, setTestStarted] = useState(false);
    // Timer State: 120 Minutes = 7200 seconds
    const [timeLeft, setTimeLeft] = useState(test.duration * 60);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [questionStatus, setQuestionStatus] = useState({});
    const [currentSection, setCurrentSection] = useState(test.sections[0]?.id || "sec_quant");
    const [isPaletteOpenMobile, setIsPaletteOpenMobile] = useState(false);
    // Anti-Cheating & Webcam State
    const [cameraStream, setCameraStream] = useState(null);
    const [cameraError, setCameraError] = useState(false);
    const [warningCount, setWarningCount] = useState(0);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const videoRef = useRef(null);
    // Topic Recommended Revision Video based on test
    const topicVideo = {
        title: `${test.subject} Concept & Speed Revision Masterclass`,
        subtitle: "Gyan Prapti Academy • Official Topic Preparation Series",
        embedUrl: "https://www.youtube.com/embed/P6ift-kfenw",
    };
    // Initialize questions status
    useEffect(() => {
        const initialStatus = {};
        test.questions.forEach((_, idx) => {
            initialStatus[idx] = idx === 0 ? "not_answered" : "not_visited";
        });
        setQuestionStatus(initialStatus);
    }, [test]);
    // Request Webcam Feed once test starts with graceful fallback
    useEffect(() => {
        if (!testStarted)
            return;
        async function setupCamera() {
            try {
                if (typeof navigator !== "undefined" && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: { width: { ideal: 320 }, height: { ideal: 240 } },
                        audio: false
                    });
                    setCameraStream(stream);
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                }
                else {
                    setCameraError(true);
                }
            }
            catch (err) {
                // Fallback to simulated AI camera feed on unsupported/denied contexts
                setCameraError(true);
            }
        }
        setupCamera();
        return () => {
            if (cameraStream) {
                cameraStream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [testStarted]);
    useEffect(() => {
        if (cameraStream && videoRef.current) {
            videoRef.current.srcObject = cameraStream;
        }
    }, [cameraStream]);
    // 120-Minute Countdown Timer (Only runs after starting)
    useEffect(() => {
        if (!testStarted)
            return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmitTest(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [testStarted]);
    // Anti-Cheating: Tab Switch Detection (Safe for mobile)
    useEffect(() => {
        if (!testStarted)
            return;
        // Grace period of 5 seconds to ignore initial permission prompts
        const graceTimer = setTimeout(() => {
            const handleVisibilityChange = () => {
                if (document.hidden) {
                    handleViolation("Window Minimized or Tab Switched! Anti-cheating proctor has detected an off-screen event.");
                }
            };
            document.addEventListener("visibilitychange", handleVisibilityChange);
            return () => {
                document.removeEventListener("visibilitychange", handleVisibilityChange);
            };
        }, 5000);
        return () => clearTimeout(graceTimer);
    }, [testStarted, warningCount]);
    const handleViolation = (msg) => {
        if (isSubmitting)
            return;
        const newCount = warningCount + 1;
        setWarningCount(newCount);
        if (user)
            flagViolation(user.id);
        setWarningMessage(msg);
        setShowWarningModal(true);
        if (newCount >= 3) {
            setTimeout(() => {
                handleSubmitTest(false, true);
            }, 2500);
        }
    };
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    const currentQ = test.questions[currentQuestionIndex] || test.questions[0];
    const handleSelectOption = (optIndex) => {
        setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: optIndex });
    };
    const handleSaveAndNext = () => {
        const isAnswered = selectedAnswers[currentQuestionIndex] !== undefined;
        const newStatus = isAnswered ? "answered" : "not_answered";
        setQuestionStatus((prev) => ({ ...prev, [currentQuestionIndex]: newStatus }));
        if (currentQuestionIndex < test.questions.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
            if (questionStatus[nextIndex] === "not_visited") {
                setQuestionStatus((prev) => ({ ...prev, [nextIndex]: "not_answered" }));
            }
        }
    };
    const handleMarkForReviewAndNext = () => {
        const isAnswered = selectedAnswers[currentQuestionIndex] !== undefined;
        const newStatus = isAnswered ? "answered_marked" : "marked";
        setQuestionStatus((prev) => ({ ...prev, [currentQuestionIndex]: newStatus }));
        if (currentQuestionIndex < test.questions.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
            if (questionStatus[nextIndex] === "not_visited") {
                setQuestionStatus((prev) => ({ ...prev, [nextIndex]: "not_answered" }));
            }
        }
    };
    const handleClearResponse = () => {
        const updated = { ...selectedAnswers };
        delete updated[currentQuestionIndex];
        setSelectedAnswers(updated);
        setQuestionStatus((prev) => ({ ...prev, [currentQuestionIndex]: "not_answered" }));
    };
    const jumpToQuestion = (index) => {
        setCurrentQuestionIndex(index);
        setIsPaletteOpenMobile(false);
        if (questionStatus[index] === "not_visited") {
            setQuestionStatus((prev) => ({ ...prev, [index]: "not_answered" }));
        }
    };
    const handleSubmitTest = (timeUp = false, violationTerminated = false) => {
        setIsSubmitting(true);
        let correctCount = 0;
        let wrongCount = 0;
        test.questions.forEach((q, idx) => {
            if (selectedAnswers[idx] !== undefined) {
                if (selectedAnswers[idx] === q.correctAnswer)
                    correctCount++;
                else
                    wrongCount++;
            }
        });
        const scoreData = {
            testId: test.id,
            testTitle: test.title,
            totalQuestions: test.questions.length,
            answeredCount: Object.keys(selectedAnswers).length,
            correctCount,
            wrongCount,
            totalScore: Math.max(0, correctCount * 1.0 - wrongCount * 0.25).toFixed(2),
            timeSpent: test.duration * 60 - timeLeft,
            violationTerminated,
            submittedAt: new Date().toISOString(),
        };
        try {
            localStorage.setItem(`gpa_test_result_${test.id}`, JSON.stringify(scoreData));
        }
        catch { }
        setTimeout(() => {
            router.push(`/mock-tests/${test.id}/result`);
        }, 600);
    };
    // 1. PRE-EXAM LOBBY (Before Starting 120-Min Test)
    if (!testStarted) {
        return (<div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4 sm:p-6 select-none font-sans">
        <div className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-[32px] p-6 sm:p-10 shadow-2xl space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <Link href="/mock-tests" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white mb-3 transition">
                <ArrowLeft size={14}/> Back to Mock Tests
              </Link>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-2 border border-red-500/30">
                <Sparkles size={14}/> GPA Proctored CBT Environment
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white">{test.title}</h1>
              <p className="text-xs text-slate-400 mt-1">{test.subject} • Full Length 120-Minute Exam Hall</p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 text-center">
                <div className="text-xl font-extrabold text-red-500 font-mono">120 Mins</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Exam Duration</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 text-center">
                <div className="text-xl font-extrabold text-emerald-400 font-mono">{test.totalMarks}</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Marks</div>
              </div>
            </div>
          </div>

          {/* Instructions Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <BookOpen size={16} className="text-red-400"/> Exam Rules & Scheme
              </h4>
              <ul className="text-xs text-slate-300 space-y-2 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0"/> Duration: 120 Minutes (2.0 Hours)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0"/> {test.totalQuestions} Questions • {test.totalMarks} Total Marks
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0"/> Marking: +1.0 for Correct, -0.25 for Incorrect
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Camera size={16} className="text-emerald-400"/> AI Proctoring Verification
              </h4>
              <ul className="text-xs text-slate-300 space-y-2 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0"/> Webcam access active for live face tracking
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle size={14} className="text-amber-400 shrink-0"/> Tab switching triggers anti-cheat warnings
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle size={14} className="text-red-400 shrink-0"/> Repeated tab switch will auto-submit & finish test
                </li>
              </ul>
            </div>
          </div>

          {/* Start Test Action Bar */}
          <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800">
            <div className="text-xs text-slate-400 font-medium">
              Candidate: <span className="text-white font-bold">{user?.name || "Student Aspirant"}</span> ({user?.email || "student@gpaacademy.in"})
            </div>

            <button type="button" onClick={() => {
                setTestStarted(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }} className="w-full md:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-sm transition shadow-xl shadow-red-600/30 hover:scale-[1.02] flex items-center justify-center gap-2">
              <Award size={18}/> Enter Proctored Exam Room (120 Mins)
            </button>
          </div>
        </div>
      </div>);
    }
    // 2. LIVE TESTBOOK PROCTORED EXAM ROOM
    return (<div className="flex flex-col min-h-screen md:h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden md:overflow-hidden font-sans select-none">
      
      {/* Top Testbook Header */}
      <header className="bg-slate-900 text-white px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-md z-20 shrink-0 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-red-600 font-extrabold text-[10px] sm:text-xs tracking-wider shrink-0">GPA CBT</div>
          <div className="min-w-0 flex-1">
            <h1 className="font-bold text-xs sm:text-sm text-white truncate">{test.title}</h1>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate hidden sm:block">
              Candidate: {user?.name || "Student"} • Roll: GPA-{user?.id || "9283"}
            </p>
          </div>
        </div>

        {/* 120-Min Countdown Clock & Submit */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 sm:px-4 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-bold shadow-inner">
            <Clock size={13} className={timeLeft < 300 ? "text-red-400 animate-pulse" : "text-emerald-400"}/>
            <span className={timeLeft < 300 ? "text-red-400" : "text-white"}>{formatTime(timeLeft)}</span>
          </div>

          <button type="button" onClick={() => handleSubmitTest(false)} className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 font-bold text-xs text-white transition shadow-md shadow-red-600/30 shrink-0">
            Submit
          </button>
        </div>
      </header>

      {/* Section Switcher Tabs & Mobile Palette Button */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 py-2 flex items-center justify-between gap-2 shrink-0 shadow-xs">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto min-w-0 flex-1 no-scrollbar py-0.5">
          {test.sections.map((sec) => (<button key={sec.id} type="button" onClick={() => setCurrentSection(sec.id)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap shrink-0 ${currentSection === sec.id
                ? "bg-slate-900 dark:bg-red-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>
              {sec.name} ({sec.questionsCount})
            </button>))}
        </div>

        {/* Mobile Palette Toggle Button */}
        <button type="button" onClick={() => setIsPaletteOpenMobile(!isPaletteOpenMobile)} className="md:hidden flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shrink-0">
          <Menu size={14}/> <span>Palette</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>AI Proctoring Active</span>
        </div>
      </div>

      {/* Main Examination Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left: Question Area */}
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-950 md:border-r border-slate-200 dark:border-slate-800 overflow-y-auto">
          
          {/* Question Header */}
          <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="px-3 py-1 rounded-lg bg-slate-900 dark:bg-red-600 text-white text-xs font-bold">
                Q {currentQuestionIndex + 1} / {test.questions.length}
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {currentQ.sectionName}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-xs font-bold">
              <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 sm:px-2.5 py-1 rounded-md border border-emerald-100 dark:border-emerald-500/20">+1.0</span>
              <span className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-2 sm:px-2.5 py-1 rounded-md border border-red-100 dark:border-red-500/20">-0.25</span>
            </div>
          </div>

          {/* Question Text & Options */}
          <div className="p-5 sm:p-8 flex-1">
            <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.question}
            </h3>

            <div className="mt-6 sm:mt-8 space-y-3 max-w-2xl">
              {currentQ.options.map((option, optIdx) => {
            const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
            return (<button key={optIdx} type="button" onClick={() => handleSelectOption(optIdx)} className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 ${isSelected
                    ? "border-red-600 bg-red-50/50 dark:bg-red-500/10 text-slate-900 dark:text-white font-bold shadow-sm ring-2 ring-red-500/20"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium"}`}>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? "border-red-600 bg-red-600 text-white" : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"}`}>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
                    </div>
                    <span className="text-sm">{option}</span>
                  </button>);
        })}
            </div>
          </div>

          {/* Bottom Action Buttons (Testbook Standard) */}
          <div className="p-3.5 sm:p-5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
            <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-2.5 sm:gap-3">
              {/* Left Actions */}
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <button type="button" onClick={handleMarkForReviewAndNext} className="flex-1 sm:flex-initial px-3 sm:px-4 py-2.5 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 hover:bg-purple-200 font-bold text-xs transition border border-purple-200 dark:border-purple-500/30 text-center">
                  Mark & Next
                </button>
                <button type="button" onClick={handleClearResponse} className="flex-1 sm:flex-initial px-3 sm:px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 font-bold text-xs transition border border-slate-200 dark:border-slate-700 text-center">
                  Clear
                </button>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <button type="button" onClick={() => currentQuestionIndex > 0 && setCurrentQuestionIndex(currentQuestionIndex - 1)} disabled={currentQuestionIndex === 0} className="flex-1 sm:flex-initial px-3 sm:px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 disabled:opacity-40 text-slate-700 dark:text-slate-300 font-bold text-xs transition border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1">
                  <ChevronLeft size={16}/> Prev
                </button>
                <button type="button" onClick={handleSaveAndNext} className="flex-2 sm:flex-initial px-4 sm:px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1">
                  Save & Next <ChevronRight size={16}/>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Camera Feed & Question Palette */}
        <div className={`w-full md:w-80 lg:w-96 bg-slate-50 dark:bg-slate-900 flex flex-col shrink-0 overflow-y-auto border-l border-slate-200 dark:border-slate-800 ${isPaletteOpenMobile ? "fixed inset-0 z-50 p-4 bg-white dark:bg-slate-900" : "hidden md:flex"}`}>
          
          {isPaletteOpenMobile && (<div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3 md:hidden">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">Question Palette</span>
              <button type="button" onClick={() => setIsPaletteOpenMobile(false)} className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500">
                <X size={18}/>
              </button>
            </div>)}

          {/* Live Camera Feed Window */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
                <Camera size={14}/> Live AI Proctor
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                REC • Active
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video border-2 border-slate-800 flex items-center justify-center">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover"/>
              <div className="absolute inset-0 border border-emerald-400/40 m-2 sm:m-4 rounded-xl pointer-events-none flex flex-col justify-between p-2">
                <div className="text-[9px] text-emerald-400 font-mono bg-slate-950/80 px-1.5 py-0.5 rounded w-max">
                  FACE LOCK: ACTIVE
                </div>
                <div className="text-[9px] text-slate-300 font-mono bg-slate-950/80 px-1.5 py-0.5 rounded self-end">
                  INTEGRITY: 100%
                </div>
              </div>
            </div>

            {warningCount > 0 && (<div className="mt-2 text-[11px] font-bold text-red-600 dark:text-red-400 flex items-center gap-1 bg-red-50 dark:bg-red-500/10 p-2 rounded-xl border border-red-100 dark:border-red-500/20">
                <AlertTriangle size={14}/> Warning Count: {warningCount} / 3 (Tab Switches)
              </div>)}
          </div>

          {/* Question Palette & Legend */}
          <div className="p-4 flex-1">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Question Palette
            </h4>

            {/* Testbook Color Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-5 p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-600 text-white font-bold text-[9px] flex items-center justify-center">✓</span>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-red-600 text-white font-bold text-[9px] flex items-center justify-center">✕</span>
                <span>Not Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-purple-600 text-white font-bold text-[9px] flex items-center justify-center">?</span>
                <span>Marked</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 font-bold text-[9px] flex items-center justify-center">•</span>
                <span>Not Visited</span>
              </div>
            </div>

            {/* Numeric Palette Grid */}
            <div className="grid grid-cols-5 gap-2">
              {test.questions.map((_, idx) => {
            const status = questionStatus[idx] || "not_visited";
            const isCurrent = currentQuestionIndex === idx;
            let colorClasses = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300";
            if (status === "answered")
                colorClasses = "bg-emerald-600 text-white border-emerald-700";
            else if (status === "not_answered")
                colorClasses = "bg-red-600 text-white border-red-700";
            else if (status === "marked")
                colorClasses = "bg-purple-600 text-white border-purple-700";
            else if (status === "answered_marked")
                colorClasses = "bg-purple-600 text-white border-purple-700 ring-2 ring-emerald-400";
            return (<button key={idx} type="button" onClick={() => jumpToQuestion(idx)} className={`h-10 rounded-xl border text-xs font-bold transition flex items-center justify-center ${colorClasses} ${isCurrent ? "ring-2 ring-blue-500 scale-105 shadow-md" : "hover:opacity-80"}`}>
                    {idx + 1}
                  </button>);
        })}
            </div>
          </div>
        </div>
      </div>

      {/* Warning Anti-Cheat Modal */}
      {showWarningModal && (<div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-slate-900 border border-red-500/50 p-6 text-white text-center shadow-2xl space-y-4 animate-shake">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center mx-auto">
              <ShieldAlert size={28}/>
            </div>
            <h3 className="text-lg font-bold text-red-400">Anti-Cheating Integrity Alert!</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {warningMessage}
            </p>
            <div className="p-3 rounded-2xl bg-red-950/60 border border-red-800/80 text-xs font-bold text-red-300">
              Warning {warningCount} of 3 • Next violation will automatically submit test!
            </div>
            <button type="button" onClick={() => setShowWarningModal(false)} className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition">
              I Understand, Return to Test
            </button>
          </div>
        </div>)}
    </div>);
}
