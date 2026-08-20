"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, ImagePlus, RotateCcw, Upload } from "lucide-react";

const RED = "#d71920";
const BLACK = "#080808";
const MUSTARD = "#d4a72c";

interface Player {
  name: string;
  team: string;
  rating: string;
  image: string;
}

const emptyPlayers: Player[] = Array.from({ length: 5 }, () => ({
  name: "",
  team: "",
  rating: "",
  image: "",
}));

function fileToDataUrl(file: File, callback: (url: string) => void) {
  const reader = new FileReader();
  reader.onload = () => callback(String(reader.result));
  reader.readAsDataURL(file);
}

export default function TopPlayersTool() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("۵ بازیکن برتر هفته");
  const [subtitle, setSubtitle] = useState("TRACTOR TOP 5 PLAYERS");
  const [brand, setBrand] = useState("TRAXTOR FAN PAGE");
  const [logo, setLogo] = useState("");
  const [players, setPlayers] = useState<Player[]>(emptyPlayers);
  const [downloading, setDownloading] = useState(false);

  const updatePlayer = (index: number, key: keyof Player, value: string) => {
    setPlayers((current) =>
      current.map((player, i) => (i === index ? { ...player, [key]: value } : player))
    );
  };

  const reset = () => {
    setTitle("۵ بازیکن برتر هفته");
    setSubtitle("TRACTOR TOP 5 PLAYERS");
    setBrand("TRAXTOR FAN PAGE");
    setLogo("");
    setPlayers(emptyPlayers.map((p) => ({ ...p })));
  };

  const downloadImage = async () => {
    if (!canvasRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(canvasRef.current, {
        width: 1080,
        height: 1350,
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = "tractor-top-5-players.png";
      link.href = dataUrl;
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070707] px-4 py-8 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[390px_1fr]">
        <section className="rounded-3xl border border-white/10 bg-[#111111] p-5">
          <div className="mb-6">
            <span className="text-xs font-bold tracking-widest text-[#d4a72c]">TRAXTOR GRAPHIC TOOL</span>
            <h1 className="mt-2 text-2xl font-black">۵ بازیکن برتر</h1>
            <p className="mt-2 text-sm leading-6 text-white/50">اطلاعات بازیکنان را وارد کنید و طرح آماده انتشار دریافت کنید.</p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium">عنوان
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#d71920]" />
            </label>
            <label className="block text-sm font-medium">عنوان انگلیسی
              <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#d71920]" />
            </label>
            <label className="block text-sm font-medium">نام رسانه
              <input value={brand} onChange={(e) => setBrand(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#d71920]" />
            </label>

            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-white/15 bg-black/20 px-4 py-3 text-sm">
              <span className="flex items-center gap-2"><Upload size={16} /> لوگوی رسانه</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && fileToDataUrl(e.target.files[0], setLogo)} />
              <span className="text-xs text-[#d4a72c]">انتخاب</span>
            </label>

            <div className="h-px bg-white/10" />

            {players.map((player, index) => (
              <div key={index} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d71920] text-sm font-black">{index + 1}</span>
                  <label className="flex cursor-pointer items-center gap-1 text-xs text-white/50">
                    <ImagePlus size={15} /> عکس
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && fileToDataUrl(e.target.files[0], (url) => updatePlayer(index, "image", url))} />
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input placeholder="نام بازیکن" value={player.name} onChange={(e) => updatePlayer(index, "name", e.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#d71920]" />
                  <input placeholder="امتیاز" value={player.rating} onChange={(e) => updatePlayer(index, "rating", e.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#d4a72c]" />
                  <input placeholder="تیم / باشگاه" value={player.team} onChange={(e) => updatePlayer(index, "team", e.target.value)} className="col-span-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#d71920]" />
                </div>
              </div>
            ))}

            <div className="flex gap-2 pt-2">
              <button onClick={downloadImage} disabled={downloading} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#d71920] px-4 py-3 font-bold transition hover:bg-[#ef1d25] disabled:opacity-50">
                <Download size={18} /> {downloading ? "در حال ساخت..." : "دانلود PNG"}
              </button>
              <button onClick={reset} className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10" title="بازنشانی"><RotateCcw size={18} /></button>
            </div>
          </div>
        </section>

        <section className="flex items-start justify-center rounded-3xl border border-white/10 bg-[#0d0d0d] p-3 md:p-6">
          <div className="w-full max-w-[540px] overflow-auto rounded-2xl bg-black p-2">
            <div ref={canvasRef} style={{ width: 1080, height: 1350, transform: "scale(0.5)", transformOrigin: "top left", marginBottom: -675 }} className="relative overflow-hidden bg-[#090909] text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(215,25,32,.38),transparent_30%),radial-gradient(circle_at_15%_75%,rgba(212,167,44,.12),transparent_30%)]" />
              <div className="absolute right-[-180px] top-[150px] h-[700px] w-[700px] rounded-full border-[2px] border-[#d71920]/20" />
              <div className="absolute left-[-260px] bottom-[-260px] h-[700px] w-[700px] rounded-full border-[80px] border-[#d71920]/10" />
              <div className="absolute inset-x-0 top-0 h-[18px] bg-[#d71920]" />
              <div className="relative flex h-full flex-col px-[72px] py-[60px]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="mb-3 text-[26px] font-black tracking-[8px] text-[#d4a72c]">TRAXTOR</div>
                    <h2 className="text-[64px] font-black leading-none">{title || "۵ بازیکن برتر هفته"}</h2>
                    <div className="mt-4 text-[24px] font-bold tracking-[7px] text-white/35">{subtitle || "TRACTOR TOP 5 PLAYERS"}</div>
                  </div>
                  {logo ? <img src={logo} alt="logo" className="h-[110px] w-[110px] object-contain" /> : <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full border-4 border-[#d71920] text-[40px] font-black">T</div>}
                </div>

                <div className="mt-[60px] grid flex-1 grid-cols-2 gap-[22px] content-start">
                  {players.map((player, index) => (
                    <div key={index} className={`relative overflow-hidden rounded-[28px] border ${index === 0 ? "col-span-2 h-[330px] border-[#d4a72c]/70 bg-gradient-to-br from-[#321012] to-[#101010]" : "h-[260px] border-white/10 bg-[#151515]"}`}>
                      <div className="absolute inset-y-0 right-0 w-[10px] bg-[#d71920]" />
                      <div className="absolute left-7 top-6 text-[92px] font-black leading-none text-white/[0.04]">0{index + 1}</div>
                      {player.image ? <img src={player.image} alt="" className={`absolute bottom-0 object-contain object-bottom ${index === 0 ? "left-6 h-[330px] w-[360px]" : "left-2 h-[245px] w-[210px]"}`} /> : <div className={`absolute bottom-5 left-7 flex items-center justify-center rounded-full bg-white/5 text-white/20 ${index === 0 ? "h-[250px] w-[250px] text-[80px]" : "h-[170px] w-[170px] text-[50px]"}`}>⚽</div>}
                      <div className={`absolute ${index === 0 ? "right-10 top-14" : "right-8 top-10"} left-5`}>
                        <div className="text-[22px] font-black text-[#d4a72c]">RANK {index + 1}</div>
                        <div className={`${index === 0 ? "mt-3 text-[50px]" : "mt-2 text-[32px]"} font-black leading-tight`}>{player.name || `بازیکن ${index + 1}`}</div>
                        <div className="mt-2 text-[20px] font-medium text-white/45">{player.team || "TRACTOR SC"}</div>
                        <div className="mt-6 flex items-end gap-2"><span className="text-[22px] font-bold text-white/45">RATING</span><span className={`${index === 0 ? "text-[58px]" : "text-[42px]"} font-black text-[#d4a72c]`}>{player.rating || "—"}</span></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6 text-[18px] font-bold tracking-[4px] text-white/35">
                  <span>{brand || "TRAXTOR FAN PAGE"}</span>
                  <span className="text-[#d71920]">RED &amp; BLACK</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
