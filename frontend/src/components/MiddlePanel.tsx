import React from 'react'
import PdfListItem from "@/components/PdfListItem"
import PdfViewerWrapper from './PdfViewerWrapper'

type MiddlePanelProp = {
  pdf_id: string;
};

const MiddlePanel = ({pdf_id}:MiddlePanelProp) => {
  return (
    <div className='h-screen overflow-y-auto'>
    <PdfViewerWrapper
    pdf_id={pdf_id}
    />
    </div>
  )
}

export default MiddlePanel