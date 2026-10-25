import TiltCard from "./TiltCard";
import { Star, Landmark, ClipboardList, Target } from "lucide-react";

export default function TestimonialCard({
  name,
  role,
  quote,
  category = "bank",
  avatar,
  graphic3d,
}) {
  const norm = (role + " " + (category || "")).toLowerCase();

  const isBank = norm.includes("bank") || norm.includes("sbi") || category === "bank";
  const isSsc = norm.includes("ssc") || norm.includes("cgl") || category === "ssc";
  // default is upsc

  const theme = isBank
    ? {
        key: "bank",
        gradientBg: "bg-gradient-to-b from-[#fff6f8] via-white to-[#feeef1] dark:from-[#1b0d14] dark:via-[#13090e] dark:to-[#1f0d16]",
        borderColor: "border-rose-200/90 dark:border-rose-900/60 hover:border-rose-400 dark:hover:border-rose-600",
        shadow: "shadow-xl shadow-rose-950/5 dark:shadow-black/40 hover:shadow-2xl hover:shadow-rose-600/15",
        quoteColor: "text-rose-400/90 dark:text-rose-500/80",
        quoteBadge: "bg-rose-50 border-rose-200/70 text-rose-500",
        badgeBg: "bg-rose-50 dark:bg-rose-950/60 border-rose-200/80 dark:border-rose-800/60",
        badgeColor: "text-rose-600 dark:text-rose-400",
        badgeIcon: Landmark,
        roleColor: "text-rose-600 dark:text-rose-400",
        graphic: graphic3d || "/testi-graphic-bank.png",
        avatar: avatar || "/testi-avatar-ananya.png",
        waveBg: "from-rose-500/10 via-rose-500/5 to-transparent",
        glow: "bg-rose-500/10",
        highlightWord: (text) => {
          // Highlight "saved me 15 vital minutes" in bold crimson
          const parts = text.split(/(saved me 15 vital minutes)/gi);
          return parts.map((part, i) =>
            part.toLowerCase() === "saved me 15 vital minutes" ? (
              <span key={i} className="font-extrabold text-rose-600 dark:text-rose-400 not-italic">
                {part}
              </span>
            ) : (
              part
            )
          );
        },
      }
    : isSsc
    ? {
        key: "ssc",
        gradientBg: "bg-gradient-to-b from-[#f4f9ff] via-white to-[#edf5ff] dark:from-[#091222] dark:via-[#070e1a] dark:to-[#0a1526]",
        borderColor: "border-blue-200/90 dark:border-blue-900/60 hover:border-blue-400 dark:hover:border-blue-600",
        shadow: "shadow-xl shadow-blue-950/5 dark:shadow-black/40 hover:shadow-2xl hover:shadow-blue-600/15",
        quoteColor: "text-blue-400/90 dark:text-blue-500/80",
        quoteBadge: "bg-blue-50 border-blue-200/70 text-blue-500",
        badgeBg: "bg-blue-50 dark:bg-blue-950/60 border-blue-200/80 dark:border-blue-800/60",
        badgeColor: "text-blue-600 dark:text-blue-400",
        badgeIcon: ClipboardList,
        roleColor: "text-blue-600 dark:text-blue-400",
        graphic: graphic3d || "/testi-graphic-ssc.png",
        avatar: avatar || "/testi-avatar-vikram.png",
        waveBg: "from-blue-500/10 via-blue-500/5 to-transparent",
        glow: "bg-blue-500/10",
        highlightWord: (text) => {
          // Highlight "actual TCS exam hall" & "game-changer" in blue
          let parts = text.split(/(actual TCS exam hall|game-changer\.)/gi);
          return parts.map((part, i) =>
            part.toLowerCase().includes("actual tcs") || part.toLowerCase().includes("game-changer") ? (
              <span key={i} className="font-extrabold text-blue-600 dark:text-blue-400 not-italic">
                {part}
              </span>
            ) : (
              part
            )
          );
        },
      }
    : {
        key: "upsc",
        gradientBg: "bg-gradient-to-b from-[#faf5ff] via-white to-[#f5edff] dark:from-[#150d24] dark:via-[#10091c] dark:to-[#170e28]",
        borderColor: "border-purple-200/90 dark:border-purple-900/60 hover:border-purple-400 dark:hover:border-purple-600",
        shadow: "shadow-xl shadow-purple-950/5 dark:shadow-black/40 hover:shadow-2xl hover:shadow-purple-600/15",
        quoteColor: "text-purple-400/90 dark:text-purple-500/80",
        quoteBadge: "bg-purple-50 border-purple-200/70 text-purple-500",
        badgeBg: "bg-purple-50 dark:bg-purple-950/60 border-purple-200/80 dark:border-purple-800/60",
        badgeColor: "text-purple-600 dark:text-purple-400",
        badgeIcon: Target,
        roleColor: "text-purple-600 dark:text-purple-400",
        graphic: graphic3d || "/testi-graphic-upsc.png",
        avatar: avatar || "/testi-avatar-neha.png",
        waveBg: "from-purple-500/10 via-purple-500/5 to-transparent",
        glow: "bg-purple-500/10",
        highlightWord: (text) => {
          // Highlight "conceptual clarity" in bold violet
          const parts = text.split(/(conceptual clarity)/gi);
          return parts.map((part, i) =>
            part.toLowerCase() === "conceptual clarity" ? (
              <span key={i} className="font-extrabold text-purple-600 dark:text-purple-400 not-italic">
                {part}
              </span>
            ) : (
              part
            )
          );
        },
      };

  const BadgeIcon = theme.badgeIcon;

  return (
    <TiltCard className="rounded-[32px] transition-all duration-300 h-full">
      <article
        className={`relative flex h-full flex-col justify-between rounded-[32px] border ${theme.borderColor} ${theme.gradientBg} p-7 sm:p-8 ${theme.shadow} transition-all duration-300 overflow-hidden group`}
      >
        {/* Soft Ambient Corner Halo */}
        <div
          className={`absolute -top-10 -right-10 w-36 h-36 ${theme.glow} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}
        />

        {/* Decorative Wave at Card Bottom */}
        <div
          className={`absolute -bottom-6 -left-6 right-0 h-24 bg-gradient-to-t ${theme.waveBg} rounded-full blur-xl pointer-events-none`}
        />

        {/* Top Row: Double Quotes SVG & Top-Right Squircle Icon Badge */}
        <div>
          <div className="flex items-center justify-between mb-4">
            {/* Bold Double Quotes Graphic */}
            <div className="text-3xl font-black font-serif leading-none select-none tracking-tight">
              <span className={`inline-block ${theme.badgeColor} opacity-90 text-4xl leading-none`}>
                ““
              </span>
            </div>

            {/* Squircle Badge Icon */}
            <div
              className={`w-11 h-11 rounded-2xl ${theme.badgeBg} border flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300`}
            >
              <BadgeIcon size={20} className={theme.badgeColor} />
            </div>
          </div>

          {/* 5 Golden Rating Stars */}
          <div className="mb-4 flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className="fill-amber-400 text-amber-400 drop-shadow-xs"
              />
            ))}
          </div>

          {/* Student Quote with Targeted Highlights */}
          <p className="text-[13.5px] sm:text-sm leading-relaxed text-slate-700 dark:text-slate-200 font-medium italic relative z-10">
            "{theme.highlightWord(quote)}"
          </p>
        </div>

        {/* Bottom Section: Student Avatar + Name & Role + 3D Book/Paperwork Graphic */}
        <div className="mt-8 pt-4 border-t border-slate-200/50 dark:border-slate-800/80 flex items-end justify-between relative z-10">
          {/* Avatar & Name Info */}
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src={theme.avatar}
                alt={name}
                className="w-13 h-13 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-md group-hover:scale-105 transition-transform"
                loading="lazy"
              />
            </div>
            <div>
              <p className="font-black text-slate-900 dark:text-white text-sm sm:text-base tracking-tight leading-snug">
                {name}
              </p>
              <p className={`text-xs font-extrabold ${theme.roleColor} mt-0.5 tracking-tight`}>
                {role}
              </p>
            </div>
          </div>

          {/* 3D Illustration Graphic (e.g. 3D Bank Books, 3D SSC Clipboard, 3D UPSC Books) */}
          <div className="relative shrink-0 -mr-2 -mb-2 w-24 h-20 sm:w-28 sm:h-24 pointer-events-none group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 ease-out">
            <img
              src={theme.graphic}
              alt=""
              className="w-full h-full object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.14)]"
              loading="lazy"
            />
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
