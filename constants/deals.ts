import { type DealColumn, DealStatus } from '~/types/deals.types';

export const DEALS_COLUMNS: DealColumn[] = [
  { id: DealStatus.inbox, title: 'Inbox', deals: [] },
  { id: DealStatus.toBeAgreed, title: 'ToBeAgreed', deals: [] },
  { id: DealStatus.inProduction, title: 'InProduction', deals: [] },
  { id: DealStatus.produced, title: 'Produced', deals: [] },
  { id: DealStatus.done, title: 'Done', deals: [] },
];

export const dealStatusLabel = {
  [DealStatus.inbox]: { label: 'Inbox', class: 'warning'},
  [DealStatus.toBeAgreed]: { label: 'To Be Agreed', class: 'primary'},
  [DealStatus.inProduction]: { label: 'In Production', class: 'info'},
  [DealStatus.produced]: { label: 'Produced', class: 'accent'},
  [DealStatus.done]: { label: 'Done', class: 'success'},
};
