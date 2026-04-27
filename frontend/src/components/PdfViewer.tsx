"use client";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
// import { pdfjs } from "react-pdf";

type PDFViewerProps = {
  pdf_id: string;
};

export default function PdfViewer({pdf_id}:PDFViewerProps) {
  return (
    <>
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <Viewer fileUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/pdfs/${pdf_id}/download`} />
    </Worker>
    </>
  );
}