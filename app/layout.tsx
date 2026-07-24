import type {Metadata} from "next";
import Link from "next/link";
import {db} from "@/lib/prisma";
import "./globals.css";
import "./performance.css";

export const dynamic = "force-dynamic";
export const metadata:Metadata = {title:"SMM Tanzania", description:"Social media support for Tanzania"};

export default async function Layout({children}:{children:React.ReactNode}) {
  const [services, setting] = await Promise.all([
    db.service.findMany({where:{status:"PUBLISHED",active:true},orderBy:{displayOrder:"asc"},select:{id:true,name:true,slug:true}}),
    db.contentItem.findFirst({where:{type:"setting",status:"PUBLISHED"},select:{data:true}}),
  ]);
  const s = (setting?.data || {}) as any;
  const links = [["/","Home"],["/blog","Blog"],["/about","About Us"],["/contact","Contact"]];
  return <html lang="en"><body>
    <header><div className="wrap nav">
      <Link className="logo" href="/" aria-label="SMM Tanzania home"><b>SMM</b><span>TANZANIA</span></Link>
      <nav><Link href="/">Home</Link><details className="desktop-services"><summary>Services <i>⌄</i></summary><div className="desktop-services-menu">{services.map(x=><Link key={x.id} href={`/services/${x.slug}`}>{x.name}</Link>)}<Link className="all" href="/services">View all Services ↗</Link></div></details>{links.slice(1,3).map(x=><Link key={x[0]} href={x[0]}>{x[1]}</Link>)}</nav>
      <Link className="button nav-cta" href="/booking">Booking <span>↗</span></Link>
      <details className="mobile-menu"><summary aria-label="Open menu"><i/><i/><i/></summary><div><Link href="/">Home</Link><Link href="/services">Services</Link><Link href="/blog">Blog</Link><Link href="/about">About Us</Link><Link href="/contact">Contact</Link><Link className="button" href="/booking">Booking ↗</Link></div></details>
    </div></header>
    <main>{children}</main>
    <footer className="site-footer"><div className="wrap footer-grid">
      <div className="footer-brand"><Link className="logo inverse" href="/"><b>SMM</b><span>TANZANIA</span></Link><p>{s.footerDescription}</p><div className="socials"><a href={s.instagram} aria-label="Instagram">ig</a><a href={s.facebook} aria-label="Facebook">f</a><a href={s.linkedin} aria-label="LinkedIn">in</a></div></div>
      <div><h3>Quick Links</h3>{links.map(x=><Link key={x[0]} href={x[0]}>{x[1]}</Link>)}<Link href="/booking">Booking</Link></div>
      <div><h3>Services</h3>{services.slice(0,4).map(x=><Link key={x.id} href={`/services/${x.slug}`}>{x.name}</Link>)}</div>
      <div><h3>Contact Us</h3><a href={`https://wa.me/${s.whatsapp}`}>{s.phone}</a><a href={`mailto:${s.email}`}>{s.email}</a><span>{s.location}</span></div>
    </div><div className="wrap copyright"><span>© {new Date().getFullYear()} {s.copyright}. All rights reserved.</span><span><Link href="/privacy-policy">Privacy Policy</Link> · <Link href="/terms-and-conditions">Terms</Link></span></div></footer>
    <a className="whatsapp" aria-label="Chat on WhatsApp" href={`https://wa.me/${s.whatsapp}`}><span>◉</span> WhatsApp</a>
  </body></html>;
}
