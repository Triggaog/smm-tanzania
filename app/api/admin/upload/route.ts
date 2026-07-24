import {NextResponse} from "next/server";
import {put} from "@vercel/blob";
import {writeFile,mkdir} from "fs/promises";
import path from "path";

export const runtime="nodejs";

export async function POST(req:Request){
  const form=await req.formData();
  const file=form.get("file");
  if(!(file instanceof File)||!file.type.startsWith("image/")||file.size>5_000_000)return NextResponse.json({error:"Choose an image under 5MB"},{status:400});
  const safe=`${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g,"-")}`;
  if(process.env.BLOB_READ_WRITE_TOKEN){
    const blob=await put(`smm-tanzania/${safe}`,file,{access:"public",addRandomSuffix:false});
    return NextResponse.json({url:blob.url});
  }
  await mkdir(path.join(process.cwd(),"public","uploads"),{recursive:true});
  await writeFile(path.join(process.cwd(),"public","uploads",safe),Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({url:`/uploads/${safe}`});
}
