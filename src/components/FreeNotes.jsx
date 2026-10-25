"use client";
import { useState } from "react";
import Link from "next/link";
import { freeNotes, GPA_YOUTUBE_CHANNEL } from "@/data/mock-data";
import { Sparkles, X, Play, ArrowRight, Layers, CheckCircle2, FileText } from "lucide-react";
export default function FreeNotes() {
    const [activeLectureIndex, setActiveLectureIndex] = useState(0);
    const [playingVideo, setPlayingVideo] = useState(null);
    const handlePlayVideo = (note) => {
        setActiveLectureIndex(0);
        setPlayingVideo({
            title: note.title,
            hindiTitle: note.hindiTitle,
            youtubeEmbedId: note.youtubeEmbedId || "P6ift-kfenw",
            lectures: note.lectures || [
                { id: "lec_1", title: "Part 01: Concept Masterclass", duration: "48:00", videoId: note.youtubeEmbedId || "P6ift-kfenw" }
            ],
        });
    };
    const currentLecture = playingVideo?.lectures?.[activeLectureIndex];
    const activeEmbedId = currentLecture?.videoId || playingVideo?.youtubeEmbedId || "P6ift-kfenw";
    const activeIframeSrc = `https://www.youtube.com/embed/${activeEmbedId}?autoplay=1&rel=0&modestbranding=1`;
    return (<section className="py-24 px-6 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-3">
              <Sparkles size={14}/> Official GPA E-Library
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Featured Video Lectures & Study Notes
            </h2>
          </div>

          <Link href="/free-notes" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400 hover:text-red-700 transition">
            <span>Explore All 24+ Resources</span>
            <ArrowRight size={15}/>
          </Link>
        </div>

        {/* 3 Featured Video Playlists Grid with High-Res Thumbnails */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {freeNotes.slice(0, 3).map((note) => {
            const isVideo = note.type === "VIDEO";
            return (<div key={note.id || note.title} className="rounded-[32px] border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xl shadow-slate-200/40 dark:shadow-black/40 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-red-300 dark:hover:border-red-500/40 group">
                <div>
                  {/* YouTube Thumbnail Header */}
                  {note.thumbnailUrl ? (<div onClick={() => handlePlayVideo(note)} className="relative aspect-video w-full overflow-hidden bg-slate-900 cursor-pointer">
                      <img src={note.thumbnailUrl} alt={note.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl shadow-red-600/50 transform group-hover:scale-110 transition-all duration-300">
                          <Play size={20} className="ml-1" fill="white"/>
                        </div>
                      </div>

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-white border border-white/20">
                          {note.category || "Video Lecture"}
                        </span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-md">
                          {note.badge || "VIDEO"}
                        </span>
                      </div>
                    </div>) : (<div className="p-8 pb-0 flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                        <FileText size={20} className="text-red-500"/>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400">
                        {note.badge || note.type}
                      </span>
                    </div>)}

                  {/* Body Content */}
                  <div className="p-8 pt-6">
                    <h3 onClick={() => handlePlayVideo(note)} className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug line-clamp-2 cursor-pointer group-hover:text-red-600 dark:group-hover:text-red-400 transition">
                      {note.title}
                    </h3>

                    {note.tagline && (<p className="mt-1.5 text-xs font-bold text-red-600 dark:text-red-400">
                        {note.tagline}
                      </p>)}

                    <p className="mt-3 text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 font-medium">
                      {note.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="px-8 pb-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${note.sharedBy?.avatarBg || "bg-red-600"} text-white font-extrabold text-xs flex items-center justify-center`}>
                      {note.sharedBy?.initial || "G"}
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        SHARED BY
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-200">
                        {note.sharedBy?.name || "Dr. Rajesh Kumar"}
                      </div>
                    </div>
                  </div>

                  <button type="button" onClick={() => handlePlayVideo(note)} className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-red-600 dark:hover:bg-red-600 text-white flex items-center justify-center transition shadow-md hover:scale-105">
                    <Play size={16} fill="white"/>
                  </button>
                </div>
              </div>);
        })}
        </div>
      </div>

      {/* Embedded YouTube Video Modal */}
      {playingVideo && (<div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl p-6 max-w-4xl w-full shadow-2xl border border-slate-800 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
                  Gyan Prapti Academy • Official Video Player
                </span>
                <h3 className="text-base font-bold text-white line-clamp-1">{playingVideo.title}</h3>
                {playingVideo.hindiTitle && (<p className="text-xs text-slate-400">{playingVideo.hindiTitle}</p>)}
              </div>
              <button onClick={() => setPlayingVideo(null)} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition">
                <X size={20}/>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-inner">
                <iframe key={activeIframeSrc} className="w-full h-full" src={activeIframeSrc} title={currentLecture?.title || playingVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>

              <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 flex flex-col justify-between max-h-[340px] overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-red-400 uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1.5"><Layers size={14}/> Lectures</span>
                    <span className="text-[10px] text-slate-400 font-normal">Click to play</span>
                  </div>
                  <div className="space-y-2">
                    {playingVideo.lectures?.map((lec, idx) => {
                const isSelected = activeLectureIndex === idx;
                return (<div key={lec.id} onClick={() => setActiveLectureIndex(idx)} className={`p-2.5 rounded-xl text-xs transition cursor-pointer flex items-center justify-between ${isSelected
                        ? "bg-red-600/20 border border-red-500 text-white font-bold"
                        : "bg-slate-900 border border-slate-800/80 text-slate-300 hover:border-red-500/50"}`}>
                          <div className="flex items-center gap-2 truncate">
                            <span className={`text-[10px] font-bold ${isSelected ? "text-red-400" : "text-slate-500"}`}>
                              #{idx + 1}
                            </span>
                            <span className="truncate">{lec.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-semibold shrink-0 ml-2">{lec.duration}</span>
                        </div>);
            })}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0"/>
                    <span>GPA Verified Stream</span>
                  </div>
                  <a href={GPA_YOUTUBE_CHANNEL} target="_blank" rel="noreferrer" className="text-red-400 hover:underline font-bold">
                    Open on YouTube →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>)}
    </section>);
}
