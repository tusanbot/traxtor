"use client";
import {useEffect,useState} from "react";
import RankingTool from "./RankingTool";
import {loadSavedProjects,saveSavedProject,deleteSavedProject,SavedProject} from "@/lib/saved-projects";

function snapshot(){
 const root=document.querySelector("main"); if(!root)return null;
 const controls=Array.from(root.querySelectorAll("input,select,textarea")).map((el:any)=>({tag:el.tagName,type:el.type||"",value:el.value||"",checked:Boolean(el.checked),placeholder:el.placeholder||""}));
 const images=Array.from(root.querySelectorAll("img")).map((img:any)=>img.src).filter(Boolean);
 return {controls,images,scrollY:window.scrollY};
}
function restore(data:any){
 const root=document.querySelector("main"); if(!root||!data?.controls)return;
 const controls=Array.from(root.querySelectorAll("input,select,textarea")) as any[];
 data.controls.forEach((saved:any,i:number)=>{const el=controls[i];if(!el)return;if(el.type==="checkbox")el.checked=saved.checked;else if(typeof saved.value==="string")el.value=saved.value;el.dispatchEvent(new Event(el.tagName==="SELECT"?"change":"input",{bubbles:true}));el.dispatchEvent(new Event("change",{bubbles:true}));});
 if(data.images?.length){const imgs=Array.from(root.querySelectorAll("img")) as HTMLImageElement[];data.images.forEach((src:string,i:number)=>{if(imgs[i])imgs[i].src=src});}
 window.setTimeout(()=>window.scrollTo({top:data.scrollY||0,behavior:"smooth"}),100);
}
export default function RankingPersistence(){
 const [projects,setProjects]=useState<SavedProject[]>([]);const [open,setOpen]=useState(false);const [name,setName]=useState("");const [message,setMessage]=useState("");
 useEffect(()=>setProjects(loadSavedProjects()),[]);
 const refresh=()=>setProjects(loadSavedProjects());
 const save=()=>{const title=name.trim()||"طرح آماری";const now=new Date().toISOString();saveSavedProject({id:crypto.randomUUID(),name:title,tool:"ranking",createdAt:now,updatedAt:now,data:snapshot()||{}});setMessage("طرح ذخیره شد");setName("");refresh()};
 const openProject=(p:SavedProject)=>{restore(p.data);setMessage("طرح بارگذاری شد")};
 const remove=(id:string)=>{deleteSavedProject(id);refresh();setMessage("طرح حذف شد")};
 return <><RankingTool/><button onClick={()=>setOpen(true)} className="fixed bottom-5 right-5 z-[100] rounded-full bg-[#d4a72c] px-5 py-3 font-black text-black shadow-2xl">💾 طرح‌های ذخیره‌شده</button>{open&&<div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-4" dir="rtl"><div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#111] p-5 text-white shadow-2xl"><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-black">طرح‌های ذخیره‌شده</h2><button onClick={()=>setOpen(false)} className="rounded-lg bg-white/10 px-3 py-2">بستن</button></div><div className="mb-4 flex gap-2"><input value={name} onChange={e=>setName(e.target.value)} placeholder="نام طرح جدید" className="min-w-0 flex-1 rounded-xl bg-white/5 px-3 py-3"/><button onClick={save} className="rounded-xl bg-[#d71920] px-4 py-3 font-bold">ذخیره</button></div>{message&&<div className="mb-3 text-sm text-[#d4a72c]">{message}</div>}<div className="max-h-[55vh] space-y-2 overflow-auto">{projects.length===0?<div className="py-10 text-center text-white/30">هنوز طرحی ذخیره نشده است.</div>:projects.map(p=><div key={p.id} className="flex items-center gap-3 rounded-2xl bg-white/5 p-3"><div className="min-w-0 flex-1"><div className="truncate font-bold">{p.name}</div><div className="text-xs text-white/30">{new Date(p.updatedAt).toLocaleString("fa-IR")}</div></div><button onClick={()=>openProject(p)} className="rounded-lg bg-[#d4a72c] px-3 py-2 text-sm font-bold text-black">باز کردن</button><button onClick={()=>remove(p.id)} className="rounded-lg bg-white/10 px-3 py-2 text-sm text-red-300">حذف</button></div>)}</div></div></div>}</>;
}
