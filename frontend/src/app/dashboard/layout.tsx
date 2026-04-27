import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};
import LeftPanel from "@/components/LeftPanel";
import MiddlePanel from "@/components/MiddlePanel";
import RightPanel from "@/components/RightPanel";


async function getPDFs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/pdfs`,
    { cache: "no-store" } // always fresh
  );

  if (!res.ok) {
    throw new Error("Failed to fetch PDFs");
  }

  return res.json();
}




export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // temp dummy data (replace with real data later)
  const pdfs = await getPDFs();

  return (
    <div className="flex">
      {/* LEFT PANEL */}
      <div className="w-[30%]">
        <LeftPanel pdfs={pdfs}  />
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
      <div
        className="w-[60%]"
      >
        <RightPanel/>

      </div>

    </div>
  );
}