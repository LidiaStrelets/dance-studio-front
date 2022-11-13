export interface Payment {
  id: string;
  price_id: string;
  user_id: string;
  createdAt: Date;
  available_spots: number;
}

export interface SubscriptionOptions {
  option: string;
  value: number;
  price: number;
}
