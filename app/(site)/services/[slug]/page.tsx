import {getPublishedService} from "@/lib/public-queries";
import {notFound} from "next/navigation";
import Link from "next/link";
import type {Metadata} from "next";

export const dynamic="force-dynamic";
type IncludedItem={title:string;visible?:boolean};
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const{slug}=await params;const s=await getPublishedService(slug);return s?{title:s.seoTitle,description:s.seoDescription}:{}}
const formatPrice=(currency:string,amount:string)=>`${currency} ${new Intl.NumberFormat("en-US").format(Number(amount))}`;

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const{slug}=await params;const s=await getPublishedService(slug);if(!s)notFound();
  const included=(s.includedFeatures as unknown[]).map(x=>typeof x==="string"?{title:x,visible:true}:x as IncludedItem).filter(x=>x.visible!==false);
  const price=s.priceAmount?formatPrice(s.priceCurrency,s.priceAmount):"";
  return <main className="minimal-service">
    <section className="minimal-service-intro"><div className="service-narrow"><span className="kicker">{s.categoryLabel}</span><h1>{s.heroHeading}</h1><p className="service-description">{s.heroDescription}</p>{s.priceVisible&&price&&<div className="service-price"><small>{s.priceMode==="STARTING_FROM"?"Starting from":"Service price"}</small><strong>{price}</strong>{s.priceNote&&<p>{s.priceNote}</p>}{s.externalCostsIncluded===false&&<p className="external-cost-note">Advertising budget or other external costs are not included in the service fee.</p>}{s.externalCostsIncluded===true&&<p className="external-cost-note">Applicable external costs are included in the displayed service fee.</p>}</div>}</div></section>
    <section className="minimal-included"><div className="service-narrow"><h2>What&apos;s Included</h2><div className="service-checklist">{included.map((x,i)=><div className="checklist-item" key={`${x.title}-${i}`}><span aria-hidden="true">✓</span><strong>{x.title}</strong></div>)}</div></div></section>
    <section className="minimal-consultation"><div className="service-narrow"><h2>{s.finalCtaHeading||"Ready to Discuss Your Project?"}</h2><p>{s.finalCtaDescription||"Book a consultation with our team to discuss your goals and find the right solution for your business."}</p><Link className="button light" href={`/booking?service=${encodeURIComponent(s.slug)}`}>{s.primaryButtonText||"Book Consultation"} <span>↗</span></Link></div></section>
  </main>;
}
