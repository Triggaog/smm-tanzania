export const featureIconOptions = [
  "strategy","calendar","chart","users","target","megaphone","edit","camera",
  "shield","key","settings","search","wallet","check","music","globe","code","support","book","report"
] as const;

const paths:Record<string,React.ReactNode> = {
  strategy:<><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></>,
  calendar:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></>,
  chart:<><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
  users:<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  target:<><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
  megaphone:<><path d="m3 11 17-5v12L3 14zM11 16l-1 5H6l-1-6"/><path d="M20 10a3 3 0 0 1 0 4"/></>,
  edit:<><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"/></>,
  camera:<><path d="M4 7h3l2-3h6l2 3h3a2 2 0 0 1 2 2v10H2V9a2 2 0 0 1 2-2z"/><circle cx="12" cy="13" r="4"/></>,
  shield:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></>,
  key:<><circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M15 8l3 3M18 5l3 3"/></>,
  settings:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1z"/></>,
  search:<><circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/></>,
  wallet:<><path d="M3 6h16v15H3zM3 6l3-3h12v3M15 12h6v5h-6a2 2 0 0 1 0-5z"/></>,
  check:<><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></>,
  music:<><path d="M9 18V5l11-2v13M9 9l11-2"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></>,
  globe:<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
  code:<><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"/></>,
  support:<><circle cx="12" cy="12" r="9"/><path d="M4 14h3v5H5M20 14h-3v5h2M7 7a7 7 0 0 1 10 0"/></>,
  book:<><path d="M4 4h6a2 2 0 0 1 2 2v15a3 3 0 0 0-3-3H4zM20 4h-6a2 2 0 0 0-2 2v15a3 3 0 0 1 3-3h5z"/></>,
  report:<><path d="M5 3h11l3 3v15H5zM16 3v4h4M8 11h8M8 15h8M8 19h5"/></>,
};

export function FeatureIcon({name,className=""}:{name:string;className?:string}) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.check}</svg>;
}

const serviceIcons:Record<string,string>={
  "social-media-management":"calendar",
  "social-media-growth":"chart",
  "meta-ads-management":"target",
  "content-strategy":"camera",
  "account-recovery":"shield",
  "social-media-monetization":"wallet",
  "verification-support":"check",
  "music-distribution":"music",
  "website-development":"code",
  "training-consultation":"book",
};

export function ServiceIcon({slug}:{slug:string}){
  return <FeatureIcon name={serviceIcons[slug]||"strategy"} className="service-icon"/>;
}
