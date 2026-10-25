import React from "react";
import Link from "next/link";
import { SearchX } from "lucide-react";
export default function NotFound() {
    return (<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 text-center">
      <div>
        <SearchX size={40} className="mx-auto text-red-500 mb-4"/>
        <h1 className="text-xl font-black text-slate-900 dark:text-white">Page Not Found</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-6">The page you're looking for doesn't exist or has moved.</p>
        <Link href="/" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition">
          Back to Home
        </Link>
      </div>
    </div>);
}
