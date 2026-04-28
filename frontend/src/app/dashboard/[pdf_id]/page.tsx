import MiddlePanel from '@/components/MiddlePanel';
import RightPanel from '@/components/RightPanel';
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
    <div className='flex w-full'>
      <div
      className='w-full'
      >

    <MiddlePanel
      
    pdf_id={pdf_id}
    />
    </div>
     <div
        className="w-[60%]"
      >
        <RightPanel
        pdf_id={pdf_id}
        />

      </div>
    </div>
  );
}
