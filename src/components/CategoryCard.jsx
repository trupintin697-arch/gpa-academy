import Link from "next/link";
import TiltCard from "./TiltCard";
import { Landmark, Briefcase, Train, Compass, ArrowRight, Check } from "lucide-react";

export default function CategoryCard({ label, description, path }) {
  const norm = label.toLowerCase();

  // Color config matching the reference design exactly
  const config = norm.includes("bank")
    ? {
        themeKey: "banking",
        accent: "text-rose-600 dark:text-rose-400",
        badgeBg: "bg-rose-100/80 dark:bg-rose-950/60",
        badgeText: "text-rose-700 dark:text-rose-300",
        badgeBorder: "border-rose-200 dark:border-rose-800/60",
        iconBg: "bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-950/50 dark:to-rose-900/30",
        iconBorder: "border-rose-200/90 dark:border-rose-800/60",
        iconColor: "text-rose-600 dark:text-rose-400",
        icon: Landmark,
        cardBg: "bg-gradient-to-b from-[#fff7f8] via-white to-[#fef0f2] dark:from-[#180d12] dark:via-[#12090e] dark:to-[#1a0a13]",
        cardBorder: "border-rose-200/70 hover:border-rose-400 dark:border-rose-900/50 dark:hover:border-rose-600",
        cardShadow: "shadow-lg shadow-rose-900/5 hover:shadow-2xl hover:shadow-rose-600/15",
        haloBg: "bg-rose-500/15 dark:bg-rose-500/20",
        btnGradient: "bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#9f1239] shadow-md shadow-rose-600/25",
        imgSrc: "/cat-banking-3d.png",
        imgAlt: "3D Banking Academy",
        titlePrefix: "Banking",
        titleSuffix: "Exams",
        shortDesc: "Comprehensive syllabus for SBI PO, IBPS PO, Clerk, RBI & RRB.",
      }
    : norm.includes("ssc")
    ? {
        themeKey: "ssc",
        accent: "text-blue-600 dark:text-blue-400",
        badgeBg: "bg-blue-100/80 dark:bg-blue-950/60",
        badgeText: "text-blue-700 dark:text-blue-300",
        badgeBorder: "border-blue-200 dark:border-blue-800/60",
        iconBg: "bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-950/50 dark:to-blue-900/30",
        iconBorder: "border-blue-200/90 dark:border-blue-800/60",
        iconColor: "text-blue-600 dark:text-blue-400",
        icon: Briefcase,
        cardBg: "bg-gradient-to-b from-[#f5f9ff] via-white to-[#edf5ff] dark:from-[#0a1222] dark:via-[#070d18] dark:to-[#0b1424]",
        cardBorder: "border-blue-200/70 hover:border-blue-400 dark:border-blue-900/50 dark:hover:border-blue-600",
        cardShadow: "shadow-lg shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-600/15",
        haloBg: "bg-blue-500/15 dark:bg-blue-500/20",
        btnGradient: "bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] shadow-md shadow-blue-600/25",
        imgSrc: "/cat-ssc-3d.png",
        imgAlt: "3D SSC Exam Series",
        titlePrefix: "SSC",
        titleSuffix: "Exams",
        shortDesc: "CGL, CHSL, CPO, MTS & GD with structured mock series & tricks.",
      }
    : norm.includes("rail")
    ? {
        themeKey: "railway",
        accent: "text-amber-600 dark:text-amber-400",
        badgeBg: "bg-amber-100/80 dark:bg-amber-950/60",
        badgeText: "text-amber-700 dark:text-amber-300",
        badgeBorder: "border-amber-200 dark:border-amber-800/60",
        iconBg: "bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950/50 dark:to-amber-900/30",
        iconBorder: "border-amber-200/90 dark:border-amber-800/60",
        iconColor: "text-amber-600 dark:text-amber-400",
        icon: Train,
        cardBg: "bg-gradient-to-b from-[#fffbf2] via-white to-[#fef6e6] dark:from-[#1a1409] dark:via-[#130e06] dark:to-[#1b1509]",
        cardBorder: "border-amber-200/70 hover:border-amber-400 dark:border-amber-900/50 dark:hover:border-amber-600",
        cardShadow: "shadow-lg shadow-amber-900/5 hover:shadow-2xl hover:shadow-amber-600/15",
        haloBg: "bg-amber-500/15 dark:bg-amber-500/20",
        btnGradient: "bg-gradient-to-r from-[#f59e0b] to-[#d97706] hover:from-[#d97706] hover:to-[#b45309] shadow-md shadow-amber-600/25",
        imgSrc: "/cat-railway-3d.png",
        imgAlt: "3D Railway RRB Mock Test",
        titlePrefix: "Railway",
        titleSuffix: "Exams",
        shortDesc: "Specialized coaching for RRB NTPC, Group D, ALP & Technician.",
      }
    : {
        themeKey: "upsc",
        accent: "text-purple-600 dark:text-purple-400",
        badgeBg: "bg-purple-100/80 dark:bg-purple-950/60",
        badgeText: "text-purple-700 dark:text-purple-300",
        badgeBorder: "border-purple-200 dark:border-purple-800/60",
        iconBg: "bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-950/50 dark:to-purple-900/30",
        iconBorder: "border-purple-200/90 dark:border-purple-800/60",
        iconColor: "text-purple-600 dark:text-purple-400",
        icon: Compass,
        cardBg: "bg-gradient-to-b from-[#faf5ff] via-white to-[#f5edff] dark:from-[#160d22] dark:via-[#100918] dark:to-[#170e24]",
        cardBorder: "border-purple-200/70 hover:border-purple-400 dark:border-purple-900/50 dark:hover:border-purple-600",
        cardShadow: "shadow-lg shadow-purple-900/5 hover:shadow-2xl hover:shadow-purple-600/15",
        haloBg: "bg-purple-500/15 dark:bg-purple-500/20",
        btnGradient: "bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] hover:from-[#6d28d9] hover:to-[#5b21b6] shadow-md shadow-purple-600/25",
        imgSrc: "/cat-upsc-3d.png",
        imgAlt: "3D UPSC CSAT Syllabus",
        titlePrefix: "UPSC",
        titleSuffix: "CSAT",
        shortDesc: "High-impact CSAT preparation covering Comprehension & Reasoning.",
      };

  const IconComponent = config.icon;

  return (
    <TiltCard className="rounded-[28px] transition-all duration-300">
      <Link
        href={path}
        className={`group relative flex h-full flex-col justify-between rounded-[28px] ${config.cardBg} border ${config.cardBorder} p-6 sm:p-7 ${config.cardShadow} transition-all duration-300 overflow-hidden`}
      >
        {/* Soft Ambient Halo */}
        <div
          className={`absolute -top-12 -right-12 w-36 h-36 ${config.haloBg} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`}
        />

        {/* Top Row: Squircle Icon & Verified Track Badge */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-5">
            {/* Squircle Icon */}
            <div
              className={`w-12 h-12 rounded-2xl ${config.iconBg} border ${config.iconBorder} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300`}
            >
              <IconComponent size={22} className={config.iconColor} />
            </div>

            {/* Verified Track Badge */}
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${config.badgeBg} border ${config.badgeBorder} ${config.badgeText} text-[10px] font-black uppercase tracking-wider shadow-2xs`}
            >
              <Check size={12} strokeWidth={3} className="shrink-0" />
              <span>VERIFIED TRACK</span>
            </div>
          </div>

          {/* Subtitle / Kicker */}
          <p
            className={`text-[11px] uppercase tracking-[0.24em] ${config.accent} font-extrabold mb-1`}
          >
            SPECIALIZED PREP
          </p>

          {/* Main Title */}
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            <span className={config.accent}>{config.titlePrefix} </span>
            <span className="text-slate-800 dark:text-slate-100">{config.titleSuffix}</span>
          </h3>

          {/* Middle Content: Description text & 3D Illustration */}
          <div className="relative min-h-[110px] mt-2 mb-4">
            {/* Description text */}
            <p className="text-xs sm:text-[13px] leading-relaxed text-slate-600 dark:text-slate-300 font-medium pr-24 z-10 relative">
              {description || config.shortDesc}
            </p>

            {/* 3D Illustration Graphic */}
            <div className="absolute right-[-10px] bottom-[-15px] w-28 h-28 pointer-events-none z-0 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 ease-out">
              <img
                src={config.imgSrc}
                alt={config.imgAlt}
                className="w-full h-full object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.12)]"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Bottom CTA: Solid Gradient Pill Button matching Image 1 */}
        <div className="mt-4 pt-2 z-10 relative">
          <div
            className={`w-full py-2.5 px-4 rounded-full ${config.btnGradient} text-white flex items-center justify-between font-bold text-xs shadow-md transition-all duration-300 group-hover:shadow-lg`}
          >
            <span className="tracking-wide">Explore syllabus & tests</span>
            <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-slate-900 flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={13} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
