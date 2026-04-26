import React from "react";
import { Button } from "./ui/button";
type PdfListItemProps = {
  pdfName: string;
};

const PdfListItem = ({ pdfName }: PdfListItemProps) => {
  return <Button

  variant="outline"
  className="w-full flex justify-start items-center  gap-2
             hover:bg-blue-600 cursor-pointer hover:text-white hover:border-blue-600
             transition"
>
  {pdfName}
</Button>
  
};

export default PdfListItem;