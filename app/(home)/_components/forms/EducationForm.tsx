
import React, { useCallback, useEffect, useState } from 'react'
import { useResumeContext } from '@/context/resume-info-provider';
import { Button } from '@/components/ui/button';
import { Loader, Plus, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useUpdateDocument from '@/features/document/user-update-document';
import { generateThumbnail } from '@/lib/helper';
import { toast } from '@/hooks/use-toast';

const initialState = {
    id: undefined,
    docId: undefined,
    universityName: "",
    startDate: "",
    endDate: "",
    degree: "",
    major: "",
    description: "",
}

const EducationForm = (props: { handleNext: () => void }) => {
    const { handleNext } = props;
    const { resumeInfo, onUpdate } = useResumeContext();
    const { mutateAsync, isPending } = useUpdateDocument();

    const [educationList, setEducationList] = useState(() => {
        return resumeInfo?.educations?.length ? resumeInfo.educations : [initialState];
    });

    useEffect(() => {
        if (!resumeInfo) return;
        onUpdate({
            ...resumeInfo,
            educations: educationList,
        });
    }, [educationList]);

    const handleChange = (e: { target: { name: string, value: string } }, index: number) => {
        const { name, value } = e.target;
        setEducationList((prevState) => {
            const newEducationList = [...prevState]
            newEducationList[index] = {
                ...newEducationList[index],
                [name]: value,
            };

            // validate start and end dates
            if (name === 'startDate' && newEducationList[index].endDate && new Date(value) > new Date(newEducationList[index].endDate)) {
                newEducationList[index].startDate = '';
                toast({
                    title: 'Invalid dates',
                    description: 'Sorry but the start date can never be after the end date',
                    variant: 'destructive'
                });
            }

            if (name === 'endDate' && newEducationList[index].startDate && new Date(value) < new Date(newEducationList[index].startDate)) {
                newEducationList[index].endDate = '';
                toast({
                    title: 'Invalid dates',
                    description: 'Sorry but the end date can never be before the start date',
                    variant: 'destructive'
                });
            }
            return newEducationList;
        })
    }

    const addNewEducation = () => {
        setEducationList([...educationList, initialState])
    }

    const removeNewEducation = (index: number) => {
        const updatedEducation = [...educationList];
        updatedEducation.splice(index, 1);
        setEducationList(updatedEducation)
    }

    const handleSubmit = useCallback(async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        for (const education of educationList) {
            if (education.startDate && education.endDate && new Date(education.startDate) > new Date(education.endDate)) {
                toast({
                    title: 'Invalid dates',
                    description: 'Please ensure all start dates are before end dates.',
                    variant: 'destructive',
                });
                return;
            }
        }
        const thumbnail = await generateThumbnail();
        const currentNo = resumeInfo?.currentPosition ? resumeInfo.currentPosition + 1 : 1;

        await mutateAsync({
            currentPosition: currentNo,
            thumbnail: thumbnail,
            education: educationList
        }, {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Education updated successfully'
                });
                handleNext()
            },
            onError() {
                toast({
                    title: 'Error',
                    description: 'Failed to updatred education',
                    variant: 'destructive',
                });
            }
        });
    }, [resumeInfo, educationList]);

    return (
        <div>
            <div className="w-full capitalize">
                <h2 className="font-bold text-lg">education</h2>
                <p className="text-sm">add your educational background</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="border w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
                    {educationList?.map((item, index) => (
                        <div className='' key={index}>
                            <div className='relative grid grid-cols-2 mb-5 pt-4 gap-3'>
                                {educationList?.length > 1 && (
                                    <Button
                                        variant='secondary'
                                        type='button'
                                        className='size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black dark:!bg-gray-600 text-white'
                                        size='icon'
                                        onClick={() => removeNewEducation(index)}
                                        disabled={isPending}
                                    >
                                        <X size='13px' />
                                    </Button>
                                )}

                                <div className="col-span-2">
                                    <Label className='text-sm'>university name</Label>
                                    <Input name='universityName' placeholder='' required value={item?.universityName || ""} onChange={(e) => handleChange(e, index)} />
                                </div>

                                <div>
                                    <Label className='text-sm'>degree</Label>
                                    <Input name='degree' placeholder='' required value={item?.degree || ""} onChange={(e) => handleChange(e, index)} />
                                </div>

                                <div>
                                    <Label className='text-sm'>faculty</Label>
                                    <Input name='major' placeholder='' required value={item?.major || ""} onChange={(e) => handleChange(e, index)} />
                                </div>

                                <div>
                                    <Label className='text-sm'>start date</Label>
                                    <Input name='startDate' placeholder='' type='date' required value={item?.startDate || ""} onChange={(e) => handleChange(e, index)} />
                                </div>

                                <div>
                                    <Label className='text-sm'>end date</Label>
                                    <Input name='endDate' placeholder='' type='date' required value={item?.endDate || ""} onChange={(e) => handleChange(e, index)} />
                                </div>

                                <div className='col-span-2 mt-1'>
                                    <Label className='text-sm'>description</Label>
                                    <Textarea
                                        name='description'
                                        placeholder=''
                                        required
                                        value={item.description || ""}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                            </div>

                            {index === educationList.length - 1 && educationList.length < 5 && (
                                <Button
                                    className='gap-1 mt-1 text-primary border-primary/50'
                                    variant='outline'
                                    type='button'
                                    onClick={addNewEducation}
                                    disabled={isPending}
                                >
                                    <Plus size='15px' />
                                    Add More Education
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

export default EducationForm
