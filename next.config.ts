import type {NextConfig} from "next";

const nextConfig:NextConfig={
  compress:true,
  poweredByHeader:false,
  productionBrowserSourceMaps:false,
  images:{
    formats:["image/avif","image/webp"],
    qualities:[70],
    deviceSizes:[360,640,768,1024,1280],
    imageSizes:[64,96,128,256,384],
    remotePatterns:[
      {protocol:"https",hostname:"**"},
      {protocol:"http",hostname:"**"},
    ],
  },
  turbopack:{root:process.cwd()},
  async headers(){
    return [{
      source:"/uploads/:path*",
      headers:[{key:"Cache-Control",value:"public, max-age=31536000, immutable"}],
    }];
  },
};

export default nextConfig;
