"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useCallback,useEffect,useRef,useState} from "react";

type ServiceLink={id:string;name:string;slug:string};

export function Navbar({services}:{services:ServiceLink[]}){
  const pathname=usePathname();
  const navRef=useRef<HTMLDivElement>(null);
  const [servicesOpen,setServicesOpen]=useState(false);
  const [mobileMenuOpen,setMobileMenuOpen]=useState(false);

  const closeMenus=useCallback(()=>{
    setServicesOpen(false);
    setMobileMenuOpen(false);
  },[]);

  useEffect(()=>{
    setServicesOpen(false);
    setMobileMenuOpen(false);
  },[pathname]);

  useEffect(()=>{
    const handleOutside=(event:PointerEvent)=>{
      if(!navRef.current?.contains(event.target as Node))closeMenus();
    };
    const handleKey=(event:KeyboardEvent)=>{
      if(event.key==="Escape")closeMenus();
    };
    document.addEventListener("pointerdown",handleOutside);
    document.addEventListener("keydown",handleKey);
    return()=>{
      document.removeEventListener("pointerdown",handleOutside);
      document.removeEventListener("keydown",handleKey);
    };
  },[closeMenus]);

  return <header><div className="wrap nav" ref={navRef}>
    <Link className="logo" href="/" aria-label="SMM Tanzania home" onClick={closeMenus}><b>SMM</b><span>TANZANIA</span></Link>
    <nav>
      <Link href="/" onClick={closeMenus}>Home</Link>
      <details className="desktop-services" open={servicesOpen} onToggle={event=>setServicesOpen(event.currentTarget.open)}>
        <summary>Services <i>⌄</i></summary>
        <div className="desktop-services-menu">
          {services.map(service=><Link key={service.id} href={`/services/${service.slug}`} onClick={closeMenus}>{service.name}</Link>)}
          <Link className="all" href="/services" onClick={closeMenus}>View all Services ↗</Link>
        </div>
      </details>
      <Link href="/blog" onClick={closeMenus}>Blog</Link>
      <Link href="/about" onClick={closeMenus}>About Us</Link>
    </nav>
    <Link className="button nav-cta" href="/booking" onClick={closeMenus}>Booking <span>↗</span></Link>
    <details className="mobile-menu" open={mobileMenuOpen} onToggle={event=>setMobileMenuOpen(event.currentTarget.open)}>
      <summary aria-label="Open menu"><i/><i/><i/></summary>
      <div>
        <Link href="/" onClick={closeMenus}>Home</Link>
        <Link href="/services" onClick={closeMenus}>Services</Link>
        <Link href="/blog" onClick={closeMenus}>Blog</Link>
        <Link href="/about" onClick={closeMenus}>About Us</Link>
        <Link href="/contact" onClick={closeMenus}>Contact</Link>
        <Link className="button" href="/booking" onClick={closeMenus}>Booking ↗</Link>
      </div>
    </details>
  </div></header>;
}
