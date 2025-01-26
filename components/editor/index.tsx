import React, { useEffect, useState } from 'react'
import {
    BtnBold,
    BtnBulletList,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnStrikeThrough,
    BtnUnderline,
    Editor,
    EditorProvider,
    Separator,
    Toolbar
} from 'react-simple-wysiwyg'
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Loader, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AIChatSession } from '@/lib/google-ai-model';

const PROMPT = `Given the job title "{jobTitle}",
 create 6-7 concise and personal bullet points in
  HTML stringify format that highlight my key
  skills, relevant technologies, and significant
   contributions in that role. Do not include
    the job title itself in the output. Provide
     only the bullet points inside an unordered
     list.`;

const RichTextEditor = (props: {
    jobTitle: string | null;
    initialValue: string;
    onEditorChange: (e: any) => void;
}) => {
    const { jobTitle, initialValue, onEditorChange } = props;
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(initialValue || "")

    useEffect(() => {
        setValue(initialValue || "")
    }, [initialValue])

    const GenerateSummaryFromAI = async () => {
        try {
            if (!jobTitle) {
                toast({
                    title: 'You must provide a Job position',
                    variant: 'destructive',
                });
                return;
            }
            setLoading(true);
            const prompt = PROMPT.replace("{jobTitle}", jobTitle || "Job Title");
            const result = await AIChatSession.sendMessage(prompt);
            const responseText = await result.response.text();
            // console.log(responseText);
            try {
                const validJsonArray = JSON.parse(responseText);
                const combinedHTML = validJsonArray.join("").trim();
    
                setValue(combinedHTML);
                onEditorChange(combinedHTML);
            } catch (parseError) {

                toast({
                    title: "Error",
                    description: "AI response could not be parsed.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: 'Failed to generate the summary',
                variant: 'destructive',
            })
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <div className="flex capitalize items-center justify-between my-2">
                <Label>work summary</Label>
                <Button
                    variant='outline'
                    className='gap-1'
                    type='button'
                    disabled={loading}
                    onClick={() => GenerateSummaryFromAI()}
                >
                    <>
                        <Sparkles size='15px' className='text-orange-500' />
                        Generate With AI
                    </>
                    {loading && <Loader size='13px' className='aniamte-spin' />}
                </Button>
            </div>

            <EditorProvider>
                <Editor
                    value={value}
                    containerProps={{
                        style: {
                            resize: 'vertical',
                            lineHeight: 1.2,
                            fontSize: '13.5px',
                        }
                    }}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onEditorChange(e.target.value);
                    }}
                >
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>

            
        </div>
    )
}

export default RichTextEditor
