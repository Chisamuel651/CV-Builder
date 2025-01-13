import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useResumeContext } from '@/context/resume-info-provider';
import { toast } from '@/hooks/use-toast';
import { AIChatSession } from '@/lib/google-ai-model';
import { ResumeDataType } from '@/types/resume.type';
import { index } from 'drizzle-orm/mysql-core';
import { Sparkles } from 'lucide-react';
import { title } from 'process';
import React, { useCallback, useState } from 'react';

interface GenerateSummaryType {
    fresher: { experience_level: string; summary: string };
    mid: { experience_level: string; summary: string };
    experience: { experience_level: string; summary: string };
}

const prompt = `
    Job Title: {jobTitle}. 
    Based on this job title, generate concise and complete resume summaries in JSON format, incorporating the following experience levels: fresher, mid, and experienced. 
    Each summary should be limited to 3 to 4 lines and tailored to reflect a personal and engaging tone. 
    Highlight specific skills, tools, methodologies, or achievements relevant to the profession, ensuring the summaries showcase unique strengths, aspirations, and contributions. 
    Adapt the tone and content to suit the job title and industry standards while demonstrating a clear understanding of the role and its expectations.
`

const SummaryForm = (props: { handleNext: () => void }) => {
    const { handleNext } = props;
    const { resumeInfo, onUpdate } = useResumeContext();
    const [loading, setLoading] = useState(false);

    const [aiGeneratedSummary, setAiGeneratedSummary] = useState<GenerateSummaryType | null>(null);

    const handleChange = (e:{target: {value: string}}) => { 
        const { value } = e.target;
        const resumeDataInfo = resumeInfo as ResumeDataType;
        const updatedInfo = {
            ...resumeDataInfo,
            summary: value,
        };
        onUpdate(updatedInfo);
    };

    const handleSubmit = () => {}

    const GenerateSummaryFromAI = async () => {
        try {
            const jobTitle = resumeInfo?.personalInfo?.jobTitle;
            if(!jobTitle) return;
            setLoading(true)

            const PROMPT = prompt.replace("{jobTitle}", jobTitle);
            const result = await AIChatSession.sendMessage(PROMPT);
            const responseText = await result.response.text();
            console.log(responseText)
            // setAiGeneratedSummary(JSON?.parse(responseText));
            const parsedResponse = JSON.parse(responseText);

            if (Array.isArray(parsedResponse)) {
                const formattedResponse = parsedResponse.reduce((acc, item) => {
                    acc[item.experience_level] = item;
                    return acc;
                }, {});
                setAiGeneratedSummary(formattedResponse);
            } else {
                setAiGeneratedSummary(parsedResponse);
            }
        } catch (error) {
            toast({
                title: 'Failed to generate summary',
                variant: 'destructive'
            })
        }finally{
            setLoading(false)
        }
    }

    const handleSelect = useCallback((summary: string) => {
        if (!resumeInfo) return;
        const resumeDataInfo = resumeInfo as ResumeDataType;
        const updatedInfo = {
            ...resumeDataInfo,
            summary: summary,
        }
        onUpdate(updatedInfo)
        setAiGeneratedSummary(null)
    }, [onUpdate, resumeInfo])
    return (
        <div className='capitalize'>
            <div className='w-full'>
                <h2 className='font-bold text-lg'>
                    Summary
                </h2>

                <p className="text-sm">
                    add a summary for your resume
                </p>
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-end justify-between">
                        <Label>add summary</Label>
                        <Button
                            variant='outline'
                            className='gap-1'
                            type='button'
                            disabled={loading}
                            onClick={() => GenerateSummaryFromAI()}
                        >
                            <Sparkles size='15px' className='text-orange-500' />
                            Generate With AI
                        </Button>
                    </div>
                    <Textarea
                        className='mt-5 min-h-36'
                        required
                        value={resumeInfo?.summary || ""}
                        onChange={handleChange}
                    />

                    {aiGeneratedSummary && (
                        <div>
                            <h5 className='font-semibold text-[15px] my-4'>
                                suggestions
                            </h5>
                            {Object?.entries(aiGeneratedSummary)?.map(([experienceType, summaryObj], index) => (
                                <Card role='button' className='my-4 bg-primary/5 shadow-none border-primary/30' onClick={() => handleSelect(summaryObj?.summary)} key={index}>
                                    <CardHeader className='py-2'>
                                        <CardTitle className='font-semibold text-md'>
                                            {experienceType?.charAt(0).toUpperCase() + experienceType?.slice(1)}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent className='text-sm'>
                                        <p>{summaryObj?.summary}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    <Button className='mt-4' type="submit" disabled={ loading || resumeInfo?.status === 'archived' ? true : false}>
                        {/* {isPending && <Loader size='15px' className='aniamte-spin' />} */}
                        Save Changes
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default SummaryForm
