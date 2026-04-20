"use client"

import dynamic from "next/dynamic"
import React from 'react'

const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false,
});


const PdfViewerWrapper = () => {
  return (<>
    <PdfViewer/>
  </>
  )
}

export default PdfViewerWrapper