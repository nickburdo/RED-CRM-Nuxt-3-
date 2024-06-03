import type { BaseData } from '~/types/base.types';
import type { Deal } from '~/types/deals.types';

export interface Comment extends BaseData {
  text: string;
  deal: Deal;
}
