import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};
import LeftPanel from "@/components/LeftPanel";
import MiddlePanel from "@/components/MiddlePanel";
import dynamic from "next/dynamic"
import RightPanel from "@/components/RightPanel";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // temp dummy data (replace with real data later)
  const pdfs = [
    { id: "1", name: "Data Science.pdf" },
    { id: "2", name: "PDF2.pdf" },

  ];

  const user = {
    name: "Aadim",
    imageUrl: "https://i.pravatar.cc/100",
  };

  return (
    <div className="flex">
      {/* LEFT PANEL */}
      <div className="w-[40%]">
        <LeftPanel pdfs={pdfs} user={user} />
      </div>

      {/* MIDDLE PANEL */}
      <div
        className="w-full"
      >
        {/* <MiddlePanel
      /> */}
        <MiddlePanel />
      </div>
      {/* RIGHT PANEL */}
      <div
        className="w-[60%]"
      >
        <RightPanel/>

      </div>

    </div>
  );
}