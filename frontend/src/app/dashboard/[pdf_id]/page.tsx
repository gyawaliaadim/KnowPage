import MiddlePanel from '@/components/MiddlePanel';
import React from 'react'

type Props = {
  params: {
    pdf_id: string;
  };
};

export default async function Page({ params }: Props) {
  const { pdf_id } = await params;
    // console.log(params)
  return (
    <MiddlePanel
    pdf_id={pdf_id}
    />
  );
}
