import { useMutation, useQueryClient } from '@tanstack/vue-query';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { dealsList } from '~/queries/queryKeys';
import { type AddCommentContext, type CreateDealContext, type DealsResponse } from '~/types/deals.types';
import { DB } from '~/utils/appwrite/appwrite';
import { COLLECTION_COMMENTS, COLLECTION_DEALS, DB_ID } from '~/utils/appwrite/constants';

export const useAddCommentMutation = (onSuccessCB = () => {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (context: AddCommentContext) =>
      DB.createDocument(DB_ID, COLLECTION_COMMENTS, uuid(), { text: context.text, deal: context.dealId}),
/*
      {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({ text: context.text });
            // reject('Some Error');
          }, 2000);
        })
      },
*/
    onMutate: async ({ dealId, text }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: dealsList })
      // Set optimistic changes
      queryClient.setQueryData(dealsList, (oldData: DealsResponse) => {
        const newComment = { text, $createdAt: dayjs().format('MM/DD/YYYY hh:mm a') }
        const newData = { ...oldData };
        const { documents, total } = newData;
        const newDocuments = documents.map(doc => ({
          ...doc,
          comments: doc.$id === dealId ? (doc.comments ? [...doc.comments, newComment] : [newComment]) : doc.comments,
        }));

        return {
          documents: newDocuments,
          total,
        }
      });
    },
    onSuccess: () => {
      onSuccessCB();
    },
    onError: (error, requestData) => {
      const { dealId, text } = requestData;
      queryClient.setQueryData(dealsList, (oldData: DealsResponse) => {
        const newData = { ...oldData };
        const { documents, total } = newData;
        const newDocuments = documents.map(doc => ({
          ...doc,
          comments: doc.$id === dealId ? doc.comments?.slice(0, -1) : doc.comments,
        }));

        return {
          documents: newDocuments,
          total,
        }
      });
      alert('Failed Add Comment');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: dealsList })
    },
  })
}