import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};
import LeftPanel from "@/components/LeftPanel";
import MiddlePanel from "@/components/MiddlePanel";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // temp dummy data (replace with real data later)
  const pdfs = [
    { id: "1", name: "Physics Notes.pdf" },
    { id: "2", name: "Math Formula.pdf" },
  ];

  const user = {
    name: "Aadim",
    imageUrl: "https://i.pravatar.cc/100",
  };

  return (
    <div className="flex">
      {/* LEFT PANEL */}
      <div className="w-[15%]">
      <LeftPanel pdfs={pdfs} user={user} />
      </div>

      {/* MIDDLE PANEL */}
      <div
      className="w-[50%]"
      >
      <MiddlePanel
      />

      {/* RIGHT PANEL */}
      <div
      className="w-[35%]"
      >


      </div>
      </div>
    </div>
  );
}