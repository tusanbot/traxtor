"use client";

import { useRef, useState } from "react";
import { Download, RotateCcw, Upload } from "lucide-react";
import { toPng } from "html-to-image";

const fa = (v: string | number) => String(v).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

type Stat = { label: string; value: string };

export default function TeamStatsTool() {
  const ref = useRef<HTMLDivElement>(null);
  const [team, setTeam] = useState("تراکتور");
  const [tournament, setTournament] = useState("لیگ برتر ایران");
  const [logo, setLogo] = useState("");
  const [subtitle, setSubtitle] = useState("آمار فصل");
  const [stats, setStats] = useState<Stat[]>([
    { label: "بازی", value: "30" }, { label: "برد", value: "18" }, { label: "مساوی", value: "7" },
    { label: "باخت", value: "5" }, { label: "گل زده", value: "52" }, { label: "گل خورده", value: "24" },
    { label: "امتیاز", value: "61" }, { label: "کلین‌شیت", value: "13" },
  ]);
  const [customLabel, setCustomLabel] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [brand, setBrand] = useState("@tractorfan1970");

  const setStat = (i: number, key: keyof Stat, value: string) => setStats(s => s.map((x, j) => j === i ? { ...x, [key]: value } : x));
  const upload = (file: File) => { const r = new FileReader(); r.onload = () => setLogo(String(r.result)); r.readAsDataURL(file); };
  const download = async () => { if (!ref.current) return; const png = await toPng(ref.current, { width: 1080, height: 1350, pixelRatio: 2, cacheBust: true }); const a = document.createElement("a"); a.download = "tractor-team-stats.png"; a.href = png; a.click(); };
  const reset = () => { setTeam("تراکتور"); setTournament("لیگ برتر ایران"); setLogo(""); setSubtitle("آمار فصل"); setStats([{ label:"بازی",value:"30"},{label:"برد",value:"18"},{label:"مساوی",value:"7"},{label:"باخت",value:"5"},{label:"گل زده",value:"52"},{label:"گل خورده",value:"24"},{label:"امتیاز",value:"61"},{label:"کلین‌شیت",value:"13"}]); setCustomLabel(""); setCustomValue(""); };

  return <main className="min-h-screen bg-[#070707] px-4 py-8 text-white"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[400px_1fr]">
    <section className="rounded-3xl border border-white/10 bg-[#111] p-5"><div className="mb-6"><span className="text-xs font-bold tracking-widest text-[#d4a72c]">TRAXTOR TEAM STATS</span><h1 className="mt-2 text-2xl font-black">آمار تیم</h1></div>
      <div className="space-y-4">
        <label className="block text-sm">نام تیم<input value={team} onChange={e=>setTeam(e.target.value)} className="mt-2 w-full rounded-xl bg-black/40 px-4 py-3"/></label>
        <div className="grid grid-cols-2 gap-2"><label className="text-sm">تورنمنت<input value={tournament} onChange={e=>setTournament(e.target.value)} className="mt-2 w-full rounded-xl bg-black/40 px-3 py-3"/></label><label className="text-sm">عنوان فرعی<input value={subtitle} onChange={e=>setSubtitle(e.target.value)} className="mt-2 w-full rounded-xl bg-black/40 px-3 py-3"/></label></div>
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 py-3 text-sm text-white/60"><Upload size={16}/> لوگوی تیم<input type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&upload(e.target.files[0])}/></label>
        <div className="rounded-2xl border border-white/10 p-3"><div className="mb-3 text-sm font-bold">آمار</div><div className="grid grid-cols-2 gap-2">{stats.map((s,i)=><div key={i} className="rounded-xl bg-black/30 p-2"><input value={s.label} onChange={e=>setStat(i,"label",e.target.value)} className="mb-1 w-full bg-transparent text-xs text-[#d4a72c]"/><input value={s.value} onChange={e=>setStat(i,"value",e.target.value)} inputMode="numeric" className="w-full bg-transparent text-lg font-black"/></div>)}</div></div>
        <div className="rounded-2xl border border-white/10 p-3"><div className="mb-2 text-sm font-bold">فیلد سفارشی</div><div className="grid grid-cols-2 gap-2"><input value={customLabel} onChange={e=>setCustomLabel(e.target.value)} placeholder="عنوان" className="rounded-lg bg-black px-3 py-2"/><input value={customValue} onChange={e=>setCustomValue(e.target.value)} placeholder="مقدار" className="rounded-lg bg-black px-3 py-2"/></div></div>
        <input value={brand} onChange={e=>setBrand(e.target.value)} className="w-full rounded-xl bg-black/40 px-4 py-3" placeholder="آیدی رسانه"/>
        <div className="flex gap-2"><button onClick={download} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#d71920] px-4 py-3 font-bold"><Download size={18}/> دانلود PNG</button><button onClick={reset} className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5"><RotateCcw size={18}/></button></div>
      </div>
    </section>
    <section className="flex min-w-0 justify-center rounded-3xl border border-white/10 bg-[#0d0d0d] p-3"><div className="w-full min-w-0 overflow-hidden rounded-2xl bg-black"><div ref={ref} style={{width:1080,height:1350}} className="relative overflow-hidden bg-[#090909] text-white" dir="rtl"><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(215,25,32,.28),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(212,167,44,.12),transparent_30%)]"/><div className="absolute -left-40 top-80 h-[700px] w-[700px] rounded-full border-[55px] border-[#d71920]/10"/><div className="absolute right-10 top-10 text-[220px] opacity-[.035]">⚽</div><div className="absolute left-8 bottom-20 text-[260px] opacity-[.025]">🐺</div><div className="relative flex h-full flex-col px-[70px] py-[60px]"><div className="flex items-start justify-between"><div><div className="text-[25px] font-black tracking-[7px] text-[#d4a72c]">TRAXTOR</div><h2 className="mt-3 text-[62px] font-black">{team}</h2><div className="mt-2 text-[25px] font-bold text-white/40">{tournament} · {subtitle}</div></div>{logo?<img src={logo} className="h-[150px] w-[150px] rounded-full object-cover ring-4 ring-[#d4a72c]"/>:<div className="flex h-[150px] w-[150px] items-center justify-center rounded-full border-4 border-[#d71920] text-[60px] font-black">T</div>}</div><div className="my-auto grid grid-cols-4 gap-5">{stats.map((s,i)=><div key={i} className={`rounded-[28px] border border-white/10 bg-white/[.045] p-7 text-center ${i===6?'ring-2 ring-[#d4a72c]/60':''}`}><div className="text-[24px] font-bold text-white/45">{s.label}</div><div className="mt-3 text-[62px] font-black text-[#d4a72c]">{fa(s.value)}</div></div>)}</div><div className="flex items-end justify-between border-t border-white/10 pt-6"><div>{customLabel&&customValue&&<span className="text-[24px] font-bold"><span className="text-[#d4a72c]">{customLabel}:</span> {customValue}</span>}</div><div className="text-[22px] font-bold tracking-[3px] text-white/40">{brand}</div></div></div></div></div></section>
  </div></main>;
}
