"use client";

import React from "react";
import { Button } from "./ui/button";
import { useNavigation } from "@/store/NavigationContext";
type PdfListItemProps = {
  pdfName: string;
  pdf_id: string;
};

const PdfListItem = ({ pdfName,pdf_id }: PdfListItemProps) => {
  const { navigate } = useNavigation(); 

  const handleClick = () => {
    // Navigate to the pdf page using the pdf_id
   
  };

  return <Button
  
  variant="outline"
  className="w-full flex justify-start items-center  gap-2
             hover:bg-blue-600 cursor-pointer hover:text-white hover:border-blue-600
             transition"

             onClick={()=> navigate(`/dashboard/${pdf_id}`)}
>
  {pdfName}
</Button>
  
};

export default PdfListItem;