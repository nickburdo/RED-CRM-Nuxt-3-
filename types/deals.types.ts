import type { BaseData } from '~/types/base.types';
import type { Comment } from '~/types/comments.types';
import type { Customer } from '~/types/customers';

export enum DealStatus {
  inbox,
  toBeAgreed,
  inProduction,
  produced,
  done,
}

export interface Deal {
  $id: string;
  name: string;
  price: number;
  status: DealStatus;
  customer: Customer;
  comments?: Comment[];
  $updatedAt: string;
}
export interface DealColumn {
  id: DealStatus;
  title: string;
  deals: Deal[];
}

export interface DealsResponse {
  total: number;
  documents: Deal[];
}

export interface CreateDealContext extends Pick<Deal, 'name' | 'price'> {
  customer: {
    name: string;
    email: string;
  }
}

export interface DealChangeStatusContext {
  id: string;
  from: DealStatus;
  to: DealStatus;
}

export interface AddCommentContext {
  dealId: string;
  text: string;
}
