export type ExportSize={id:string;label:string;width:number;height:number};
export const exportSizes:ExportSize[]=[
{id:"portrait",label:"پست عمودی",width:1080,height:1350},
{id:"square",label:"مربع",width:1080,height:1080},
{id:"story",label:"استوری",width:1080,height:1920},
{id:"landscape",label:"افقی",width:1350,height:1080},
];
export type ExportFormat="png"|"jpeg";
export type WatermarkPosition="top-left"|"top-right"|"bottom-left"|"bottom-right";
export type ExportSettings={size:ExportSize;format:ExportFormat;quality:number;watermarkEnabled:boolean;watermarkText:string;watermarkPosition:WatermarkPosition};
export const defaultExportSettings:ExportSettings={size:exportSizes[0],format:"png",quality:0.95,watermarkEnabled:true,watermarkText:"@tractorFan1970",watermarkPosition:"bottom-left"};
export const exportMime=(format:ExportFormat)=>format==="jpeg"?"image/jpeg":"image/png";
