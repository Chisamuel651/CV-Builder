import React, { useCallback, useEffect, useState } from 'react'
import useUpdateDocument from '@/features/document/user-update-document';
import { useResumeContext } from '@/context/resume-info-provider';
import { INITIAL_THEME_COLOR } from '@/constant/colors';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown, Palette } from 'lucide-react';
import { generateThumbnail } from '@/lib/helper';
import { toast } from '@/hooks/use-toast';
import useDebounce from '@/hooks/use-debounce';

const ThemeColor = () => {
  const colors = [
    '#d5bdaf',
    '#ffafcc',
    '#00b4d8',
    '#495057',
    '#99582a',
    '#57cc99',
    '#03045e',
    '#ef476f',
    '#ffc300',
    '#9f86c0',
    '#5a189a',
    '#15616d',
    '#3772ff',
    '#774936',
    '#f7aef8',
    '#a47e1b',
    '#9381ff',
    '#ff5d8f',
    '#1c1c1c',
    '#1b2cc1'
  ];

  const { resumeInfo,  onUpdate, isLoading } = useResumeContext();
  const {mutateAsync} = useUpdateDocument();

  const [selectedColor, setSelectedColor] = useState(INITIAL_THEME_COLOR);

  const debouncedColor = useDebounce<string>(selectedColor, 1000);

  useEffect(() => {
    if(debouncedColor) onSave();
  }, [debouncedColor])

  const onColorSelect = useCallback((color: string) => {
    setSelectedColor(color);

    if(!resumeInfo) return
    onUpdate({
      ...resumeInfo,
      themeColor: color
    })
  }, [resumeInfo, onUpdate]);

  const onSave = useCallback(async () => {
    if(!selectedColor) return;
    if(selectedColor === INITIAL_THEME_COLOR) return;
    const thumbnail = await generateThumbnail();

    await mutateAsync(
      {
        themeColor: selectedColor,
        thumbnail: thumbnail,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'Theme updated successfully'
          })
        },
        onError() {
          toast({
            title: "Error",
            description: "Failed to update theme",
            variant: 'destructive'
          });
        },
      }
    )
  }, [selectedColor])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button disabled={resumeInfo?.status === 'archived'? true: false} className='bg-white border gap-1 dark:bg-gray-800 !p-2 w-9 lg:w-auto lg:p-4' variant='secondary'>
          <div className='flex items-center gap-1'>
            <Palette size='17px' />
            <span className='hidden lg:flex'>Theme</span>
          </div>

          <ChevronDown size='14px' />
        </Button>
      </PopoverTrigger>

      <PopoverContent align='start' className='bg-background'>
        <h2 className="mb-2 text-sm font-bold">
          Select Theme Color
        </h2>

        <div className="grid grid-cols-5 gap-3">
          {colors.map((item: string, index: number) => (
            <div 
              role='button' 
              key={index} 
              onClick={() => onColorSelect(item)} 
              className={`h-5 w-8 rounded-[5px] hover:border-black border ${selectedColor === item && 'border border-black'}`}
              style={{
                background: item
              }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ThemeColor
