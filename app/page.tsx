import type {Metadata} from "next";
import {TypedComingSoon} from "@/components/typed-coming-soon";
import "./coming-soon.css";

export const metadata:Metadata={
  title:"Coming Soon | SMM Tanzania",
  description:"We're building something exceptional.",
};

export default function Page(){
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
