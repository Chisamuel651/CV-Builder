import React, { FC } from 'react'
import SkeletonLoader from '@/components/skeleton-loader';
import { INITIAL_THEME_COLOR } from '@/lib/helper';
import { ResumeDataType } from '@/types/resume.type';

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}

const SkillPreview: FC<PropsType> = ({
  resumeInfo,
  isLoading
}) => {
    const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;
  if (isLoading) {
    return <SkeletonLoader />
  }
  return (
    <div className='w-full my-5'>
      <h5 className='text-center font-bold mb-2'
        style={{
          color: themeColor
        }}
      >
        Skills
      </h5>

      <hr className="my-2 border-[1.5px]"
        style={{
          borderColor: themeColor
        }}
      />

      <div className="grid grid-cols-2 pt-3 my-1 min-h-9 gap-3">
        {resumeInfo?.skills?.map((skill, index) => (
            <div className='flex items-center justify-between' key={index}>
                <h5 className="text-[13px]">
                    {skill?.name}
                </h5>
                {skill?.rating && skill?.name ? (
                    <div className="h2 bg-gray-200 w-[120px]">
                        <div className='h-2' style={{ backgroundColor: themeColor, width: skill?.rating * 20 + '%' }} />
                    </div>
                ): null}
            </div>
        ))}
      </div>
    </div>
  )
}

export default SkillPreview
