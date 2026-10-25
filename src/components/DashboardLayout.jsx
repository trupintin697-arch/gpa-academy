import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
function roleHome(role) {
    return role === "admin" ? "/dashboard/admin" : role === "teacher" ? "/dashboard/teacher" : "/dashboard/student";
}
export default function DashboardLayout({ children, requiredRole }) {
    const { user } = useAuth();
    const router = useRouter();
    const [checking, setChecking] = useState(true);
    useEffect(() => {
        // Wait for localStorage check on initial load
        const saved = localStorage.getItem("gpa_auth_user");
        if (!saved && !user) {
            router.replace("/login");
            return;
        }
        const activeUser = user ?? (saved ? JSON.parse(saved) : null);
        if (requiredRole && activeUser && activeUser.role !== requiredRole) {
            router.replace(roleHome(activeUser.role));
            return;
        }
        setChecking(false);
    }, [user, router, requiredRole]);
    if (checking) {
        return (<div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden animate-bounce p-1 bg-white border border-slate-200 shadow-md">
            <img src="/gpa-emblem.svg" alt="GPA Logo" className="w-full h-full object-contain"/>
          </div>
          <p className="text-xs font-bold text-slate-500">Checking authentication...</p>
        </div>
      </div>);
    }
    return (<div className="flex flex-col md:flex-row min-h-screen md:h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden md:overflow-hidden transition-colors duration-200">
      <DashboardSidebar />
      <main className="flex-1 w-full overflow-y-auto p-4 sm:p-6 md:p-8">
        {children}
      </main>
    </div>);
}
