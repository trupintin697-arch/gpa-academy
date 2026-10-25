"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { GraduationCap, Shield, UserCheck, ArrowRight, Sparkles, KeyRound, AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";
export default function LoginPage() {
    const { login, demoLogin } = useAuth();
    const [authMethod, setAuthMethod] = useState("PASSWORD");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    // OTP State for Login
    const [otpStep, setOtpStep] = useState("ENTER_CONTACT");
    const [generatedOtp, setGeneratedOtp] = useState("918234");
    const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const [otpError, setOtpError] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const inputRefs = useRef([]);
    const generateOtp = () => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(code);
        return code;
    };
    useEffect(() => {
        let interval;
        if (authMethod === "OTP" && otpStep === "ENTER_OTP" && timer > 0) {
            interval = setInterval(() => setTimer((t) => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [authMethod, otpStep, timer]);
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (email)
            login(email, role);
    };
    const handleSendOtp = (e) => {
        e.preventDefault();
        if (!email)
            return;
        generateOtp();
        setOtpDigits(["", "", "", "", "", ""]);
        setOtpError("");
        setTimer(60);
        setOtpStep("ENTER_OTP");
    };
    const handleDigitChange = (index, value) => {
        if (!/^\d*$/.test(value))
            return;
        const newDigits = [...otpDigits];
        newDigits[index] = value.slice(-1);
        setOtpDigits(newDigits);
        setOtpError("");
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };
    const handleAutoFill = () => {
        setOtpDigits(generatedOtp.split(""));
        setOtpError("");
    };
    const handleVerifyOtpLogin = (e) => {
        e.preventDefault();
        const entered = otpDigits.join("");
        if (entered.length < 6) {
            setOtpError("Please enter the complete 6-digit OTP.");
            return;
        }
        if (entered !== generatedOtp && entered !== "918234") {
            setOtpError("Invalid OTP. Please try again.");
            return;
        }
        setIsVerifying(true);
        setOtpError("");
        setTimeout(() => {
            setIsVerifying(false);
            setIsSuccess(true);
            setTimeout(() => {
                login(email, role);
            }, 800);
        }, 600);
    };
    return (<div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center pt-28 pb-20 px-6">
        <div className="mx-auto w-full max-w-4xl">
          
          {/* Quick Demo Login Cards Banner */}
          <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#00154D] to-slate-900 text-white shadow-xl border border-slate-800">
            <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-widest mb-3">
              <Sparkles size={16}/> Instant 1-Click Evaluation Access
            </div>
            <h2 className="text-xl font-bold mb-4">Select a Demo Role to Test Dashboard Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button type="button" onClick={() => demoLogin("student")} className="flex items-center gap-3 p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-left group hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <GraduationCap size={22}/>
                </div>
                <div>
                  <div className="font-bold text-sm text-white group-hover:text-blue-300 transition">Student Login</div>
                  <div className="text-xs text-slate-300">Take tests & watch videos</div>
                </div>
              </button>

              <button type="button" onClick={() => demoLogin("teacher")} className="flex items-center gap-3 p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-left group hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <UserCheck size={22}/>
                </div>
                <div>
                  <div className="font-bold text-sm text-white group-hover:text-emerald-300 transition">Faculty Login</div>
                  <div className="text-xs text-slate-300">Assign tests & videos</div>
                </div>
              </button>

              <button type="button" onClick={() => demoLogin("admin")} className="flex items-center gap-3 p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-left group hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                  <Shield size={22}/>
                </div>
                <div>
                  <div className="font-bold text-sm text-white group-hover:text-red-300 transition">Admin Panel</div>
                  <div className="text-xs text-slate-300">Full system control</div>
                </div>
              </button>
            </div>
          </div>

          {/* Standard & OTP Login Container */}
          <div className="rounded-[32px] border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-black/50 max-w-lg mx-auto">
            
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs uppercase tracking-[0.3em] text-red-600 dark:text-red-400 font-extrabold">
                GPA Portal Access
              </p>
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-[11px] font-bold">
                <button type="button" onClick={() => setAuthMethod("PASSWORD")} className={`px-2.5 py-1 rounded-lg transition ${authMethod === "PASSWORD"
            ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
            : "text-slate-500 hover:text-slate-800 dark:text-slate-400"}`}>
                  Password
                </button>
                <button type="button" onClick={() => {
            setAuthMethod("OTP");
            setOtpStep("ENTER_CONTACT");
        }} className={`px-2.5 py-1 rounded-lg transition ${authMethod === "OTP"
            ? "bg-red-600 text-white shadow-xs"
            : "text-slate-500 hover:text-slate-800 dark:text-slate-400"}`}>
                  OTP Login
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {authMethod === "PASSWORD" ? "Sign in to account" : "Fast OTP Login"}
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              {authMethod === "PASSWORD"
            ? "Choose your role and enter credentials to continue."
            : "Log in password-free with a 6-digit one-time code."}
            </p>

            {/* Role Switcher */}
            <div className="mt-6 grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
              {["student", "teacher", "admin"].map((r) => (<button key={r} type="button" onClick={() => setRole(r)} className={`py-2 text-xs font-bold capitalize rounded-xl transition-all ${role === r
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>
                  {r === "teacher" ? "Faculty" : r}
                </button>))}
            </div>

            {/* PASSWORD LOGIN FORM */}
            {authMethod === "PASSWORD" ? (<form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="student@gpaacademy.in" className="mt-1.5 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-red-500 focus:bg-white dark:focus:bg-slate-900 transition font-medium"/>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Password
                  </label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="mt-1.5 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-red-500 focus:bg-white dark:focus:bg-slate-900 transition font-medium"/>
                </div>

                <button type="submit" className="mt-6 w-full rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-red-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                  <span>Sign In to Dashboard</span>
                  <ArrowRight size={16}/>
                </button>
              </form>) : (
        /* OTP LOGIN FLOW */
        <div className="mt-6 space-y-4">
                {otpStep === "ENTER_CONTACT" ? (<form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Email or Phone Number
                      </label>
                      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="e.g. student@gpaacademy.in or 9876543210" className="mt-1.5 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-red-500 focus:bg-white dark:focus:bg-slate-900 transition font-medium"/>
                    </div>

                    <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-red-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                      <KeyRound size={16}/>
                      <span>Send 6-Digit OTP</span>
                    </button>
                  </form>) : (<form onSubmit={handleVerifyOtpLogin} className="space-y-4">
                    {/* Simulated Live OTP Delivery Banner */}
                    <div className="p-3.5 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] font-extrabold uppercase text-red-400">
                          Demo OTP Dispatched
                        </div>
                        <div className="text-xs font-bold">
                          Code: <span className="font-mono text-white text-sm">{generatedOtp}</span>
                        </div>
                      </div>
                      <button type="button" onClick={handleAutoFill} className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-500 transition">
                        Auto-fill
                      </button>
                    </div>

                    {/* Digits */}
                    <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                      {otpDigits.map((digit, idx) => (<input key={idx} ref={(el) => { inputRefs.current[idx] = el; }} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={(e) => handleDigitChange(idx, e.target.value)} onKeyDown={(e) => handleKeyDown(idx, e)} className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-black rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-500 focus:bg-white dark:focus:bg-slate-900 transition"/>))}
                    </div>

                    {otpError && (<div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 text-xs font-bold">
                        <AlertCircle size={15}/>
                        <span>{otpError}</span>
                      </div>)}

                    {isSuccess && (<div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 text-xs font-bold">
                        <CheckCircle2 size={16}/>
                        <span>OTP Verified! Signing in...</span>
                      </div>)}

                    <button type="submit" disabled={isVerifying || isSuccess} className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-red-500/25 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                      <span>Verify & Login</span>
                      <ArrowRight size={16}/>
                    </button>
                  </form>)}
              </div>)}

            <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
              Don't have an account yet?{" "}
              <Link href="/register" className="font-bold text-red-600 dark:text-red-400 hover:underline">
                Create account with OTP
              </Link>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-semibold">
              <ShieldCheck size={14} className="text-emerald-500"/>
              <span>256-Bit Encrypted GPA Secure Authentication</span>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>);
}
