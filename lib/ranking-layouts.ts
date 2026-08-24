export type RankingLayout={id:string;title:string;description:string;minPlayers:number;maxPlayers:number};
export const rankingLayouts:RankingLayout[]=[
{id:"list",title:"لیستی",description:"چیدمان استاندارد و مناسب طرح‌های آماری",minPlayers:1,maxPlayers:12},
{id:"podium",title:"سکوی قهرمانی",description:"تمرکز ویژه روی سه رتبه اول",minPlayers:3,maxPlayers:3},
{id:"cards",title:"کارت‌های بزرگ",description:"کارت‌های بزرگ‌تر با تصویر و آمار خواناتر",minPlayers:1,maxPlayers:6},
{id:"grid",title:"شبکه‌ای",description:"نمایش چند بازیکن در قالب Grid",minPlayers:2,maxPlayers:12},
{id:"hero",title:"Hero",description:"تمرکز بصری روی نفر اول و نمایش فشرده بقیه",minPlayers:2,maxPlayers:6},
];
export const getRankingLayout=(id:string)=>rankingLayouts.find(l=>l.id===id)??rankingLayouts[0];
