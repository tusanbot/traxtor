"use client";

import type { Tool } from "@/lib/tools";
import { ArrowLeft, Lock } from "lucide-react";

type Props = {
  tool: Tool;
};

export default function ToolCard({ tool }: Props) {
  const Icon = tool.icon;

  return (
    <button
      disabled={!tool.available}
      className={`group relative flex w-full flex-col overflow-hidden rounded-3xl border p-6 text-right transition-all duration-300 ${
        tool.available
          ? "border-white/10 bg-[#10151f] hover:-translate-y-1 hover:border-green-500/40 hover:bg-[#121a25] hover:shadow-2xl hover:shadow-green-950/20"
          : "cursor-not-allowed border-white/5 bg-[#0d1119] opacity-60"
      }`}
    >
      <div className="mb-6 flex items-start justify-between">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
            tool.available
              ? "bg-green-500/10 text-green-400"
              : "bg-white/5 text-slate-500"
          }`}
        >
          <Icon size={28} strokeWidth={1.8} />
        </div>

        {!tool.available && (
          <div className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-xs text-slate-500">
            <Lock size={12} />
            به‌زودی
          </div>
        )}
      </div>

      <span className="mb-2 text-xs font-medium text-green-400">
        {tool.category}
      </span>

      <h3 className="mb-3 text-xl font-bold text-white">
        {tool.title}
      </h3>

      <p className="min-h-12 text-sm leading-7 text-slate-400">
        {tool.description}
      </p>

      {tool.available && (
        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-green-400">
          شروع طراحی
          <ArrowLeft
            size={17}
            className="transition-transform group-hover:-translate-x-1"
          />
        </div>
      )}
    </button>
  );
}
