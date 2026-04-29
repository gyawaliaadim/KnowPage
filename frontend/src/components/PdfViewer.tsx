"use client";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEffect, useState } from "react";
import { useNavigation } from "@/store/NavigationContext";
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PDFViewerProps = {
  pdf_id: string;
};

export default function PdfViewer({ pdf_id }: PDFViewerProps) {
  const { targetPage } = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [inputPage, setInputPage] = useState("1");
  const [zoomLevel, setZoomLevel] = useState(100);

  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToPage } = pageNavigationPluginInstance;

  const zoomPluginInstance = zoomPlugin();
  const { zoomTo } = zoomPluginInstance;

  useEffect(() => {
    if (targetPage) jumpToPage(targetPage - 1);
  }, [targetPage]);

  const handlePageInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = parseInt(inputPage);
      if (page >= 1 && page <= totalPages) {
        jumpToPage(page - 1);
      }
    }
  };

  const handleZoom = (delta: number) => {
    const next = Math.min(Math.max(zoomLevel + delta, 50), 300);
    setZoomLevel(next);
    zoomTo(next / 100);
  };

  const resetZoom = () => {
    setZoomLevel(100);
    zoomTo(1);
  };

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/40 gap-2 flex-wrap">
        {/* Page Navigation */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => {
              const prev = Math.max(currentPage - 1, 1);
              jumpToPage(prev - 1);
            }}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-1.5 text-sm">
            <Input
              className="h-7 w-12 text-center text-xs px-1"
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              onKeyDown={handlePageInput}
            />
            <span className="text-muted-foreground whitespace-nowrap">
              / {totalPages}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => {
              const next = Math.min(currentPage + 1, totalPages);
              jumpToPage(next - 1);
            }}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => handleZoom(-10)}
            disabled={zoomLevel <= 50}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>

          <button
            onClick={resetZoom}
            className="text-xs font-mono w-12 text-center text-muted-foreground hover:text-foreground transition-colors"
          >
            {zoomLevel}%
          </button>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => handleZoom(10)}
            disabled={zoomLevel >= 300}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={resetZoom}
            title="Reset zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Viewer */}
      <div className="flex-1 overflow-auto">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/pdfs/${pdf_id}/download`}
            plugins={[pageNavigationPluginInstance, zoomPluginInstance]}
            onPageChange={(e) => {
              setCurrentPage(e.currentPage + 1);
              setInputPage(String(e.currentPage + 1));
            }}
            onDocumentLoad={(e) => setTotalPages(e.doc.numPages)}
          />
        </Worker>
      </div>
    </div>
  );
}