'use client'
import { Button } from '@/components/ui/button';
import { useResumeContext } from '@/context/resume-info-provider'
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useState } from 'react'
import PersonalInfoForm from './forms/PersonalInfoForm';
import SummaryForm from './forms/SummaryForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';

const ResumeForm = () => {
  const { resumeInfo } = useResumeContext();
  const [activeFormIndex, setActiveFormIndex] = useState(1)

  const handleNext = () => {
    const newIndex = activeFormIndex + 1;
    setActiveFormIndex(newIndex);
  }
  return (
    <div className='flex-1 w-full lg:sticky lg:top-16 capitalize'>
      <div className="shadow-md rounded-md bg-white border-t-primary !border-t-4 dark:bg-card *:dark:border dark:border-gray-800">
        <div className=" px-3 justify-end flex items-center gap-1 border-b py-[7px] min-h-10">
          {activeFormIndex > 1 && (
            <Button variant='outline' size='default' className='!px-2 !py-1 !h-auto' onClick={() => setActiveFormIndex(activeFormIndex - 1)}><ArrowLeft size='16px' /> Previous</Button>
          )}

          <Button variant='outline' size='default' className='!px-2 !py-1 !h-auto' onClick={handleNext} disabled={activeFormIndex === 5 || resumeInfo?.status === 'archived' ? true : false}><ArrowRight size='16px' /> Next</Button>
        </div>

        <div className="px-5 pb-5 py-3">
          {/* personal info form */}
          {activeFormIndex === 1 && (
            <PersonalInfoForm handleNext={handleNext} />
          )}
          {/* summary form */}
          {activeFormIndex === 2 && (
            <SummaryForm handleNext={handleNext} />
          )}
          {/* experience form */}
          {activeFormIndex === 3 && (
            <ExperienceForm handleNext={handleNext} />
          )}

          {/* education form */}
          {activeFormIndex === 4 && (
            <EducationForm handleNext={handleNext} />
          )}

          {/* skills form */}
          {activeFormIndex === 5 && (<SkillsForm />)}
        </div>
      </div>
    </div>
  )
}

export default ResumeForm
