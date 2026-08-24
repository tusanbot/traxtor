"use client";

import { Sparkles, WandSparkles, FolderOpen } from "lucide-react";
import { tools } from "@/lib/tools";
import ToolCard from "./ToolCard";

export default function FootballTools() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080808] text-white">
      <header className="border-b border-white/10 bg-[#090909]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d71920] text-xl font-black text-white shadow-lg shadow-red-950/30">T</div><div><div className="text-lg font-black tracking-tight">TRAXTOR</div><div className="text-[10px] font-bold tracking-[3px] text-[#d4a72c]">FOOTBALL GRAPHIC TOOLS</div></div></div>
          <div className="flex items-center gap-4"><a href="/tools/saved" className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white/70 hover:bg-white/10 hover:text-white"><FolderOpen size={16}/> طرح‌های ذخیره‌شده</a><div className="hidden items-center gap-2 text-sm text-white/40 sm:flex"><span className="h-2 w-2 rounded-full bg-[#d71920]" /> فن‌پیج تراکتور</div></div>
        </div>
      </header>
      <section className="relative overflow-hidden border-b border-white/5"><div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(215,25,32,.25),transparent_35%),radial-gradient(circle_at_20%_90%,rgba(212,167,44,.08),transparent_35%)]" /><div className="absolute right-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full border border-[#d71920]/10" /><div className="relative mx-auto max-w-5xl px-5 pb-20 pt-20 text-center lg:pt-28"><div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-[#d71920]/30 bg-[#d71920]/10 px-4 py-2 text-xs font-bold text-[#d4a72c]"><Sparkles size={14}/> ابزارهای گرافیکی فن‌پیج تراکتور</div><h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">طرح فوتبالی خودت را<span className="block text-[#d71920]">در چند ثانیه بساز</span></h1><p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/45 sm:text-lg">اطلاعات بازیکنان، ترکیب یا آمار را وارد کن و یک طرح گرافیکی حرفه‌ای با هویت بصری تراکتور برای انتشار در شبکه‌های اجتماعی بساز.</p><div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/35"><WandSparkles size={16} className="text-[#d4a72c]"/> بدون نیاز به نرم‌افزار گرافیکی</div></div></section>
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-14 lg:px-8"><div className="mb-8 flex items-end justify-between"><div><h2 className="text-2xl font-bold">ابزارهای طراحی</h2><p className="mt-2 text-sm text-white/35">یک قالب انتخاب کن و طرح خودت را بساز</p></div><div className="text-sm text-[#d4a72c]">{tools.filter((tool) => tool.available).length} ابزار فعال</div></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{tools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}</div></section>
      <footer className="border-t border-white/5 py-8"><div className="mx-auto max-w-7xl px-5 text-center text-xs font-bold tracking-[3px] text-white/20">TRAXTOR — FOOTBALL GRAPHIC TOOLS</div></footer>
    </main>
  );
}
