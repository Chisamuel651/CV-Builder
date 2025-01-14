import RichTextEditor from '@/components/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResumeContext } from '@/context/resume-info-provider';
import useUpdateDocument from '@/features/document/user-update-document';
import { toast } from '@/hooks/use-toast';
import { generateThumbnail } from '@/lib/helper';
import { Loader, Plus, X } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react'

const initialState = {
    id: undefined,
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: '',
    currentlyWorking: false,
}

const ExperienceForm = (props: { handleNext: () => void }) => {
    const { handleNext } = props;
    const { resumeInfo, onUpdate } = useResumeContext();
    const { mutateAsync, isPending } = useUpdateDocument()

    const [experienceList, setExperienceList] = useState(() => {
        return resumeInfo?.experiences?.length ? resumeInfo.experiences : [initialState];
    });

    useEffect(() => {
        if (!resumeInfo) return;
        onUpdate({
            ...resumeInfo,
            experiences: experienceList
        })
    }, [experienceList])

    const handleChange = (e: { target: { name: string, value: string } }, index: number) => {
        const { name, value } = e.target;
        setExperienceList((prevState) => {
            const newExperienceList = [...prevState]
            newExperienceList[index] = {
                ...newExperienceList[index],
                [name]: value,
            };
            return newExperienceList;
        })
    }

    const addNewExperience = () => {
        setExperienceList([...experienceList, initialState])
    }

    const removeNewExperience = (index: number) => {
        const updatedExperience = [...experienceList];
        updatedExperience.splice(index, 1);
        setExperienceList(updatedExperience)
    }

    const handleEditor = (value: string, name: string, index: number) => {
        setExperienceList((prevState) => {
            const newExperienceList = [...prevState]
            newExperienceList[index] = {
                ...newExperienceList[index],
                [name]: value,
            };
            return newExperienceList;
        })
    }

    const handleSubmit = useCallback(async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const thumbnail = await generateThumbnail();
        const currentNo = resumeInfo?.currentPosition ? resumeInfo.currentPosition + 1 : 1;

        await mutateAsync({
            currentPosition: currentNo,
            thumbnail: thumbnail,
            experience: experienceList
        }, {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Experience updated successfully'
                });
                handleNext()
            },
            onError() {
                toast({
                    title: 'Error',
                    description: 'Failed to updatred experience',
                    variant: 'destructive',
                });
            }
        });
    }, [resumeInfo, experienceList]);



    return (
        <div>
            <div className="w-full capitalize">
                <h2 className="font-bold text-lg">professional experience</h2>
                <p className="text-sm">add previous job experience</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="border w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
                    {experienceList?.map((item, index) => (
                        <div key={index}>
                            <div className='relative grid grid-cols-2 mb-5 pt-4 gap-3'>
                                {experienceList?.length > 1 && (
                                    <Button
                                        variant='secondary'
                                        type='button'
                                        className='size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black dark:!bg-gray-600 text-white'
                                        size='icon'
                                        onClick={() => removeNewExperience(index)}
                                    >
                                        <X size='13px' />
                                    </Button>
                                )}

                                <div>
                                    <Label className='text-sm'>position title</Label>
                                    <Input name='title' placeholder='' required value={item?.title || ''} onChange={(e) => handleChange(e, index)} />
                                </div>

                                <div>
                                    <Label className='text-sm'>company name</Label>
                                    <Input name='companyName' placeholder='' required value={item?.companyName || ''} onChange={(e) => handleChange(e, index)} />
                                </div>

                                <div>
                                    <Label className='text-sm'>city</Label>
                                    <Input name='city' placeholder='' required value={item?.city || ''} onChange={(e) => handleChange(e, index)} />
                                </div>

                                <div>
                                    <Label className='text-sm'>state or region</Label>
                                    <Input name='state' placeholder='' required value={item?.state || ''} onChange={(e) => handleChange(e, index)} />
                                </div>

                                <div>
                                    <Label className='text-sm'>start date</Label>
                                    <Input name='startDate' placeholder='' type='date' required value={item?.startDate || ''} onChange={(e) => handleChange(e, index)} />
                                </div>

                                <div>
                                    <Label className='text-sm'>end date</Label>
                                    <Input type='date' name='endDate' placeholder='' required value={item?.endDate || ''} onChange={(e) => handleChange(e, index)} />
                                </div>

                                <div className="mt-1 col-span-2">
                                    {/* {WorkSummary} */}
                                    <RichTextEditor
                                        jobTitle={item.title || ""}
                                        initialValue={item.workSummary || ""}
                                        onEditorChange={(value: string) => handleEditor(value, "workSummary", index)}
                                    />
                                </div>
                            </div>

                            {index === experienceList.length - 1 && experienceList.length < 5 && (
                                <Button
                                    className='gap-1 mt-1 text-primary border-primary/50'
                                    variant='outline'
                                    type='button'
                                    onClick={addNewExperience}
                                >
                                    <Plus size='15px' />
                                    Add More Experience
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                <Button className='mt-4' type='submit' disabled={isPending}>
                    {isPending && <Loader size='15px' className='aniamte-spin' />}
                    save changes
                </Button>
            </form>
        </div>
    )
}

export default ExperienceForm
