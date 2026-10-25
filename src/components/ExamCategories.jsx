"use client";

import { useState, useEffect } from "react";
import CategoryCard from "@/components/CategoryCard";
import { getExamCategories, defaultExamCategories } from "@/utils/content-store";

export default function ExamCategories() {
  const [examCategories, setExamCategories] = useState(defaultExamCategories);

  useEffect(() => {
    setExamCategories(getExamCategories());
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/70 dark:bg-slate-950/80 transition-colors duration-200 relative overflow-hidden">
      {/* Background Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-rose-500/5 dark:bg-rose-500/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header matching Image 1 */}
        <div className="mb-14 text-center">
          {/* Tag with accents: — EXAM CATEGORIES — */}
          <div className="inline-flex items-center gap-2 justify-center">
            <span className="w-6 h-[2px] bg-rose-500" />
            <span className="text-xs uppercase tracking-[0.28em] text-red-600 dark:text-red-400 font-extrabold">
              EXAM CATEGORIES
            </span>
            <span className="w-6 h-[2px] bg-rose-500" />
          </div>

          {/* Heading with styled 'target' */}
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Choose your{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-red-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                target
              </span>
              <svg
                className="absolute -bottom-1.5 left-0 w-full h-2 text-rose-500/60 pointer-events-none"
                viewBox="0 0 100 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8C25 3 75 3 98 8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            exam path.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal">
            Select your goal and access curated syllabus, comprehensive video lectures, topic-wise notes, and full-length simulated CBT mocks.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {examCategories.map((category) => (
            <CategoryCard key={category.label} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
