"use client";

import React from "react";
import { Button } from "./ui/button";
import { useNavigation } from "@/store/NavigationContext";
import { X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { deletePDFFromAPI } from "@/lib/api";

type PdfListItemProps = {
  pdfName: string;
  pdf_id: string;
};

const PdfListItem = ({ pdfName, pdf_id }: PdfListItemProps) => {
  const { navigate } = useNavigation();
  const queryClient = useQueryClient();

  const handleDelete = async (e: React.MouseEvent) => {

    e.stopPropagation(); // prevent navigation click
  let decision = confirm("Delete this PDF?")
  if (!decision) return;
    await deletePDFFromAPI(pdf_id);

    // refresh sidebar list
    queryClient.invalidateQueries({ queryKey: ["pdfs"] });
  };

  return (
    <div className="flex items-center w-full gap-1">
  {/* MAIN BUTTON */}
  <Button
    variant="outline"
    className="flex-1 cursor-pointer justify-start hover:bg-blue-600 hover:text-white transition"
    onClick={() => navigate(`/dashboard/${pdf_id}`)}
  >
    <span className="truncate">{pdfName}</span>
  </Button>

  {/* SEPARATOR (optional visual divider) */}
  <span className="text-gray-500">|</span>

  {/* DELETE BUTTON */}
  <Button
    variant="outline"
    className="px-2 cursor-pointer hover:bg-red-600 hover:text-white transition"
    onClick={(e) => handleDelete(e)}
  >
    ✕
  </Button>
</div>
  );
};

export default PdfListItem;