import TestimonialCard from "@/components/TestimonialCard";
import { testimonials } from "@/data/mock-data";

export default function Testimonials() {
  const cardsData = [
    {
      ...testimonials[0],
      category: "bank",
      avatar: "/testi-avatar-ananya.png",
      graphic3d: "/testi-graphic-bank.png",
    },
    {
      ...testimonials[1],
      category: "ssc",
      avatar: "/testi-avatar-vikram.png",
      graphic3d: "/testi-graphic-ssc.png",
    },
    {
      ...testimonials[2],
      category: "upsc",
      avatar: "/testi-avatar-neha.png",
      graphic3d: "/testi-graphic-upsc.png",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/70 dark:bg-slate-950/80 transition-colors duration-200 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-rose-500/5 dark:bg-rose-500/10 blur-[130px] pointer-events-none" />

      {/* Floating Paper Airplane & Dotted Trajectory in Top Right */}
      <div className="absolute top-10 right-4 sm:right-16 lg:right-28 pointer-events-none z-10 hidden sm:block">
        <img
          src="/testi-paper-plane.png"
          alt=""
          className="w-20 sm:w-28 h-auto object-contain opacity-90 drop-shadow-sm animate-pulse"
        />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header matching Image 1 */}
        <div className="mb-14 text-center">
          {/* Header Tag with Red Line Accents */}
          <div className="inline-flex items-center gap-2.5 justify-center mb-2">
            <span className="w-8 h-[2px] bg-gradient-to-r from-transparent to-red-500" />
            <span className="text-xs uppercase tracking-[0.28em] text-red-600 dark:text-red-400 font-extrabold">
              ASPIRANT FEEDBACK
            </span>
            <span className="w-8 h-[2px] bg-gradient-to-l from-transparent to-red-500" />
          </div>

          {/* Main Title: Real student <success> stories. */}
          <h2 className="mt-2 text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Real student{" "}
            <span className="bg-gradient-to-r from-red-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
              success
            </span>{" "}
            stories.
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal">
            Trusted by thousands of aspirants who achieved their goals with our guidance.
          </p>
        </div>

        {/* 3 Feedback Cards Grid matching Image 1 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {cardsData.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>

        {/* Carousel Pagination Dots (Pink, Blue, Purple) */}
        <div className="mt-12 flex items-center justify-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400 opacity-90 transition-all hover:scale-125 cursor-pointer shadow-xs" />
          <span className="w-3 h-3 rounded-full bg-blue-600 transition-all shadow-md shadow-blue-500/40 cursor-pointer" />
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400 opacity-90 transition-all hover:scale-125 cursor-pointer shadow-xs" />
        </div>
      </div>
    </section>
  );
}
