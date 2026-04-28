"use client";

import React from "react";
import PdfListItem from "./PdfListItem";
import { Button } from "./ui/button";
import { CircleFadingArrowUpIcon } from "lucide-react"
import { useNavigation } from "@/store/NavigationContext";
import { useQuery } from "@tanstack/react-query";
import { fetchPDFsFromAPI } from "@/lib/api";
import Image from "next/image";
type Pdf = {
  id: string;
  pdf_id: string;
  filename: string;
};



const updatePDFs = (pdfs: Pdf[]): Pdf[] => {

  return pdfs.map((pdf) => ({ 
    ...pdf,
    filename:
      pdf.filename.length > 20
        ? pdf.filename.slice(0, 17) + "..."
        : pdf.filename,
  }));
};
const LeftPanel = () => {
  const { data: pdfs } = useQuery({
  queryKey: ["pdfs"],
  queryFn: fetchPDFsFromAPI,
});

  const { navigate } = useNavigation();
  const updatedPDFs= updatePDFs(pdfs?? []);

  return (
    <aside className="h-screen w-full bg-gray-900 gap-3 text-white flex flex-col justify-between py-4 px-2">
      <div
      className="flex justify-start flex-col"
      >
      {/* TOP */}
        <div className="flex gap-2 justify-start items-center cursor-pointer text-xl font-bold mb-6"
        onClick={()=>navigate("/")}
        >
          
          <span>
            <Image
            src="/logo.png"
            width={50}
            height={50}
            alt="KnowPage Logo"
            />
          </span>
          Know Page
          </div>

        <>
          <div className="text-sm text-gray-400 mb-2">PDFs</div>
      < div className="h-fit overflow-y-auto">

        {/* PDFs Section */}

          <div className="space-y-2">
      <div className="">
   

<Button

  variant="outline"
  className="w-full flex items-center justify-center gap-2
             hover:bg-blue-600 cursor-pointer hover:text-white hover:border-blue-600
             transition"

             onClick={()=>navigate("/dashboard/")}
>
  <CircleFadingArrowUpIcon className="h-4 w-4" />
  Upload PDF
</Button>
  </div>
<div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-140px)] pr-2">

            {updatedPDFs.map((pdf,index) => (
              <PdfListItem
              key={index}
              pdfName={pdf.filename}
              pdf_id={pdf.pdf_id}
              />
            ))}
            </div>
          </div>
        
      </div>

            </>
      </div>
      {/* BOTTOM USER CARD */}
    

    </aside>
  );
};

export default LeftPanel;