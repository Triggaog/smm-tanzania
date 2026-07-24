import {ContentStatus} from "@prisma/client";import {hash} from "bcryptjs";import {db} from "../lib/prisma";
const services=[
 ["social-media-management","Social Media Management","We plan, create and publish purposeful content that keeps your brand visible and connected."],
 ["social-media-growth","Social Media Growth","A structured growth programme focused on audience relevance, discoverability and consistent engagement."],
 ["meta-ads-management","Sponsored Advertising","Professionally managed Facebook and Instagram advertising focused on measurable business objectives."],
 ["content-strategy","Content Strategy & Creation","Content calendars, captions, scripts, hooks and short-form ideas."],
 ["account-recovery","Account Recovery & Solutions","Structured guidance for hacked, disabled, restricted or compromised accounts."],
 ["social-media-monetization","Social Media Monetization","Support to understand eligible creator and business monetization opportunities."],
 ["verification-support","Meta Verification Support","Profile preparation and responsible guidance through official Meta verification processes."],
 ["music-distribution","Digital Music Distribution","Professional release preparation and distribution support for Tanzanian artists."],
 ["website-development","Website Development","Fast, responsive websites designed to present your business professionally and support customer enquiries."],
 ["training-consultation","Consultation & Training","Hands-on social media, advertising, content and security consultation and training."]
];
const prices:Record<string,{priceAmount:string;priceMode:string;priceCurrency:string;priceVisible:boolean;priceNote:string;externalCostsIncluded:boolean|null}>={
 "social-media-management":{priceAmount:"350000",priceMode:"STARTING_FROM",priceCurrency:"TZS",priceVisible:true,priceNote:"Final fee depends on the number of platforms and monthly content requirements.",externalCostsIncluded:false},
 "social-media-growth":{priceAmount:"250000",priceMode:"STARTING_FROM",priceCurrency:"TZS",priceVisible:true,priceNote:"Scope is confirmed after an account and audience review.",externalCostsIncluded:false},
 "meta-ads-management":{priceAmount:"200000",priceMode:"STARTING_FROM",priceCurrency:"TZS",priceVisible:true,priceNote:"Management fee is based on campaign scope and duration.",externalCostsIncluded:false},
 "content-strategy":{priceAmount:"300000",priceMode:"STARTING_FROM",priceCurrency:"TZS",priceVisible:true,priceNote:"Production requirements are quoted after the content scope is agreed.",externalCostsIncluded:false},
 "account-recovery":{priceAmount:"150000",priceMode:"STARTING_FROM",priceCurrency:"TZS",priceVisible:true,priceNote:"The fee reflects assessment and professional support; recovery is not guaranteed.",externalCostsIncluded:false},
 "social-media-monetization":{priceAmount:"180000",priceMode:"STARTING_FROM",priceCurrency:"TZS",priceVisible:true,priceNote:"Approval remains subject to platform eligibility and policy requirements.",externalCostsIncluded:false},
 "verification-support":{priceAmount:"150000",priceMode:"STARTING_FROM",priceCurrency:"TZS",priceVisible:true,priceNote:"Verification approval is determined exclusively by Meta.",externalCostsIncluded:false},
 "music-distribution":{priceAmount:"120000",priceMode:"FIXED",priceCurrency:"TZS",priceVisible:true,priceNote:"Price covers one standard release prepared for eligible digital stores.",externalCostsIncluded:true},
 "website-development":{priceAmount:"850000",priceMode:"STARTING_FROM",priceCurrency:"TZS",priceVisible:true,priceNote:"Final scope depends on page count, content and required functionality.",externalCostsIncluded:false},
 "training-consultation":{priceAmount:"150000",priceMode:"FIXED",priceCurrency:"TZS",priceVisible:true,priceNote:"Standard fee covers one focused consultation session.",externalCostsIncluded:true}
};
const included:Record<string,{title:string;description:string;icon:string;visible:boolean}[]>={
 "social-media-management":[
  {title:"Channel Strategy",description:"A practical platform strategy aligned with your audience, objectives and available resources.",icon:"strategy",visible:true},
  {title:"Monthly Content Calendar",description:"A structured publishing plan covering themes, formats, campaign dates and key messages.",icon:"calendar",visible:true},
  {title:"Profile Optimization",description:"Business information, bios, links and page elements refined for clarity and discoverability.",icon:"settings",visible:true},
  {title:"Publishing & Scheduling",description:"Approved content is prepared, scheduled and published consistently across agreed channels.",icon:"megaphone",visible:true},
  {title:"Community Management",description:"Professional monitoring and response support for relevant comments and direct enquiries.",icon:"users",visible:true},
  {title:"Brand Voice Guidance",description:"Clear language and response guidelines that keep communication consistent and recognisable.",icon:"edit",visible:true},
  {title:"Performance Monitoring",description:"Ongoing review of reach, engagement and content performance to inform improvements.",icon:"chart",visible:true},
  {title:"Monthly Reporting",description:"An accessible report summarising activity, results, observations and recommended next steps.",icon:"report",visible:true}],
 "social-media-growth":[
  {title:"Growth Audit",description:"A detailed review of audience quality, content patterns, discoverability and growth barriers.",icon:"search",visible:true},
  {title:"Audience Definition",description:"Priority audience segments are clarified to guide relevant content and engagement decisions.",icon:"users",visible:true},
  {title:"Competitor Benchmarking",description:"Comparable accounts are assessed to identify positioning gaps and practical opportunities.",icon:"chart",visible:true},
  {title:"Discoverability Plan",description:"Keywords, hashtags, topics and profile signals are organised to improve organic discovery.",icon:"target",visible:true},
  {title:"Engagement Framework",description:"A sustainable approach for meaningful participation, replies and audience relationship building.",icon:"support",visible:true},
  {title:"Content Testing",description:"Selected formats, hooks and publishing times are tested to learn what resonates with your audience.",icon:"camera",visible:true},
  {title:"Collaboration Planning",description:"Relevant creator, partner and community opportunities are identified for authentic exposure.",icon:"globe",visible:true},
  {title:"Growth Review",description:"Regular performance reviews translate audience and content data into focused adjustments.",icon:"report",visible:true}],
 "meta-ads-management":[
  {title:"Advertising Audit",description:"Existing account structure, tracking, creatives and previous campaign results are reviewed.",icon:"search",visible:true},
  {title:"Campaign Planning",description:"Objectives, audiences, placements, budget approach and campaign schedule are clearly defined.",icon:"strategy",visible:true},
  {title:"Audience Setup",description:"Relevant prospecting, remarketing and exclusion audiences are configured where data permits.",icon:"users",visible:true},
  {title:"Campaign Configuration",description:"Campaigns are built using appropriate Meta objectives, placements and delivery settings.",icon:"settings",visible:true},
  {title:"Creative Coordination",description:"Ad formats, messages and calls to action are prepared or adapted for campaign use.",icon:"camera",visible:true},
  {title:"Budget Monitoring",description:"Spend and delivery are monitored carefully against the agreed campaign plan.",icon:"wallet",visible:true},
  {title:"Ongoing Optimization",description:"Performance signals guide measured adjustments to audiences, creative and delivery settings.",icon:"target",visible:true},
  {title:"Advertising Report",description:"Results, costs, observations and recommendations are presented in a clear business report.",icon:"report",visible:true}],
 "content-strategy":[
  {title:"Content Audit",description:"Current content, brand presentation and audience response are reviewed for useful insights.",icon:"search",visible:true},
  {title:"Content Pillars",description:"Distinct topic areas are defined to keep content relevant, balanced and recognisable.",icon:"strategy",visible:true},
  {title:"Campaign Concepts",description:"Creative directions are developed around launches, offers, education and brand storytelling.",icon:"megaphone",visible:true},
  {title:"Editorial Calendar",description:"Content ideas are organised into a workable schedule with formats and publishing dates.",icon:"calendar",visible:true},
  {title:"Copywriting",description:"Professional captions, hooks and calls to action are written in the agreed brand voice.",icon:"edit",visible:true},
  {title:"Short-form Scripts",description:"Structured scripts and shot guidance support useful Reels, TikTok and short video production.",icon:"camera",visible:true},
  {title:"Visual Direction",description:"Practical guidance covers composition, formats, graphic consistency and asset requirements.",icon:"settings",visible:true},
  {title:"Content Review",description:"Draft content is reviewed for clarity, relevance, platform fit and message consistency.",icon:"check",visible:true}],
 "account-recovery":[
  {title:"Account Assessment",description:"The incident, access status and available evidence are reviewed before action is recommended.",icon:"search",visible:true},
  {title:"Security Review",description:"Connected emails, devices, sessions and authentication risks are examined where accessible.",icon:"shield",visible:true},
  {title:"Recovery Path Guidance",description:"We identify and explain the appropriate official platform recovery or appeal process.",icon:"strategy",visible:true},
  {title:"Evidence Preparation",description:"Relevant ownership details and supporting information are organised for official submissions.",icon:"report",visible:true},
  {title:"Form & Appeal Support",description:"Professional guidance helps clients complete applicable platform forms accurately.",icon:"edit",visible:true},
  {title:"Access Restoration Setup",description:"When access is restored, credentials, roles and recovery contacts are configured carefully.",icon:"key",visible:true},
  {title:"Account Hardening",description:"Two-factor authentication and safer access practices are implemented or recommended.",icon:"settings",visible:true},
  {title:"Progress Support",description:"We help interpret platform responses and identify reasonable next steps without guaranteeing recovery.",icon:"support",visible:true}],
 "social-media-monetization":[
  {title:"Eligibility Review",description:"Current platform, country, account and content eligibility signals are assessed.",icon:"check",visible:true},
  {title:"Account Readiness Audit",description:"Profile standing, content history and policy risks are reviewed before application steps.",icon:"search",visible:true},
  {title:"Programme Guidance",description:"Available platform programmes and their requirements are explained in practical language.",icon:"book",visible:true},
  {title:"Content Compliance Review",description:"Content practices are reviewed against relevant originality and monetization policies.",icon:"shield",visible:true},
  {title:"Payout Setup Support",description:"Where available, we guide the correct setup of payout and tax information.",icon:"wallet",visible:true},
  {title:"Application Assistance",description:"Clients receive structured support through available official application workflows.",icon:"edit",visible:true},
  {title:"Revenue Dashboard Guidance",description:"Key dashboard areas and performance indicators are explained for ongoing monitoring.",icon:"chart",visible:true},
  {title:"Policy Update Support",description:"We provide guidance when programme rules or account status change, without promising approval.",icon:"support",visible:true}],
 "verification-support":[
  {title:"Verification Readiness Audit",description:"Identity, profile completeness, security and public presence are reviewed objectively.",icon:"search",visible:true},
  {title:"Profile Alignment",description:"Names, categories, bios and contact details are aligned for consistency and accuracy.",icon:"settings",visible:true},
  {title:"Identity Document Guidance",description:"We explain accepted document requirements and safe preparation practices.",icon:"shield",visible:true},
  {title:"Public Presence Review",description:"Relevant website and credible media references are assessed for consistency with the profile.",icon:"globe",visible:true},
  {title:"Security Configuration",description:"Two-factor authentication and appropriate account access controls are reviewed.",icon:"key",visible:true},
  {title:"Application Support",description:"Guidance is provided through the appropriate official Meta verification route.",icon:"check",visible:true},
  {title:"Issue Resolution Guidance",description:"Application errors or requests for information are interpreted and addressed professionally.",icon:"support",visible:true},
  {title:"Post-Application Advice",description:"Clients receive clear next-step guidance without any guarantee of verification approval.",icon:"report",visible:true}],
 "music-distribution":[
  {title:"Release Planning",description:"Release type, date, territories and preparation timeline are organised before delivery.",icon:"calendar",visible:true},
  {title:"Metadata Preparation",description:"Artist names, titles, credits, genres and identifiers are checked for accurate submission.",icon:"edit",visible:true},
  {title:"Audio File Review",description:"Technical file format and basic delivery requirements are checked before distribution.",icon:"music",visible:true},
  {title:"Artwork Compliance",description:"Cover artwork is reviewed against common store dimensions and content requirements.",icon:"camera",visible:true},
  {title:"Store Distribution",description:"Eligible releases are delivered to selected digital music platforms through our distribution workflow.",icon:"globe",visible:true},
  {title:"Artist Profile Support",description:"Guidance is provided for claiming and maintaining supported artist profiles.",icon:"users",visible:true},
  {title:"Release Monitoring",description:"Delivery status and platform responses are monitored during the release process.",icon:"chart",visible:true},
  {title:"Rights & Royalty Guidance",description:"Clients receive practical information about ownership details, reports and available payouts.",icon:"wallet",visible:true}],
 "website-development":[
  {title:"Discovery & Scope",description:"Business goals, target users, content needs and required functionality are clearly documented.",icon:"strategy",visible:true},
  {title:"Information Architecture",description:"Pages and navigation are planned to help visitors find information and take action easily.",icon:"globe",visible:true},
  {title:"Responsive UI Design",description:"A professional interface is designed for consistent use across phones, tablets and desktops.",icon:"camera",visible:true},
  {title:"Website Development",description:"The approved design is built using efficient, maintainable web technology.",icon:"code",visible:true},
  {title:"Content Integration",description:"Provided text, imagery, service information and contact details are added and formatted.",icon:"edit",visible:true},
  {title:"Technical SEO Setup",description:"Page titles, descriptions, semantic structure and indexing essentials are configured.",icon:"search",visible:true},
  {title:"Performance & Security",description:"Core speed, form protection and deployment settings are reviewed before launch.",icon:"shield",visible:true},
  {title:"Launch & Handover",description:"The website is deployed, tested and handed over with practical management guidance.",icon:"support",visible:true}],
 "training-consultation":[
  {title:"Needs Assessment",description:"Current skills, challenges and desired outcomes are clarified before the session.",icon:"search",visible:true},
  {title:"Custom Session Plan",description:"A focused agenda is prepared around the client’s platforms, team and priorities.",icon:"calendar",visible:true},
  {title:"Strategy Consultation",description:"One-to-one or team guidance addresses positioning, channels, content and execution decisions.",icon:"strategy",visible:true},
  {title:"Practical Demonstrations",description:"Relevant platform settings and workflows are demonstrated using clear real-world examples.",icon:"settings",visible:true},
  {title:"Advertising Training",description:"Campaign structure, audience choices, creative and performance basics are explained responsibly.",icon:"megaphone",visible:true},
  {title:"Security Training",description:"Teams learn safer account access, role management and incident prevention practices.",icon:"shield",visible:true},
  {title:"Training Materials",description:"Supporting notes, templates or checklists are provided where relevant to the session.",icon:"book",visible:true},
  {title:"Action Recommendations",description:"A clear summary translates the session into practical next steps for the client or team.",icon:"report",visible:true}]
};
async function main(){
 const email=(process.env.ADMIN_EMAIL||"admin@smmtanzania.co.tz").toLowerCase();await db.admin.upsert({where:{email},update:{},create:{email,passwordHash:await hash(process.env.ADMIN_PASSWORD||"ChangeMe123!",12)}});
 for(const [i,s] of services.entries()){const shared={name:s[1],categoryLabel:"SPECIALIST SERVICE",heroHeading:s[1],heroDescription:s[2],includedFeatures:included[s[0]],...prices[s[0]],primaryButtonText:"Book Consultation",primaryButtonLink:"/booking",finalCtaHeading:"Ready to Discuss Your Project?",finalCtaDescription:"Book a consultation with our team to discuss your goals and find the right solution for your business.",displayOrder:i,status:ContentStatus.PUBLISHED,active:true,seoTitle:`${s[1]} Tanzania | SMM Tanzania`,seoDescription:s[2]};await db.service.upsert({where:{slug:s[0]},update:shared,create:{...shared,slug:s[0],secondaryButtonText:null,secondaryButtonLink:null,trustPoints:["Tanzania-based support","Clear recommendations","Professional delivery"],overviewHeading:"Practical support. Clear next steps.",overviewContent:"We assess your current position, recommend a focused plan and explain progress in straightforward language.",targetAudience:["Businesses","Creators","Artists","Institutions"],processSteps:[],benefits:[],faqs:[],relatedServiceIds:[]}})}
 await db.pageContent.upsert({where:{key:"homepage"},update:{},create:{key:"homepage",title:"Homepage",seoTitle:"SMM Tanzania | Social Media Agency",seoDescription:"Social media management, Meta ads and account support for Tanzanian brands.",status:ContentStatus.PUBLISHED,data:{hero:{label:"SOCIAL MEDIA EXPERTS IN TANZANIA",heading:"We Put Your Brand in Front of More Tanzanians Online",description:"SMM Tanzania helps businesses, creators and artists grow their audience, protect their accounts and turn attention into opportunities.",image:"",primaryText:"Work With Us",primaryLink:"/booking",secondaryText:"Explore Services",secondaryLink:"/services"},services:{label:"WHAT WE DO",heading:"Social Media Services in Tanzania",description:"Everything you need to reach customers, solve account problems and grow online."},blog:{label:"OUR ARTICLES",heading:"Social Media Tips for Tanzania",description:"Practical ideas for better content, advertising and security."},testimonials:{label:"CLIENT STORIES",heading:"What Our Clients Say"},cta:{heading:"Ready to make social media work for your business?",description:"Tell us what you want to achieve."}}}});
 const items=[
  ["homepage","homepage","Homepage","Main public homepage",{hero:{label:"SOCIAL MEDIA EXPERTS IN TANZANIA",heading:"We Put Your Brand in Front of More Tanzanians Online",description:"SMM Tanzania helps businesses, creators and artists grow their audience, protect their accounts and turn attention into opportunities.",image:"",primaryText:"Work With Us",primaryLink:"/booking",secondaryText:"Explore Services",secondaryLink:"/services"},services:{label:"WHAT WE DO",heading:"Social Media Services in Tanzania",description:"Everything you need to reach customers, solve account problems and grow online."},blog:{label:"OUR ARTICLES",heading:"Social Media Tips for Tanzania",description:"Practical ideas for better content, advertising and security."},testimonials:{label:"CLIENT STORIES",heading:"What Our Clients Say"},cta:{heading:"Ready to make social media work for your business?",description:"Tell us what you want to achieve."}}],
  ["setting","contact-footer","Contact, Social & Footer Settings","Global website details",{email:"hello@smmtanzania.co.tz",phone:"+255 700 000 000",location:"Dar es Salaam, Tanzania",whatsapp:"255700000000",instagram:"https://instagram.com",facebook:"https://facebook.com",linkedin:"https://linkedin.com",footerDescription:"A social media and Meta support agency based in Dar es Salaam, Tanzania.",copyright:"SMM Tanzania"}],
  ["page","about","About Us","About page content",{label:"ABOUT SMM TANZANIA",heading:"Serious Social Media Support, Built for Tanzania",description:"Platform knowledge combined with a practical understanding of Tanzanian audiences.",sectionHeading:"Strategy You Can Understand and Use",sectionContent:"We created SMM Tanzania to close the gap between generic advice and the real needs of local brands.",image:"/images/smm-team.webp"}],
  ["page","contact","Contact","Contact page content",{label:"CONTACT US",heading:"Tell Us How We Can Help",description:"Complete the form and our team will respond within one business day."}],
  ["page","booking","Booking","Booking page content",{label:"BOOK A CONSULTATION",heading:"Let’s Find the Right Next Step",description:"Tell us about your goal and choose the service you need."}],
  ["page","services","Services","Services page content",{label:"OUR SERVICES",heading:"Everything Your Brand Needs to Grow Online",description:"Focused social media support for Tanzanian businesses, creators and institutions."}],
  ["page","blog","Blog","Blog page content",{label:"SMM INSIGHTS",heading:"Better Social Media Decisions Start Here",description:"Original guidance for Tanzanian creators, businesses and marketing teams."}],
  ["page","privacy-policy","Privacy Policy","Privacy page content",{label:"LEGAL",heading:"Privacy Policy",description:"Last updated: 21 July 2026",sections:[{"heading":"Information we collect","content":"We collect details submitted through our forms to respond and provide requested services. We do not sell personal information."}]}],
  ["page","terms-and-conditions","Terms and Conditions","Terms page content",{label:"LEGAL",heading:"Terms and Conditions",description:"Last updated: 21 July 2026",sections:[{"heading":"Using our services","content":"Paid work starts after scope, fees and responsibilities are agreed. Third-party platform decisions cannot be guaranteed."}]}],
  ["testimonial","asha-m","Asha M.","Founder, Retail Brand",{quote:"SMM Tanzania helped us turn social media into a reliable source of serious enquiries."}],
  ["testimonial","kelvin-r","Kelvin R.","Operations Manager",{quote:"The reporting was simple and honest. We understood which adverts brought useful leads."}],
  ["team","strategy-lead","Strategy Lead","Social Media Strategy",{bio:"Leads client strategy, planning and performance reviews."}],
  ["statistic","brands-supported","Brands Supported","50+",{value:"50+",label:"Brands supported"}],
  ["post","social-media-plan-tanzanian-business","A Practical Social Media Plan for Tanzanian Businesses","A clear framework for choosing platforms and measuring real enquiries.",{category:"Strategy",content:"Strong results begin with a clear commercial goal, a specific audience and consistent useful content."}]
 ];
 for(const [i,x] of items.entries())await db.contentItem.upsert({where:{type_slug:{type:x[0] as string,slug:x[1] as string}},update:{},create:{type:x[0] as string,slug:x[1] as string,title:x[2] as string,summary:x[3] as string,data:x[4] as object,status:ContentStatus.PUBLISHED,displayOrder:i}});
 const settings={contact:{email:"hello@smmtanzania.co.tz",phone:"+255 700 000 000",location:"Dar es Salaam, Tanzania"},social:{instagram:"https://instagram.com",facebook:"https://facebook.com",linkedin:"https://linkedin.com",whatsapp:"255700000000"},footer:{description:"A social media and Meta support agency based in Dar es Salaam, Tanzania.",copyright:"SMM Tanzania"}};for(const [key,value] of Object.entries(settings))await db.siteSetting.upsert({where:{key},update:{},create:{key,value}})
}
main().finally(()=>db.$disconnect());
