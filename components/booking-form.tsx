"use client";
import {useState} from "react";

type ServiceOption={slug:string;name:string;priceAmount:string|null;priceMode:string;priceCurrency:string;priceVisible:boolean};
const displayPrice=(s:ServiceOption|undefined)=>!s||!s.priceVisible||!s.priceAmount?"Price discussed during consultation":`${s.priceMode==="STARTING_FROM"?"Starting from ":""}${s.priceCurrency} ${new Intl.NumberFormat("en-US").format(Number(s.priceAmount))}`;

export function BookingForm({services,initialService}:{services:ServiceOption[];initialService:string}){
  const first=services.find(s=>s.slug===initialService)||services[0];
  const[selected,setSelected]=useState(first?.slug||"");
  const current=services.find(s=>s.slug===selected);
  return <form action="/api/submit" method="post"><input type="hidden" name="type" value="booking"/><label>Full name<input name="name" required/></label><label>Email<input name="email" type="email" required/></label><label>Phone<input name="phone" required/></label><label>Service<select name="service" required value={selected} onChange={e=>setSelected(e.target.value)}>{services.map(s=><option key={s.slug} value={s.slug}>{s.name}</option>)}</select></label><label>Service price<input name="displayedPrice" readOnly value={displayPrice(current)}/></label><label>Preferred date<input name="date" type="date" required/></label><label>Message<textarea name="message" required/></label><button className="button">Book Consultation</button></form>;
}
