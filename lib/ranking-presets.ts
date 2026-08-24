export type RankingPreset={id:string;title:string;metric:string;subtitle:string;fields:[string,string][];defaults:Record<string,string>};
export const rankingPresets:RankingPreset[]=[
{id:"goals",title:"برترین گلزنان",metric:"goals",subtitle:"تراکتور | فصل ۱۴۰۵–۱۴۰۶",fields:[["goals","گل"],["games","بازی"],["assists","پاس گل"],["rating","امتیاز"]],defaults:{goals:"0",games:"0",assists:"0",rating:"0"}},
{id:"assists",title:"برترین پاسورها",metric:"assists",subtitle:"تراکتور | فصل ۱۴۰۵–۱۴۰۶",fields:[["assists","پاس گل"],["goals","گل"],["games","بازی"],["rating","امتیاز"]],defaults:{assists:"0",goals:"0",games:"0",rating:"0"}},
{id:"rating",title:"بهترین بازیکنان",metric:"rating",subtitle:"تراکتور | فصل ۱۴۰۵–۱۴۰۶",fields:[["rating","امتیاز"],["goals","گل"],["assists","پاس گل"],["games","بازی"]],defaults:{rating:"0",goals:"0",assists:"0",games:"0"}},
{id:"cleanSheets",title:"برترین دروازه‌بان‌ها",metric:"cleanSheets",subtitle:"تراکتور | فصل ۱۴۰۵–۱۴۰۶",fields:[["cleanSheets","کلین‌شیت"],["games","بازی"],["goalsAgainst","گل خورده"],["saves","مهار"],["savePct","درصد مهار"],["rating","امتیاز"]],defaults:{cleanSheets:"0",games:"0",goalsAgainst:"0",saves:"0",savePct:"0",rating:"0"}},
{id:"keyPasses",title:"برترین پاسورهای کلیدی",metric:"keyPasses",subtitle:"تراکتور | فصل ۱۴۰۵–۱۴۰۶",fields:[["keyPasses","پاس کلیدی"],["games","بازی"],["assists","پاس گل"],["rating","امتیاز"]],defaults:{keyPasses:"0",games:"0",assists:"0",rating:"0"}},
{id:"games",title:"بیشترین بازی",metric:"games",subtitle:"تراکتور | فصل ۱۴۰۵–۱۴۰۶",fields:[["games","بازی"],["goals","گل"],["assists","پاس گل"],["rating","امتیاز"]],defaults:{games:"0",goals:"0",assists:"0",rating:"0"}},
];
export const getRankingPreset=(id:string)=>rankingPresets.find(p=>p.id===id)??rankingPresets[0];
