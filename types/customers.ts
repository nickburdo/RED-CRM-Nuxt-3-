import type { BaseData } from '~/types/base.types';
import type { Deal } from '~/types/deals.types';

export interface Customer extends BaseData {
  name: string;
  email: string;
  avatar_url?: string;
  from_source?: string;
  deal?: Deal;
}

export interface CustomerUpdateContext extends Pick<Customer, 'name' |'email' | 'avatar_url' | 'from_source'> {
  id: string;
}
