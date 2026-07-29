import Link from "next/link";
import {OptimizedImage} from "@/components/optimized-image";
import {ServiceIcon} from "@/components/service-icon";
import {db} from "@/lib/prisma";

export async function Homepage() {
  const [home, services, posts, testimonials] = await Promise.all([
    db.contentItem.findFirst({where: {type: "homepage", status: "PUBLISHED"},select:{data:true}}),
    db.service.findMany({where: {status: "PUBLISHED", active: true}, orderBy: {displayOrder: "asc"}, take: 4,select:{id:true,slug:true,name:true,heroDescription:true}}),
    db.contentItem.findMany({where: {type: "post", status: "PUBLISHED"}, orderBy: {displayOrder: "asc"}, take: 4,select:{id:true,slug:true,title:true,summary:true,data:true}}),
    db.contentItem.findMany({where: {type: "testimonial", status: "PUBLISHED"}, orderBy: {displayOrder: "asc"},select:{id:true,title:true,summary:true,data:true}}),
  ]);
  const d = (home?.data || {}) as any;

  return <>
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="kicker">{d.hero?.label}</span>
          <h1>{d.hero?.heading}</h1>
          <p>{d.hero?.description}</p>
          <div className="buttons">
            <Link className="button" href={d.hero?.primaryLink || "/booking"}>{d.hero?.primaryText || "Work With Us"}<span>↗</span></Link>
          </div>
        </div>
        <div className="hero-art" aria-label="Social media campaign performance illustration">
          {d.hero?.image ? <OptimizedImage className="hero-image" src={d.hero.image} alt="SMM Tanzania" width={620} height={525} sizes="(max-width: 900px) calc(100vw - 48px), 570px" priority/> : <>
            <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
            <div className="phone">
              <div className="phone-head"><b>SMM</b><span>•••</span></div>
              <div className="growth"><small>Audience growth</small><strong>+24.8%</strong><div className="bars">{[32,58,43,74,66,96].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div></div>
              <div className="metrics"><span><small>Reach</small><b>148K</b></span><span><small>Leads</small><b>1,240</b></span></div>
            </div>
            <span className="float f1">● Live campaign</span><span className="float f2">↗ 38% engagement</span>
          </>}
        </div>
      </div>
    </section>

    <section className="services-section">
      <div className="wrap">
        <div className="section-head"><div><span className="kicker">{d.services?.label}</span><h2>{d.services?.heading}</h2></div><p>{d.services?.description}</p></div>
        <div className="service-grid">{services.map((s,i)=><Link className="service" href={`/services/${s.slug}`} key={s.id}>
          <div className={`service-visual v${i%4}`}><span className="visual-mark"><ServiceIcon slug={s.slug} name={s.name}/></span></div>
          <div className="service-copy"><span className="service-no">0{i+1}</span><h3>{s.name}</h3><p>{s.heroDescription}</p><b className="circle-arrow">↗</b></div>
        </Link>)}</div>
        <Link className="text-link" href="/services">View all services <span>↗</span></Link>
      </div>
    </section>

    <section className="cream blog-section"><div className="wrap">
      <div className="section-head"><div><span className="kicker">{d.blog?.label}</span><h2>{d.blog?.heading}</h2></div><p>{d.blog?.description}</p></div>
      <div className="blog-grid">{posts.map((p,i)=><Link className="post" href={`/blog/${p.slug}`} key={p.id}>
        <div className={`post-image p${i}`}><span>{(p.data as any)?.category || "Insights"}</span><b>SMM<br/>INSIGHTS</b></div>
        <div><small>BY SMM TANZANIA</small><h3>{p.title}</h3><p>{p.summary}</p><span className="read-more">Read article ↗</span></div>
      </Link>)}</div>
      <Link className="text-link" href="/blog">Read our articles <span>↗</span></Link>
    </div></section>

    <section className="testimonial-section"><div className="wrap">
      <div className="section-head compact"><div><span className="kicker">{d.testimonials?.label}</span><h2>{d.testimonials?.heading}</h2></div><p>Real feedback from businesses we have helped grow and communicate better online.</p></div>
      <div className="quotes">{testimonials.map(t=><blockquote key={t.id}><span className="quote-mark">“</span>{(t.data as any)?.quote}<footer><span className="avatar">{t.title.charAt(0)}</span><span><b>{t.title}</b><small>{t.summary}</small></span></footer></blockquote>)}</div>
    </div></section>

    <section className="cta"><div className="wrap cta-inner"><span className="kicker">LET&apos;S GROW TOGETHER</span><h2>{d.cta?.heading}</h2><p>{d.cta?.description}</p><Link className="button light" href="/booking">Book a Consultation <span>↗</span></Link></div></section>
  </>;
}
