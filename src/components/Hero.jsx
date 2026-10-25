import Link from "next/link";
export default function Hero() {
    return (<section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_20%_20%,_rgba(168,85,247,0.15),_transparent_25%)] py-32">
      <div className="absolute inset-x-0 top-0 h-72 bg-slate-950/90"/>
      <div className="mx-auto relative max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-8">
            <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm uppercase tracking-[0.32em] text-cyan-200">
              GPA • Gyan Prapti Academy
            </span>
            <h1 className="text-5xl font-semibold leading-tight text-white sm:text-6xl">
              Modern exam coaching for Banking, SSC, Railway and UPSC CSAT.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              Study with expert-led video lessons, downloadable notes and full-length mock tests designed to accelerate your exam readiness.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/courses" className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-violet-500 to-cyan-400 px-7 py-4 text-sm font-semibold text-slate-950 shadow-lg shadow-violet-500/20 transition hover:opacity-95">
                Browse Courses
              </Link>
              <Link href="/free-notes" className="inline-flex items-center justify-center rounded-3xl border border-white/10 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/5">
                Download Free Notes
              </Link>
            </div>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Featured pathway</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">SBI PO Accelerator</h2>
            <p className="mt-4 text-slate-300 leading-7">Live classes, daily practice and in-depth mock tests for aspirants targeting SBI PO with confidence.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/70 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Lessons</p>
                <p className="mt-3 text-2xl font-semibold text-white">72</p>
              </div>
              <div className="rounded-3xl bg-slate-950/70 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Mocks</p>
                <p className="mt-3 text-2xl font-semibold text-white">18</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);
}
