import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Know Page',
};


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col  min-h-screen w-full ">
      <Topbar  />

      <div className="flex flex-col justify-center items-center h-full w-full">
       {children}
      <Footer/>
      </div>
      
    </div>

  );
}
