"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPublishedTests } from "@/utils/content-store";
import { ShieldCheck, ArrowRight, Play, Clock } from "lucide-react";
import Link from "next/link";
export default function MockTestsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [allTests, setAllTests] = useState([]);
    useEffect(() => {
        setAllTests(getPublishedTests());
    }, []);
    const categories = ["All", "Banking", "SSC", "Railways", "UPSC CSAT"];
    const filteredTests = allTests.filter((test) => {
        return selectedCategory === "All" || (test.subject || "").toLowerCase().includes(selectedCategory.toLowerCase());
    });
    return (<div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-extrabold uppercase tracking-widest">
            <ShieldCheck size={14}/> 120-Minute AI Proctored Test Series
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Full-Length CBT Mock Tests
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium">
            Simulate exact examination conditions with 120-minute countdown timers, instant score analytics, percentile rank, and AI camera proctoring.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10">
          {categories.map((cat) => (<button key={cat} type="button" onClick={() => setSelectedCategory(cat)} className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${selectedCategory === cat
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-red-400"}`}>
              {cat}
            </button>))}
        </div>

        {/* Mock Test Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTests.map((test) => (<div key={test.id} className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-extrabold">
                    {test.subject}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400">
                    <Clock size={13} className="text-red-500"/>
                    {test.duration} Mins
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
                  {test.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {test.summary}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <span className="text-slate-400 font-medium">Questions:</span>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">{test.totalQuestions} MCQs</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <span className="text-slate-400 font-medium">Total Marks:</span>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{test.totalMarks} Marks</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
                <Link href={`/mock-tests/${test.id}/take`} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md shadow-red-600/30 hover:scale-[1.02] transition">
                  <Play size={14} className="fill-white"/>
                  <span>Start 120-Min Test Room</span>
                  <ArrowRight size={14}/>
                </Link>
              </div>
            </div>))}
        </div>
      </main>

      <Footer />
    </div>);
}
