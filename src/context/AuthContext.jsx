"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { avatarUrl } from "@/utils/avatar";
import { registerUser, isBanned } from "@/utils/content-store";
export const DEMO_USERS = {
    student: { id: "std_1", name: "Ritika Singh (Student)", email: "student@gpaacademy.in", role: "student", avatar: avatarUrl("Ritika") },
    teacher: { id: "tch_1", name: "Dr. Rajesh Kumar (Faculty)", email: "faculty@gpaacademy.in", role: "teacher", avatar: avatarUrl("Rajesh") },
    admin: { id: "adm_1", name: "Principal Administrator", email: "admin@gpaacademy.in", role: "admin", avatar: avatarUrl("Admin") },
};
function roleHome(role) {
    return role === "admin" ? "/dashboard/admin" : role === "teacher" ? "/dashboard/teacher" : "/dashboard/student";
}
const AuthContext = createContext({
    user: null,
    login: () => false,
    registerWithOtp: () => false,
    demoLogin: () => false,
    logout: () => { },
    updateUser: () => { },
});
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter();
    useEffect(() => {
        const saved = localStorage.getItem("gpa_auth_user");
        if (!saved)
            return;
        try {
            const parsed = JSON.parse(saved);
            if (isBanned(parsed.id)) {
                localStorage.removeItem("gpa_auth_user");
                router.push("/login");
                return;
            }
            setUser(parsed);
        }
        catch {
            setUser(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const persist = (authUser) => {
        const registered = registerUser(authUser);
        if (registered.banned) {
            alert(`This account has been suspended.${registered.banReason ? ` Reason: ${registered.banReason}` : ""} Contact GPA support for help.`);
            return false;
        }
        setUser(authUser);
        localStorage.setItem("gpa_auth_user", JSON.stringify(authUser));
        router.push(roleHome(authUser.role));
        return true;
    };
    const login = (email, role = "student") => persist({ id: email.toLowerCase(), name: email.split("@")[0], email, role, avatar: avatarUrl(email) });
    const registerWithOtp = (name, email, role = "student") => persist({ id: email.toLowerCase(), name: name || email.split("@")[0], email, role, avatar: avatarUrl(name || email) });
    const demoLogin = (role) => persist(DEMO_USERS[role]);
    const logout = () => {
        setUser(null);
        localStorage.removeItem("gpa_auth_user");
        router.push("/login");
    };
    const updateUser = (patch) => {
        setUser((prev) => {
            if (!prev)
                return prev;
            const next = { ...prev, ...patch };
            localStorage.setItem("gpa_auth_user", JSON.stringify(next));
            return next;
        });
    };
    return (<AuthContext.Provider value={{ user, login, registerWithOtp, demoLogin, logout, updateUser }}>
      {children}
    </AuthContext.Provider>);
}
export const useAuth = () => useContext(AuthContext);
