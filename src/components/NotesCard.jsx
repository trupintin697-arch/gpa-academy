"use client";
import TiltCard from "./TiltCard";
import { FileText, Video, Headphones, Link as LinkIcon, ExternalLink, Download, Play } from "lucide-react";
export default function NotesCard({ title, type = "PDF", format, subject, description, downloadLink, fileUrl, url, youtubeUrl, sharedBy = { name: "Dr. Rajesh Kumar", initial: "R", avatarBg: "bg-red-500" }, onPlayVideo }) {
    const link = downloadLink || fileUrl || "/free-notes";
    const itemType = (type || format || "PDF").toUpperCase();
    const getTypeIcon = () => {
        switch (itemType) {
            case "PDF": return <FileText size={20} className="text-red-500"/>;
            case "VIDEO": return <Video size={20} className="text-blue-500"/>;
            case "AUDIO": return <Headphones size={20} className="text-purple-500"/>;
            case "DOC": return <FileText size={20} className="text-blue-600"/>;
            case "LINK": return <LinkIcon size={20} className="text-emerald-500"/>;
            default: return <FileText size={20} className="text-slate-500"/>;
        }
    };
    const getTypeBadge = () => {
        switch (itemType) {
            case "PDF": return "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-100 dark:border-red-500/20";
            case "VIDEO": return "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/20";
            case "AUDIO": return "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-500/20";
            case "DOC": return "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-100 dark:border-sky-500/20";
            case "LINK": return "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20";
            default: return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
        }
    };
    return (<TiltCard className="rounded-[32px] shadow-xl shadow-slate-200/50 dark:shadow-black/50 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex h-full flex-col justify-between rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 transition duration-300 hover:border-blue-300 dark:hover:border-blue-500/30">
        <div>
          {/* Top Row: Type Icon on Left + Type Label on Right */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 flex items-center justify-center shadow-inner">
              {getTypeIcon()}
            </div>
            <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider border ${getTypeBadge()}`}>
              {itemType}
            </span>
          </div>

          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 leading-snug">{title}</h4>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed font-medium line-clamp-3">{description}</p>
        </div>

        {/* Bottom Row: Shared By + Action Button */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6 mt-auto">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full ${sharedBy.avatarBg || "bg-blue-600"} text-white font-extrabold text-xs flex items-center justify-center shadow-sm`}>
              {sharedBy.initial || "R"}
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">SHARED BY</div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-200">{sharedBy.name}</div>
            </div>
          </div>

          {itemType === "VIDEO" ? (<button type="button" onClick={() => onPlayVideo && onPlayVideo({ title, url: youtubeUrl || "https://www.youtube.com/@gpa-gyanpraptiacademy" })} className="w-11 h-11 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 text-white flex items-center justify-center transition shadow-md hover:scale-105">
              <Play size={18}/>
            </button>) : itemType === "LINK" ? (<a href={url || "/free-notes"} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white flex items-center justify-center transition shadow-md hover:scale-105">
              <ExternalLink size={18}/>
            </a>) : (<a href={link} download className="w-11 h-11 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-red-600 dark:hover:bg-red-600 text-white flex items-center justify-center transition shadow-md hover:scale-105">
              <Download size={18}/>
            </a>)}
        </div>
      </div>
    </TiltCard>);
}
