import { CartItem } from "./cartItem";

export interface Carrello {
  uuid: string;
  userUuid: string;
  items: CartItem[];
  tot: number;
}