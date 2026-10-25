"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { BarChart3, BookOpen, FileText, Video, PlusCircle, Users, ShieldCheck, LogOut, Award, Sun, Moon, Menu, X, Home, Upload, UserCircle, Palette } from "lucide-react";
export default function DashboardSidebar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { user, logout } = useAuth();
    const { theme, toggleTheme, setTheme } = useTheme();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const isTeacher = pathname?.includes("/teacher") || user?.role === "teacher";
    const isAdmin = pathname?.includes("/admin") || user?.role === "admin";
    const currentSearch = searchParams?.toString() ? `?${searchParams.toString()}` : "";
    const currentUrl = `${pathname}${currentSearch}`;

    const isLinkActive = (linkHref) => {
        if (linkHref.includes("?")) {
            return currentUrl === linkHref;
        }
        return pathname === linkHref && (!searchParams || !searchParams.get("tab"));
    };

    const studentLinks = [
        { href: "/dashboard/student", label: "My Learning", icon: <BarChart3 size={18}/> },
        { href: "/dashboard/student/profile", label: "My Profile", icon: <UserCircle size={18}/> },
        { href: "/courses", label: "GPA Courses", icon: <BookOpen size={18}/> },
        { href: "/mock-tests", label: "Proctored Tests", icon: <Award size={18}/> },
        { href: "/free-notes", label: "Notes & E-Library", icon: <FileText size={18}/> },
    ];
    const teacherLinks = [
        { href: "/dashboard/teacher", label: "Faculty Hub", icon: <BarChart3 size={18}/> },
        { href: "/dashboard/teacher/profile", label: "My Profile", icon: <UserCircle size={18}/> },
        { href: "/dashboard/teacher?tab=videos", label: "Assign YouTube Videos", icon: <Video size={18}/> },
        { href: "/dashboard/teacher?tab=builder", label: "Create 120m Test", icon: <PlusCircle size={18}/> },
        { href: "/dashboard/teacher?tab=students", label: "Student Scores & Logs", icon: <Users size={18}/> },
    ];
    const adminLinks = [
        { href: "/dashboard/admin", label: "Master Overview", icon: <ShieldCheck size={18}/> },
        { href: "/dashboard/admin?tab=students", label: "Manage Students", icon: <Users size={18}/> },
        { href: "/dashboard/admin?tab=teachers", label: "Manage Teachers", icon: <Users size={18}/> },
        { href: "/dashboard/admin?tab=design", label: "Design", icon: <Palette size={18}/> },
        { href: "/dashboard/admin/manage-courses", label: "Manage Courses", icon: <BookOpen size={18}/> },
        { href: "/dashboard/admin/create-course", label: "Create Course", icon: <PlusCircle size={18}/> },
        { href: "/free-notes", label: "E-Library Notes", icon: <Upload size={18}/> },
        { href: "/dashboard/admin", label: "Platform Analytics", icon: <BarChart3 size={18}/> },
    ];
    const links = isAdmin ? adminLinks : isTeacher ? teacherLinks : studentLinks;
    const roleName = isAdmin ? "Administrator" : isTeacher ? "Faculty Member" : "Student Aspirant";
    return (<>
      {/* MOBILE TOP BAR FOR DASHBOARD (Phones & Tablets) */}
      <div className="md:hidden sticky top-0 z-40 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-white p-0.5 border border-slate-200 dark:border-slate-700">
            <img src="/gpa-emblem.svg" alt="GPA Logo" className="w-full h-full object-contain"/>
          </div>
          <div>
            <span className="text-sm font-black text-slate-900 dark:text-white">GPA</span>
            <span className="text-[10px] ml-1.5 font-bold px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400">
              {roleName}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button type="button" onClick={toggleTheme} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200" title="Toggle Light / Dark">
            {theme === "light" ? <Sun size={17} className="text-amber-500"/> : <Moon size={17} className="text-blue-400"/>}
          </button>

          <button type="button" onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 rounded-xl bg-slate-900 dark:bg-red-600 text-white" title="Open Menu">
            {isMobileOpen ? <X size={18}/> : <Menu size={18}/>}
          </button>
        </div>
      </div>

      {/* MOBILE SLIDE-OUT DRAWER */}
      {isMobileOpen && (<div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white dark:bg-slate-900 rounded-t-[32px] border-t border-slate-200 dark:border-slate-800 p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm shadow">
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : "GP"}
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900 dark:text-white">{user?.name || "GPA Member"}</div>
                  <div className="text-xs text-slate-400">{user?.email || "member@gpa.in"}</div>
                </div>
              </div>
              <button onClick={() => setIsMobileOpen(false)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                <X size={18}/>
              </button>
            </div>

            <nav className="space-y-1.5 pt-2">
              <Link href="/" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                <Home size={18}/>
                <span>Return to Website Home</span>
              </Link>

              {links.map((link) => {
                const isActive = isLinkActive(link.href);
                return (<Link key={link.label} href={link.href} onClick={() => setIsMobileOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition ${isActive
                        ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>);
            })}
            </nav>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => {
                setIsMobileOpen(false);
                logout();
            }} className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-bold text-sm">
                <LogOut size={16}/>
                <span>Sign Out from Account</span>
              </button>
            </div>
          </div>
        </div>)}

      {/* DESKTOP STICKY SIDEBAR */}
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 hidden md:flex flex-col h-screen shadow-sm sticky top-0 transition-colors duration-200">
        <div className="p-6">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-sm border border-slate-200/80 dark:border-slate-800 p-0.5 flex items-center justify-center">
              <img src="/gpa-emblem.svg" alt="GPA Logo" className="w-full h-full object-contain"/>
            </div>
            <div>
              <div className="text-base font-black text-slate-900 dark:text-white leading-none">GPA</div>
              <div className="text-[10px] font-bold text-red-600 dark:text-red-400">Gyan Prapti Academy</div>
            </div>
          </Link>

          {/* Role Badge */}
          <div className="mb-6 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>{roleName}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          <nav className="flex flex-col gap-1.5">
            {links.map((link) => {
            const isActive = isLinkActive(link.href);
            return (<Link key={link.label} href={link.href} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-bold text-xs ${isActive
                    ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}`}>
                  {link.icon}
                  {link.label}
                </Link>);
        })}
          </nav>
        </div>

        {/* User Profile & Theme Controls */}
        <div className="mt-auto p-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <button type="button" onClick={toggleTheme} className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <span className="flex items-center gap-2">
              {theme === "light" ? <Sun size={15} className="text-amber-500"/> : <Moon size={15} className="text-blue-400"/>}
              {theme === "light" ? "Light Mode" : "Dark Mode"}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold">Switch</span>
          </button>

          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-[#00154D] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : "GP"}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user?.name || "GPA Member"}</p>
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate">{user?.email || "member@gpa.in"}</p>
              </div>
            </div>
            <button onClick={logout} title="Logout" className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition">
              <LogOut size={16}/>
            </button>
          </div>
        </div>
      </aside>
    </>);
}
