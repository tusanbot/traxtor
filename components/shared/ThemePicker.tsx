"use client";

import { graphicThemes } from "@/lib/themes";

export default function ThemePicker({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  return (
    <label className="block text-sm font-medium">
      تم گرافیکی
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm outline-none focus:border-[#d71920]">
        {graphicThemes.map((theme) => (
          <option key={theme.id} value={theme.id}>{theme.name} — {theme.description}</option>
        ))}
      </select>
    </label>
  );
}
