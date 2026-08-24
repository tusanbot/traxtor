"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, ImagePlus, RotateCcw, Upload } from "lucide-react";

const toPersianDigits = (value: string | number) => String(value).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

type Team = { name: string; score: string; logo: string };

type Goal = { team: "home" | "away"; player: string; minute: string };

export default function MatchResultTool() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("نتیجه بازی");
  const [competition, setCompetition] = useState("لیگ برتر ایران");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [brand, setBrand] = useState("@tractorfan1970");
  const [status, setStatus] = useState("پایان بازی");
  const [home, setHome] = useState<Team>({ name: "تراکتور", score: "2", logo: "" });
  const [away, setAway] = useState<Team>({ name: "سپاهان", score: "1", logo: "" });
  const [goals, setGoals] = useState<Goal[]>([
    { team: "home", player: "", minute: "" },
    { team: "home", player: "", minute: "" },
    { team: "away", player: "", minute: "" },
  ]);
  const [customLabel, setCustomLabel] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [downloading, setDownloading] = useState(false);

  const upload = (file: File, setter: (value: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => setter(String(reader.result));
    reader.readAsDataURL(file);
  };

  const download = async () => {
    if (!canvasRef.current) return;
    setDownloading(true);
    try {
      const data = await toPng(canvasRef.current, { width: 1080, height: 1350, pixelRatio: 2, cacheBust: true });
      const link = document.createElement("a");
      link.download = "tractor-match-result.png";
      link.href = data;
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  const reset = () => {
    setTitle("نتیجه بازی"); setCompetition("لیگ برتر ایران"); setDate(""); setVenue("");
    setBrand("@tractorfan1970"); setStatus("پایان بازی");
    setHome({ name: "تراکتور", score: "2", logo: "" }); setAway({ name: "سپاهان", score: "1", logo: "" });
    setGoals([{ team: "home", player: "", minute: "" }, { team: "home", player: "", minute: "" }, { team: "away", player: "", minute: "" }]);
    setCustomLabel(""); setCustomValue("");
  };

  return (
    <main className="min-h-screen bg-[#070707] px-4 py-8 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[400px_1fr]">
        <section className="rounded-3xl border border-white/10 bg-[#111] p-5">
          <div className="mb-6">
            <span className="text-xs font-bold tracking-widest text-[#d4a72c]">TRAXTOR MATCH GRAPHIC</span>
            <h1 className="mt-2 text-2xl font-black">نتیجه بازی</h1>
            <p className="mt-2 text-sm leading-6 text-white/50">نتیجه مسابقه را وارد کنید و طرح آماده انتشار بسازید.</p>
          </div>
          <div className="space-y-4">
            <label className="block text-sm">عنوان<input value={title} onChange={e=>setTitle(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#d71920]"/></label>
            <div className="grid grid-cols-2 gap-2">
              <label className="text-sm">رقابت<input value={competition} onChange={e=>setCompetition(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 outline-none"/></label>
              <label className="text-sm">وضعیت<input value={status} onChange={e=>setStatus(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 outline-none"/></label>
              <label className="text-sm">تاریخ<input value={date} onChange={e=>setDate(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 outline-none"/></label>
              <label className="text-sm">ورزشگاه<input value={venue} onChange={e=>setVenue(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 outline-none"/></label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{label:"میزبان", value:home, set:setHome}, {label:"مهمان", value:away, set:setAway}].map((item, idx) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                  <div className="mb-2 text-xs font-bold text-[#d4a72c]">{item.label}</div>
                  <input value={item.value.name} onChange={e=>item.set({...item.value,name:e.target.value})} placeholder="نام تیم" className="mb-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"/>
                  <input value={item.value.score} onChange={e=>item.set({...item.value,score:e.target.value})} placeholder="گل" inputMode="numeric" className="mb-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"/>
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-white/10 py-2 text-xs text-white/50"><Upload size={14}/> لوگو<input type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&upload(e.target.files[0],url=>item.set({...item.value,logo:url}))}/></label>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 p-3">
              <div className="mb-3 flex items-center justify-between"><span className="text-sm font-bold">گل‌ها</span><button onClick={()=>setGoals(g=>[...g,{team:"home",player:"",minute:""}])} className="text-xs text-[#d4a72c]">+ افزودن</button></div>
              <div className="space-y-2">{goals.map((goal,i)=><div key={i} className="grid grid-cols-[90px_1fr_70px_28px] gap-2"><select value={goal.team} onChange={e=>setGoals(g=>g.map((x,j)=>j===i?{...x,team:e.target.value as "home"|"away"}:x))} className="rounded-lg border border-white/10 bg-black px-2 text-xs"><option value="home">میزبان</option><option value="away">مهمان</option></select><input value={goal.player} placeholder="نام گلزن" onChange={e=>setGoals(g=>g.map((x,j)=>j===i?{...x,player:e.target.value}:x))} className="rounded-lg border border-white/10 bg-black px-2 text-xs"/><input value={goal.minute} placeholder="دقیقه" onChange={e=>setGoals(g=>g.map((x,j)=>j===i?{...x,minute:e.target.value}:x))} className="rounded-lg border border-white/10 bg-black px-2 text-xs"/><button onClick={()=>setGoals(g=>g.filter((_,j)=>j!==i))} className="text-red-400">×</button></div>)}</div>
            </div>
            <div className="rounded-2xl border border-white/10 p-3">
              <div className="mb-2 text-sm font-bold">فیلد سفارشی</div>
              <div className="grid grid-cols-2 gap-2"><input value={customLabel} onChange={e=>setCustomLabel(e.target.value)} placeholder="عنوان" className="rounded-lg border border-white/10 bg-black px-3 py-2 text-sm"/><input value={customValue} onChange={e=>setCustomValue(e.target.value)} placeholder="مقدار" className="rounded-lg border border-white/10 bg-black px-3 py-2 text-sm"/></div>
            </div>
            <label className="block text-sm">آیدی رسانه<input value={brand} onChange={e=>setBrand(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none"/></label>
            <div className="flex gap-2"><button onClick={download} disabled={downloading} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#d71920] px-4 py-3 font-bold hover:bg-[#ef1d25] disabled:opacity-50"><Download size={18}/>{downloading?"در حال ساخت...":"دانلود PNG"}</button><button onClick={reset} className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5"><RotateCcw size={18}/></button></div>
          </div>
        </section>

        <section className="flex justify-center rounded-3xl border border-white/10 bg-[#0d0d0d] p-3 md:p-6"><div className="w-full max-w-[540px] overflow-auto rounded-2xl bg-black p-2"><div ref={canvasRef} style={{width:1080,height:1350,transform:"scale(.5)",transformOrigin:"top left",marginBottom:-675}} className="relative overflow-hidden bg-[#080808] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(215,25,32,.32),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(212,167,44,.10),transparent_35%)]"/><div className="absolute left-[-280px] top-[420px] h-[850px] w-[850px] rounded-full border-[70px] border-[#d71920]/10"/><div className="absolute right-[-300px] top-[-250px] h-[700px] w-[700px] rounded-full border-[2px] border-[#d4a72c]/20"/><div className="absolute inset-x-0 top-0 h-[20px] bg-[#d71920]"/>
          <div className="relative flex h-full flex-col px-[70px] py-[65px]" dir="rtl">
            <div className="flex items-start justify-between"><div><div className="text-[25px] font-black tracking-[7px] text-[#d4a72c]">TRAXTOR</div><div className="mt-3 text-[58px] font-black">{title}</div><div className="mt-2 text-[24px] font-bold tracking-[5px] text-white/35">{competition}</div></div><div className="rounded-full border border-[#d71920]/60 px-6 py-3 text-[22px] font-bold text-[#d71920]">{status}</div></div>
            <div className="my-auto"><div className="grid grid-cols-[1fr_260px_1fr] items-center gap-8"><div className="text-center">{home.logo?<img src={home.logo} className="mx-auto mb-5 h-[170px] w-[170px] object-contain"/>:<div className="mx-auto mb-5 flex h-[170px] w-[170px] items-center justify-center rounded-full border-4 border-[#d71920] text-[60px] font-black">T</div>}<div className="text-[38px] font-black">{home.name}</div></div><div className="text-center"><div className="text-[24px] font-bold text-white/35">FULL TIME</div><div className="mt-2 text-[105px] font-black leading-none"><span>{toPersianDigits(home.score||"0")}</span><span className="mx-4 text-[#d4a72c]">-</span><span>{toPersianDigits(away.score||"0")}</span></div><div className="mt-4 text-[22px] text-white/40">{date}</div></div><div className="text-center">{away.logo?<img src={away.logo} className="mx-auto mb-5 h-[170px] w-[170px] object-contain"/>:<div className="mx-auto mb-5 flex h-[170px] w-[170px] items-center justify-center rounded-full border-4 border-white/10 text-[60px] font-black text-white/30">A</div>}<div className="text-[38px] font-black">{away.name}</div></div></div>
              <div className="mx-auto mt-12 w-[760px] rounded-[30px] border border-white/10 bg-white/[.035] p-8"><div className="mb-5 text-center text-[22px] font-black text-[#d4a72c]">گل‌ها</div><div className="grid grid-cols-2 gap-4">{goals.filter(g=>g.player).map((g,i)=><div key={i} className="flex items-center justify-between rounded-xl bg-black/30 px-5 py-3 text-[22px]"><span>{g.team==="home"?home.name:away.name}</span><span className="font-bold">{g.player} {g.minute&&`(${toPersianDigits(g.minute)}')`}</span></div>)}</div></div>
            </div>
            <div className="mt-auto flex items-end justify-between border-t border-white/10 pt-6"><div><div className="text-[20px] text-white/35">{venue}</div>{customLabel&&customValue&&<div className="mt-2 text-[22px] font-bold"><span className="text-[#d4a72c]">{customLabel}:</span> {customValue}</div>}</div><div className="text-[22px] font-bold tracking-[3px] text-white/40">{brand}</div></div>
          </div>
        </div></div></section>
      </div>
    </main>
  );
}
