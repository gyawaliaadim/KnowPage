import React from "react";
import PdfListItem from "./PdfListItem";

type Pdf = {
  id: string;
  name: string;
};

type LeftPanelProps = {
  pdfs: Pdf[];
  user: {
    name: string;
    imageUrl: string;
  };
};

const LeftPanel = ({ pdfs, user }: LeftPanelProps) => {
  return (
    <aside className="h-screen w-full bg-gray-900 text-white flex flex-col justify-between p-4">
      
      {/* TOP */}
      <div>
        <h1 className="text-xl font-bold mb-6">Know Page</h1>

        {/* PDFs Section */}
        <div>
          <h2 className="text-sm text-gray-400 mb-2">PDFs</h2>

          <div className="space-y-2">
            {pdfs.map((pdf) => (
             <PdfListItem
             key={pdf.id}
             pdfName={pdf.name}
             />
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM USER CARD */}
      <div className="bg-gray-800 p-3 rounded-xl flex items-center gap-3">
        
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={user.imageUrl}
            alt="user"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <div className="text-sm font-medium">
          {user.name}
        </div>
      </div>

    </aside>
  );
};

export default LeftPanel;