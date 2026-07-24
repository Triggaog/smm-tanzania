import {cache} from "react";
import {db} from "@/lib/prisma";

export const getPublishedPost=cache((slug:string)=>db.contentItem.findFirst({
  where:{type:"post",slug,status:"PUBLISHED"},
  select:{title:true,summary:true,data:true,seoTitle:true,seoDescription:true},
}));

export const getPublishedService=cache((slug:string)=>db.service.findFirst({
  where:{slug,status:"PUBLISHED",active:true},
  select:{
    slug:true,
    categoryLabel:true,
    heroHeading:true,
    heroDescription:true,
    includedFeatures:true,
    priceAmount:true,
    priceMode:true,
    priceCurrency:true,
    priceVisible:true,
    priceNote:true,
    externalCostsIncluded:true,
    finalCtaHeading:true,
    finalCtaDescription:true,
    primaryButtonText:true,
    seoTitle:true,
    seoDescription:true,
  },
}));
