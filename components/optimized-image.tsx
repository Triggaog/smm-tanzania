const widths=[384,640,768,1024];
const optimized=(src:string,width:number)=>`/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=70`;

export function OptimizedImage({src,alt,width,height,sizes,className,priority=false}:{src:string;alt:string;width:number;height:number;sizes:string;className?:string;priority?:boolean}){
  return <img
    src={optimized(src,1024)}
    srcSet={widths.map(value=>`${optimized(src,value)} ${value}w`).join(",")}
    sizes={sizes}
    alt={alt}
    width={width}
    height={height}
    className={className}
    loading={priority?undefined:"lazy"}
    fetchPriority={priority?"high":undefined}
    decoding="async"
  />;
}
