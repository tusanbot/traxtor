"use client";

import { useRef, useState } from "react";
import { Download, ImagePlus, RotateCcw } from "lucide-react";
import { toPng } from "html-to-image";

const fa = (v: string) => v.replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

export default function NewsCardTool() {
  const ref = useRef<HTMLDivElement>(null);
  const [tag, setTag] = useState("رسمی");
  const [headline, setHeadline] = useState("تراکتور به یک پیروزی مهم دست یافت");
  const [subtitle, setSubtitle] = useState("یک تیتر کوتاه و جذاب برای خبر خود وارد کنید");
  const [source, setSource] = useState("منبع: تراکتور فن پیج");
  const [date, setDate] = useState("");
  const [brand, setBrand] = useState("@tractorfan1970");
  const [image, setImage] = useState("");
  const [customLabel, setCustomLabel] = useState("");
  const [customValue, setCustomValue] = useState("");

  const upload = (file: File) => { const r = new FileReader(); r.onload = () => setImage(String(r.result)); r.readAsDataURL(file); };
  const download = async () => { if (!ref.current) return; const png = await toPng(ref.current, { width: 1080, height: 1350, pixelRatio: 2, cacheBust: true }); const a = document.createElement("a"); a.download = "tractor-news-card.png"; a.href = png; a.click(); };
  const reset = () => { setTag("رسمی"); setHeadline("تراکتور به یک پیروزی مهم دست یافت"); setSubtitle("یک تیتر کوتاه و جذاب برای خبر خود وارد کنید"); setSource("منبع: تراکتور فن پیج"); setDate(""); setBrand("@tractorfan1970"); setImage(""); setCustomLabel(""); setCustomValue(""); };

  return <main className="min-h-screen bg-[#070707] px-4 py-8 text-white"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[400px_1fr]">
    <section className="rounded-3xl border border-white/10 bg-[#111] p-5"><div className="mb-6"><span className="text-xs font-bold tracking-widest text-[#d4a72c]">TRAXTOR NEWS GRAPHIC</span><h1 className="mt-2 text-2xl font-black">طرح خبر</h1><p className="mt-2 text-sm text-white/50">خبر فوتبالی خود را به یک کارت آماده انتشار تبدیل کنید.</p></div>
      <div className="space-y-4"><label className="block text-sm">برچسب خبر<input value={tag} onChange={e=>setTag(e.target.value)} className="mt-2 w-full rounded-xl bg-black/40 px-4 py-3"/></label><label className="block text-sm">تیتر<input value={headline} onChange={e=>setHeadline(e.target.value)} className="mt-2 w-full rounded-xl bg-black/40 px-4 py-3"/></label><label className="block text-sm">زیرتیتر<textarea value={subtitle} onChange={e=>setSubtitle(e.target.value)} rows={3} className="mt-2 w-full resize-none rounded-xl bg-black/40 px-4 py-3"/></label>
      <div className="grid grid-cols-2 gap-2"><label className="text-sm">تاریخ<input value={date} onChange={e=>setDate(e.target.value)} className="mt-2 w-full rounded-xl bg-black/40 px-3 py-3"/></label><label className="text-sm">منبع<input value={source} onChange={e=>setSource(e.target.value)} className="mt-2 w-full rounded-xl bg-black/40 px-3 py-3"/></label></div>
      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 py-3 text-sm text-white/60"><ImagePlus size={16}/> تصویر خبر<input type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&upload(e.target.files[0])}/></label>
      <div className="rounded-2xl border border-white/10 p-3"><div className="mb-2 text-sm font-bold">فیلد سفارشی</div><div className="grid grid-cols-2 gap-2"><input value={customLabel} onChange={e=>setCustomLabel(e.target.value)} placeholder="عنوان" className="rounded-lg bg-black px-3 py-2"/><input value={customValue} onChange={e=>setCustomValue(e.target.value)} placeholder="مقدار" className="rounded-lg bg-black px-3 py-2"/></div></div>
      <input value={brand} onChange={e=>setBrand(e.target.value)} placeholder="آیدی رسانه" className="w-full rounded-xl bg-black/40 px-4 py-3"/><div className="flex gap-2"><button onClick={download} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#d71920] px-4 py-3 font-bold"><Download size={18}/> دانلود PNG</button><button onClick={reset} className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5"><RotateCcw size={18}/></button></div></div>
    </section>
    <section className="flex min-w-0 justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] p-3"><div className="w-full min-w-0 overflow-hidden rounded-2xl bg-black"><div ref={ref} style={{width:1080,height:1350}} className="relative overflow-hidden bg-[#080808] text-white" dir="rtl">{image?<img src={image} className="absolute inset-0 h-full w-full object-cover opacity-45"/>:null}<div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(215,25,32,.72),rgba(8,8,8,.94)_55%,rgba(212,167,44,.22))]"/><div className="absolute -right-48 top-20 h-[650px] w-[650px] rounded-full border-[65px] border-white/[.045]"/><div className="absolute left-12 top-20 text-[190px] opacity-[.04]">⚽</div><div className="absolute right-8 bottom-12 text-[260px] opacity-[.035]">🐺</div><div className="relative flex h-full flex-col px-[70px] py-[65px]"><div className="flex items-center justify-between"><div className="text-[25px] font-black tracking-[7px] text-[#d4a72c]">TRAXTOR</div><div className="rounded-full bg-[#d71920] px-7 py-3 text-[25px] font-black">{tag}</div></div><div className="my-auto max-w-[900px]"><h1 className="text-[76px] font-black leading-[1.2]">{headline}</h1><p className="mt-8 text-[31px] font-bold leading-[1.7] text-white/70">{subtitle}</p>{customLabel&&customValue?<div className="mt-8 inline-flex rounded-2xl border border-[#d4a72c]/50 bg-black/30 px-6 py-4 text-[25px] font-bold"><span className="text-[#d4a72c]">{customLabel}:</span><span className="mr-3">{customValue}</span></div>:null}</div><div className="border-t border-white/15 pt-6"><div className="flex items-end justify-between"><div><div className="text-[24px] font-bold text-white/55">{source}</div><div className="mt-2 text-[21px] text-white/35">{date&&fa(date)}</div></div><div className="text-[22px] font-bold tracking-[3px] text-white/45">{brand}</div></div></div></div></div></div></section>
  </div></main>;
}
