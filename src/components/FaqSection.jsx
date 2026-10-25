"use client";
import { useState } from "react";
import { faqItems } from "@/data/mock-data";
import { ChevronDown } from "lucide-react";
export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(0);
    return (<section className="py-24 px-6 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-red-600 dark:text-red-400 font-extrabold">Got Questions?</p>
          <h2 className="mt-2 text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqItems.map((faq, index) => {
            const isOpen = openIndex === index;
            return (<div key={index} className="overflow-hidden rounded-[24px] border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition hover:border-red-300 dark:hover:border-red-500/30">
                <button className="flex w-full items-center justify-between p-6 text-left" onClick={() => setOpenIndex(isOpen ? null : index)}>
                  <span className="font-bold text-slate-900 dark:text-white text-base">{faq.question}</span>
                  <span className={`ml-6 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-600 dark:text-red-400' : ''}`}>
                    <ChevronDown size={18}/>
                  </span>
                </button>
                {isOpen && (<div className="px-6 pb-6 text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {faq.answer}
                  </div>)}
              </div>);
        })}
        </div>
      </div>
    </section>);
}
