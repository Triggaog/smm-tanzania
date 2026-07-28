import type {Metadata} from "next";
import "./globals.css";
import "./performance.css";

export const metadata:Metadata={
  title:"SMM Tanzania",
  description:"Social media support for Tanzania",
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body>{children}</body></html>;
}
