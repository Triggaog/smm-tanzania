import Link from "next/link";
import {db} from "@/lib/prisma";
import "../actions.css";
export const dynamic="force-dynamic";
export default async function Page(){
 const services=await db.service.count();
 const posts=await db.contentItem.count({where:{type:"post"}});
 const testimonials=await db.contentItem.count({where:{type:"testimonial"}});
 const team=await db.contentItem.count({where:{type:"team"}});
 const cards=[["Services",services,"/admin/services"],["Posts",posts,"/admin/content/post"],["Testimonials",testimonials,"/admin/content/testimonial"],["Team members",team,"/admin/content/team"]] as const;
 return <><div className="cms-heading"><div><h1>Dashboard</h1><p>Create, publish and manage every section of the public website.</p></div><Link className="button" href="/" target="_blank">View Website ↗</Link></div><div className="cms-grid">{cards.map(x=><section key={x[0]}><small>{x[0]}</small><h2>{x[1]}</h2><Link href={x[2]}>Manage {x[0]} →</Link></section>)}</div><h2 style={{marginTop:30}}>Quick actions</h2><div className="cms-grid">{[["Add Service","/admin/services"],["Add Post","/admin/content/post"],["Add Testimonial","/admin/content/testimonial"],["Add Team Member","/admin/content/team"],["Add Statistic","/admin/content/statistic"],["Edit Homepage","/admin/content/homepage"],["Edit Pages","/admin/content/page"],["Contact & Footer Settings","/admin/content/setting"]].map(x=><Link className="admin-action" href={x[1]} key={x[0]}>{x[0]} →</Link>)}</div></>
}
