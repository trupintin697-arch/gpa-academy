import React, { useMemo, useState } from "react";
import Link from "next/link";
import { mockCourses } from "@/data/mock-data";
import { Search, Star, IndianRupee, Pencil, Archive, Eye, Plus, } from "lucide-react";
export default function ManageCoursesPage() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("All");
    const categories = useMemo(() => ["All", ...Array.from(new Set(mockCourses.map((c) => c.category)))], []);
    const filtered = mockCourses.filter((course) => {
        const matchesQuery = course.title.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === "All" || course.category === category;
        return matchesQuery && matchesCategory;
    });
    return (<div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
            Course Catalogue
          </div>
          <h1 className="mt-1 text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            Manage Courses
          </h1>
          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Review pricing, enrolment, and publish status across all GPA course bundles.
          </p>
        </div>
        <Link href="/dashboard/admin/create-course" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-red-500/20 transition hover:scale-[1.02]">
          <Plus size={14}/> Add New Course
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses by title..." className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-10 pr-4 py-3 text-xs font-medium text-slate-900 dark:text-white outline-none focus:border-red-500 transition"/>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (<button key={cat} type="button" onClick={() => setCategory(cat)} className={`px-3.5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition ${category === cat
                ? "bg-red-600 text-white shadow-md shadow-red-600/25"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-500/40"}`}>
              {cat}
            </button>))}
        </div>
      </div>

      {/* Course cards */}
      <div className="space-y-4">
        {filtered.length === 0 && (<div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
            No courses match your search.
          </div>)}

        {filtered.map((course) => (<div key={course.id} className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-md shadow-slate-100 dark:shadow-black/30 hover:border-red-300 dark:hover:border-red-500/30 transition">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-100 dark:border-red-500/20">
                    {course.category}
                  </span>
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${course.isPublished
                ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20"
                : "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20"}`}>
                    {course.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                  {course.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Star size={13} className="fill-amber-400 text-amber-400"/> {course.rating} ({course.totalRatings})
                  </span>
                  <span>{course.duration}</span>
                  <span className="flex items-center gap-1">
                    <IndianRupee size={12}/> {(course.price / 100).toFixed(0)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link href={`/courses/${course.slug}`} target="_blank" className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition" title="View live page">
                  <Eye size={15}/>
                </Link>
                <button type="button" className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition" title="Edit course">
                  <Pencil size={15}/>
                </button>
                <button type="button" className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition" title="Archive course">
                  <Archive size={15}/>
                </button>
              </div>
            </div>
          </div>))}
      </div>
    </div>);
}
