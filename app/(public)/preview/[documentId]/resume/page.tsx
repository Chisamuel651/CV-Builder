'use client'
import React from 'react'
import Image from 'next/image';
import { useParams } from 'next/navigation'
import useGetDocumentById from '@/features/document/use-get-document-by-id';
import { ResumeDataType } from '@/types/resume.type';
import Error from './../../../_components/Error';
import PreviewResume from './../../../_components/PreviewResume';


const PublicResume = () => {
    const param = useParams();
    const documentId = param.documentId as string;
    const { data, isSuccess, isLoading } = useGetDocumentById(documentId, true)
    const resumeInfo = data?.data ?? ({} as ResumeDataType);

    if(!isSuccess && !isLoading){
        return <Error />
    }
  return (
    <div className='w-full min-h-screen h-auto bg-black'>
      <nav className='w-full px-8 border-b sticky top-0  border-gray-700 bg-black/50 h-12 py-2'>
        <div className='flex items-center gap-1'>
          <Image
            src='/images/pdf_icon.png'
            alt='pdf alt logo'
            width={20}
            height={20}
          />
          <h5 className='px-1 text-[20px] text-gray-300 font-semibold'>
            {resumeInfo?.title || 'Untitiled Resume'}.pdf
          </h5>
        </div>
      </nav>

      <div className="w-full flex-1 flex items-center justify-center">
        <div className="max-w-[90%] mx-auto lg:max-w-[50%] w-full bg-white">
          <PreviewResume {
            ...{
              resumeInfo,
              isLoading,
            }
          } />
        </div>
      </div>
    </div>
  )
}

export default PublicResume
