import {NextResponse} from "next/server";
import {compare} from "bcryptjs";
import {db} from "@/lib/prisma";
import {sessionCookie,signSession} from "@/lib/auth";

export async function POST(req:Request){
 try{
  const {email,password}=await req.json();
  const admin=await db.admin.findUnique({where:{email:String(email).trim().toLowerCase()}});
  if(!admin||!await compare(String(password),admin.passwordHash))return NextResponse.json({error:"Invalid email or password"},{status:401});
  const res=NextResponse.json({ok:true});
  const secure=(process.env.NEXT_PUBLIC_SITE_URL||'').startsWith('https://');
  res.cookies.set(sessionCookie,await signSession(admin.id,admin.email),{httpOnly:true,sameSite:'lax',secure,path:'/',maxAge:60*60*8});
  return res;
 }catch{
  return NextResponse.json({error:'Unable to sign in'},{status:500});
 }
}
