'use client'

import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/hono-rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useParams } from "next/navigation";

type ResponseType = InferResponseType<(typeof api.document.update)[":documentId"]["$patch"]>;
type RequestType = InferRequestType<(typeof api.document.update)[":documentId"]["$patch"]>["json"];

const useUpdateDocument = () => {
    const param = useParams();
    const queryClient = useQueryClient();

    const documentId = param.documentId as string;

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await api.document.update[":documentId"]["$patch"]({
                param: {
                    documentId: documentId,
                },
                json,
            });

            const errorResponse = await response.json()
            if(!response.ok){
                toast({
                    title: "Error",
                    description: 'Failed to update document 101',
                    variant: 'destructive'
                })
            }
            // Suppress type error if necessary
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (errorResponse.success !== 'true'){
                toast({
                    title: "Error",
                    description: 'Failed to update document 102',
                    variant: 'destructive'
                })
            }

            return errorResponse;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['document', documentId],
            });
            toast({
                title: 'Success',
                description: 'Document updated successfully'
            })
        },
        onError: () => {
            toast({
                title: "Error",
                description: 'Failed to update document',
                variant: 'destructive'
            })
        }
    });

    return mutation;
}

export default useUpdateDocument;