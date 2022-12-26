import { Price } from '@pricesModule/types/types';

export interface Payment {
  id: string;
  price_id: string;
  user_id: string;
  createdAt: string;
  available_spots: number;
}

export interface PaymentWithExiring extends Payment {
  isExpiring: boolean;
}

export interface SubscriptionOption extends Price {
  option: string;
  value: number;
}
