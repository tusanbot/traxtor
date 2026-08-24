"use client";

import { useRef, useState } from "react";
import { Download, ImagePlus, RotateCcw, Upload } from "lucide-react";
import { toPng } from "html-to-image";

const digitMap: Record<string, string> = { "0": "۰", "1": "۱", "2": "۲", "3": "۳", "4": "۴", "5": "۵", "6": "۶", "7": "۷", "8": "۸", "9": "۹" };
const faDigits = (value: string) => value.replace(/[0-9]/g, (d) => digitMap[d]);

export default function PlayerCardTool() {
  const ref = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("نام بازیکن");
  const [number, setNumber] = useState("۷");
  const [position, setPosition] = useState("هافبک");
  const [team, setTeam] = useState("تراکتور");
  const [rating, setRating] = useState("۸.۸");
  const [nationality, setNationality] = useState("ایران");
  const [customLabel, setCustomLabel] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [image, setImage] = useState("");
  const [logo, setLogo] = useState("");
  const [downloading, setDownloading] = useState(false);

  const reset = () => {
    setName("نام بازیکن"); setNumber("۷"); setPosition("هافبک"); setTeam("تراکتور"); setRating("۸.۸"); setNationality("ایران"); setCustomLabel(""); setCustomValue(""); setImage(""); setLogo("");
  };

  const readFile = (file: File, setter: (value: string) => void) => {
    const reader = new FileReader(); reader.onload = () => setter(String(reader.result)); reader.readAsDataURL(file);
  };

  const download = async () => {
    if (!ref.current) return;
    setDownloading(true);
    try {
      const url = await toPng(ref.current, { width: 1080, height: 1350, pixelRatio: 2, cacheBust: true });
      const a = document.createElement("a"); a.download = "tractor-player-card.png"; a.href = url; a.click();
    } finally { setDownloading(false); }
  };

  return (
    <main className="min-h-screen bg-[#070707] px-4 py-8 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[390px_1fr]">
        <section className="rounded-3xl border border-white/10 bg-[#111] p-5">
          <span className="text-xs font-bold tracking-[4px] text-[#d4a72c]">PLAYER CARD</span>
          <h1 className="mt-2 text-2xl font-black">کارت بازیکن</h1>
          <p className="mt-2 text-sm leading-6 text-white/45">مشخصات بازیکن را وارد کنید و کارت آماده انتشار بسازید.</p>
          <div className="mt-6 space-y-3">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="نام بازیکن" className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#d71920]" />
            <div className="grid grid-cols-2 gap-3"><input value={number} onChange={(e) => setNumber(e.target.value)} placeholder="شماره" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none" /><input value={position} onChange={(e) => setPosition(e.target.value)} placeholder="پست" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none" /></div>
            <div className="grid grid-cols-2 gap-3"><input value={team} onChange={(e) => setTeam(e.target.value)} placeholder="باشگاه" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none" /><input value={rating} onChange={(e) => setRating(e.target.value)} placeholder="امتیاز" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none" /></div>
            <input value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="ملیت" className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none" />
            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-white/15 bg-black/20 px-4 py-3 text-sm"><span className="flex items-center gap-2"><ImagePlus size={16} /> عکس بازیکن</span><span className="text-[#d4a72c]">انتخاب<input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && readFile(e.target.files[0], setImage)} /></span></label>
            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-white/15 bg-black/20 px-4 py-3 text-sm"><span className="flex items-center gap-2"><Upload size={16} /> لوگوی باشگاه</span><span className="text-[#d4a72c]">انتخاب<input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && readFile(e.target.files[0], setLogo)} /></span></label>
            <div className="rounded-2xl border border-[#d4a72c]/20 bg-[#d4a72c]/5 p-3"><div className="mb-2 text-xs font-bold text-[#d4a72c]">فیلد سفارشی اختیاری</div><div className="grid grid-cols-2 gap-2"><input value={customLabel} onChange={(e) => setCustomLabel(e.target.value)} placeholder="عنوان مثل گل" className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none" /><input value={customValue} onChange={(e) => setCustomValue(e.target.value)} placeholder="مقدار مثل ۵" className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none" /></div></div>
            <div className="flex gap-2 pt-2"><button onClick={download} disabled={downloading} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#d71920] px-4 py-3 font-bold hover:bg-[#ef1d25] disabled:opacity-50"><Download size={18} />{downloading ? "در حال ساخت..." : "دانلود PNG"}</button><button onClick={reset} className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5"><RotateCcw size={18} /></button></div>
          </div>
        </section>

        <section className="flex justify-center rounded-3xl border border-white/10 bg-[#0d0d0d] p-3 md:p-6">
          <div className="w-full max-w-[540px] overflow-auto rounded-2xl bg-black p-2"><div ref={ref} style={{ width: 1080, height: 1350, transform: "scale(.5)", transformOrigin: "top left", marginBottom: -675 }} className="relative overflow-hidden bg-[#090909] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(215,25,32,.38),transparent_30%),linear-gradient(145deg,#090909_35%,#25090b_100%)]" />
            <div className="absolute -left-40 top-40 h-[800px] w-[800px] rounded-full border-[90px] border-[#d71920]/10" />
            <div className="absolute right-0 top-0 h-full w-[18px] bg-[#d71920]" />
            <div className="relative flex h-full flex-col px-[72px] py-[65px]">
              <div className="flex items-start justify-between"><div><div className="text-[24px] font-black tracking-[8px] text-[#d4a72c]">TRACTOR SC</div><div className="mt-4 text-[68px] font-black leading-none">PLAYER CARD</div></div>{logo ? <img src={logo} alt="" className="h-[120px] w-[120px] object-contain" /> : <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-4 border-[#d71920] text-[44px] font-black">T</div>}</div>
              {image ? <img src={image} alt="" className="absolute bottom-0 left-[50px] h-[770px] w-[620px] object-contain object-bottom" /> : <div className="absolute bottom-28 left-20 text-[240px] font-black text-white/[.035]">{faDigits(number)}</div>}
              <div className="absolute right-[72px] top-[360px] w-[450px] text-right"><div className="text-[28px] font-bold text-[#d4a72c]">{position || "پست بازیکن"}</div><div className="mt-3 text-[76px] font-black leading-tight">{name || "نام بازیکن"}</div><div className="mt-2 text-[28px] text-white/45">{team || "تراکتور"} • {nationality || "ایران"}</div><div className="mt-12 flex items-end justify-end gap-4"><span className="text-[24px] font-bold text-white/35">RATING</span><span className="text-[90px] font-black leading-none text-[#d4a72c]">{faDigits(rating)}</span></div>{customLabel && customValue && <div className="mt-10 border-t border-white/10 pt-6"><div className="text-[22px] text-white/40">{customLabel}</div><div className="mt-1 text-[48px] font-black text-white">{faDigits(customValue)}</div></div>}</div>
              <div className="mt-auto flex items-end justify-between border-t border-white/10 pt-6"><div className="text-[70px] font-black text-white/[.08]">{faDigits(number)}</div><div className="text-right"><div className="text-[18px] font-bold tracking-[5px] text-white/30">@tractorfan1970</div><div className="mt-2 text-[20px] font-bold text-[#d71920]">TRAXTOR FAN PAGE</div></div></div>
            </div>
          </div></div>
        </section>
      </div>
    </main>
  );
}
