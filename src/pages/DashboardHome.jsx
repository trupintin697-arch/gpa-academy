import React from "react";
import Link from "next/link";
export default function DashboardHomePage() {
    return (<section className="rounded-[40px] border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Dashboard overview</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Welcome to GPA admin and student control center.</h1>
        <p className="mt-4 text-slate-300 leading-8">Use the sidebar to navigate to core reporting pages, course management and student progress tools.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[
            { title: "Student Dashboard", description: "Track progress, download notes and manage your learning path.", href: "/dashboard/student" },
            { title: "Admin Dashboard", description: "Review enrollments, create courses and publish notes.", href: "/dashboard/admin" },
            { title: "Course Catalog", description: "Browse all active courses and see course details.", href: "/courses" },
        ].map((item) => (<Link key={item.title} href={item.href} className="rounded-[28px] border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30">
            <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
            <p className="mt-4 text-slate-300">{item.description}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm text-cyan-300">Open page →</span>
          </Link>))}
      </div>
    </section>);
}
