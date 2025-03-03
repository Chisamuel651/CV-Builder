'use client'
import { useResumeContext } from '@/context/resume-info-provider';
import { cn } from '@/lib/utils'
import React from 'react'
import PersonalInfo from '../../../components/preview/PersonalInfo';
import SummaryPreview from '../../../components/preview/SummaryPreview';
import ExperiencePreview from '../../../components/preview/ExperiencePreview';
import EducationPreview from '../../../components/preview/EducationPreview';
import SkillPreview from '../../../components/preview/SkillPreview';

const ResumePreview = () => {
  const { resumeInfo, isLoading } = useResumeContext();

  return (
    <div id='resume-preview-id' className={cn(
      `shadow-lg bg-white w-full flex-[1.02] h-full p-10 dark:border dark:bg-card dark:border-b-gray-800 dark:border-x-gray-800 !capitalize`
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

export default ResumePreview
