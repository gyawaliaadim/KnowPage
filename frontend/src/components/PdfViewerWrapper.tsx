"use client"

import dynamic from "next/dynamic"
import React from 'react'

const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false,
});


type PdfViewerWrapperProp = {
  pdf_id: string;
};

const PdfViewerWrapper = ({pdf_id}:PdfViewerWrapperProp) => {
  return (<>
    <PdfViewer
    pdf_id={pdf_id}
    />
  </>
  )
}

export default PdfViewerWrapper