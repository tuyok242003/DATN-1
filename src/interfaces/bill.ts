import { ProductItem } from "./product";
export interface IBill {
  id: number;
  user_id: number;
  status: string;
  address: string;
  date: string;
  total: number;
  phone: number;
  payment_method: string;
  notes: string;
  products: ProductItem[];
}
