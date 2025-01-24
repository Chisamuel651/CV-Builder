import React from 'react'
import { useParams } from 'next/navigation'
import useGetDocumentById from '@/features/document/use-get-document-by-id';
import { ResumeDataType } from '@/types/resume.type';
import Error from './../../../_components/Error';


const PublicResume = () => {
    const param = useParams();
    const documentId = param.documentId as string;
    const { data, isSuccess, isLoading } = useGetDocumentById(documentId, true)
    const resumeInfo = data?.data ?? ({} as ResumeDataType);

    if(!isSuccess && !isLoading){
        return <Error />
    }
  return (
    <div>
      
    </div>
  )
}

export default PublicResume
