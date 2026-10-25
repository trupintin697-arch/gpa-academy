import Link from "next/link";
import TiltCard from "./TiltCard";
import { Star, Clock, ArrowRight, Video } from "lucide-react";

export default function CourseCard({ course }) {
  const discountPercent = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 50;

  const courseUrl = `/courses/${course.slug || course.id}`;

  return (
    <TiltCard className="rounded-[32px] shadow-xl shadow-slate-200/40 dark:shadow-black/40 hover:shadow-2xl transition-all duration-300">
      <article className="group h-full flex flex-col overflow-hidden rounded-[32px] border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all duration-300 hover:border-red-300 dark:hover:border-red-500/40 relative">
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-4">
          <Link
            href={`/courses?category=${encodeURIComponent(course.category || "All")}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-red-50 dark:bg-red-500/10 px-3 py-1 text-xs text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 font-extrabold uppercase tracking-wider hover:bg-red-100 transition-colors z-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            {course.category}
          </Link>
          <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20">
            {discountPercent}% OFF
          </span>
        </div>

        {/* Title as Clickable Link */}
        <Link href={courseUrl} className="block group/title">
          <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight line-clamp-2 group-hover/title:text-red-600 dark:group-hover/title:text-red-400 transition-colors cursor-pointer">
            {course.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs md:text-sm leading-relaxed text-slate-600 dark:text-slate-400 flex-grow font-medium line-clamp-3">
          {course.description}
        </p>

        {/* Metadata Chips */}
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-bold">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 px-3 py-1.5 border border-slate-200/60 dark:border-slate-700">
            <Clock size={13} className="text-slate-400" />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 px-3 py-1.5 border border-slate-200/60 dark:border-slate-700">
            <Video size={13} className="text-blue-500" />
            {course.lessons || 8} Lectures
          </span>
          <span className="inline-flex items-center gap-1 rounded-xl bg-amber-50 dark:bg-amber-500/10 px-3 py-1.5 border border-amber-200/60 dark:border-amber-500/20 text-amber-700 dark:text-amber-400">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            {course.rating || 4.9}
          </span>
        </div>

        {/* Price & Action Button */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              ₹{(course.price / 100).toFixed(0)}
            </div>
            {course.originalPrice && (
              <div className="text-xs text-slate-400 line-through font-semibold">
                ₹{(course.originalPrice / 100).toFixed(0)}
              </div>
            )}
          </div>

          <Link
            href={courseUrl}
            className="rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 px-6 py-3 text-xs font-black text-white transition-all shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 flex items-center gap-1.5 z-10"
          >
            <span>Enroll Now</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </TiltCard>
  );
}
