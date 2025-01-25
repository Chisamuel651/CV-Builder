'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import useGetDocuments from '@/features/document/use-get-document'
import { Dot, FileText, Loader, Search, Trash2, Undo } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns';
import useRestoreDocument from '@/features/document/use-restore-document'
import { toast } from '@/hooks/use-toast'

const TrashList = () => {
    const router = useRouter()
    const { data, isLoading } = useGetDocuments(true);
    const resumes = data?.data ?? [];
    const { mutateAsync, isPending } = useRestoreDocument();

    const [search, setSearch] = useState("");

    const filteredDocuments = Array.isArray(resumes) ? resumes.filter((doc: { title: string }) => {
        return doc.title?.toLowerCase()?.includes(search?.toLowerCase());
    }) : [];

    const onClick = (docId: string) => {
        router.push(`/dashboard/document/${docId}/edit`);
    };

    const onRestore = async (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        docId: string,
        status: string
    ) => {
        event.stopPropagation();
        mutateAsync(
            {
                documentId: docId,
                status: status,
            },
            {
                onSuccess: () => {
                    toast({
                        title: "Success",
                        description: `Restore document successfully`,
                    });
                },
            }
        );
    };

    return (
        <Popover>
            <PopoverTrigger>
                <div className="flex items-center border gap-2 cursor-pointer p-3 rounded-md">
                    <Trash2 size="15px" />
                    <span>All Trash</span>
                </div>
            </PopoverTrigger>

            <PopoverContent
                className='bg-background w-[22rem] !px-2'
                align='end'
                alignOffset={0}
                forceMount
            >
                {
                    isLoading ? (
                        <div className="w-full flex flex-col gap-2 pt-3">
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                        </div>
                    ) : (
                        <div className='text-sm'>
                            <div className="flex items-center gap-x-1 p-2">
                                <Search className='w-4 h-4' />
                                <Input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className='h-7 px-2 bg-secondary'
                                    placeholder='Filter by resume title'
                                />
                            </div>

                            <div className="mt-2 px-1 pb-1">
                                <p className='hidden last:block text-xs text-center text-muted-foreground'>No documented found!</p>

                                {filteredDocuments?.map((doc) => (
                                    <div key={doc.id} onClick={() => onClick(doc.documentId)} role='button' className='text-sm rounded-s w-full hover:bg-primary/5 flex items-center justify-between py-1 px-1'>
                                        <div className='flex items-start gap-1'>
                                            <FileText className='mt-[3px]' size='15px' />
                                            <div className="flex flex-col">
                                                <h5 className='font-semibold text-sm truncate block w-[200px]'>
                                                    {doc.title}
                                                </h5>

                                                <div className="flex items-center !text-[12px]">
                                                    <span className="flex items-center capitalize gap-[2px]">
                                                        {doc.status}
                                                    </span>
                                                    <Dot size='15px' />
                                                    <span className="items-center">
                                                        {doc.updatedAt && format(doc.updatedAt, "MMM dd, yyyy")}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div
                                                role="button"
                                                onClick={(e) => onRestore(e, doc.documentId, doc.status)}
                                                className="rounded-sm hover:bg-neutral-200 w-6 h-6 flex items-center justify-center dark:hover:bg-gray-700"
                                            >
                                                {isPending ? (
                                                    <Loader className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Undo className="h-4 w-4" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }
            </PopoverContent>
        </Popover>
        // <div>hello</div>
    )
}

export default TrashList
