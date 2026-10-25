"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  ChevronDown,
  Sun,
  Moon,
  Menu,
  X,
  BookOpen,
  Award,
  FileText,
  Home,
  LogOut,
  LayoutDashboard,
  ExternalLink,
  Video,
  Info,
  Globe,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { GPA_YOUTUBE_CHANNEL, mockCourses, mockTests, freeNotes } from "@/data/mock-data";

export default function Navbar() {
  const pathname = usePathname();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const userMenuRef = useRef(null);
  const searchInputRef = useRef(null);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Focus search input when open
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine Dashboard URL based on User Role
  const dashboardHref = user
    ? user.role === "admin"
      ? "/dashboard/admin"
      : user.role === "teacher"
        ? "/dashboard/teacher"
        : "/dashboard/student"
    : "/dashboard/student";

  // Navigation matching Image 1
  const navigation = [
    { href: "/", label: "Home", icon: <Home size={18} /> },
    { href: "/courses", label: "Courses", icon: <BookOpen size={18} /> },
    { href: "/mock-tests", label: "Mock Tests", icon: <Award size={18} /> },
    { href: "/free-notes", label: "Notes", icon: <FileText size={18} /> },
    { href: "/current-affairs", label: "Current Affairs", icon: <Globe size={18} /> },
    { href: "/about", label: "About", icon: <Info size={18} /> },
  ];

  const isLinkActive = (href) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Quick Search filtering
  const filteredCourses = mockCourses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3);

  const filteredTests = mockTests.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3);

  return (
    <>
      <header className="fixed top-0 z-40 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-18 sm:h-20">
          
          {/* Brand Logo matching Image 1 */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src="/gpa-logo-clean.png"
              alt="Gyan Prapti Academy"
              className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-9">
            {navigation.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-1.5 text-sm tracking-wide transition-colors duration-150 ${
                    active
                      ? "font-extrabold text-[#b91c1c] dark:text-red-400"
                      : "font-semibold text-slate-700 dark:text-slate-200 hover:text-[#b91c1c] dark:hover:text-red-400"
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Active Underline Indicator matching Image 1 */}
                  {active && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-[2.5px] rounded-full bg-[#b91c1c] dark:bg-red-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Icon Button matching Image 1 */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:p-2.5 rounded-full text-slate-700 dark:text-slate-300 hover:text-[#b91c1c] dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Search tests, notes & courses"
              aria-label="Search"
            >
              <Search size={19} />
            </button>

            {/* Subtle Theme Toggle */}
            <div className="hidden sm:flex items-center p-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                title={theme === "dark" ? "Switch to Daytime" : "Switch to Night"}
                className="p-1 rounded-full text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition"
              >
                {theme === "dark" ? (
                  <Moon size={14} className="text-blue-400 fill-blue-400" />
                ) : (
                  <Sun size={14} className="text-amber-500 fill-amber-500" />
                )}
              </button>
            </div>

            {/* Auth Buttons matching Image 1 */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 pl-1.5 pr-3 py-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition shadow-xs"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-600 to-[#00154D] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-xs">
                    {user.name ? user.name.slice(0, 2).toUpperCase() : "GP"}
                  </div>
                  <span className="max-w-[80px] sm:max-w-[120px] truncate">{user.name}</span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-2xl z-50">
                    <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium truncate">
                        {user.email}
                      </p>
                      <span className="inline-block mt-1 text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400">
                        {user.role}
                      </span>
                    </div>

                    <Link
                      href={dashboardHref}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      <LayoutDashboard size={15} className="text-red-500" />
                      <span>My Dashboard</span>
                    </Link>

                    <Link
                      href="/mock-tests"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      <Award size={15} className="text-amber-500" />
                      <span>My Mock Tests</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition mt-1 border-t border-slate-100 dark:border-slate-800 pt-2"
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2.5">
                {/* Login Button (Outline Pill) */}
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-full border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs sm:text-sm transition-all"
                >
                  Login
                </Link>

                {/* Sign Up Button (Solid Crimson Pill) */}
                <Link
                  href="/register"
                  className="px-5 py-2 rounded-full bg-[#991b1b] hover:bg-[#b91c1c] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile & Tablet Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={22} className="text-red-600" /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Quick Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <Search className="text-slate-400" size={20} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search courses, mock tests, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm font-semibold bg-transparent focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto space-y-4">
              {searchQuery ? (
                <>
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                      Courses
                    </p>
                    {filteredCourses.length > 0 ? (
                      <div className="space-y-1">
                        {filteredCourses.map((c) => (
                          <Link
                            key={c.id}
                            href={`/courses/${c.slug}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                          >
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                              {c.title}
                            </span>
                            <span className="text-[10px] text-red-600 font-extrabold">
                              {c.category}
                            </span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400">No matching courses</p>
                    )}
                  </div>

                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                      Mock Tests
                    </p>
                    {filteredTests.length > 0 ? (
                      <div className="space-y-1">
                        {filteredTests.map((t) => (
                          <Link
                            key={t.id}
                            href={`/mock-tests/${t.id}/take`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                          >
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                              {t.title}
                            </span>
                            <span className="text-[10px] text-emerald-600 font-extrabold">
                              {t.duration} Mins CBT
                            </span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400">No matching mock tests</p>
                    )}
                  </div>
                </>
              ) : (
                <div className="py-6 text-center space-y-2">
                  <p className="text-xs text-slate-500 font-medium">
                    Type keywords to search across SBI PO, SSC CGL, Railways, Notes and Test Series.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    {["SBI PO", "SSC CGL", "Reasoning", "Mock Test", "Quantitative"].map((k) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setSearchQuery(k)}
                        className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-50 hover:text-red-600 transition"
                      >
                        {k}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md lg:hidden animate-fadeIn"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[360px] max-w-full bg-white dark:bg-slate-950 shadow-2xl transition-transform duration-300 ease-out lg:hidden flex flex-col justify-between p-6 overflow-y-auto ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
              <img src="/gpa-logo-clean.png" alt="Gyan Prapti Academy" className="h-9 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-600 transition"
              aria-label="Close navigation"
            >
              <X size={20} />
            </button>
          </div>

          {!user && (
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center py-2.5 rounded-full border border-slate-300 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center py-2.5 rounded-full bg-[#991b1b] text-white text-xs font-bold hover:bg-[#b91c1c] transition"
              >
                Sign Up
              </Link>
            </div>
          )}

          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 mb-2">
              Menu
            </p>
            {navigation.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    active
                      ? "bg-red-50 dark:bg-red-500/10 text-[#b91c1c] dark:text-red-400"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="space-y-4 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Theme:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                  theme === "light"
                    ? "bg-amber-500 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                <Sun size={14} /> <span>Day</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                  theme === "dark"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                <Moon size={14} /> <span>Night</span>
              </button>
            </div>
          </div>

          {user && (
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                logout();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-extrabold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 transition"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
