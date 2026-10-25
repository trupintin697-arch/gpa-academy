"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getProfileExtra, setProfileExtra } from "@/utils/content-store";
import { avatarUrl } from "@/utils/avatar";
import { CheckCircle2, Shuffle, UserCircle, Phone, MapPin, BookOpen, Briefcase, Award, Link as LinkedinIcon, Hash, Users, Target, Clock, GraduationCap, Star } from "lucide-react";
const AVATAR_STYLES = [
    { id: "avataaars", label: "Cartoon" },
    { id: "personas", label: "Persona" },
    { id: "fun-emoji", label: "Emoji" },
    { id: "initials", label: "Initials" },
];
const TARGET_EXAMS = ["Banking (SBI/IBPS)", "SSC CGL / CHSL", "Railway NTPC / Group D", "UPSC CSAT", "UPSC Mains", "State PSC", "Defence (NDA/CDS)", "Insurance (LIC/NIACL)"];
const STUDY_GOALS = ["1–2 hours/day", "3–4 hours/day", "5–6 hours/day", "7–8 hours/day", "8+ hours/day"];
const SUBJECTS_OPT = ["Quantitative Aptitude", "Reasoning Ability", "English Language", "General Awareness", "Current Affairs", "Banking Awareness", "Static GK"];
function extractSeed(url) {
    const m = url.match(/seed=([^&]+)/);
    return m ? decodeURIComponent(m[1]) : url;
}
function completeness(fields) {
    const filled = fields.filter((f) => !!f?.trim()).length;
    return Math.round((filled / fields.length) * 100);
}
export default function ProfileForm({ role }) {
    const { user, updateUser } = useAuth();
    const [extra, setExtra] = useState({});
    const [saved, setSaved] = useState(false);
    // Avatar
    const [avatarStyle, setAvatarStyle] = useState("avataaars");
    const [seed, setSeed] = useState("");
    // Common fields
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [bio, setBio] = useState("");
    // Student fields
    const [batch, setBatch] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [targetExam, setTargetExam] = useState(TARGET_EXAMS[0]);
    const [studyGoal, setStudyGoal] = useState(STUDY_GOALS[2]);
    const [parentName, setParentName] = useState("");
    const [parentPhone, setParentPhone] = useState("");
    // Teacher fields
    const [subject, setSubject] = useState(SUBJECTS_OPT[0]);
    const [designation, setDesignation] = useState("");
    const [qualification, setQualification] = useState("");
    const [experience, setExperience] = useState("");
    const [linkedin, setLinkedin] = useState("");
    useEffect(() => {
        if (!user)
            return;
        const ex = getProfileExtra(user.id);
        setExtra(ex);
        setName(user.name ?? "");
        setSeed(extractSeed(user.avatar ?? ""));
        setPhone(ex.phone ?? "");
        setCity(ex.city ?? "");
        setBio(ex.bio ?? "");
        setBatch(ex.batch ?? "");
        setRollNumber(ex.rollNumber ?? "");
        setTargetExam(ex.targetExam ?? TARGET_EXAMS[0]);
        setStudyGoal(ex.studyGoalHours ?? STUDY_GOALS[2]);
        setParentName(ex.parentName ?? "");
        setParentPhone(ex.parentPhone ?? "");
        setSubject(ex.subject ?? SUBJECTS_OPT[0]);
        setDesignation(ex.designation ?? "");
        setQualification(ex.qualification ?? "");
        setExperience(ex.experienceYears ?? "");
        setLinkedin(ex.linkedin ?? "");
    }, [user]);
    if (!user)
        return null;
    const preview = avatarUrl(seed || user.id, avatarStyle);
    const cScore = role === "student"
        ? completeness([name, phone, city, bio, batch, rollNumber, parentName, targetExam])
        : completeness([name, phone, city, bio, subject, designation, qualification, experience]);
    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser({ name, avatar: preview });
        const baseExtra = { phone, city, bio };
        const roleExtra = role === "student"
            ? { batch, rollNumber, targetExam, studyGoalHours: studyGoal, parentName, parentPhone }
            : { subject, designation, qualification, experienceYears: experience, linkedin };
        setProfileExtra(user.id, { ...baseExtra, ...roleExtra });
        setSaved(true);
        setTimeout(() => setSaved(false), 4000);
    };
    return (<div className="max-w-2xl mx-auto pb-14 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
          <UserCircle size={13}/> Account Settings
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">My Profile</h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage your GPA identity and learning preferences</p>
      </div>

      {/* Profile Completeness */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Profile Completeness</span>
          <span className={`text-xs font-black ${cScore >= 80 ? "text-emerald-600" : cScore >= 50 ? "text-amber-600" : "text-red-600"}`}>{cScore}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-500 ${cScore >= 80 ? "bg-emerald-500" : cScore >= 50 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${cScore}%` }}/>
        </div>
        {cScore < 100 && <p className="text-[11px] text-slate-400 mt-1.5">Fill all fields to complete your profile and unlock full platform features.</p>}
      </div>

      {saved && (<div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 size={15}/> Profile saved successfully!
        </div>)}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Avatar Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm">
          <h2 className="text-sm font-black text-slate-900 dark:text-white mb-4">Profile Picture</h2>
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <img src={preview} alt="Avatar" className="w-20 h-20 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 object-cover"/>
              <button type="button" onClick={() => setSeed(`${name || user.id}-${Date.now()}`)} title="Shuffle" className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md hover:bg-red-700 transition">
                <Shuffle size={12}/>
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Avatar Style</p>
              <div className="flex flex-wrap gap-2">
                {AVATAR_STYLES.map((s) => (<button key={s.id} type="button" onClick={() => setAvatarStyle(s.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${avatarStyle === s.id ? "bg-red-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>
                    <img src={avatarUrl(seed || "sample", s.id)} alt={s.label} className="w-4 h-4 rounded"/>
                    {s.label}
                  </button>))}
              </div>
              <p className="text-[11px] text-slate-400 mt-2">Click shuffle to generate a new look</p>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-black text-slate-900 dark:text-white">Basic Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5"><UserCircle size={11}/> Full Name *</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-red-500 transition"/>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5"><Phone size={11}/> Phone Number</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" type="tel" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-red-500 transition"/>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
            <input value={user.email} readOnly disabled className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 px-4 py-3 text-sm text-slate-400 outline-none cursor-not-allowed"/>
            <p className="text-[11px] text-slate-400 mt-1">Email is your login ID · cannot be changed</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5"><MapPin size={11}/> City</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. New Delhi" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-red-500 transition"/>
            </div>
            <div className="col-span-1">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5"><Star size={11}/> Short Bio</label>
              <input value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A line about yourself..." className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-red-500 transition"/>
            </div>
          </div>
        </div>

        {/* Student-specific */}
        {role === "student" && (<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2"><GraduationCap size={15} className="text-red-500"/> Academic Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5"><Target size={11}/> Target Exam</label>
                <select value={targetExam} onChange={(e) => setTargetExam(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-red-500 transition">
                  {TARGET_EXAMS.map((e) => <option key={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5"><Clock size={11}/> Daily Study Goal</label>
                <select value={studyGoal} onChange={(e) => setStudyGoal(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-red-500 transition">
                  {STUDY_GOALS.map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5"><BookOpen size={11}/> Batch / Class</label>
                <input value={batch} onChange={(e) => setBatch(e.target.value)} placeholder="e.g. Banking Batch 2026" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-red-500 transition"/>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5"><Hash size={11}/> Roll / Enrolment No.</label>
                <input value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} placeholder="e.g. GPA2026/001" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-red-500 transition"/>
              </div>
            </div>

            <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Parent / Guardian Contact</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5"><Users size={11}/> Parent Name</label>
                  <input value={parentName} onChange={(e) => setParentName(e.target.value)} placeholder="Guardian's name" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-red-500 transition"/>
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5"><Phone size={11}/> Parent Phone</label>
                  <input value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} placeholder="+91 …" type="tel" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-red-500 transition"/>
                </div>
              </div>
            </div>
          </div>)}

        {/* Teacher-specific */}
        {role === "teacher" && (<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2"><Briefcase size={15} className="text-emerald-500"/> Faculty Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5"><Briefcase size={11}/> Designation</label>
                <input value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="e.g. Senior Faculty — Quant" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition"/>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5"><BookOpen size={11}/> Primary Subject</label>
                <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition">
                  {SUBJECTS_OPT.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5"><GraduationCap size={11}/> Qualification</label>
                <input value={qualification} onChange={(e) => setQualification(e.target.value)} placeholder="e.g. M.Sc. Mathematics, IIT Delhi" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition"/>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5"><Award size={11}/> Teaching Experience</label>
                <input value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="e.g. 8 years" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition"/>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5"><LinkedinIcon size={11}/> LinkedIn Profile URL</label>
              <input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/yourname" type="url" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition"/>
            </div>
          </div>)}

        {/* Save button */}
        <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white font-bold text-sm transition shadow-lg shadow-red-500/25 hover:scale-[1.01]">
          <CheckCircle2 size={15}/> Save Profile
        </button>
      </form>
    </div>);
}
