import EducationPreview from '@/components/preview/EducationPreview';
import ExperiencePreview from '@/components/preview/ExperiencePreview';
import PersonalInfo from '@/components/preview/PersonalInfo';
import SkillPreview from '@/components/preview/SkillPreview';
import SummaryPreview from '@/components/preview/SummaryPreview';
import { INITIAL_THEME_COLOR } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { ResumeDataType } from '@/types/resume.type'
import React from 'react'

const PreviewResume = (props: {
  isLoading: boolean,
  resumeInfo: ResumeDataType
}) => {
  const { isLoading, resumeInfo } = props;
  const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR
  return (
    <div className={cn(
      `shadow-lg bg-white w-full flex-[1.02] h-full p-10 !capitalize`
    )}
    style={{
      borderTop: `13px solid ${resumeInfo?.themeColor}`
    }}
    >
      {/* Personal Info */}
      <PersonalInfo isLoading={isLoading} resumeInfo={resumeInfo} />
      {/* summary */}
      <SummaryPreview isLoading={isLoading} resumeInfo={resumeInfo} />
      {/* professional experience */}
      <ExperiencePreview isLoading={isLoading} resumeInfo={resumeInfo} />
      {/* education */}
      <EducationPreview isLoading={isLoading} resumeInfo={resumeInfo} />
      {/* skills */}
      <SkillPreview isLoading={isLoading} resumeInfo={resumeInfo} />
    </div>
  )
}

export default PreviewResume
