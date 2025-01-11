import PersonalInfoSkeletonLoader from '@/components/skeleton-loader/personal-info-loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResumeContext } from '@/context/resume-info-provider';
import { generateThumbnail } from '@/lib/helper';
import { PersonalInfoType } from '@/types/resume.type';
import React, { useCallback, useEffect, useState } from 'react'

const initialState = {
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
}

const PersonalInfoForm = ( props: {handleNext:() => void} ) => {
    const {handleNext} = props;
    const { resumeInfo, onUpdate } = useResumeContext()
    const [ personalInfo, setPersonalInfo ] = useState<PersonalInfoType>(initialState)
    const isLoading = false;

    useEffect(() => {
        if(!resumeInfo){
            return ;
        }
        if(resumeInfo?.personalInfo){
            setPersonalInfo({
                ...(resumeInfo?.personalInfo || initialState)
            })
        }
    }, [resumeInfo?.personalInfo]);

    const handleChange = useCallback((e:{target:{name: string; value: string;}}) => {
        const { name, value } = e.target;

        setPersonalInfo({...personalInfo, [name]: value});

        if(!resumeInfo){
            return;
        }
        onUpdate({
            ...resumeInfo,
            personalInfo: {
                ...resumeInfo.personalInfo,
                [name]: value,
            }
        })
    }, [resumeInfo, onUpdate])

    const handleSubmit = useCallback( async (e:{preventDefault:() => void}) => {
        e.preventDefault();

        const thumbnail = await generateThumbnail();
        const currentNo = resumeInfo?.currentPosition ? resumeInfo?.currentPosition + 1 : 1;
    }, [])

    if(isLoading){
        return <PersonalInfoSkeletonLoader />
    }
  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Personal Information</h2>
        <p className="text-sm">Get started with your personal information</p>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 mt-5 gap-3">
                <div>
                    <Label className='text-sm'>first name</Label>
                    <Input name='firstName' required autoComplete='off' placeholder='' value={personalInfo?.firstName || ''} onChange={handleChange} />
                </div>

                <div>
                    <Label className='text-sm'>last name</Label>
                    <Input name='lastName' required autoComplete='off' placeholder='' value={personalInfo?.lastName || ''} onChange={handleChange} />
                </div>

                <div className='col-span-2'>
                    <Label className='text-sm'>job title</Label>
                    <Input name='jobTitle' required autoComplete='off' placeholder='' value={personalInfo?.jobTitle || ''} onChange={handleChange} />
                </div>

                <div className='col-span-2'>
                    <Label className='text-sm'>address</Label>
                    <Input name='address' required autoComplete='off' placeholder='' value={personalInfo?.address || ''} onChange={handleChange} />
                </div>

                <div className='col-span-2'>
                    <Label className='text-sm'>phone number</Label>
                    <Input name='phone' required autoComplete='off' placeholder='' value={personalInfo?.phone || ''} onChange={handleChange} />
                </div>

                <div className='col-span-2'>
                    <Label className='text-sm'>email address</Label>
                    <Input name='email' required autoComplete='off' placeholder='' value={personalInfo?.email || ''} onChange={handleChange} />
                </div>
            </div>

            <Button className='mt-4' type="submit" disabled={resumeInfo?.status === 'archived' ? true : false}>
                save changes
            </Button>
        </form>
      </div>
    </div>
  )
}

export default PersonalInfoForm
