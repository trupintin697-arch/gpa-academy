"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import LazySection from "@/components/LazySection";
import Stats from "@/components/Stats";
import ExamCategories from "@/components/ExamCategories";
import FreeNotes from "@/components/FreeNotes";
import PremiumCourses from "@/components/PremiumCourses";
import Testimonials from "@/components/Testimonials";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Play,
  Clock,
  FileText,
  ShieldCheck,
  BookOpen,
  ClipboardList,
  BarChart2,
  X,
  ExternalLink,
  Crown,
  Sparkles,
  Timer,
  Camera,
  LayoutGrid,
  Zap,
  Trophy,
  Shield,
  ChevronDown,
  CheckCircle2,
  Rocket,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { GPA_YOUTUBE_CHANNEL } from "@/data/mock-data";

export default function HomePage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // 4 Features directly below hero matching Image 1
  const features = [
    {
      icon: <BookOpen size={24} className="text-rose-500" />,
      iconBg: "bg-rose-50 border-rose-100 dark:bg-rose-950/40 dark:border-rose-900/40",
      title: "Expert Video Lectures",
      desc: "Concepts made simple",
      href: "/courses",
    },
    {
      icon: <FileText size={24} className="text-blue-500" />,
      iconBg: "bg-blue-50 border-blue-100 dark:bg-blue-950/40 dark:border-blue-900/40",
      title: "Structured Notes",
      desc: "Exam-focused content",
      href: "/free-notes",
    },
    {
      icon: <ClipboardList size={24} className="text-amber-500" />,
      iconBg: "bg-amber-50 border-amber-100 dark:bg-amber-950/40 dark:border-amber-900/40",
      title: "Real Exam Practice",
      desc: "Mock tests & previous papers",
      href: "/mock-tests",
    },
    {
      icon: <BarChart2 size={24} className="text-emerald-500" />,
      iconBg: "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900/40",
      title: "Instant Results",
      desc: "Track your progress",
      href: "/dashboard/student",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-[#b91c1c] selection:text-white overflow-x-hidden transition-colors duration-200">
      <Navbar />

      <main className="flex-1">
        {/* ============================================================== */}
        {/* HERO & SPOTLIGHT SECTION (MATCHING USER REFERENCE DESIGN EXACTLY) */}
        {/* ============================================================== */}
        <section className="relative pt-24 sm:pt-28 pb-14 sm:pb-20 bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-200 overflow-hidden">
          {/* Subtle Ambient Light Gradients */}
          <div className="absolute top-0 right-1/4 w-[480px] h-[480px] bg-red-500/5 dark:bg-red-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Two-Column Hero Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              
              {/* Left Column: Hero Content */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-6 text-center lg:text-left pt-4 lg:pt-0"
              >
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50/90 dark:bg-rose-950/40 dark:border-rose-900/50 px-4 py-1.5 text-xs text-rose-700 dark:text-rose-300 mb-6 font-bold shadow-xs">
                  <Crown size={14} className="text-amber-500 fill-amber-500" />
                  <span>India's Trusted Learning Platform</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.14] text-[#0f172a] dark:text-white mb-6">
                  Empowering <br className="hidden sm:inline" />
                  Every Aspirant with{" "}
                  <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#991b1b] via-[#b91c1c] to-[#dc2626] dark:from-red-500 dark:via-rose-400 dark:to-red-400 font-black">
                    Gyan Prapti Academy
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base lg:text-[17px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 font-normal">
                  Supercharge your preparation for Banking, SSC CGL, Railways, UPSC CSAT and more with
                  expert guidance, structured notes and real exam-like practice.
                </p>

                {/* Call-To-Action Buttons */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  {/* Primary CTA */}
                  <Link
                    href="/mock-tests"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#991b1b] to-[#b91c1c] hover:from-[#7f1d1d] hover:to-[#991b1b] text-white font-bold text-sm shadow-lg shadow-red-900/20 hover:shadow-red-900/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <span>Start 120-Min CBT Test</span>
                    <ArrowRight size={16} />
                  </Link>

                  {/* Secondary CTA (Watch Video Modal) */}
                  <button
                    type="button"
                    onClick={() => setIsVideoModalOpen(true)}
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 font-bold text-sm shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#b91c1c] flex items-center justify-center text-white shadow-xs">
                      <Play size={10} className="fill-white translate-x-[0.5px]" />
                    </div>
                    <span>Watch Video</span>
                  </button>
                </div>
              </motion.div>

              {/* Right Column: Clean Student Visual matching Image 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-6 flex items-center justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-[540px]">
                  <img
                    src="/hero-student-clean.png"
                    alt="Gyan Prapti Academy Learning Environment"
                    className="w-full h-auto object-contain drop-shadow-xl select-none transition-transform hover:scale-[1.01]"
                  />
                </div>
              </motion.div>

            </div>

            {/* ============================================================== */}
            {/* 4 FEATURE CARDS ROW (MATCHING IMAGE 1) */}
            {/* ============================================================== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * idx }}
                >
                  <Link
                    href={feature.href}
                    className="h-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/20 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group block"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center border mb-4 transition-transform group-hover:scale-110 shadow-xs ${feature.iconBg}`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1 group-hover:text-red-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                      {feature.desc}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* ============================================================== */}
            {/* BOTTOM BANNER: AI PROCTORED MOCK TEST (MATCHING IMAGE 1) */}
            {/* ============================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 sm:mt-12 rounded-3xl bg-[#07162c] text-white p-6 sm:p-8 lg:p-9 relative overflow-hidden shadow-2xl border border-slate-800"
            >
              {/* Landmark Dome Silhouette Watermark in Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden">
                <img
                  src="/landmark-dome.svg"
                  alt=""
                  className="w-[700px] max-w-none text-sky-200 brightness-150"
                />
              </div>

              {/* Ambient Glows */}
              <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
                
                {/* Banner Left: Title & Subtitle */}
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex flex-wrap items-center justify-center lg:justify-start gap-2">
                    <span>AI Proctored</span>
                    <span className="text-[#f87171]">Mock Test</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300/90 font-medium mt-1.5 flex items-center justify-center lg:justify-start gap-2">
                    <span>Secure</span>
                    <span>•</span>
                    <span>Fair</span>
                    <span>•</span>
                    <span>Real Exam Experience</span>
                  </p>
                </div>

                {/* Banner Center: 3 Metrics in Glass Card */}
                <div className="flex items-center justify-center gap-6 sm:gap-10 py-3 px-6 sm:px-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  {/* Metric 1 */}
                  <div className="flex items-center gap-2.5 sm:gap-3 text-left">
                    <Clock size={24} className="text-sky-300/90 shrink-0" />
                    <div>
                      <div className="text-base sm:text-lg font-black text-white leading-tight">
                        120
                      </div>
                      <div className="text-[11px] text-slate-300 font-medium leading-none">
                        Minutes
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-[1px] h-8 bg-white/15" />

                  {/* Metric 2 */}
                  <div className="flex items-center gap-2.5 sm:gap-3 text-left">
                    <FileText size={24} className="text-sky-300/90 shrink-0" />
                    <div>
                      <div className="text-base sm:text-lg font-black text-white leading-tight">
                        200
                      </div>
                      <div className="text-[11px] text-slate-300 font-medium leading-none">
                        Marks
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-[1px] h-8 bg-white/15" />

                  {/* Metric 3 */}
                  <div className="flex items-center gap-2.5 sm:gap-3 text-left">
                    <ShieldCheck size={24} className="text-sky-300/90 shrink-0" />
                    <div>
                      <div className="text-base sm:text-lg font-black text-white leading-tight">
                        AI
                      </div>
                      <div className="text-[11px] text-slate-300 font-medium leading-none">
                        Proctored
                      </div>
                    </div>
                  </div>
                </div>

                {/* Banner Right: White Pill CTA */}
                <div className="shrink-0">
                  <Link
                    href="/mock-tests"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#b91c1c] font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Start Test</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>

              </div>
            </motion.div>

          </div>
        </section>

        {/* ============================================================== */}
        {/* PLATFORM OVERVIEW & LIVE CBT DEMO SECTION */}
        {/* ============================================================== */}
        <LazySection minHeight="240px">
          <Stats />
        </LazySection>

        {/* 120-Minute Proctored CBT Exam Showcase (Light Red & White Theme) */}
        <LazySection minHeight="500px">
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/80 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors">
            <div className="max-w-7xl mx-auto">
              <div className="rounded-[36px] bg-white dark:bg-gradient-to-br dark:from-[#070b14] dark:via-[#090f1e] dark:to-[#050811] text-slate-900 dark:text-white p-7 sm:p-10 lg:p-14 border border-rose-100 dark:border-slate-800/90 shadow-2xl shadow-rose-950/5 dark:shadow-black/60 relative overflow-hidden">
                
                {/* Subtle Ambient Red Light Arcs & Halos in Light Mode */}
                <div className="absolute -top-24 right-1/4 w-[520px] h-[520px] rounded-full border border-red-200/50 dark:border-red-500/20 bg-red-500/5 dark:bg-red-600/10 blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-28 right-0 w-[450px] h-[450px] rounded-full border border-red-200/40 dark:border-red-500/15 bg-red-500/5 dark:bg-red-600/5 blur-[90px] pointer-events-none" />
                <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-rose-500/5 dark:bg-red-600/10 blur-[120px] pointer-events-none" />

                {/* Subtle Grid Background */}
                <div className="absolute inset-0 bg-[radial-gradient(#e11d480d_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-70" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
                  
                  {/* Left Column: Heading, Badges, Features, Stats */}
                  <div className="lg:col-span-6 space-y-6">
                    {/* Top Pill Tag */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-red-950/40 border border-rose-200 dark:border-red-500/35 text-red-700 dark:text-red-400 text-xs font-black uppercase tracking-wider shadow-xs">
                      <ShieldCheck size={14} className="text-red-600 dark:text-red-400" />
                      <span>EXAM HALL SIMULATOR (LIKE TESTBOOK)</span>
                    </div>

                    {/* Main Headline */}
                    <h2 className="text-3xl sm:text-5xl lg:text-[50px] font-black tracking-tight leading-[1.12] text-slate-900 dark:text-white">
                      Real Exam Environment with{" "}
                      <span className="text-[#dc2626] dark:text-[#ef4444]">120-Min</span> Timer & AI Camera
                    </h2>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                      Experience exact CBT examination patterns for SBI PO, SSC CGL, and RRB NTPC.
                      Features live question palette tracking, instant negative marking calculation,
                      section switching, and camera-based focus analysis.
                    </p>

                    {/* 5 Micro-Feature Icons Row in Clean Red & White */}
                    <div className="grid grid-cols-5 gap-2 sm:gap-3 pt-1 pb-1">
                      {[
                        {
                          icon: <FileText size={18} className="text-red-600 dark:text-red-400" />,
                          title: "Real Exam",
                          sub: "Interface",
                        },
                        {
                          icon: <Clock size={18} className="text-red-600 dark:text-red-400" />,
                          title: "120-Minute",
                          sub: "Timer",
                        },
                        {
                          icon: <Camera size={18} className="text-red-600 dark:text-red-400" />,
                          title: "AI Camera",
                          sub: "Focus Analysis",
                        },
                        {
                          icon: <LayoutGrid size={18} className="text-red-600 dark:text-red-400" />,
                          title: "Live Question",
                          sub: "Palette",
                        },
                        {
                          icon: <BarChart2 size={18} className="text-red-600 dark:text-red-400" />,
                          title: "Instant Result",
                          sub: "Analysis",
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group cursor-default">
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-rose-50/70 dark:bg-white/[0.04] border border-rose-200/70 dark:border-red-500/25 flex items-center justify-center shadow-xs group-hover:border-red-400 group-hover:bg-rose-100/60 group-hover:scale-105 transition-all">
                            {item.icon}
                          </div>
                          <span className="text-[11px] font-bold text-slate-800 dark:text-white mt-2 leading-tight block">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-tight block">
                            {item.sub}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* 2 Feature Cards Row in Clean Red & White */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                      <div className="rounded-2xl bg-gradient-to-br from-rose-50/80 to-white dark:bg-white/[0.03] border border-rose-100 dark:border-white/10 p-4 flex items-center gap-3.5 shadow-xs hover:border-red-300 dark:hover:border-red-500/30 transition">
                        <div className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-600/25">
                          <Timer size={22} />
                        </div>
                        <div>
                          <div className="text-red-700 dark:text-red-400 font-black text-base leading-tight">
                            120 Minutes
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                            Real exam duration countdown
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-gradient-to-br from-emerald-50/80 to-white dark:bg-white/[0.03] border border-emerald-100 dark:border-white/10 p-4 flex items-center gap-3.5 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-500/30 transition">
                        <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/25">
                          <CheckCircle2 size={22} />
                        </div>
                        <div>
                          <div className="text-emerald-700 dark:text-emerald-400 font-black text-base leading-tight">
                            MCQ Format
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                            +1 Correct, -0.25 Negative Marking
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Explore CTA Button & Trust Badges Strip */}
                    <div className="space-y-4 pt-2">
                      <div className="flex flex-wrap items-center gap-4">
                        <Link
                          href="/mock-tests"
                          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-sm shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all"
                        >
                          <span>Explore All Mock Tests</span>
                          <ArrowRight size={16} />
                        </Link>
                      </div>

                      {/* Trust Bar Row */}
                      <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 border-t border-slate-100 dark:border-slate-800">
                        {/* Student Avatars + Metric */}
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2.5">
                            {["Priya", "Rahul", "Anjali", "Aarav"].map((seed, idx) => (
                              <img
                                key={idx}
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                                alt="Student"
                                className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 object-cover shadow-xs"
                              />
                            ))}
                          </div>
                          <div className="text-left">
                            <div className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                              45K+
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-none">
                              Aspirants Practising Daily
                            </div>
                          </div>
                        </div>

                        <div className="hidden sm:block w-[1px] h-6 bg-slate-200 dark:bg-slate-800" />

                        {/* 3 Trust Signals */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700 dark:text-slate-300 font-bold">
                          <div className="flex items-center gap-1.5">
                            <Shield size={14} className="text-red-600 dark:text-red-400" />
                            <span>Trusted Platform</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Zap size={14} className="text-red-600 dark:text-red-400" />
                            <span>Latest Exam Pattern</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Trophy size={14} className="text-red-600 dark:text-red-400" />
                            <span>Detailed Performance Report</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual CBT Mockup in Light Red & White */}
                  <div className="lg:col-span-6 relative">
                    {/* Mounted 3D AI Webcam at Top */}
                    <div className="absolute -top-7 right-10 sm:right-16 z-20 pointer-events-none">
                      <img
                        src="/cbt-webcam-clean.png"
                        alt="AI Proctored Camera"
                        className="w-16 sm:w-20 h-auto object-contain drop-shadow-[0_10px_20px_rgba(239,68,68,0.3)]"
                      />
                    </div>

                    {/* 3D MCQ Checklist Clipboard at Bottom-Right */}
                    <div className="absolute -bottom-8 -right-4 sm:-right-8 z-20 pointer-events-none">
                      <img
                        src="/cbt-clipboard-clean.png"
                        alt="MCQ Checklist"
                        className="w-24 sm:w-28 h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Main CBT Exam Simulator Container (White & Red Theme) */}
                    <div className="rounded-2xl bg-white dark:bg-[#09101d] border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-2xl shadow-rose-950/10 dark:shadow-black/60 space-y-4 relative z-10">
                      
                      {/* Window Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-amber-500" />
                          <div className="w-3 h-3 rounded-full bg-emerald-500" />
                          <span className="ml-2 text-xs font-bold text-slate-800 dark:text-slate-300">
                            GPA CBT Exam Portal
                          </span>
                        </div>
                        <div className="px-3.5 py-1 rounded-full bg-rose-50 dark:bg-red-950/60 border border-rose-200 dark:border-red-500/60 text-red-700 dark:text-red-400 text-xs font-black flex items-center gap-1.5 shadow-xs">
                          <Timer size={13} className="text-red-600 dark:text-red-400 animate-pulse" />
                          <span>Time Left: 119:42</span>
                        </div>
                      </div>

                      {/* Section Dropdown & Question Index */}
                      <div className="flex items-center justify-between text-xs pt-1">
                        <button
                          type="button"
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 font-bold hover:border-slate-300 transition"
                        >
                          <div className="w-4 h-4 rounded bg-red-600 flex items-center justify-center text-white text-[10px]">
                            🔀
                          </div>
                          <span>Section: Quantitative Aptitude</span>
                          <ChevronDown size={13} className="text-slate-500 dark:text-slate-400" />
                        </button>
                        <span className="text-slate-500 dark:text-slate-400 font-medium">Question 1 of 100</span>
                      </div>

                      {/* Question Text */}
                      <div className="py-1">
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                          What is the unit digit of the expression (7^95 - 3^458)?
                        </p>
                      </div>

                      {/* 4 Options Grid (Light Red & White Theme) */}
                      <div className="grid grid-cols-2 gap-2.5 text-xs">
                        <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 flex items-center gap-2.5 text-slate-700 dark:text-slate-300 cursor-pointer transition">
                          <div className="w-3.5 h-3.5 rounded-full border border-slate-400" />
                          <span>A) 4</span>
                        </div>

                        {/* Selected Option B in Red-White Styling */}
                        <div className="p-3 rounded-xl bg-rose-50/90 dark:bg-red-950/25 border-2 border-red-600 text-red-950 dark:text-white font-extrabold flex items-center gap-2.5 cursor-pointer shadow-sm shadow-red-600/15 transition">
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-red-600 flex items-center justify-center bg-white">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                          </div>
                          <span>B) 6 ✓ (Selected)</span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 flex items-center gap-2.5 text-slate-700 dark:text-slate-300 cursor-pointer transition">
                          <div className="w-3.5 h-3.5 rounded-full border border-slate-400" />
                          <span>C) 8</span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 flex items-center gap-2.5 text-slate-700 dark:text-slate-300 cursor-pointer transition">
                          <div className="w-3.5 h-3.5 rounded-full border border-slate-400" />
                          <span>D) 2</span>
                        </div>
                      </div>

                      {/* Question Palette Indicator Legend */}
                      <div className="pt-2 flex items-center gap-5 text-[11px] font-bold">
                        <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                          42 Answered
                        </span>
                        <span className="flex items-center gap-1.5 text-red-700 dark:text-red-400">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                          8 Unanswered
                        </span>
                        <span className="flex items-center gap-1.5 text-purple-700 dark:text-purple-400">
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
                          3 Review
                        </span>
                      </div>

                      {/* Question Palette Number Grid */}
                      <div className="pt-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                          1
                        </div>
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-600 text-white font-black text-xs flex items-center justify-center shadow-xs ring-2 ring-red-300 dark:ring-red-400/50">
                          2
                        </div>
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center">
                          3
                        </div>
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center">
                          4
                        </div>
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                          5
                        </div>
                        {[6, 7, 8, 9, 10].map((num) => (
                          <div
                            key={num}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center"
                          >
                            {num}
                          </div>
                        ))}
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 font-bold text-xs flex items-center justify-center">
                          ...
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
        </LazySection>

        {/* Categories Section */}
        <LazySection minHeight="380px">
          <ExamCategories />
        </LazySection>

        {/* Best Selling Courses Section */}
        <LazySection minHeight="450px">
          <PremiumCourses />
        </LazySection>

        {/* Free Video Playlists & Notes Section */}
        <LazySection minHeight="500px">
          <FreeNotes />
        </LazySection>

        {/* Testimonials */}
        <LazySection minHeight="350px">
          <Testimonials />
        </LazySection>

        {/* FAQs */}
        <LazySection minHeight="350px">
          <FaqSection />
        </LazySection>

        {/* Call to Action Banner (Matching Reference Image 1 Exactly) */}
        <LazySection minHeight="320px">
          <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-950/60 transition-colors duration-200 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="relative rounded-[36px] bg-gradient-to-b from-[#f0f6ff] via-white to-[#e8f2fe] dark:from-[#091322] dark:via-[#070e1a] dark:to-[#0a1628] border border-blue-100/80 dark:border-blue-900/40 p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl shadow-blue-900/5 dark:shadow-black/60">
                
                {/* Subtle Ambient Background Light Arcs & Wave Accents */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
                
                {/* Bottom Organic Blue Waves */}
                <div className="absolute -bottom-10 left-0 right-0 h-28 bg-gradient-to-t from-blue-500/15 via-blue-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

                {/* Left 3D Illustration: Graduation Cap + Stack of Books + Pen Holder */}
                <div className="absolute left-[-15px] sm:left-4 lg:left-8 bottom-[-10px] sm:bottom-0 w-44 sm:w-60 lg:w-72 h-auto pointer-events-none select-none z-10 hidden md:block">
                  <img
                    src="/cta-illustration-left.png"
                    alt="Study Stack with Graduation Cap"
                    className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Right 3D Illustration: Target Dartboard + Podium + Plant + Lightbulb */}
                <div className="absolute right-[-15px] sm:right-4 lg:right-8 bottom-[-10px] sm:bottom-0 w-44 sm:w-60 lg:w-72 h-auto pointer-events-none select-none z-10 hidden md:block">
                  <img
                    src="/cta-illustration-right.png"
                    alt="Exam Target Goal & Inspiration"
                    className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Center Content Area */}
                <div className="max-w-3xl mx-auto text-center relative z-20 space-y-6">
                  {/* Top Rocket Pill Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/60 border border-blue-200/90 dark:border-blue-800/60 text-slate-800 dark:text-blue-200 text-xs font-black uppercase tracking-wider shadow-2xs">
                    <Rocket size={14} className="text-rose-500 fill-rose-500" />
                    <span>START YOUR TRANSFORMATION TODAY</span>
                  </div>

                  {/* Main Headline with Highlighted 'Competitive Exam?' */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                    Ready to Crack Your{" "}
                    <br className="hidden sm:inline" />
                    Next{" "}
                    <span className="relative inline-block text-blue-600 dark:text-blue-400">
                      Competitive Exam?
                      <svg
                        className="absolute -bottom-1.5 left-0 w-full h-2.5 text-blue-500/80 pointer-events-none"
                        viewBox="0 0 100 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 9C30 3 70 3 98 9"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </h2>

                  {/* Subtitle Description */}
                  <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto text-sm sm:text-base font-medium leading-relaxed">
                    Join thousands of aspirants preparing with Gyan Prapti Academy’s official lectures,
                    test series, and personalized performance tracking.
                  </p>

                  {/* Dual Call-to-Action Pill Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
                    {/* Primary Red Button */}
                    <Link
                      href="/register"
                      className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-sm shadow-xl shadow-red-600/35 hover:scale-105 active:scale-95 transition-all"
                    >
                      <UserPlus size={16} strokeWidth={2.5} />
                      <span>Create Free Student Account</span>
                      <ArrowRight size={16} strokeWidth={2.5} />
                    </Link>

                    {/* Secondary White Button */}
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm shadow-md hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:scale-105 active:scale-95 transition-all"
                    >
                      <span>Sign In to Dashboard</span>
                      <ArrowRight size={16} strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </LazySection>
      </main>

      <Footer />

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white">
                    <Play size={13} className="fill-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Gyan Prapti Academy Orientation</h3>
                    <p className="text-[10px] text-slate-400">Official YouTube Video Channel</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative pt-[56.25%] bg-black">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/P6ift-kfenw?autoplay=1&rel=0"
                  title="Gyan Prapti Academy Orientation & Strategy Masterclass"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-4 bg-slate-950 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">
                  Watch structured playlists for Banking, SSC CGL & Railways on our official channel.
                </span>
                <a
                  href={GPA_YOUTUBE_CHANNEL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold shrink-0 transition"
                >
                  <span>Open YouTube Channel</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
