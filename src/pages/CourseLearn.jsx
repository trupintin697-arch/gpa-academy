"use client";
import { useState } from "react";
import Link from "next/link";
import { mockCourses, GPA_YOUTUBE_CHANNEL, freeNotes } from "@/data/mock-data";
import { Play, FileText, Video, ArrowLeft, Award, Download, Share2 } from "lucide-react";
function getYouTubeEmbedUrl(url) {
    if (!url)
        return "https://www.youtube.com/embed/P6ift-kfenw?autoplay=1&rel=0";
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match && match[1]
        ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`
        : "https://www.youtube.com/embed/P6ift-kfenw?autoplay=1&rel=0";
}
export default function CourseLearnPage({ params }) {
    const resolvedParams = params ?? null;
    const slug = resolvedParams?.slug || mockCourses[0]?.slug;
    const course = mockCourses.find((c) => c.slug === slug) || mockCourses[0];
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const currentVideo = course.videos?.[activeVideoIndex] || {
        id: "v1",
        title: "Lecture 01: Concept Masterclass",
        duration: "30:00",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        isFree: true,
    };
    const embedSrc = getYouTubeEmbedUrl(currentVideo.youtubeUrl);
    return (<div className="min-h-screen bg-slate-900 text-white flex flex-col font-sans">
      {/* Top Learning Header */}
      <header className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/student" className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-bold">
            <ArrowLeft size={16}/> Exit Player
          </Link>
          <div>
            <h1 className="text-sm font-bold text-white line-clamp-1">{course.title}</h1>
            <p className="text-[11px] text-slate-400 font-medium">Gyan Prapti Academy Official Course Series</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a href={GPA_YOUTUBE_CHANNEL} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 font-bold text-xs text-white transition flex items-center gap-1.5 shadow-md shadow-red-600/20">
            <Video size={15}/> Visit YouTube Channel
          </a>
        </div>
      </header>

      {/* Main Split Player Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Video Player & Lecture Meta */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-slate-950 p-6">
          {/* Responsive Embedded YouTube iFrame */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
            <iframe key={embedSrc} className="w-full h-full" src={embedSrc} title={currentVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>

          {/* Lecture Info */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold mb-2">
                <Video size={14}/> Lecture {activeVideoIndex + 1} of {course.videos?.length || 5}
              </div>
              <h2 className="text-xl font-bold text-white">{currentVideo.title}</h2>
              <p className="text-xs text-slate-400 mt-1">Faculty: Dr. Rajesh Kumar • Gyan Prapti Academy</p>
            </div>

            <div className="flex items-center gap-3">
              <a href={GPA_YOUTUBE_CHANNEL} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5">
                <Share2 size={14}/> Subscribe on YouTube
              </a>
              <Link href="/mock-tests/test_1/take" className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-bold transition flex items-center gap-1.5">
                <Award size={14}/> Practice Sectional Test
              </Link>
            </div>
          </div>

          {/* Study Notes Tab */}
          <div className="mt-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
              <FileText size={16} className="text-red-400"/> Attached Class Notes & Formula Sheets
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {freeNotes.filter(n => n.type === "PDF" || n.type === "DOC").slice(0, 2).map((note, i) => (<div key={i} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{note.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{note.size || "2.4 MB"} • {note.format || "PDF"} Document</p>
                  </div>
                  <a href={note.downloadLink || "/free-notes"} download className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-red-400 hover:text-white transition">
                    <Download size={16}/>
                  </a>
                </div>))}
            </div>
          </div>
        </div>

        {/* Right: Course Curriculum Playlist */}
        <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0 overflow-y-auto">
          <div className="p-5 border-b border-slate-800 bg-slate-950">
            <h3 className="text-sm font-bold text-white">Course Syllabus & Videos</h3>
            <p className="text-xs text-slate-400 mt-0.5">{course.videos?.length || 5} Lessons • Gyan Prapti Academy</p>
          </div>

          <div className="p-3 space-y-2 flex-1">
            {(course.videos || []).map((vid, idx) => {
            const isActive = activeVideoIndex === idx;
            return (<button key={vid.id} onClick={() => setActiveVideoIndex(idx)} className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${isActive
                    ? "border-red-500/60 bg-red-600/10 text-white font-bold"
                    : "border-slate-800 bg-slate-950/40 hover:bg-slate-800/60 text-slate-300"}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${isActive ? "bg-red-600 text-white" : "bg-slate-800 text-slate-400"}`}>
                    <Play size={14}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold line-clamp-2">{vid.title}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{vid.duration} • Video Lesson</p>
                  </div>
                </button>);
        })}
          </div>
        </div>
      </div>
    </div>);
}
