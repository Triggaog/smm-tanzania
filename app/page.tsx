import type {Metadata} from "next";
import {TypedComingSoon} from "@/components/typed-coming-soon";
import {Homepage} from "@/components/homepage";
import SiteLayout from "@/app/(site)/layout";
import "./coming-soon.css";

export function generateMetadata():Metadata{
  if(process.env.NODE_ENV==="development"){
    return {
      title:"SMM Tanzania",
      description:"Social media support for Tanzania",
    };
  }

  return {
    title:"Coming Soon | SMM Tanzania",
    description:"We're building something exceptional.",
  };
}

function ComingSoon(){
  return <section className="coming-soon">
    <div className="coming-glow coming-glow-blue" aria-hidden="true"/>
    <div className="coming-glow coming-glow-orange" aria-hidden="true"/>
    <div className="coming-particles" aria-hidden="true">
      <i/><i/><i/><i/><i/><i/>
    </div>

    <div className="coming-content">
      <span className="coming-label">SMM TANZANIA</span>
      <TypedComingSoon/>
      <h2>We&apos;re building something exceptional.</h2>
      <p>
        Our new website is on its way.<br/>
        We&apos;re working behind the scenes to deliver a better digital experience.<br/>
        Thank you for your patience.
      </p>
    </div>

    <footer className="coming-footer">© 2026 SMM Tanzania. All Rights Reserved.</footer>
  </section>;
}

export default function Page(){
  if(process.env.NODE_ENV==="development"){
    return <SiteLayout><Homepage/></SiteLayout>;
  }

  return <ComingSoon/>;
}
