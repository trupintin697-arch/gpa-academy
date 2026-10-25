"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { mockTestsData } from "@/data/mock-data";
import { getTestById } from "@/utils/content-store";
import { CheckCircle, XCircle, ShieldCheck, ShieldAlert, ArrowLeft, RotateCcw } from "lucide-react";
export default function ResultPage({ params }) {
    const resolvedParams = params ?? null;
    const id = resolvedParams?.id || mockTestsData[0]?.id;
    const test = getTestById(id) || mockTestsData.find((t) => t.id === id) || mockTestsData[0];
    const [resultData, setResultData] = useState(null);
    useEffect(() => {
        const stored = localStorage.getItem(`gpa_test_result_${test.id}`);
        if (stored) {
            setResultData(JSON.parse(stored));
        }
        else {
            // Default mock result for instant demonstration
            setResultData({
                testTitle: test.title,
                totalQuestions: test.questions.length,
                correctCount: 8,
                wrongCount: 2,
                unattempted: 0,
                score: 7.5,
                totalMarks: test.totalMarks,
                timeSpent: 3840, // ~64 mins
                violations: 0,
                terminated: false,
                selectedAnswers: { 0: 0, 1: 1, 2: 0, 3: 0, 4: 0, 5: 1, 6: 2, 7: 1, 8: 0, 9: 0 },
            });
        }
    }, [test]);
    if (!resultData)
        return null;
    const accuracy = Math.round((resultData.correctCount / Math.max(1, resultData.correctCount + resultData.wrongCount)) * 100);
    const percentage = Math.round((resultData.score / test.totalMarks) * 100);
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };
    return (<div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#00154D] to-slate-900 text-white py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
              <CheckCircle size={14}/> Exam Completed & Submitted
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">{test.title}</h1>
            <p className="text-slate-300 text-xs mt-1 font-medium">Detailed Performance Analytics & Solution Review</p>
          </div>

          <div className="flex items-center gap-3">
            <Link href={`/mock-tests/${test.id}/take`} className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition border border-white/20 flex items-center gap-1.5">
              <RotateCcw size={14}/> Retake Test
            </Link>
            <Link href="/dashboard/student" className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition shadow-lg shadow-red-600/30 flex items-center gap-1.5">
              <ArrowLeft size={14}/> Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-6">
        {/* Scorecard KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Score</span>
            <div className="my-2 text-3xl font-extrabold text-red-600">
              {resultData.score} <span className="text-xs text-slate-400 font-bold">/ {test.totalMarks}</span>
            </div>
            <span className="text-xs font-bold text-emerald-600">Qualified</span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Accuracy</span>
            <div className="my-2 text-3xl font-extrabold text-slate-900">{accuracy}%</div>
            <span className="text-xs font-semibold text-slate-500">{resultData.correctCount} of {resultData.correctCount + resultData.wrongCount} Correct</span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Time Taken</span>
            <div className="my-2 text-3xl font-extrabold text-slate-900">{formatDuration(resultData.timeSpent)}</div>
            <span className="text-xs font-semibold text-slate-500">of 120 Minutes</span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Proctor Integrity</span>
            <div className="my-2 text-2xl font-extrabold text-emerald-600 flex items-center gap-1.5">
              {resultData.violations === 0 ? (<>
                  <ShieldCheck size={24}/> 100% Clean
                </>) : (<span className="text-red-600 text-lg flex items-center gap-1">
                  <ShieldAlert size={20}/> {resultData.violations} Violations
                </span>)}
            </div>
            <span className="text-xs font-semibold text-slate-500">Camera Active</span>
          </div>
        </div>

        {/* Detailed Question Review & Step-by-Step Solutions */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <div className="mb-6">
            <h2 className="text-xl font-extrabold text-slate-900">Question-by-Question Solution Analysis</h2>
            <p className="text-xs text-slate-500 font-medium mt-1">Review correct answers, your response, and faculty explanations.</p>
          </div>

          <div className="space-y-6">
            {test.questions.map((q, idx) => {
            const selected = resultData.selectedAnswers?.[idx];
            const isCorrect = selected === q.correctAnswer;
            const isUnattempted = selected === undefined;
            return (<div key={q.id} className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Q{idx + 1} • {q.sectionName}
                    </span>
                    {isUnattempted ? (<span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-600">Unattempted (0.0)</span>) : isCorrect ? (<span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1">
                        <CheckCircle size={13}/> Correct (+1.0)
                      </span>) : (<span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 flex items-center gap-1">
                        <XCircle size={13}/> Incorrect (-0.25)
                      </span>)}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{q.question}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, optIdx) => {
                    const isOptionCorrect = optIdx === q.correctAnswer;
                    const isUserOption = optIdx === selected;
                    let itemStyle = "border-slate-200 bg-white text-slate-700";
                    if (isOptionCorrect)
                        itemStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
                    else if (isUserOption && !isCorrect)
                        itemStyle = "border-red-500 bg-red-50 text-red-900 font-bold";
                    return (<div key={optIdx} className={`p-3 rounded-xl border flex items-center justify-between ${itemStyle}`}>
                          <span>{opt}</span>
                          {isOptionCorrect && <span className="text-[10px] uppercase font-bold text-emerald-700">Correct Answer</span>}
                          {isUserOption && !isCorrect && <span className="text-[10px] uppercase font-bold text-red-600">Your Choice</span>}
                        </div>);
                })}
                  </div>

                  {/* Explanation Box */}
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                    <p className="font-bold text-amber-900 mb-1">Faculty Explanation & Shortcut:</p>
                    <p className="text-amber-800 leading-relaxed">{q.explanation}</p>
                  </div>
                </div>);
        })}
          </div>
        </div>
      </div>
    </div>);
}
