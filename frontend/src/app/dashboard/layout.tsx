import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};
import LeftPanel from "@/components/LeftPanel";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // temp dummy data (replace with real data later)


  return (
    <div className="flex">
      {/* LEFT PANEL */}
      <div className="w-[20%]">
        <LeftPanel  />
      </div>

      {/* MIDDLE PANEL */}
      <div
        className="w-full"
      >
        {/* <MiddlePanel
      /> */}
        {/* <MiddlePanel /> */}
        {children}
      </div>
      {/* RIGHT PANEL */}
     

    </div>
  );
}