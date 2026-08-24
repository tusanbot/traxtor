"use client";

import type { Tool } from "@/lib/tools";
import { ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";

type Props = { tool: Tool };

export default function ToolCard({ tool }: Props) {
  const Icon = tool.icon;
  const content = (
    <div className={`group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border p-6 text-right transition-all duration-300 ${tool.available ? "border-white/10 bg-[#111111] hover:-translate-y-1 hover:border-[#d71920]/50 hover:bg-[#151515] hover:shadow-2xl hover:shadow-red-950/20" : "cursor-not-allowed border-white/5 bg-[#0d0d0d] opacity-60"}`}>
      <div className="mb-6 flex items-start justify-between">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tool.available ? "bg-[#d71920]/10 text-[#d71920]" : "bg-white/5 text-white/30"}`}><Icon size={28} strokeWidth={1.8} /></div>
        {!tool.available && <div className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/35"><Lock size={12} />به‌زودی</div>}
      </div>
      <span className="mb-2 text-xs font-bold text-[#d4a72c]">{tool.category}</span>
      <h3 className="mb-3 text-xl font-bold text-white">{tool.title}</h3>
      <p className="min-h-12 text-sm leading-7 text-white/40">{tool.description}</p>
      {tool.available && <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#d71920]">شروع طراحی<ArrowLeft size={17} className="transition-transform group-hover:-translate-x-1" /></div>}
    </div>
  );

  const routes: Record<string, string> = {
    "top-players": "/tools/top-players",
    lineup: "/tools/lineup",
    "player-card": "/tools/player-card",
  };

  if (tool.available && routes[tool.id]) {
    return <Link href={routes[tool.id]} className="block h-full">{content}</Link>;
  }

  return <div className="h-full">{content}</div>;
}
