import React from "react";
import PdfListItem from "./PdfListItem";
import { Button } from "./ui/button";
import { CircleFadingArrowUpIcon } from "lucide-react"
type Pdf = {
  id: string;
  document_id: string;
  filename: string;
};

type LeftPanelProps = {
  pdfs: Pdf[];
};


const updatePdfs = (pdfs: Pdf[]): Pdf[] => {
  return pdfs.map((pdf) => ({
    ...pdf,
    filename:
      pdf.filename.length > 20
        ? pdf.filename.slice(0, 17) + "..."
        : pdf.filename,
  }));
};
const LeftPanel = ({ pdfs }: LeftPanelProps) => {
  const updatedPdfs= updatePdfs(pdfs);
  return (
    <aside className="h-screen w-full bg-gray-900 gap-3 text-white flex flex-col justify-between py-4 px-2">
      <div
      className="flex justify-start flex-col"
      >
      {/* TOP */}
        <h1 className="text-xl font-bold mb-6">Know Page</h1>

        <>
          <h2 className="text-sm text-gray-400 mb-2">PDFs</h2>
      < div className="h-fit overflow-y-auto">

        {/* PDFs Section */}

          <div className="space-y-2">
      <div className="">
   

<Button

  variant="outline"
  className="w-full flex items-center justify-center gap-2
             hover:bg-blue-600 cursor-pointer hover:text-white hover:border-blue-600
             transition"
>
  <CircleFadingArrowUpIcon className="h-4 w-4" />
  Upload PDF
</Button>
  </div>

            {pdfs.map((pdf) => (
              <PdfListItem
              key={pdf.id}
              pdfName={pdf.filename}
              />
            ))}
          </div>
        
      </div>

            </>
      </div>
      {/* BOTTOM USER CARD */}
    

    </aside>
  );
};

export default LeftPanel;