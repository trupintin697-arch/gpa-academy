"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext({
    theme: "light",
    toggleTheme: () => { },
    setTheme: () => { },
});
export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState("light");
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem("gpa_theme");
        const initialTheme = saved === "dark" ? "dark" : "light";
        setThemeState(initialTheme);
        if (initialTheme === "dark") {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }
    }, []);
    const setTheme = (t) => {
        setThemeState(t);
        try {
            localStorage.setItem("gpa_theme", t);
        }
        catch { }
        if (t === "dark") {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }
    };
    const toggleTheme = () => {
        setThemeState((prev) => {
            const next = prev === "light" ? "dark" : "light";
            try {
                localStorage.setItem("gpa_theme", next);
            }
            catch { }
            if (next === "dark") {
                document.documentElement.classList.add("dark");
            }
            else {
                document.documentElement.classList.remove("dark");
            }
            return next;
        });
    };
    return (<ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>);
}
export const useTheme = () => useContext(ThemeContext);
