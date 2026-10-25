"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  Phone,
  Target,
  Tv,
  Users2,
  CheckCircle2,
  ShieldCheck,
  Video,
  FileText,
  Award,
  Smartphone,
  Shield,
  FileCheck,
  RotateCcw,
  Lock,
  AlertCircle,
} from "lucide-react";

export default function AboutPage() {
  const missionPoints = [
    {
      title: "Exam Pattern Focused",
      desc: "Updated monthly to mirror latest TCS & NTA syllabus changes.",
      icon: Target,
      color: "bg-rose-50 border-rose-100 text-rose-600 dark:bg-rose-950/60 dark:border-rose-900/60 dark:text-rose-400",
    },
    {
      title: "Live AI Proctoring",
      desc: "Supervised 120-minute mock exam simulations with webcam & tab tracking.",
      icon: Tv,
      color: "bg-rose-50 border-rose-100 text-rose-600 dark:bg-rose-950/60 dark:border-rose-900/60 dark:text-rose-400",
    },
    {
      title: "Expert Faculty",
      desc: "Led by Dr. Rajesh Kumar with dedicated doubt solving and mentorship.",
      icon: Users2,
      color: "bg-rose-50 border-rose-100 text-rose-600 dark:bg-rose-950/60 dark:border-rose-900/60 dark:text-rose-400",
    },
  ];

  const statCards = [
    {
      src: "/about-stat-card-1.png",
      alt: "45,000+ Active Aspirants",
      number: "45,000+",
      label: "Active Aspirants",
    },
    {
      src: "/about-stat-card-2.png",
      alt: "120+ Full CBT Mock Tests",
      number: "120+",
      label: "Full CBT Mock Tests",
    },
    {
      src: "/about-stat-card-3.png",
      alt: "250+ Curated Video Lessons",
      number: "250+",
      label: "Curated Video Lessons",
    },
    {
      src: "/about-stat-card-4.png",
      alt: "98.4% Satisfaction Rate",
      number: "98.4%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* ============================================================== */}
        {/* MAIN ABOUT HERO SECTION MATCHING REFERENCE IMAGE 2 EXACTLY */}
        {/* ============================================================== */}
        <div className="relative mb-10 overflow-hidden">
          {/* Subtle Ambient Background Halo */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-rose-200/30 to-pink-200/10 rounded-full blur-3xl pointer-events-none" />

          {/* 3-Column Layout: Left Text (5 cols), Center Student Illustration (3.5 cols), Right Mission Card (3.5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center relative z-10">
            
            {/* ------------------------------------------------------------ */}
            {/* Left Column: Heading, Subtitle & Buttons (5 Columns) */}
            {/* ------------------------------------------------------------ */}
            <div className="lg:col-span-5 space-y-6">
              {/* Top Pill Tag matching Reference Image */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200/80 dark:border-rose-900/60 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-wider shadow-2xs">
                <BookOpen size={13} className="text-red-600" />
                <span>ABOUT GYAN PRAPTI ACADEMY</span>
              </div>

              {/* Main Headline with Red Accents matching Image 2 */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                India&apos;s premier edtech portal for{" "}
                <span className="text-[#dc2626] dark:text-[#ef4444]">
                  Banking, SSC, Railway
                </span>{" "}
                &amp; UPSC CSAT.
              </h1>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                Gyan Prapti Academy combines top faculty coaching, exam-grade CBT proctored
                practice, and dedicated YouTube lecture series to deliver an uncompromising
                preparation standard for every aspirant across India.
              </p>

              {/* Dual Action Buttons matching Image 2 */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {/* Red Button: Explore All Courses */}
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-xs shadow-xl shadow-red-600/35 hover:scale-105 active:scale-95 transition-all"
                >
                  <BookOpen size={15} />
                  <span>Explore All Courses</span>
                  <ArrowRight size={14} strokeWidth={2.5} />
                </Link>

                {/* White Button: Contact Admissions */}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:scale-105 active:scale-95 transition-all"
                >
                  <Phone size={14} className="text-red-600" />
                  <span>Contact Admissions</span>
                  <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* Center Column: Inspiring Student Visual with Badges (3 Columns) */}
            {/* ------------------------------------------------------------ */}
            <div className="lg:col-span-3 flex items-center justify-center relative">
              <div className="relative w-full max-w-[280px] select-none pointer-events-none group">
                <img
                  src="/about-student-art.png"
                  alt="Gyan Prapti Academy Student - Your Govt. Job Starts Here"
                  className="w-full h-auto object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* Right Column: "Our Core Mission" Rounded Card (4 Columns) */}
            {/* ------------------------------------------------------------ */}
            <div className="lg:col-span-4">
              <div className="rounded-[36px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-7 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-black/50 relative overflow-hidden group">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Our Core Mission
                </h2>

                <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                  To bridge the gap between academic study and competitive exam mastery through
                  structured video curriculums, authentic 120-minute timed mock tests, and instant analytics.
                </p>

                {/* 3 Key Mission Points with Colored Squircle Icons */}
                <div className="mt-6 space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {missionPoints.map((point, idx) => {
                    const IconComp = point.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3.5">
                        <div
                          className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 border ${point.color} shadow-2xs`}
                        >
                          <IconComp size={16} strokeWidth={2.5} />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">
                            {point.title}
                          </h3>
                          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 leading-snug">
                            {point.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM STATS STRIP WITH WATERMARK GRAPHICS MATCHING IMAGE 2 */}
        {/* ============================================================== */}
        <div className="rounded-[32px] bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800/80 p-3 sm:p-4 shadow-xl shadow-slate-200/30 dark:shadow-black/30 backdrop-blur-md mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {statCards.map((card, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 bg-white dark:bg-slate-900"
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  className="w-full h-auto object-cover select-none"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* METHODOLOGY & EXAM ADVANTAGE SECTION */}
        {/* ============================================================== */}
        <div className="rounded-[36px] bg-gradient-to-br from-slate-900 via-[#07162c] to-slate-900 text-white p-8 sm:p-12 lg:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Watermark silhouette */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <img src="/landmark-dome.svg" alt="" className="w-[800px] max-w-none brightness-150" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4 mb-10">
            <span className="text-xs uppercase font-extrabold tracking-[0.24em] text-red-400">
              LEARNING ADVANTAGE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Why 45,000+ Aspirants Trust Gyan Prapti Academy
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Purpose-engineered exam hall simulation, YouTube topic masterclasses, and verified shortcuts designed to maximize your rank in TCS &amp; NTA conducted examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center mb-4">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">120-Min CBT Timer</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Realistic exam hall simulator with negative marking, question status palette, and live camera AI supervision.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                <Video size={20} />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">Free YouTube Playlists</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Integrated playlists from @gpa-gyanpraptiacademy covering Vedic Maths, CSAT, and Reasoning floor puzzles.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <FileText size={20} />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">PDF Formula Sheets</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Downloadable high-yield formula sheets and shortcut notes accessible anytime on desktop or mobile.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center relative z-10">
            <Link
              href="/mock-tests"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-xl shadow-red-600/40 hover:scale-105 transition-all"
            >
              <span>Take Free Diagnostic Mock Test</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MOBILE APP SECTION (#mobile-app) */}
        {/* ============================================================== */}
        <div id="mobile-app" className="mt-16 rounded-[32px] bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-8 sm:p-12 shadow-xl shadow-red-600/20 relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
              <Smartphone size={14} /> Official GPA Android &amp; iOS App
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Carry Gyan Prapti Academy in Your Pocket
            </h2>
            <p className="text-white/90 text-sm leading-relaxed">
              Experience uninterrupted mock exam simulations, instant notifications for new PDF notes, and offline revision videos on mobile. Our mobile applications are currently in staging rollout for Google Play and Apple App Store.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/free-notes"
                className="px-5 py-2.5 rounded-xl bg-white text-red-600 hover:bg-red-50 font-black text-xs transition shadow-md"
              >
                Access Web Platform
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-xl bg-red-800/60 hover:bg-red-800 text-white font-bold text-xs transition border border-white/20"
              >
                Join Mobile Beta Waitlist
              </Link>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* LEGAL POLICIES & COMPLIANCE (#policies) */}
        {/* ============================================================== */}
        <div id="policies" className="mt-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-red-600 dark:text-red-400">
              TRUST &amp; TRANSPARENCY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Institutional Policies &amp; Terms
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Clear guidelines protecting your learning data, subscriptions, and intellectual property.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Privacy Policy */}
            <div id="privacy" className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center">
                <Shield size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Privacy Policy</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Gyan Prapti Academy values your confidentiality. We never sell, rent, or lease student profiles, contact credentials, or mock test results to third parties. All proctored camera telemetry is analyzed locally or on secure end-to-end encrypted servers.
              </p>
            </div>

            {/* Terms of Service */}
            <div id="terms" className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <FileCheck size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Terms of Service</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                All platform materials, including question papers, video masterclasses, and curated notes are the proprietary copyright of GPA. Commercial redistribution, scraping, or multi-user account sharing is strictly prohibited under our fair academic use terms.
              </p>
            </div>

            {/* Refund Policy */}
            <div id="refund" className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <RotateCcw size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Refund Policy</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Digital mock test series, crash courses, and enrollment passes are eligible for full refund within 48 hours of purchase if no more than one test has been attempted. Please submit requests via our contact helpdesk.
              </p>
            </div>

            {/* Cookie Policy */}
            <div id="cookies" className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Lock size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Cookie Policy</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                We utilize essential functional cookies to keep you signed in, preserve your light/dark theme preference, and remember your in-progress mock examination answers in case of momentary connection drops.
              </p>
            </div>

            {/* Disclaimer */}
            <div id="disclaimer" className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 md:col-span-2 lg:col-span-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <AlertCircle size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Institutional Disclaimer</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Gyan Prapti Academy is an independent preparatory academy and online educational provider. We are not officially affiliated with, endorsed by, or representing the Staff Selection Commission (SSC), Institute of Banking Personnel Selection (IBPS), Railway Recruitment Boards (RRB), or UPSC. All exam trademarks belong to their respective statutory bodies.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
