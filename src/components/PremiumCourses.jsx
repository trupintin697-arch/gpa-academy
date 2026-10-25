"use client";
import { useState, useEffect } from "react";
import CourseCard from "@/components/CourseCard";
import { getFeaturedCourses, defaultFeaturedCourses } from "@/utils/content-store";
export default function PremiumCourses() {
    // Editable from Admin → Design → Courses, so the site owner can rewrite
    // these without touching source code.
    const [featuredCourses, setFeaturedCourses] = useState(defaultFeaturedCourses);
    useEffect(() => {
        setFeaturedCourses(getFeaturedCourses());
    }, []);
    return (<section className="bg-white dark:bg-slate-900 py-24 px-6 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-red-600 dark:text-red-400 font-extrabold">Premium Learning</p>
            <h2 className="mt-2 text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">Our best-selling courses.</h2>
          </div>
          <a href="/courses" className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-xs font-bold text-slate-700 dark:text-slate-200 transition hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-red-600 dark:hover:text-red-400">
            View all courses →
          </a>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course) => (<CourseCard key={course.id} course={course}/>))}
        </div>
      </div>
    </section>);
}
