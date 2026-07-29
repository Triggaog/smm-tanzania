import Link from "next/link";
import {db} from "@/lib/prisma";
import {Navbar} from "@/components/navbar";

export const dynamic="force-dynamic";

function SocialIcon({name}:{name:"instagram"|"facebook"|"linkedin"}){
  if(name==="instagram")return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.25"/><circle className="social-icon-dot" cx="17.4" cy="6.7" r="1"/></svg>;
  if(name==="facebook")return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 21v-8h2.8l.4-3h-3.2V8.1c0-.9.3-1.5 1.6-1.5H17V3.9c-.7-.1-1.5-.2-2.3-.2-2.3 0-3.9 1.4-3.9 4V10H8v3h2.8v8h2.9Z"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.8 8.3H3.5V21h3.3V8.3ZM5.1 3A2 2 0 1 0 5 7a2 2 0 0 0 .1-4ZM21 13.7c0-3.8-2-5.6-4.7-5.6-2.2 0-3.1 1.2-3.7 2V8.3H9.3V21h3.3v-6.3c0-1.7.3-3.3 2.4-3.3s2.1 1.9 2.1 3.4V21H21v-7.3Z"/></svg>;
}

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
      <div className="footer-brand"><Link className="logo inverse" href="/"><b>SMM</b><span>TANZANIA</span></Link><p>{s.footerDescription}</p><div className="socials"><a href={s.instagram} aria-label="Instagram"><SocialIcon name="instagram"/></a><a href={s.facebook} aria-label="Facebook"><SocialIcon name="facebook"/></a><a href={s.linkedin} aria-label="LinkedIn"><SocialIcon name="linkedin"/></a></div></div>
      <div><h3>Quick Links</h3>{links.map(x=><Link key={x[0]} href={x[0]}>{x[1]}</Link>)}<Link href="/booking">Booking</Link></div>
      <div><h3>Services</h3>{services.slice(0,4).map(x=><Link key={x.id} href={`/services/${x.slug}`}>{x.name}</Link>)}</div>
      <div><h3>Contact Us</h3><a href={`https://wa.me/${s.whatsapp}`}>{s.phone}</a><a href={`mailto:${s.email}`}>{s.email}</a><span>{s.location}</span></div>
    </div><div className="wrap copyright"><span>© {new Date().getFullYear()} {s.copyright}. All rights reserved.</span><span><Link href="/privacy-policy">Privacy Policy</Link> · <Link href="/terms-and-conditions">Terms</Link></span></div></footer>
    <a className="whatsapp" aria-label="Chat on WhatsApp" href={`https://wa.me/${s.whatsapp}`}><span>◉</span> WhatsApp</a>
  </>;
}
