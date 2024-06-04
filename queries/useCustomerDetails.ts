import { useQuery, type UseQueryOptions } from '@tanstack/vue-query';
import { customerDetails, customersList } from '~/queries/queryKeys';
import { DB } from '~/utils/appwrite/appwrite';
import { COLLECTION_CUSTOMERS, DB_ID } from '~/utils/appwrite/constants';

export function useCustomerDetailsQuery(id: string, options?: Omit<UseQueryOptions, 'queryKey' | 'queryFb'>) {
  return useQuery({
    queryKey: customerDetails(id),
    queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, id),
    ...options,
  });
}