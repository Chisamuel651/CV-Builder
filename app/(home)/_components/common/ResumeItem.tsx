import { format } from 'date-fns'
import { FileText } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC, useCallback, useMemo } from 'react';


interface PropType {
    documentId: string,
    title: string,
    status: "archived" | "private" | "public",
    themeColor: string,
    thumbnail: string | null
    updatedAt: string;
}

const ResumeItem: FC<PropType> = ({
    documentId,
    status,
    title,
    themeColor,
    thumbnail,
    updatedAt
}) => {
    const router = useRouter();

    const docDate = useMemo(() => {
        if(!updatedAt) return null
        const formattedDate = format(updatedAt, "MM dd,yyyy");
        return formattedDate
    }, [updatedAt]);

    const gotoDoc = useCallback(() => {
        router.push(`/dashboard/document/${documentId}/edit`)
     }, [router, documentId])
  return (
    <div className='cursor-pointer max-w-[164px] w-full border rounded-lg transition-all h-[197px] hover:border-primary hover:shadow-md shadow-primary' 
        role='button'
        style={{ border: themeColor || "" }}
    >
      <div className='flex flex-col w-full h-full items-center rounded-lg justify-center bg-[#fdfdfd] dark:bg-secondary'>
        <div className="w-full flex flex-1 px-1 pt-2">
            <div className='w-full flex flex-1 bg-white dark:bg-gray-700 rounded-t-lg justify-center items-center'>
                {thumbnail ? (
                    <div className='relative w-full h-full rounded-t-lg overflow-hidden-'>
                        <Image
                            fill
                            src={thumbnail}
                            alt={title}
                            className='w-full h-full object-cover object-top rounded-t-lg'
                        />
                    </div>
                ): (
                    <FileText size='30px' />
                )}
            </div>
        </div>
        {/* body content */}
        
      </div>
    </div>
  )
}

export default ResumeItem
