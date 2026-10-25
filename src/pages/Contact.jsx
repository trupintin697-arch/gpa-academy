"use client";
import { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles } from "lucide-react";
export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => setSubmitted(false), 5000);
    };
    return (<div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <main className="flex-1 pt-28 pb-24 px-6">
        <div className="mx-auto max-w-6xl space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles size={14}/> Get in Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Speak with our admissions & mentor team.
            </h1>
            <p className="mt-4 text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium">
              We help students choose the right course, schedule mock tests, and access free revision notes.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Contact Details Card */}
            <div className="rounded-[32px] border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 md:p-10 shadow-2xl shadow-slate-200/40 dark:shadow-black/40 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Academic Support Office</h2>
                <p className="mt-4 text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Have questions about our banking, SSC, railway, or UPSC CSAT programs? Our admissions counselors and faculty mentors are available 6 days a week.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                      <Mail size={20}/>
                    </div>
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">Email Support</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">support@gpaacademy.in</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <Phone size={20}/>
                    </div>
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">Call / WhatsApp</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">+91 98765 43210</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <MapPin size={20}/>
                    </div>
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">Campus Location</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Near Police Association, Lodipur, Patna, Bihar</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Operating Hours: Monday – Saturday (9:00 AM – 7:00 PM IST)
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-[32px] border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 md:p-10 shadow-2xl shadow-slate-200/40 dark:shadow-black/40">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Send a Message</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-6">Fill in the details below and we will respond within 2 hours.</p>

              {submitted && (<div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400"/>
                  Thank you! Your message has been received. Our counselor will contact you shortly.
                </div>)}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Your Full Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Vikram Patel" className="mt-1.5 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-xs text-slate-900 dark:text-white outline-none focus:border-red-500 focus:bg-white dark:focus:bg-slate-900 transition"/>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="mt-1.5 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-xs text-slate-900 dark:text-white outline-none focus:border-red-500 focus:bg-white dark:focus:bg-slate-900 transition"/>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Message or Query</label>
                  <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Tell us how we can help you with your exam preparation..." className="mt-1.5 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-xs text-slate-900 dark:text-white outline-none focus:border-red-500 focus:bg-white dark:focus:bg-slate-900 transition"/>
                </div>

                <button type="submit" className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 py-3.5 px-6 text-xs font-bold text-white transition-all shadow-lg shadow-red-500/20 hover:scale-[1.02]">
                  <Send size={15}/> Send Inquiry to GPA
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>);
}
