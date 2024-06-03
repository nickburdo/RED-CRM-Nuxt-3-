import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { dealsList } from '~/queries/queryKeys';
import type { DealChangeStatusContext, DealsResponse } from '~/types/deals.types';
import { DB } from '~/utils/appwrite/appwrite';
import { COLLECTION_DEALS, DB_ID } from '~/utils/appwrite/constants';

export const useDealStatusChangeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, from, to }: DealChangeStatusContext) =>
    DB.updateDocument(DB_ID, COLLECTION_DEALS, id, { status: to.toString() }),
    // Do optimistic update
    onMutate: async ({ id, to }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: dealsList })
      // Set optimistic changes
      queryClient.setQueryData(dealsList, (oldData: DealsResponse) => {
        const newData = { ...oldData };
        const { documents, total } = newData;
        const newDocuments = documents.map(doc => ({
          ...doc,
          status: doc.$id === id ? to : doc.status
        }));

        return {
          documents: newDocuments,
          total,
        }
      });
    },
    // If the mutation fails,roll back optimistic update
    onError: (err, requestData) => {
      const { id, from } = requestData;
      queryClient.setQueryData(dealsList, (oldData: DealsResponse) => {
        const newData = { ...oldData };
        const { documents, total } = newData;
        const newDocuments = documents.map(doc => ({
          ...doc,
          status: doc.$id === id ? from : doc.status
        }));

        return {
          documents: newDocuments,
          total,
        }
      });
      alert('Failed deal status change');
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: dealsList })
    },
  })
}