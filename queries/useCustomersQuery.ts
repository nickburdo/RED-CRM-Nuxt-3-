import { useQuery, type UseQueryOptions } from '@tanstack/vue-query';
import { customersList } from '~/queries/queryKeys';
import { DB } from '~/utils/appwrite/appwrite';
import { COLLECTION_CUSTOMERS, DB_ID } from '~/utils/appwrite/constants';

export function useCustomersQuery(options?: Omit<UseQueryOptions, 'queryKey' | 'queryFb'>) {
  return useQuery({
    queryKey: customersList,
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS),
    ...options,
  });
}