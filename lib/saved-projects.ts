export type SavedProject={id:string;name:string;tool:string;createdAt:string;updatedAt:string;data:Record<string,unknown>};
const KEY="traxtor-saved-projects-v1";
export function loadSavedProjects():SavedProject[]{if(typeof window==="undefined")return[];try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch{return[]}}
export function saveSavedProject(project:SavedProject){const all=loadSavedProjects().filter(p=>p.id!==project.id);localStorage.setItem(KEY,JSON.stringify([project,...all]));return project}
export function deleteSavedProject(id:string){localStorage.setItem(KEY,JSON.stringify(loadSavedProjects().filter(p=>p.id!==id)))}
export function getSavedProject(id:string){return loadSavedProjects().find(p=>p.id===id)}
