import { Category } from "./Category.js";


export interface Annuncio {
  uuid: string;
  userUuid: string;
  listingName: string;
  description: string;
  category: Category;
  price: number;
  favourite: boolean;
}
