'use client'
import { useResumeContext } from '@/context/resume-info-provider';
import { cn } from '@/lib/utils'
import React from 'react'
import PersonalInfo from './preview/PersonalInfo';
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationPreview from './preview/EducationPreview';
import SkillPreview from './preview/SkillPreview';

const ResumePreview = () => {
  const { resumeInfo } = useResumeContext();

  const isLoading = false;

  return (
    <div id='resume-preview-id' className={cn(
      `shadow-lg bg-white w-full flex-[1.02] h-full p-10 dark:border dark:bg-card dark:border-b-gray-800 dark:border-x-gray-800`
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
