"use client";
import React, { useState, useEffect, useRef } from "react";
export default function LazySection({ children, minHeight = "200px", className = "", rootMargin = "300px", }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        if (isVisible)
            return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, {
            rootMargin,
            threshold: 0.01,
        });
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => observer.disconnect();
    }, [isVisible, rootMargin]);
    return (<div ref={ref} className={`${className} transition-opacity duration-300 overflow-visible`} style={{
            minHeight: isVisible ? undefined : minHeight,
        }}>
      {isVisible ? children : (<div className="w-full flex items-center justify-center p-8 opacity-0">
          <div className="w-6 h-6 rounded-full border-2 border-red-500 border-t-transparent animate-spin"/>
        </div>)}
    </div>);
}
