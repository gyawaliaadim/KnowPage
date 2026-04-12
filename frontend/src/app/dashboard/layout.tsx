import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
        <Sidebar className="w-[20%]"/>
    </div>
  );
}
