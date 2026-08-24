import {NextRequest,NextResponse} from "next/server";
import {createHmac,timingSafeEqual} from "crypto";
import {AUTH_COOKIE,AUTH_USERNAME} from "@/lib/auth";
export function middleware(req:NextRequest){if(!req.nextUrl.pathname.startsWith("/tools"))return NextResponse.next();const secret=process.env.TRAXTOR_AUTH_SECRET;if(!secret)return NextResponse.redirect(new URL("/login",req.url));const expected=createHmac("sha256",secret).update(AUTH_USERNAME).digest("hex");const value=req.cookies.get(AUTH_COOKIE)?.value||"";try{const ok=value.length===expected.length&&timingSafeEqual(Buffer.from(value),Buffer.from(expected));if(ok)return NextResponse.next()}catch{}const url=new URL("/login",req.url);url.searchParams.set("next",req.nextUrl.pathname);return NextResponse.redirect(url)}
export const config={matcher:["/tools/:path*"]};
