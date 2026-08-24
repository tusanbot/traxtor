import {NextResponse} from "next/server";
import {createHmac,timingSafeEqual} from "crypto";
import {AUTH_COOKIE,AUTH_USERNAME,isValidCredentials} from "@/lib/auth";
function token(){const secret=process.env.TRAXTOR_AUTH_SECRET||"";return createHmac("sha256",secret).update(AUTH_USERNAME).digest("hex")}
export async function POST(req:Request){try{const {username,password}=await req.json();if(!process.env.TRAXTOR_AUTH_SECRET||!isValidCredentials(String(username||""),String(password||"")))return NextResponse.json({error:"invalid_credentials"},{status:401});const expected=token();const a=Buffer.from(expected);const b=Buffer.from(token());if(!timingSafeEqual(a,b))return NextResponse.json({error:"invalid_session"},{status:401});const res=NextResponse.json({ok:true});res.cookies.set(AUTH_COOKIE,expected,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:60*60*24*7});return res}catch{return NextResponse.json({error:"bad_request"},{status:400})}}
