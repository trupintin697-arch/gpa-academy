"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Users, Video, Trophy, CheckCircle, TrendingUp } from "lucide-react";

function AnimatedCounter({ value }) {
  const match = value.match(/(\d+)(.*)/);
  const num = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });

  useEffect(() => {
    if (isInView) {
      spring.set(num);
    }
  }, [isInView, spring, num]);

  const display = useTransform(spring, (current) => Math.floor(current) + suffix);
  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function Stats() {
  const stats = [
    {
      value: "15K+",
      label: "ACTIVE LEARNERS",
      subtext: "Aspirants trained across India",
      icon: <Users size={22} className="text-white" />,
      iconBg: "bg-gradient-to-br from-[#f43f5e] to-[#e11d48]",
      iconShadow: "shadow-rose-500/30",
      illustration: "/stat-icon-1.png",
      waveGradId: "roseWave",
      waveColors: ["#f43f5e", "#e11d48"],
      glowColor: "bg-rose-500/30",
      borderColor: "border-rose-100/80 dark:border-rose-950/40",
      hoverGlow: "hover:shadow-rose-500/20",
    },
    {
      value: "120+",
      label: "GPA YOUTUBE LECTURES",
      subtext: "High-yield video masterclasses",
      icon: <Video size={22} className="text-white" />,
      iconBg: "bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8]",
      iconShadow: "shadow-blue-500/30",
      illustration: "/stat-icon-2.png",
      waveGradId: "blueWave",
      waveColors: ["#38bdf8", "#2563eb"],
      glowColor: "bg-blue-500/30",
      borderColor: "border-blue-100/80 dark:border-blue-950/40",
      hoverGlow: "hover:shadow-blue-500/20",
    },
    {
      value: "98%",
      label: "EXAM SUCCESS RATE",
      subtext: "In competitive exams & CBTs",
      icon: <Trophy size={22} className="text-white" />,
      iconBg: "bg-gradient-to-br from-[#f59e0b] to-[#ea580c]",
      iconShadow: "shadow-amber-500/30",
      illustration: "/stat-icon-3.png",
      waveGradId: "amberWave",
      waveColors: ["#fbbf24", "#ea580c"],
      glowColor: "bg-amber-500/30",
      borderColor: "border-amber-100/80 dark:border-amber-950/40",
      hoverGlow: "hover:shadow-amber-500/20",
    },
    {
      value: "45K+",
      label: "MOCK TESTS ATTEMPTED",
      subtext: "Curated formulas & notes",
      icon: <CheckCircle size={22} className="text-white" />,
      iconBg: "bg-gradient-to-br from-[#10b981] to-[#059669]",
      iconShadow: "shadow-emerald-500/30",
      illustration: "/stat-icon-4.png",
      waveGradId: "greenWave",
      waveColors: ["#34d399", "#059669"],
      glowColor: "bg-emerald-500/30",
      borderColor: "border-emerald-100/80 dark:border-emerald-950/40",
      hoverGlow: "hover:shadow-emerald-500/20",
    },
  ];

  return (
    <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative group"
            >
              {/* Vibrant Colored Glow Underneath Card matching Image 2 */}
              <div
                className={`absolute -bottom-3 inset-x-4 h-12 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none -z-10 ${stat.glowColor}`}
              />

              {/* Main Card Container */}
              <div
                className={`relative overflow-hidden rounded-[26px] bg-white dark:bg-slate-900 border ${stat.borderColor} p-6 pb-9 shadow-lg shadow-slate-200/50 dark:shadow-black/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${stat.hoverGlow}`}
              >
                {/* Top Row: Squircle Gradient Icon + Live Data Pill */}
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${stat.iconBg} ${stat.iconShadow} transition-transform group-hover:scale-105`}
                  >
                    {stat.icon}
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full bg-emerald-50/80 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800/60 shadow-xs">
                    <TrendingUp size={12} className="text-emerald-500" />
                    Live Data
                  </span>
                </div>

                {/* Content Row with 3D Illustration on Right */}
                <div className="relative z-10 pr-16 min-h-[96px] flex flex-col justify-center">
                  <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                    <AnimatedCounter value={stat.value} />
                  </h3>

                  <div className="mt-1.5 text-xs font-black uppercase tracking-wider text-[#dc2626] dark:text-red-400">
                    {stat.label}
                  </div>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {stat.subtext}
                  </p>
                </div>

                {/* 3D Illustration Graphic (Bottom Right) matching Image 2 */}
                <div className="absolute right-2 bottom-5 z-10 pointer-events-none">
                  <img
                    src={stat.illustration}
                    alt={stat.label}
                    className="w-[78px] h-auto object-contain drop-shadow-md group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300"
                  />
                </div>

                {/* Bottom Wave Swoosh Curve matching Image 2 */}
                <svg
                  viewBox="0 0 280 44"
                  preserveAspectRatio="none"
                  className="w-full h-9 absolute bottom-0 left-0 right-0 pointer-events-none z-0"
                >
                  <defs>
                    <linearGradient id={stat.waveGradId} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={stat.waveColors[0]} />
                      <stop offset="100%" stopColor={stat.waveColors[1]} />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,34 C70,36 170,25 280,6 L280,44 L0,44 Z"
                    fill={`url(#${stat.waveGradId})`}
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
