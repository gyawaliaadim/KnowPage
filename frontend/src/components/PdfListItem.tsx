import React from "react";

type PdfListItemProps = {
  pdfName: string;
};

const PdfListItem = ({ pdfName }: PdfListItemProps) => {
  return <div
  className="flex items-center p-2e justify-start w-50 h-10 bg-gray-900 rounded-xl cursor-pointer hover:bg-black  transition-colors delay-75 ease-in"
  >{pdfName}</div>;
};

export default PdfListItem;