import React from 'react'
import PdfListItem from "@/components/PdfListItem"
import PdfViewerWrapper from './PdfViewerWrapper'
const MiddlePanel = () => {
  return (
    <div className='h-screen overflow-y-auto'>
    <PdfViewerWrapper/>
    </div>
  )
}

export default MiddlePanel