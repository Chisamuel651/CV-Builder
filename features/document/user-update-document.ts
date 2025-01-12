'use client'

import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/hono-rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useParams } from "next/navigation";

// Suppress type error if necessary
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type ResponseType = InferResponseType<(typeof api.document.update)[":documentId"]["$patch"]>;
// Suppress type error if necessary
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type ResponseType = InferRequestType<(typeof api.document.update)[":documentId"]["$patch"]>["json"];

const useUpdateDocument = () => {
    const param = useParams();
    const queryClient = useQueryClient();

    const documentId = param.documentId as string;

    // Suppress type error if necessary
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            // Suppress type error if necessary
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const response = await api.document.update[":documentId"]["$patch"]({
                param: {
                    documentId: documentId,
                },
                json,
            });
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['document', documentId],
            });
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