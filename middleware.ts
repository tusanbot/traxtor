import {NextRequest,NextResponse} from "next/server";
import {AUTH_COOKIE,AUTH_USERNAME} from "@/lib/auth";

async function expectedToken(secret:string,username:string){
 const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
 const signature=await crypto.subtle.sign("HMAC",key,new TextEncoder().encode(username));
 return Array.from(new Uint8Array(signature)).map(b=>b.toString(16).padStart(2,"0")).join("");
}

export async function middleware(req:NextRequest){
 if(!req.nextUrl.pathname.startsWith("/tools"))return NextResponse.next();
 const secret=process.env.TRAXTOR_AUTH_SECRET;
 if(!secret)return NextResponse.redirect(new URL("/login",req.url));
 const expected=await expectedToken(secret,AUTH_USERNAME);
 const value=req.cookies.get(AUTH_COOKIE)?.value||"";
 if(value===expected)return NextResponse.next();
 const url=new URL("/login",req.url);url.searchParams.set("next",req.nextUrl.pathname);return NextResponse.redirect(url);
}

export const config={matcher:["/tools/:path*"]};
