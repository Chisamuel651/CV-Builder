import { INITIAL_THEME_COLOR } from '@/lib/helper';
import { ResumeDataType } from '@/types/resume.type';
import React, { FC } from 'react'

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}

const ExperiencePreview: FC<PropsType> = ({
  resumeInfo,
  isLoading
}) => {
    const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;
    if(isLoading) {
        return <></>
    }
  return (
    <div className='w-full my-5'>
      <h5 className='text-center font-bold mb-2'
       style={{
        color: themeColor
       }}
      >
        Professional Experience
      </h5>

      <hr className="my-2 border-[1.5px]"
        style={{
            borderColor: themeColor
        }}
      />

      <div className="flex flex-col gap-2 min-h-9">
        {resumeInfo?.experiences?.map((experience, index) => (
            <div key={index}>
                <h5 className="text-[15px] font-bold"
                    style={{
                        color: themeColor
                    }}
                >
                    {experience?.title}
                </h5>

                <div className="flex items-start justify-between mb-2">
                    <h5 className="text-[13px]">
                        {experience?.companyName}
                        {experience?.companyName && experience?.city && ", "}
                        {experience?.city}
                        {experience?.city && experience?.state && ", "}
                        {experience?.state}
                    </h5>

                    <span className="text-[13px]">
                        {experience?.startDate}
                        {experience?.startDate && " - "}
                        {experience?.currentlyWorking ? "Present": experience?.endDate}
                    </span>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default ExperiencePreview
