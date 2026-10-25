"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { mockCourses } from "@/data/mock-data";
import { Search, Sparkles, BookOpen } from "lucide-react";

export default function CoursesPage() {
    const [searchParams] = useSearchParams();
    const queryCategory = searchParams.get("category");
    
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    
    useEffect(() => {
        if (queryCategory) {
            const catMap = {
                banking: "Banking",
                ssc: "SSC",
                railway: "Railways",
                railways: "Railways",
                csat: "UPSC CSAT",
                upsc: "UPSC CSAT",
            };
            const mapped = catMap[queryCategory.toLowerCase()] || queryCategory;
            setSelectedCategory(mapped);
        }
    }, [queryCategory]);

    const categories = ["All", "Banking", "SSC", "Railways", "UPSC CSAT", "Campus Placement", "Vedic Maths"];
    const filteredCourses = mockCourses.filter((course) => {
        const matchesCategory = selectedCategory === "All" || course.category.toLowerCase().includes(selectedCategory.toLowerCase());
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    return (<div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-extrabold uppercase tracking-widest">
            <Sparkles size={14}/> Comprehensive Online Video Courses
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Explore All Exam Courses
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium">
            Learn from structured video playlists, concept breakdown modules, topic-wise practice questions, and authentic faculty explanations.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
            <input type="text" placeholder="Search courses, exams, concepts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold focus:outline-none focus:border-red-500 shadow-sm"/>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (<button key={cat} type="button" onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-red-400"}`}>
                {cat}
              </button>))}
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (<CourseCard key={course.id} course={course}/>))}
          </div>) : (<div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <BookOpen size={48} className="mx-auto text-slate-400 mb-4"/>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No courses match your search</h3>
            <p className="text-xs text-slate-500 mt-1">Try searching for different keywords or select "All" categories.</p>
          </div>)}
      </main>

      <Footer />
    </div>);
}
