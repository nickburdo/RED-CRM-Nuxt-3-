import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { v4 as uuid } from 'uuid';
import { dealsList } from '~/queries/queryKeys';
import { type CreateDealContext } from '~/types/deals.types';
import { DB } from '~/utils/appwrite/appwrite';
import { COLLECTION_DEALS, DB_ID } from '~/utils/appwrite/constants';

export const useCreateDealMutation = (onSuccessCB: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (context: CreateDealContext) =>
      DB.createDocument(DB_ID, COLLECTION_DEALS, uuid(), context),
    onSuccess: () => {
      onSuccessCB();
    },
    onError: (error) => {
      console.log({error});
      alert('Failed Create Deal');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: dealsList })
    },
  })
}