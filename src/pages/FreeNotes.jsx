"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { freeNotes, GPA_YOUTUBE_CHANNEL } from "@/data/mock-data";
import {
  Play,
  Download,
  BookOpen,
  ExternalLink,
  Video,
  Search,
  X,
  Calculator,
  Brain,
  Globe,
  BarChart3,
  Layers,
  Sparkles,
} from "lucide-react";

export default function FreeNotesPage({ defaultSubject }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(defaultSubject || "All");

  const categories = [
    { id: "All", label: "All", icon: null },
    { id: "Aptitude", label: "Aptitude", icon: BarChart3 },
    { id: "Quantitative Aptitude", label: "Quantitative Aptitude", icon: Calculator },
    { id: "Reasoning Ability", label: "Reasoning Ability", icon: Brain },
    { id: "English Language", label: "English Language", icon: BookOpen },
    { id: "General Awareness", label: "General Awareness", icon: Globe },
  ];

  const filteredNotes = freeNotes.filter((note) => {
    const categoryOrSubject = note.subject || note.category || "";
    const matchesSubject =
      selectedSubject === "All" ||
      categoryOrSubject.toLowerCase().includes(selectedSubject.toLowerCase());
    const matchesSearch =
      (note.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* ============================================================== */}
        {/* HERO BANNER MATCHING USER REFERENCE IMAGE EXACTLY */}
        {/* ============================================================== */}
        <div className="relative rounded-[36px] bg-gradient-to-b from-[#fff5f6] via-white to-[#feeef1] dark:from-[#1b0d14] dark:via-[#13090e] dark:to-[#1a0a13] border border-rose-200/70 dark:border-rose-900/40 p-8 sm:p-12 lg:p-16 mb-10 overflow-hidden shadow-xl shadow-rose-950/5 dark:shadow-black/50">
          
          {/* Subtle Pink Ambient Lighting Halos */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-rose-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Left 3D Illustration: Revision Notes + PDF + 3D Graduation Cap on Books Stack */}
          <div className="absolute left-[-10px] sm:left-4 lg:left-8 bottom-[-10px] sm:bottom-0 w-44 sm:w-60 lg:w-76 h-auto pointer-events-none select-none z-10 hidden md:block">
            <img
              src="/freenotes-art-left.png"
              alt="Revision Notes & Formula Sheets"
              className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Right 3D Illustration: Laptop Video Player + Idea Bulb + Checklist */}
          <div className="absolute right-[-10px] sm:right-4 lg:right-8 bottom-[-10px] sm:bottom-0 w-44 sm:w-60 lg:w-80 h-auto pointer-events-none select-none z-10 hidden md:block">
            <img
              src="/freenotes-art-right.png"
              alt="Official Video Lectures & Topic Checklist"
              className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Center Banner Content Area */}
          <div className="max-w-2xl mx-auto text-center relative z-20 space-y-5">
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 dark:bg-rose-950/60 border border-rose-200/90 dark:border-rose-800/60 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-wider shadow-2xs">
              <BookOpen size={14} className="text-red-600" />
              <span>OFFICIAL GPA E-LIBRARY & REVISION NOTES</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight text-slate-900 dark:text-white leading-[1.18]">
              Free Revision Notes &amp;{" "}
              <br className="hidden sm:inline" />
              <span className="text-[#dc2626] dark:text-[#ef4444]">
                Video Playlists
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
              Access hand-curated PDF formula cheat sheets and watch full structured
              video lessons directly from Gyan Prapti Academy’s YouTube channel.
            </p>

            {/* Red Action CTA: Visit Official GPA YouTube Channel */}
            <div className="pt-2">
              <a
                href={GPA_YOUTUBE_CHANNEL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-black tracking-wide shadow-xl shadow-red-600/35 hover:scale-105 active:scale-95 transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-red-600 shadow-xs">
                  <Play size={10} className="fill-red-600 translate-x-[0.5px]" />
                </div>
                <span>Visit Official GPA YouTube Channel</span>
                <ExternalLink size={14} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* SEARCH BAR & CATEGORY PILL FILTER STRIP MATCHING IMAGE 1 */}
        {/* ============================================================== */}
        <div className="flex flex-col lg:flex-row items-center gap-4 mb-10">
          {/* Rounded White Search Bar */}
          <div className="relative w-full lg:w-80 shrink-0">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500"
              size={17}
              strokeWidth={2.5}
            />
            <input
              type="text"
              placeholder="Search formula sheets, topics, notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 shadow-sm transition-all"
            />
          </div>

          {/* Horizontal Category Pill Filter Buttons with Icons */}
          <div className="flex items-center gap-2.5 overflow-x-auto w-full pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedSubject === cat.id;
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedSubject(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all duration-200 shadow-xs ${
                    isSelected
                      ? "bg-red-600 text-white shadow-md shadow-red-600/35 scale-105"
                      : "bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-red-400 hover:text-red-600 dark:hover:text-red-400"
                  }`}
                >
                  {IconComp && (
                    <IconComp
                      size={14}
                      className={isSelected ? "text-white" : "text-rose-500"}
                      strokeWidth={2.5}
                    />
                  )}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* NOTES & VIDEO PLAYLISTS GRID */}
        {/* ============================================================== */}
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-rose-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-wider">
                      {note.subject || note.category || "Study Note"}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {note.badge || note.size || "Free"}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition leading-snug">
                    {note.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    {note.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveVideo({
                        title: note.title,
                        url:
                          note.youtubeUrl ||
                          note.url ||
                          "https://www.youtube.com/embed/P6ift-kfenw",
                      })
                    }
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-md shadow-red-600/25"
                  >
                    <Play size={14} className="fill-white" />
                    <span>Watch Video</span>
                  </button>
                  {note.downloadLink ? (
                    <a
                      href={note.downloadLink}
                      download
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
                      title="Download PDF Notes"
                    >
                      <Download size={16} />
                    </a>
                  ) : (
                    <span
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-300 dark:text-slate-600 cursor-not-allowed"
                      title="PDF available with test series"
                    >
                      <Download size={16} />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <BookOpen size={48} className="mx-auto text-rose-400 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No notes match your filter
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Try searching with different keywords or select "All" categories.
            </p>
          </div>
        )}

        {/* Video Player Modal */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Video size={18} className="text-red-500" />
                  <span>{activeVideo.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="aspect-video w-full">
                <iframe
                  src={activeVideo.url.replace("watch?v=", "embed/")}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
