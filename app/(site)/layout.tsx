import Link from "next/link";
import {db} from "@/lib/prisma";
import {Navbar} from "@/components/navbar";

export const dynamic="force-dynamic";

export default async function SiteLayout({children}:{children:React.ReactNode}){
  const [services,setting]=await Promise.all([
    db.service.findMany({where:{status:"PUBLISHED",active:true},orderBy:{displayOrder:"asc"},select:{id:true,name:true,slug:true}}),
    db.contentItem.findFirst({where:{type:"setting",status:"PUBLISHED"},select:{data:true}}),
  ]);
  const s=(setting?.data||{}) as any;
  const links=[["/","Home"],["/blog","Blog"],["/about","About Us"],["/contact","Contact"]];

  return <>
    <Navbar services={services}/>
    <main>{children}</main>
    <footer className="site-footer"><div className="wrap footer-grid">
      <div className="footer-brand"><Link className="logo inverse" href="/"><b>SMM</b><span>TANZANIA</span></Link><p>{s.footerDescription}</p><div className="socials"><a href={s.instagram} aria-label="Instagram">ig</a><a href={s.facebook} aria-label="Facebook">f</a><a href={s.linkedin} aria-label="LinkedIn">in</a></div></div>
      <div><h3>Quick Links</h3>{links.map(x=><Link key={x[0]} href={x[0]}>{x[1]}</Link>)}<Link href="/booking">Booking</Link></div>
      <div><h3>Services</h3>{services.slice(0,4).map(x=><Link key={x.id} href={`/services/${x.slug}`}>{x.name}</Link>)}</div>
      <div><h3>Contact Us</h3><a href={`https://wa.me/${s.whatsapp}`}>{s.phone}</a><a href={`mailto:${s.email}`}>{s.email}</a><span>{s.location}</span></div>
    </div><div className="wrap copyright"><span>© {new Date().getFullYear()} {s.copyright}. All rights reserved.</span><span><Link href="/privacy-policy">Privacy Policy</Link> · <Link href="/terms-and-conditions">Terms</Link></span></div></footer>
    <a className="whatsapp" aria-label="Chat on WhatsApp" href={`https://wa.me/${s.whatsapp}`}><span>◉</span> WhatsApp</a>
  </>;
}
