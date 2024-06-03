import type { BaseData } from '~/types/base.types';
import type { Deal } from '~/types/deals.types';

export interface Customer extends BaseData {
  name: string;
  email: string;
  avatar_url?: string;
  from_source?: string;
  deal?: Deal;
}
