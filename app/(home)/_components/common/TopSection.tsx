'use client'
import useUpdateDocument from '@/features/document/user-update-document';
import { useResumeContext } from '@/context/resume-info-provider'
import { AlertCircle } from 'lucide-react';
import React, { useCallback } from 'react'
import ResumeTitle from './ResumeTitle';
import { toast } from '@/hooks/use-toast';
import ThemeColor from './ThemeColor';
import PreviewMode from '../PreviewMode';

const TopSection = () => {
    const { resumeInfo,  onUpdate, isLoading } = useResumeContext();
    const {mutateAsync, isPending} = useUpdateDocument();

    const handleTitle = useCallback((title: string) => {
        if(title === 'Untitiled Resume' && !title) return;

        if(resumeInfo){
            onUpdate({
                ...resumeInfo,
                title: title,
            })
        }

        mutateAsync(
            { title: title },
            {
                onSuccess: () => {
                    toast({
                        title: 'Success',
                        description: "Title updated successfully"
                    })
                },
                onError() {
                    toast({
                        title: 'Error',
                        description: 'Failed to update the title',
                        variant: 'destructive'
                    })
                }
            }
        )
    }, [resumeInfo, onUpdate])
  return (
    <>
        {resumeInfo?.status === "archived" && (
            <div className='absolute z-[9] inset-0 h-6 top-0 bg-rose-500 text-center flex text-base p-2 text-white items-center gap-x-2 justify-center font-medium'>
                <AlertCircle size='16px' />
                this resume is in the trash bin
            </div>
        )}
        <div className='w-full flex items-center justify-between border-b pb-3'>
            <div className="flex items-center gap-2">
                <ResumeTitle
                    isLoading={isLoading || isPending}
                    initialTitle={resumeInfo?.title || ""}
                    status={resumeInfo?.status}
                    onSave={(value) => handleTitle(value)}
                />
            </div>

            <div className="flex items-center gap-2">
                {/* Theme Color */}
                <ThemeColor />
                {/* preview mode */}
                <PreviewMode />
                {/* download resume */}

                {/* share resume */}

                {/* more option */}
            </div>
        </div>
    </>
  );
};

export default TopSection
