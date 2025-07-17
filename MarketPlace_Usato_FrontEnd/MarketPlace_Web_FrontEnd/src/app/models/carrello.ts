import { CartItem } from "./cartItem";

export interface Carrello {
  uuid: string;
  userUuid: string;
  item: CartItem[];
  tot: number;
}