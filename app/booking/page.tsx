import {PageTop} from "@/components/site";
import {BookingForm} from "@/components/booking-form";
import {db} from "@/lib/prisma";
export const dynamic="force-dynamic";

export default async function Page({searchParams}:{searchParams:Promise<{service?:string}>}){
  const [{service=""},p,services]=await Promise.all([searchParams,db.contentItem.findUnique({where:{type_slug:{type:"page",slug:"booking"}},select:{data:true}}),db.service.findMany({where:{status:"PUBLISHED",active:true},orderBy:{displayOrder:"asc"},select:{slug:true,name:true,priceAmount:true,priceMode:true,priceCurrency:true,priceVisible:true}})]);
  const d=(p?.data||{})as any;
  return <><PageTop label={d.label} heading={d.heading} copy={d.description}/><section><div className="wrap form-layout"><div><h2>Book Consultation</h2><p>Confirm your service, preferred date and contact details. Our team will follow up to discuss your requirements.</p></div><BookingForm services={services} initialService={service}/></div></section></>;
}
