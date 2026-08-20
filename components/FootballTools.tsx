"use client";

import { Sparkles, WandSparkles } from "lucide-react";
import { tools } from "@/lib/tools";
import ToolCard from "./ToolCard";

export default function FootballTools() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500 text-xl font-black text-black">
              T
            </div>

            <div>
              <div className="text-lg font-black tracking-tight">
                TRAXTOR
              </div>
              <div className="text-[10px] text-slate-500">
                FOOTBALL GRAPHIC TOOLS
              </div>
            </div>
          </div>

          <div className="hidden text-sm text-slate-400 sm:block">
            ابزارهای گرافیکی فوتبال
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-green-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl px-5 pb-16 pt-20 text-center lg:pt-28">
          <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-4 py-2 text-xs font-medium text-green-400">
            <Sparkles size={14} />
            ابزارهای طراحی برای رسانه‌های فوتبالی
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            طرح فوتبالی خودت را
            <span className="block text-green-400">
              در چند ثانیه بساز
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            اطلاعات بازیکنان، ترکیب یا آمار را وارد کن و در چند مرحله
            یک طرح گرافیکی حرفه‌ای برای انتشار در شبکه‌های اجتماعی
            دریافت کن.
          </p>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
            <WandSparkles size={16} />
            بدون نیاز به نرم‌افزار گرافیکی
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              ابزارهای طراحی
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              ابزار مورد نیازت را انتخاب کن
            </p>
          </div>

          <div className="text-sm text-slate-500">
            {tools.filter((tool) => tool.available).length} ابزار فعال
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto max-w-7xl px-5 text-center text-xs text-slate-600">
          TRAXTOR — Football Graphic Tools
        </div>
      </footer>
    </main>
  );
}
