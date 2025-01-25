'use client'
import SkeletonLoader from '@/components/skeleton-loader';
import { Skeleton } from '@/components/ui/skeleton';
import { INITIAL_THEME_COLOR } from '@/lib/helper';
import { ResumeDataType } from '@/types/resume.type';
import React, { FC } from 'react'

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}

const SummaryPreview: FC<PropsType> = ({
  resumeInfo,
  isLoading
}) => {
  const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;
  if (isLoading) {
    return <SkeletonLoader />
  }
  return (
    <div className='w-full min-h-10'>
      {isLoading ? (
        <Skeleton className='h-6 w-full' />
      ) : (
        <p className="text-[13px] !leading-4">
          {resumeInfo?.summary || "Enter a brief description of your professional background..."}
        </p>
      )}
    </div>
  )
}

export default SummaryPreview
