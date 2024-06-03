import { useQuery } from '@tanstack/vue-query';
import { Query } from 'appwrite';
import { DEALS_COLUMNS } from '~/constants/deals';
import { dealsList } from '~/queries/queryKeys';
import { DB } from '~/utils/appwrite/appwrite';
import { COLLECTION_DEALS, DB_ID } from '~/utils/appwrite/constants';

export function useDealsQuery() {
  return useQuery({
    queryKey: dealsList,
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS,[Query.orderDesc('$createdAt')]),
    select(data) {
      const deals = data.documents;
      const dealColumns = [...DEALS_COLUMNS].map(column => ({
        ...column,
        deals: deals.filter(deal => +deal.status === column.id),
      }));

      return dealColumns;
    }
  });
}