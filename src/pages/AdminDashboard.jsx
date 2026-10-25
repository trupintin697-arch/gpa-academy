"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getAllUsers, setBanStatus, getViolationCount, getMarqueeItems, setMarqueeItems, defaultMarqueeItems, getExamCategories, setExamCategories, defaultExamCategories, getFeaturedCourses, setFeaturedCourses, defaultFeaturedCourses, } from "@/utils/content-store";
import CourseCard from "@/components/CourseCard";
import { mockTestsData, GPA_YOUTUBE_CHANNEL } from "@/data/mock-data";
import { Users, GraduationCap, BookOpen, Award, Video, Search, ShieldOff, ShieldCheck, ExternalLink, Plus, Upload, BarChart3, X, Palette, Flame, Trash2, RotateCcw, Check, LayoutGrid, } from "lucide-react";
const TABS = ["Overview", "Students", "Teachers", "Design"];
const DESIGN_SECTIONS = ["Ticker", "Exam Categories", "Courses"];
export default function AdminDashboard() {
    const { user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    // The URL is the single source of truth for which tab is open — this is
    // what the sidebar's "Manage Students" / "Manage Teachers" / "Design"
    // links target (?tab=...). Deriving it fresh on every render (instead of
    // copying it into local state once) is what keeps a link clicked a second
    // time — or clicked while a different tab is already open — actually
    // switch the tab instead of silently doing nothing.
    const queryTab = searchParams?.get("tab");
    const tab = queryTab === "teachers" ? "Teachers" : queryTab === "students" ? "Students" : queryTab === "design" ? "Design" : "Overview";
    const setTab = (t) => {
        router.push(t === "Overview" ? "/dashboard/admin" : `/dashboard/admin?tab=${t.toLowerCase()}`);
    };
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");
    const [banTarget, setBanTarget] = useState(null);
    const [banReason, setBanReason] = useState("");
    // Design tab — homepage content blocks, editable without touching source.
    const [designSection, setDesignSection] = useState("Ticker");
    const [marquee, setMarquee] = useState([]);
    const [marqueeDirty, setMarqueeDirty] = useState(false);
    const [marqueeSaved, setMarqueeSaved] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoriesDirty, setCategoriesDirty] = useState(false);
    const [categoriesSaved, setCategoriesSaved] = useState(false);
    const [courses, setCourses] = useState([]);
    const [coursesDirty, setCoursesDirty] = useState(false);
    const [coursesSaved, setCoursesSaved] = useState(false);
    useEffect(() => {
        setUsers(getAllUsers());
        setMarquee(getMarqueeItems());
        setCategories(getExamCategories());
        setCourses(getFeaturedCourses());
    }, []);
    const updateMarqueeItem = (idx, field, value) => {
        setMarquee((prev) => prev.map((it, i) => (i === idx ? { ...it, [field]: value } : it)));
        setMarqueeDirty(true);
        setMarqueeSaved(false);
    };
    const addMarqueeItem = () => {
        setMarquee((prev) => [...prev, { title: "", badge: "NEW" }]);
        setMarqueeDirty(true);
        setMarqueeSaved(false);
    };
    const removeMarqueeItem = (idx) => {
        setMarquee((prev) => prev.filter((_, i) => i !== idx));
        setMarqueeDirty(true);
        setMarqueeSaved(false);
    };
    const resetMarquee = () => {
        setMarquee(defaultMarqueeItems);
        setMarqueeDirty(true);
        setMarqueeSaved(false);
    };
    const saveMarquee = () => {
        const cleaned = marquee.filter((it) => it.title.trim());
        setMarqueeItems(cleaned);
        setMarquee(cleaned);
        setMarqueeDirty(false);
        setMarqueeSaved(true);
    };
    const updateCategory = (idx, field, value) => {
        setCategories((prev) => prev.map((it, i) => (i === idx ? { ...it, [field]: value } : it)));
        setCategoriesDirty(true);
        setCategoriesSaved(false);
    };
    const addCategory = () => {
        setCategories((prev) => [...prev, { label: "", description: "", path: "/courses" }]);
        setCategoriesDirty(true);
        setCategoriesSaved(false);
    };
    const removeCategory = (idx) => {
        setCategories((prev) => prev.filter((_, i) => i !== idx));
        setCategoriesDirty(true);
        setCategoriesSaved(false);
    };
    const resetCategories = () => {
        setCategories(defaultExamCategories);
        setCategoriesDirty(true);
        setCategoriesSaved(false);
    };
    const saveCategories = () => {
        const cleaned = categories.filter((it) => it.label.trim());
        setExamCategories(cleaned);
        setCategories(cleaned);
        setCategoriesDirty(false);
        setCategoriesSaved(true);
    };
    // Price/originalPrice are edited in plain rupees but stored in paise
    // (matching CourseCard, which divides by 100 to display "₹999").
    const updateCourse = (idx, field, value) => {
        setCourses((prev) => prev.map((c, i) => {
            if (i !== idx)
                return c;
            if (field === "lessons")
                return { ...c, lessons: Number(value) || 0 };
            if (field === "rating")
                return { ...c, rating: Number(value) || 0 };
            if (field === "price")
                return { ...c, price: Math.round((Number(value) || 0) * 100) };
            if (field === "originalPrice")
                return { ...c, originalPrice: Math.round((Number(value) || 0) * 100) };
            return { ...c, [field]: value };
        }));
        setCoursesDirty(true);
        setCoursesSaved(false);
    };
    const addCourse = () => {
        setCourses((prev) => [
            ...prev,
            {
                id: `course_${Date.now()}`,
                slug: "",
                category: "General",
                title: "",
                description: "",
                duration: "",
                lessons: 8,
                rating: 4.9,
                price: 99900,
                originalPrice: 199900,
            },
        ]);
        setCoursesDirty(true);
        setCoursesSaved(false);
    };
    const removeCourse = (idx) => {
        setCourses((prev) => prev.filter((_, i) => i !== idx));
        setCoursesDirty(true);
        setCoursesSaved(false);
    };
    const resetCourses = () => {
        setCourses(defaultFeaturedCourses);
        setCoursesDirty(true);
        setCoursesSaved(false);
    };
    const saveCourses = () => {
        const cleaned = courses.filter((c) => c.title.trim());
        setFeaturedCourses(cleaned);
        setCourses(cleaned);
        setCoursesDirty(false);
        setCoursesSaved(true);
    };
    const students = users.filter((u) => u.role === "student");
    const teachers = users.filter((u) => u.role === "teacher");
    const bannedCount = users.filter((u) => u.banned).length;
    const toggleBan = (target) => {
        if (target.banned) {
            setUsers(setBanStatus(target.id, false));
            return;
        }
        setBanReason("");
        setBanTarget(target);
    };
    const confirmBan = () => {
        if (!banTarget)
            return;
        setUsers(setBanStatus(banTarget.id, true, banReason.trim() || "Violation of platform policy"));
        setBanTarget(null);
    };
    const roster = (list) => list.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()));
    return (<div className="max-w-6xl mx-auto pb-14">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Admin · {user?.name}</p>
          <h1 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">Platform Control</h1>
        </div>
        <div className="flex gap-2">
          {["Manage Courses", "Create Course", "Upload Notes", "Analytics"].map((label, i) => (<Link key={label} href={["/dashboard/admin/manage-courses", "/dashboard/admin/create-course", "/dashboard/admin/upload-notes", "/dashboard/admin/analytics"][i]} className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 transition">
              {[<BookOpen key="a" size={12}/>, <Plus key="b" size={12}/>, <Upload key="c" size={12}/>, <BarChart3 key="d" size={12}/>][i]}
              {label}
            </Link>))}
        </div>
      </div>

      {/* Tabs — Design isn't listed here; it's reachable from the sidebar link only */}
      <div className="flex gap-5 border-b border-slate-200 dark:border-slate-800 mb-6">
        {TABS.filter((t) => t !== "Design").map((t) => (<button key={t} onClick={() => setTab(t)} className={`pb-3 text-xs font-bold border-b-2 transition ${tab === t ? "border-red-600 text-slate-900 dark:text-white" : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"}`}>
            {t}
          </button>))}
      </div>

      {tab === "Overview" && (<div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
                { label: "Students", value: students.length, icon: <GraduationCap size={14}/> },
                { label: "Teachers", value: teachers.length, icon: <Users size={14}/> },
                { label: "Mock Tests", value: mockTestsData.length, icon: <Award size={14}/> },
                { label: "Suspended", value: bannedCount, icon: <ShieldOff size={14}/> },
            ].map((s) => (<div key={s.label} className="rounded-lg border border-slate-200 dark:border-slate-800 p-3.5">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[10px] font-bold uppercase tracking-wider">{s.label}</span>
                  {s.icon}
                </div>
                <div className="text-xl font-black text-slate-900 dark:text-white mt-1">{s.value}</div>
              </div>))}
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Recently Registered</p>
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
              {users.slice(0, 6).map((u) => (<div key={u.id} className="flex items-center gap-3 px-4 py-2.5 text-xs">
                  <img src={u.avatar} alt="" className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800"/>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{u.name}</span>
                  <span className="text-slate-400">{u.email}</span>
                  <span className="ml-auto text-[10px] font-bold uppercase text-slate-400 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5">{u.role}</span>
                  {u.banned && <span className="text-[10px] font-bold text-red-600 dark:text-red-400">Suspended</span>}
                </div>))}
              {users.length === 0 && <p className="px-4 py-6 text-center text-xs text-slate-400">No users registered yet.</p>}
            </div>
          </div>

          <a href={GPA_YOUTUBE_CHANNEL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition">
            <Video size={13}/> Official YouTube Channel <ExternalLink size={11}/>
          </a>
        </div>)}

      {(tab === "Students" || tab === "Teachers") && (<div className="space-y-4">
          <div className="relative max-w-sm">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${tab.toLowerCase()}...`} className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent pl-8 pr-3 py-2 text-xs outline-none focus:border-red-500 transition"/>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-x-auto">
            <table className="w-full text-xs min-w-[560px]">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-400">
                <tr>
                  <th className="text-left font-bold uppercase tracking-wider px-4 py-2.5">Name</th>
                  <th className="text-left font-bold uppercase tracking-wider px-4 py-2.5">Email</th>
                  {tab === "Students" && <th className="text-left font-bold uppercase tracking-wider px-4 py-2.5">Violations</th>}
                  <th className="text-left font-bold uppercase tracking-wider px-4 py-2.5">Status</th>
                  <th className="text-right font-bold uppercase tracking-wider px-4 py-2.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {roster(tab === "Students" ? students : teachers).map((u) => {
                const violations = getViolationCount(u.id);
                return (<tr key={u.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/50 transition">
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <img src={u.avatar} alt="" className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800"/>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-slate-500">{u.email}</td>
                      {tab === "Students" && (<td className="px-4 py-2.5">
                          {violations > 0 ? <span className="font-bold text-amber-600 dark:text-amber-400">{violations} flagged</span> : <span className="text-slate-400">—</span>}
                        </td>)}
                      <td className="px-4 py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.banned ? "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400" : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"}`}>
                          {u.banned ? `Suspended${u.banReason ? ` — ${u.banReason}` : ""}` : "Active"}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <button onClick={() => toggleBan(u)} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${u.banned
                        ? "border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                        : "border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"}`}>
                          {u.banned ? <ShieldCheck size={12}/> : <ShieldOff size={12}/>} {u.banned ? "Unban" : "Ban"}
                        </button>
                      </td>
                    </tr>);
            })}
                {roster(tab === "Students" ? students : teachers).length === 0 && (<tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400 font-semibold">No {tab.toLowerCase()} found.</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>)}

      {tab === "Design" && (<div className="space-y-6 max-w-3xl">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1">
              <Palette size={12}/> Homepage Content
            </p>
            <p className="text-xs text-slate-500">
              Pick a block below to edit — no code changes needed.
            </p>
          </div>

          {/* Sub-tabs — more homepage blocks can be added here over time */}
          <div className="flex gap-2">
            {DESIGN_SECTIONS.map((s) => (<button key={s} onClick={() => setDesignSection(s)} className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${designSection === s
                    ? "bg-slate-900 dark:bg-red-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"}`}>
                {s}
              </button>))}
          </div>

          {designSection === "Ticker" && (<>
          <p className="text-xs text-slate-500 -mt-2">
            The scrolling strip under the homepage hero.
          </p>

          {/* Live preview, matching the actual homepage strip */}
          <div className="rounded-xl overflow-hidden border border-slate-800">
            <div className="py-3 bg-slate-900 text-white overflow-x-auto">
              <div className="flex w-max gap-8 px-4">
                {marquee.length === 0 && (<span className="text-xs text-slate-500 font-semibold">No items — add one below.</span>)}
                {marquee.map((item, i) => (<div key={i} className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider whitespace-nowrap">
                    <Flame size={13} className="text-red-500"/>
                    <span>{item.title || "…"}</span>
                    {item.badge && (<span className="px-2 py-0.5 rounded-full bg-red-600/30 border border-red-500/50 text-red-300 text-[9px] font-black">
                        {item.badge}
                      </span>)}
                  </div>))}
              </div>
            </div>
          </div>

          {/* Editable rows */}
          <div className="space-y-2">
            {marquee.map((item, idx) => (<div key={idx} className="flex items-center gap-2">
                <input value={item.title} onChange={(e) => updateMarqueeItem(idx, "title", e.target.value)} placeholder="e.g. BANKING (SBI & IBPS PO)" className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs outline-none focus:border-red-500 transition"/>
                <input value={item.badge} onChange={(e) => updateMarqueeItem(idx, "badge", e.target.value)} placeholder="Badge" className="w-28 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs outline-none focus:border-red-500 transition uppercase"/>
                <button onClick={() => removeMarqueeItem(idx)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition shrink-0" aria-label="Remove item">
                  <Trash2 size={14}/>
                </button>
              </div>))}
          </div>

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex gap-2">
              <button onClick={addMarqueeItem} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-red-400 dark:hover:border-red-500/50 transition">
                <Plus size={13}/> Add Item
              </button>
              <button onClick={resetMarquee} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 hover:border-slate-400 dark:hover:border-slate-500 transition">
                <RotateCcw size={13}/> Reset to Default
              </button>
            </div>

            <button onClick={saveMarquee} disabled={!marqueeDirty} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition">
              {marqueeSaved ? <><Check size={13}/> Saved</> : "Save Changes"}
            </button>
          </div>
          <p className="text-[11px] text-slate-400">Changes go live on the homepage as soon as you save.</p>
          </>)}

          {designSection === "Exam Categories" && (<>
          <p className="text-xs text-slate-500 -mt-2">
            The "Choose your target exam path" cards on the homepage.
          </p>

          {/* Live preview cards, matching the actual homepage grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.length === 0 && (<p className="text-xs text-slate-400 sm:col-span-2">No categories — add one below.</p>)}
            {categories.map((cat, i) => (<div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 flex items-center justify-center">
                    <LayoutGrid size={16} className="text-red-500"/>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50">
                    Verified Track
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">{cat.label || "…"}</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{cat.description || "No description yet."}</p>
              </div>))}
          </div>

          {/* Editable rows */}
          <div className="space-y-3">
            {categories.map((cat, idx) => (<div key={idx} className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <input value={cat.label} onChange={(e) => updateCategory(idx, "label", e.target.value)} placeholder="e.g. Banking Exams" className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs font-bold outline-none focus:border-red-500 transition"/>
                  <button onClick={() => removeCategory(idx)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition shrink-0" aria-label="Remove category">
                    <Trash2 size={14}/>
                  </button>
                </div>
                <textarea value={cat.description} onChange={(e) => updateCategory(idx, "description", e.target.value)} placeholder="Short description shown on the card..." rows={2} className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs outline-none focus:border-red-500 transition resize-none"/>
                <input value={cat.path} onChange={(e) => updateCategory(idx, "path", e.target.value)} placeholder="/courses?category=banking" className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-[11px] font-mono text-slate-500 outline-none focus:border-red-500 transition"/>
              </div>))}
          </div>

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex gap-2">
              <button onClick={addCategory} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-red-400 dark:hover:border-red-500/50 transition">
                <Plus size={13}/> Add Category
              </button>
              <button onClick={resetCategories} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 hover:border-slate-400 dark:hover:border-slate-500 transition">
                <RotateCcw size={13}/> Reset to Default
              </button>
            </div>

            <button onClick={saveCategories} disabled={!categoriesDirty} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition">
              {categoriesSaved ? <><Check size={13}/> Saved</> : "Save Changes"}
            </button>
          </div>
          <p className="text-[11px] text-slate-400">Changes go live on the homepage as soon as you save.</p>
          </>)}

          {designSection === "Courses" && (<>
          <p className="text-xs text-slate-500 -mt-2">
            The "Our best-selling courses" cards on the homepage. Prices are in ₹ (rupees).
          </p>

          {/* Live preview — the exact CourseCard used on the homepage */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.length === 0 && (<p className="text-xs text-slate-400 sm:col-span-2 lg:col-span-3">No courses — add one below.</p>)}
            {courses.map((c) => (<div key={c.id} className="scale-90 origin-top-left -mb-8">
                <CourseCard course={c}/>
              </div>))}
          </div>

          {/* Editable rows */}
          <div className="space-y-3">
            {courses.map((c, idx) => (<div key={c.id} className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <input value={c.title} onChange={(e) => updateCourse(idx, "title", e.target.value)} placeholder="Course title" className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs font-bold outline-none focus:border-red-500 transition"/>
                  <input value={c.category} onChange={(e) => updateCourse(idx, "category", e.target.value)} placeholder="Category" className="w-28 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs outline-none focus:border-red-500 transition"/>
                  <button onClick={() => removeCourse(idx)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition shrink-0" aria-label="Remove course">
                    <Trash2 size={14}/>
                  </button>
                </div>
                <textarea value={c.description} onChange={(e) => updateCourse(idx, "description", e.target.value)} placeholder="Short description shown on the card..." rows={2} className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs outline-none focus:border-red-500 transition resize-none"/>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  <input value={c.duration} onChange={(e) => updateCourse(idx, "duration", e.target.value)} placeholder="6 Weeks (24 Lectures)" className="col-span-2 sm:col-span-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-[11px] outline-none focus:border-red-500 transition"/>
                  <input type="number" min={1} value={c.lessons} onChange={(e) => updateCourse(idx, "lessons", e.target.value)} placeholder="Lectures" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-[11px] outline-none focus:border-red-500 transition"/>
                  <input type="number" min={0} max={5} step={0.05} value={c.rating} onChange={(e) => updateCourse(idx, "rating", e.target.value)} placeholder="Rating" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-[11px] outline-none focus:border-red-500 transition"/>
                  <input type="number" min={0} value={c.price / 100} onChange={(e) => updateCourse(idx, "price", e.target.value)} placeholder="Price ₹" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-[11px] outline-none focus:border-red-500 transition"/>
                  <input type="number" min={0} value={c.originalPrice / 100} onChange={(e) => updateCourse(idx, "originalPrice", e.target.value)} placeholder="Strike-through ₹" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-[11px] outline-none focus:border-red-500 transition"/>
                </div>
                <input value={c.slug} onChange={(e) => updateCourse(idx, "slug", e.target.value)} placeholder="course-slug — must match an existing /courses/[slug] page" className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-[11px] font-mono text-slate-500 outline-none focus:border-red-500 transition"/>
              </div>))}
          </div>

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex gap-2">
              <button onClick={addCourse} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-red-400 dark:hover:border-red-500/50 transition">
                <Plus size={13}/> Add Course
              </button>
              <button onClick={resetCourses} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 hover:border-slate-400 dark:hover:border-slate-500 transition">
                <RotateCcw size={13}/> Reset to Default
              </button>
            </div>

            <button onClick={saveCourses} disabled={!coursesDirty} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition">
              {coursesSaved ? <><Check size={13}/> Saved</> : "Save Changes"}
            </button>
          </div>
          <p className="text-[11px] text-slate-400">Changes go live on the homepage as soon as you save. The "Enroll Now" link uses the slug — keep it pointing at a real course page.</p>
          </>)}
        </div>)}

      {banTarget && (<div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setBanTarget(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 w-full max-w-sm p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white">Suspend {banTarget.name}?</h3>
              <button onClick={() => setBanTarget(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><X size={16}/></button>
            </div>
            <p className="text-xs text-slate-500 mb-3">They'll be logged out immediately and blocked from signing back in.</p>
            <textarea autoFocus value={banReason} onChange={(e) => setBanReason(e.target.value)} placeholder="Reason (e.g. exam malpractice, policy violation)..." rows={3} className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs outline-none focus:border-red-500 transition resize-none"/>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setBanTarget(null)} className="flex-1 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300">Cancel</button>
              <button onClick={confirmBan} className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition">Suspend Account</button>
            </div>
          </div>
        </div>)}
    </div>);
}
