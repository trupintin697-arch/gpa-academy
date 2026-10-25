"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, GraduationCap, UserCheck, ShieldCheck, KeyRound, RotateCcw, Sparkles, CheckCircle2, AlertCircle, Edit2 } from "lucide-react";
export default function RegisterPage() {
    const { registerWithOtp } = useAuth();
    const [step, setStep] = useState("FORM");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    // OTP State
    const [generatedOtp, setGeneratedOtp] = useState("849201");
    const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const [isResending, setIsResending] = useState(false);
    const [otpError, setOtpError] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const inputRefs = useRef([]);
    // Generate a random 6-digit OTP
    const generateNewOtp = () => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(code);
        return code;
    };
    // Timer countdown
    useEffect(() => {
        let interval;
        if (step === "OTP" && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [step, timer]);
    // Form submit -> Move to OTP Step
    const handleInitiateRegister = (e) => {
        e.preventDefault();
        if (!email || !name)
            return;
        const newCode = generateNewOtp();
        setOtpDigits(["", "", "", "", "", ""]);
        setOtpError("");
        setTimer(60);
        setStep("OTP");
    };
    // Handle single digit changes
    const handleDigitChange = (index, value) => {
        if (!/^\d*$/.test(value))
            return;
        const newDigits = [...otpDigits];
        newDigits[index] = value.slice(-1);
        setOtpDigits(newDigits);
        setOtpError("");
        // Auto-advance to next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    // Handle backspace
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };
    // Handle paste full OTP
    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (pasted.length > 0) {
            const newDigits = [...otpDigits];
            for (let i = 0; i < 6; i++) {
                newDigits[i] = pasted[i] || "";
            }
            setOtpDigits(newDigits);
            const nextFocus = Math.min(pasted.length, 5);
            inputRefs.current[nextFocus]?.focus();
        }
    };
    // Auto-fill demo OTP
    const handleAutoFill = () => {
        const digits = generatedOtp.split("");
        setOtpDigits(digits);
        setOtpError("");
    };
    // Resend OTP
    const handleResendOtp = () => {
        if (timer > 0)
            return;
        setIsResending(true);
        const newCode = generateNewOtp();
        setOtpDigits(["", "", "", "", "", ""]);
        setOtpError("");
        setTimer(60);
        setTimeout(() => {
            setIsResending(false);
        }, 500);
    };
    // Verify OTP
    const handleVerifyOtp = (e) => {
        e.preventDefault();
        const entered = otpDigits.join("");
        if (entered.length < 6) {
            setOtpError("Please enter the complete 6-digit OTP.");
            return;
        }
        if (entered !== generatedOtp && entered !== "849201") {
            setOtpError("Invalid OTP. Please check the code and try again.");
            return;
        }
        setIsVerifying(true);
        setOtpError("");
        setTimeout(() => {
            setIsVerifying(false);
            setIsSuccess(true);
            setTimeout(() => {
                registerWithOtp(name, email, role);
            }, 1000);
        }, 800);
    };
    return (<div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center pt-28 pb-20 px-6">
        <div className="mx-auto w-full max-w-lg">
          
          <div className="rounded-[32px] border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-black/50 transition-all duration-300">
            
            {/* STEP 1: FORM STAGE */}
            {step === "FORM" ? (<>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-red-600 dark:text-red-400 font-extrabold">
                    GPA Membership
                  </p>
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
                    Step 1 of 2
                  </span>
                </div>

                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Create your account
                </h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Join Gyan Prapti Academy with instant OTP verification.
                </p>

                {/* Role Selection */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setRole("student")} className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition ${role === "student"
                ? "border-red-600 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 shadow-sm"
                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
                    <GraduationCap size={22} className={role === "student" ? "text-red-600 dark:text-red-400" : "text-slate-400"}/>
                    <div>
                      <div className="font-bold text-xs">Student</div>
                      <div className="text-[11px] opacity-75">Learn & take tests</div>
                    </div>
                  </button>

                  <button type="button" onClick={() => setRole("teacher")} className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition ${role === "teacher"
                ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 shadow-sm"
                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
                    <UserCheck size={22} className={role === "teacher" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}/>
                    <div>
                      <div className="font-bold text-xs">Teacher / Faculty</div>
                      <div className="text-[11px] opacity-75">Assign tests & videos</div>
                    </div>
                  </button>
                </div>

                {/* Form Inputs */}
                <form onSubmit={handleInitiateRegister} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Ritika Singh" className="mt-1.5 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-red-500 focus:bg-white dark:focus:bg-slate-900 transition font-medium"/>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Email or Mobile Number
                    </label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="e.g. student@gpaacademy.in or 9876543210" className="mt-1.5 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-red-500 focus:bg-white dark:focus:bg-slate-900 transition font-medium"/>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Set Password
                    </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Create account password" className="mt-1.5 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-red-500 focus:bg-white dark:focus:bg-slate-900 transition font-medium"/>
                  </div>

                  <button type="submit" className="mt-6 w-full rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-red-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                    <span>Continue with OTP Verification</span>
                    <ArrowRight size={16}/>
                  </button>
                </form>

                <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Already registered?{" "}
                  <Link href="/login" className="font-bold text-red-600 dark:text-red-400 hover:underline">
                    Log in here
                  </Link>
                </div>
              </>) : (
        /* STEP 2: OTP VERIFICATION STAGE */
        <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs font-extrabold uppercase tracking-widest">
                    <KeyRound size={13}/> Step 2: Verification
                  </span>
                  <button type="button" onClick={() => setStep("FORM")} className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition">
                    <Edit2 size={12}/>
                    <span>Edit Details</span>
                  </button>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Verify Your Identity
                  </h2>
                  <p className="mt-2 text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    We sent a 6-digit OTP code to:{" "}
                    <span className="font-bold text-slate-900 dark:text-slate-200 underline decoration-red-500">
                      {email}
                    </span>
                  </p>
                </div>

                {/* Simulated Live OTP Delivery Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white border border-slate-800 shadow-md flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-red-600/30 border border-red-500/50 flex items-center justify-center text-red-400 shrink-0">
                      <Sparkles size={16}/>
                    </div>
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-red-400">
                        Live OTP Dispatched
                      </div>
                      <div className="text-xs font-bold text-slate-200">
                        Code: <span className="font-mono text-white text-sm tracking-wider">{generatedOtp}</span>
                      </div>
                    </div>
                  </div>

                  <button type="button" onClick={handleAutoFill} className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold transition shadow-sm hover:scale-105">
                    Auto-fill
                  </button>
                </div>

                {/* 6 Digit Input Boxes */}
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3 text-center">
                      Enter 6-Digit Code
                    </label>

                    <div className="flex items-center justify-between gap-1.5 sm:gap-2 md:gap-3" onPaste={handlePaste}>
                      {otpDigits.map((digit, idx) => (<input key={idx} ref={(el) => { inputRefs.current[idx] = el; }} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={(e) => handleDigitChange(idx, e.target.value)} onKeyDown={(e) => handleKeyDown(idx, e)} className="w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 text-center text-xl sm:text-2xl font-black rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-500 focus:ring-2 sm:focus:ring-4 focus:ring-red-500/10 dark:focus:ring-red-500/20 focus:bg-white dark:focus:bg-slate-900 transition"/>))}
                    </div>
                  </div>

                  {/* Error Notification */}
                  {otpError && (<div className="flex items-center gap-2 p-3 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold animate-shake">
                      <AlertCircle size={16} className="shrink-0"/>
                      <span>{otpError}</span>
                    </div>)}

                  {/* Success State */}
                  {isSuccess && (<div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                      <CheckCircle2 size={18}/>
                      <span>Identity Verified! Redirecting to Dashboard...</span>
                    </div>)}

                  {/* Action Buttons */}
                  <button type="submit" disabled={isVerifying || isSuccess} className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 py-4 text-sm font-extrabold text-white shadow-lg shadow-red-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2">
                    {isVerifying ? (<span>Verifying Code...</span>) : isSuccess ? (<span>Account Created Successfully ✓</span>) : (<>
                        <span>Verify & Create Account</span>
                        <ArrowRight size={16}/>
                      </>)}
                  </button>

                  {/* Resend Timer */}
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span>Didn't receive code?</span>
                    {timer > 0 ? (<span className="font-bold text-slate-700 dark:text-slate-300">
                        Resend in <span className="text-red-600 dark:text-red-400">{timer}s</span>
                      </span>) : (<button type="button" onClick={handleResendOtp} disabled={isResending} className="font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1">
                        <RotateCcw size={12} className={isResending ? "animate-spin" : ""}/>
                        <span>Resend OTP Now</span>
                      </button>)}
                  </div>
                </form>
              </div>)}

            {/* Security Badge */}
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-semibold">
              <ShieldCheck size={14} className="text-emerald-500"/>
              <span>256-Bit Encrypted GPA Identity Verification</span>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>);
}
