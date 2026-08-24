"use client";

import { useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, ImagePlus, RotateCcw, Upload } from "lucide-react";

type Player = { name: string; number: string; position: string; image: string };

const formationPositions: Record<string, { x: number; y: number; role: string }[]> = {
  "4-3-3": [
    { x: 50, y: 91, role: "GK" }, { x: 15, y: 73, role: "DF" }, { x: 38, y: 76, role: "DF" }, { x: 62, y: 76, role: "DF" }, { x: 85, y: 73, role: "DF" },
    { x: 25, y: 52, role: "MF" }, { x: 50, y: 57, role: "MF" }, { x: 75, y: 52, role: "MF" },
    { x: 18, y: 27, role: "FW" }, { x: 50, y: 20, role: "FW" }, { x: 82, y: 27, role: "FW" },
  ],
  "4-2-3-1": [
    { x: 50, y: 91, role: "GK" }, { x: 15, y: 73, role: "DF" }, { x: 38, y: 76, role: "DF" }, { x: 62, y: 76, role: "DF" }, { x: 85, y: 73, role: "DF" },
    { x: 35, y: 56, role: "MF" }, { x: 65, y: 56, role: "MF" }, { x: 20, y: 34, role: "MF" }, { x: 50, y: 31, role: "MF" }, { x: 80, y: 34, role: "MF" }, { x: 50, y: 17, role: "FW" },
  ],
  "3-4-3": [
    { x: 50, y: 91, role: "GK" }, { x: 28, y: 73, role: "DF" }, { x: 50, y: 77, role: "DF" }, { x: 72, y: 73, role: "DF" },
    { x: 10, y: 49, role: "MF" }, { x: 35, y: 54, role: "MF" }, { x: 65, y: 54, role: "MF" }, { x: 90, y: 49, role: "MF" },
    { x: 20, y: 25, role: "FW" }, { x: 50, y: 19, role: "FW" }, { x: 80, y: 25, role: "FW" },
  ],
};

const fa = (value: string) => value.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
const toDataUrl = (file: File, set: (value: string) => void) => { const r = new FileReader(); r.onload = () => set(String(r.result)); r.readAsDataURL(file); };

export default function TeamLineupTool() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [formation, setFormation] = useState<keyof typeof formationPositions>("4-3-3");
  const [title, setTitle] = useState("ترکیب تراکتور");
  const [subtitle, setSubtitle] = useState("MATCH LINEUP");
  const [brand, setBrand] = useState("@tractorfan1970");
  const [match, setMatch] = useState("ترکیب احتمالی");
  const [logo, setLogo] = useState("");
  const [players, setPlayers] = useState<Player[]>(Array.from({ length: 11 }, () => ({ name: "", number: "", position: "", image: "" })));
  const [downloading, setDownloading] = useState(false);

  const positions = useMemo(() => formationPositions[formation], [formation]);
  const update = (i: number, key: keyof Player, value: string) => setPlayers((p) => p.map((x, n) => n === i ? { ...x, [key]: value } : x));
  const reset = () => { setFormation("4-3-3"); setTitle("ترکیب تراکتور"); setSubtitle("MATCH LINEUP"); setBrand("@tractorfan1970"); setMatch("ترکیب احتمالی"); setLogo(""); setPlayers(Array.from({ length: 11 }, () => ({ name: "", number: "", position: "", image: "" }))); };

  const download = async () => {
    if (!canvasRef.current) return;
    setDownloading(true);
    try {
      const data = await toPng(canvasRef.current, { width: 1080, height: 1350, pixelRatio: 2, cacheBust: true });
      const a = document.createElement("a"); a.download = "tractor-lineup.png"; a.href = data; a.click();
    } finally { setDownloading(false); }
  };

  return <main className="min-h-screen bg-[#070707] px-4 py-8 text-white md:px-8">
    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[390px_1fr]">
      <section className="rounded-3xl border border-white/10 bg-[#111] p-5">
        <span className="text-xs font-bold tracking-widest text-[#d4a72c]">TRAXTOR LINEUP TOOL</span>
        <h1 className="mt-2 text-2xl font-black">شماتیک ترکیب تیم</h1>
        <p className="mt-2 text-sm leading-6 text-white/45">آرایش، بازیکنان و اطلاعات مسابقه را وارد کنید.</p>
        <div className="mt-6 space-y-4">
          <label className="block text-sm">عنوان<input value={title} onChange={e => setTitle(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#d71920]" /></label>
          <label className="block text-sm">زیرعنوان<input value={subtitle} onChange={e => setSubtitle(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#d71920]" /></label>
          <label className="block text-sm">عنوان مسابقه / وضعیت<input value={match} onChange={e => setMatch(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#d4a72c]" /></label>
          <label className="block text-sm">آیدی رسانه<input value={brand} onChange={e => setBrand(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#d71920]" /></label>
          <label className="block text-sm">آرایش
            <select value={formation} onChange={e => setFormation(e.target.value as keyof typeof formationPositions)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#181818] px-4 py-3 outline-none"><option>4-3-3</option><option>4-2-3-1</option><option>3-4-3</option></select>
          </label>
          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-white/15 bg-black/20 px-4 py-3 text-sm"><span className="flex items-center gap-2"><Upload size={16}/> لوگوی رسانه</span><input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && toDataUrl(e.target.files[0], setLogo)} /><span className="text-xs text-[#d4a72c]">انتخاب</span></label>
          <div className="h-px bg-white/10" />
          {players.map((p, i) => <div key={i} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="mb-3 flex items-center justify-between"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d71920] text-sm font-black">{fa(String(i + 1))}</span><label className="flex cursor-pointer items-center gap-1 text-xs text-white/50"><ImagePlus size={15}/> عکس<input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && toDataUrl(e.target.files[0], v => update(i, "image", v))}/></label></div>
            <div className="grid grid-cols-[1fr_72px] gap-2"><input placeholder="نام بازیکن" value={p.name} onChange={e => update(i,"name",e.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#d71920]"/><input placeholder="شماره" value={p.number} onChange={e => update(i,"number",e.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#d4a72c]"/><input placeholder="پست اختیاری" value={p.position} onChange={e => update(i,"position",e.target.value)} className="col-span-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#d71920]"/></div>
          </div>)}
          <div className="flex gap-2"><button onClick={download} disabled={downloading} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#d71920] px-4 py-3 font-bold hover:bg-[#ef1d25] disabled:opacity-50"><Download size={18}/>{downloading ? "در حال ساخت..." : "دانلود PNG"}</button><button onClick={reset} className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5"><RotateCcw size={18}/></button></div>
        </div>
      </section>

      <section className="flex items-start justify-center rounded-3xl border border-white/10 bg-[#0d0d0d] p-3 md:p-6"><div className="w-full max-w-[540px] overflow-auto rounded-2xl bg-black p-2"><div ref={canvasRef} style={{ width:1080,height:1350,transform:"scale(.5)",transformOrigin:"top left",marginBottom:-675 }} className="relative overflow-hidden bg-[#090909] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(215,25,32,.35),transparent_28%),radial-gradient(circle_at_20%_90%,rgba(212,167,44,.12),transparent_30%)]"/><div className="absolute inset-x-0 top-0 h-[18px] bg-[#d71920]"/><div className="relative h-full px-[70px] py-[58px]">
          <div className="flex items-start justify-between"><div><div className="text-[24px] font-black tracking-[8px] text-[#d4a72c]">TRAXTOR</div><h2 className="mt-2 text-[60px] font-black leading-none">{title}</h2><div className="mt-3 text-[22px] font-bold tracking-[6px] text-white/35">{subtitle}</div><div className="mt-4 inline-block rounded-full border border-[#d4a72c]/40 px-5 py-2 text-[20px] font-bold text-[#d4a72c]">{match}</div></div>{logo ? <img src={logo} alt="" className="h-[100px] w-[100px] object-contain"/> : <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full border-4 border-[#d71920] text-[34px] font-black">T</div>}</div>
          <div className="relative mt-10 h-[930px] overflow-hidden rounded-[42px] border border-white/10 bg-[#101912] shadow-2xl">
            <div className="absolute inset-0 opacity-50" style={{backgroundImage:"linear-gradient(rgba(255,255,255,.05) 2px,transparent 2px),linear-gradient(90deg,rgba(255,255,255,.05) 2px,transparent 2px)",backgroundSize:"68px 68px"}}/>
            <div className="absolute inset-[42px] rounded-[28px] border-2 border-white/15"/><div className="absolute left-[50%] top-[50%] h-[130px] w-[130px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/15"/><div className="absolute left-[8%] right-[8%] top-[50%] h-px bg-white/15"/>
            <div className="absolute left-[8%] right-[8%] top-[4%] h-[150px] rounded-b-[40px] border-b-2 border-l-2 border-r-2 border-white/15"/><div className="absolute bottom-[4%] left-[8%] right-[8%] h-[150px] rounded-t-[40px] border-l-2 border-r-2 border-t-2 border-white/15"/>
            {positions.map((pos, i) => { const p = players[i]; return <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{left:`${pos.x}%`,top:`${pos.y}%`}}><div className="relative flex h-[118px] w-[118px] items-center justify-center rounded-full border-[6px] border-[#d71920] bg-[#141414] shadow-[0_10px_30px_rgba(0,0,0,.5)]">{p.image ? <img src={p.image} alt="" className="h-full w-full rounded-full object-cover"/> : <span className="text-[30px] font-black text-white/20">{fa(String(i+1))}</span>}<span className="absolute -right-2 -top-2 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#d4a72c] text-[19px] font-black text-black">{fa(p.number || String(i+1))}</span></div><div className="mt-2 min-w-[150px] rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-center backdrop-blur"><div className="text-[22px] font-black">{p.name || `بازیکن ${fa(String(i+1))}`}</div><div className="text-[15px] font-bold text-[#d4a72c]">{p.position || pos.role}</div></div></div>})}
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5 text-[18px] font-bold tracking-[3px] text-white/30"><span>{brand}</span><span className="text-[#d4a72c]">TRACTOR SC</span></div>
        </div>
      </div></div></section>
    </div>
  </main>;
}
