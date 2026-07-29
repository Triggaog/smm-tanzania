const icons:Record<string,string>={
  "social-media-management":"/images/service-management-ai.webp",
  "social-media-growth":"/images/service-growth-ai.webp",
  "meta-ads-management":"/images/service-advertising-ai.webp",
  "content-strategy":"/images/service-content-ai.webp",
  "account-recovery":"/images/service-recovery-ai.webp",
  "social-media-monetization":"/images/service-monetization-ai.webp",
  "verification-support":"/images/service-verification-ai.webp",
  "music-distribution":"/images/service-music-ai.webp",
  "website-development":"/images/service-website-ai.webp",
  "training-consultation":"/images/service-training-ai.webp",
};

export function ServiceIcon({slug,name}:{slug:string;name:string}){
  return <img
    className="service-ai-icon"
    src={icons[slug]||icons["social-media-management"]}
    alt=""
    aria-hidden="true"
    width="256"
    height="256"
    loading="lazy"
    decoding="async"
    title={`${name} illustration`}
  />;
}
