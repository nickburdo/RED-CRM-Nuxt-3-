import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { customersList } from '~/queries/queryKeys';
import type { CustomerUpdateContext } from '~/types/customers';
import { DB } from '~/utils/appwrite/appwrite';
import { COLLECTION_CUSTOMERS, COLLECTION_DEALS, DB_ID } from '~/utils/appwrite/constants';

export const useCustomerUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: CustomerUpdateContext) =>
      DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, id, data),
    onSuccess: () => {
      alert('Success Update Customer');
    },
    onError: (error) => {
      console.log({error});
      alert('Failed Update Customer');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: customersList })
    },
  })
}