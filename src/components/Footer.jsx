import Link from "next/link";
import {
  Users,
  BookOpen,
  TrendingUp,
  Trophy,
  ChevronRight,
  Send,
  Heart,
  ChevronUp,
  Layers,
  FileText,
  Smartphone,
  Info,
  Mail,
  Briefcase,
  Bell,
  Compass,
  Shield,
  FileCheck,
  RotateCcw,
  Lock,
  AlertCircle,
} from "lucide-react";
import { GPA_YOUTUBE_CHANNEL } from "@/data/mock-data";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const trustBadges = [
    {
      icon: <Users size={14} className="text-white" />,
      bg: "bg-red-500",
      label: "Trusted by Millions",
    },
    {
      icon: <BookOpen size={14} className="text-white" />,
      bg: "bg-sky-500",
      label: "Quality Content",
    },
    {
      icon: <TrendingUp size={14} className="text-white" />,
      bg: "bg-emerald-500",
      label: "Exam-Focused Learning",
    },
    {
      icon: <Trophy size={14} className="text-white" />,
      bg: "bg-purple-500",
      label: "Proven Results",
    },
  ];

  const socialLinks = [
    {
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      href: GPA_YOUTUBE_CHANNEL,
      label: "YouTube",
      hover: "hover:text-red-500 hover:border-red-500/40 hover:bg-red-500/10",
    },
    {
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      href: "https://instagram.com",
      label: "Instagram",
      hover: "hover:text-pink-500 hover:border-pink-500/40 hover:bg-pink-500/10",
    },
    {
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      href: "https://facebook.com",
      label: "Facebook",
      hover: "hover:text-blue-500 hover:border-blue-500/40 hover:bg-blue-500/10",
    },
    {
      icon: <Send size={13} />,
      href: "https://t.me",
      label: "Telegram",
      hover: "hover:text-sky-400 hover:border-sky-400/40 hover:bg-sky-400/10",
    },
    {
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      href: "https://linkedin.com",
      label: "LinkedIn",
      hover: "hover:text-blue-400 hover:border-blue-400/40 hover:bg-blue-400/10",
    },
  ];

  const platformLinks = [
    { label: "All Courses", href: "/courses", icon: BookOpen },
    { label: "Test Series", href: "/mock-tests", icon: Layers },
    { label: "Notes & E-Library", href: "/free-notes", icon: FileText },
    { label: "Free Resources", href: "/free-notes", icon: Trophy },
    { label: "Mobile App", href: "/about#mobile-app", icon: Smartphone },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about", icon: Info },
    { label: "Contact", href: "/contact", icon: Mail },
    { label: "Careers", href: "/contact", icon: Briefcase },
    { label: "News & Updates", href: "/current-affairs", icon: Bell },
    { label: "Our Mission", href: "/about", icon: Compass },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/about#privacy", icon: Shield },
    { label: "Terms of Service", href: "/about#terms", icon: FileCheck },
    { label: "Refund Policy", href: "/about#refund", icon: RotateCcw },
    { label: "Cookie Policy", href: "/about#cookies", icon: Lock },
    { label: "Disclaimer", href: "/about#disclaimer", icon: AlertCircle },
  ];

  return (
    <footer className="relative bg-[#061226] text-slate-100 overflow-hidden font-sans border-t border-slate-800">
      {/* Background Subtle Halos */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Right Background 3D Books Art in Compact Far-Right Position (Never overlaps Legal column) */}
      <div className="absolute top-0 right-0 w-64 sm:w-80 lg:w-96 h-full pointer-events-none select-none overflow-hidden hidden 2xl:block z-0">
        <img
          src="/footer-books-compact.png"
          alt="GPA Government Job Partner"
          className="w-full h-auto object-contain object-right-top opacity-90 drop-shadow-xl"
          loading="lazy"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 relative z-10">
        {/* Main 4-Column Balanced Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pb-8 border-b border-white/10">
          
          {/* Column 1: Brand & Bio & Trust Badges & Social Links (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            {/* GPA Official Logo Header */}
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#991b1b] p-0.5 shadow-md shadow-red-950/40 flex items-center justify-center border border-red-400/30 group-hover:scale-105 transition-transform">
                <img
                  src="/gpa-logo-clean.png"
                  alt="GPA Official Crest"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="block text-xl font-black tracking-tight text-white leading-tight">
                  GPA
                </span>
                <span className="block text-[11px] font-bold text-red-500 tracking-wide">
                  Gyan Prapti Academy
                </span>
              </div>
            </Link>

            {/* Brand Mission Description */}
            <p className="text-slate-300/90 text-xs sm:text-[13px] leading-relaxed max-w-sm font-normal">
              Empowering students to achieve their government job dreams with premium resources, mock tests, and top-tier mentorship.
            </p>

            {/* 4 Trust Micro-Badges Row */}
            <div className="grid grid-cols-4 gap-2 pt-0.5 max-w-xs">
              {trustBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center group cursor-default"
                >
                  <div
                    className={`w-7 h-7 rounded-full ${badge.bg} flex items-center justify-center shadow-xs mb-1 transition-transform group-hover:scale-110`}
                  >
                    {badge.icon}
                  </div>
                  <span className="text-[9px] text-slate-300 font-semibold leading-tight line-clamp-2">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className={`w-7 h-7 rounded-full bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center transition-all ${s.hover} hover:scale-110 shadow-2xs`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Platform Links (lg:col-span-2.5 -> lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <div>
              <h3 className="text-sm font-extrabold text-white tracking-wide">
                Platform
              </h3>
              <div className="w-5 h-0.5 bg-red-500 mt-1 rounded-full" />
            </div>

            <ul className="space-y-2 pt-0.5">
              {platformLinks.map((link, idx) => {
                const IconComponent = link.icon;
                return (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between text-xs text-slate-300 hover:text-white font-medium transition-colors py-0.5"
                    >
                      <span className="flex items-center gap-2">
                        <IconComponent
                          size={13}
                          className="text-slate-400 group-hover:text-red-400 transition-colors"
                        />
                        <span className="group-hover:translate-x-0.5 transition-transform">
                          {link.label}
                        </span>
                      </span>
                      <ChevronRight
                        size={12}
                        className="text-slate-500 group-hover:text-white transition-all opacity-80 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Company Links (lg:col-span-2.5 -> lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <div>
              <h3 className="text-sm font-extrabold text-white tracking-wide">
                Company
              </h3>
              <div className="w-5 h-0.5 bg-red-500 mt-1 rounded-full" />
            </div>

            <ul className="space-y-2 pt-0.5">
              {companyLinks.map((link, idx) => {
                const IconComponent = link.icon;
                return (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between text-xs text-slate-300 hover:text-white font-medium transition-colors py-0.5"
                    >
                      <span className="flex items-center gap-2">
                        <IconComponent
                          size={13}
                          className="text-slate-400 group-hover:text-red-400 transition-colors"
                        />
                        <span className="group-hover:translate-x-0.5 transition-transform">
                          {link.label}
                        </span>
                      </span>
                      <ChevronRight
                        size={12}
                        className="text-slate-500 group-hover:text-white transition-all opacity-80 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Legal Links (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <div>
              <h3 className="text-sm font-extrabold text-white tracking-wide">
                Legal
              </h3>
              <div className="w-5 h-0.5 bg-red-500 mt-1 rounded-full" />
            </div>

            <ul className="space-y-2 pt-0.5">
              {legalLinks.map((link, idx) => {
                const IconComponent = link.icon;
                return (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between text-xs text-slate-300 hover:text-white font-medium transition-colors py-0.5"
                    >
                      <span className="flex items-center gap-2">
                        <IconComponent
                          size={13}
                          className="text-slate-400 group-hover:text-red-400 transition-colors"
                        />
                        <span className="group-hover:translate-x-0.5 transition-transform">
                          {link.label}
                        </span>
                      </span>
                      <ChevronRight
                        size={12}
                        className="text-slate-500 group-hover:text-white transition-all opacity-80 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Compact & Clean */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 font-medium">
          {/* Left Laurel Crest Statement */}
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-sm">🌿</span>
            <span>Building a brighter future for every aspirant.</span>
          </div>

          {/* Center Copyright */}
          <div className="text-center">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-white font-bold">Gyan Prapti Academy</span>. All rights reserved.
          </div>

          {/* Right: Made with Heart & Red Scroll to Top Button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-slate-300">
              <span>Made with</span>
              <Heart size={12} className="fill-red-500 text-red-500" />
              <span>for Aspirants</span>
            </div>

            {/* Red Circle Scroll to Top */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-md shadow-red-600/40 hover:scale-105 active:scale-95 transition-all"
            >
              <ChevronUp size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
