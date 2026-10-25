import React, { useState } from "react";
import { BookOpen, CheckCircle2, PlusCircle } from "lucide-react";
import { ExamCategory, CourseLevel } from "@/utils/types";
export default function CreateCoursePage() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState(ExamCategory.BANKING);
    const [level, setLevel] = useState(CourseLevel.BEGINNER);
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState("");
    const [success, setSuccess] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !price || !duration)
            return;
        // Persists nowhere yet — this is a UI-only mock flow until the admin
        // dashboard is wired to the real /api/courses endpoint.
        setSuccess(true);
        setTitle("");
        setPrice("");
        setDuration("");
        setDescription("");
        setTimeout(() => setSuccess(false), 4000);
    };
    return (<div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
          <BookOpen size={14}/> Course Catalogue
        </div>
        <h1 className="mt-1 text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Create a New Course
        </h1>
        <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          Publish a new course bundle for GPA aspirants to discover and enrol in.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-xl shadow-slate-100 dark:shadow-black/30">
        {success && (<div className="mb-5 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400"/> Course draft saved. It will appear in Manage Courses.
          </div>)}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Course Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. RRB NTPC Complete Success Path" className="mt-1.5 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-xs text-slate-900 dark:text-white outline-none focus:border-red-500 focus:bg-white dark:focus:bg-slate-900 transition"/>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1.5 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-xs text-slate-900 dark:text-white outline-none font-medium">
                {Object.values(ExamCategory).map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Level</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)} className="mt-1.5 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-xs text-slate-900 dark:text-white outline-none font-medium">
                {Object.values(CourseLevel).map((l) => (<option key={l} value={l}>{l}</option>))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Price (₹)</label>
              <input type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="999" className="mt-1.5 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-xs text-slate-900 dark:text-white outline-none focus:border-red-500 transition"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Duration</label>
              <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required placeholder="e.g. 8 Weeks (32 Lectures)" className="mt-1.5 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-xs text-slate-900 dark:text-white outline-none focus:border-red-500 transition"/>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Short Description</label>
            <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write a brief course description covering syllabus and outcomes." className="mt-1.5 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-xs text-slate-900 dark:text-white outline-none focus:border-red-500 focus:bg-white dark:focus:bg-slate-900 transition resize-none"/>
          </div>

          <button type="submit" className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 py-3.5 px-5 text-xs font-bold text-white transition hover:scale-[1.02] shadow-lg shadow-red-500/20">
            <PlusCircle size={14}/> Save Course
          </button>
        </form>
      </div>
    </div>);
}
