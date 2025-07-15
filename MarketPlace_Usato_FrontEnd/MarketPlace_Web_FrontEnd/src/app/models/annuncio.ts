import { Category } from "./Category.js";


export interface Annuncio {
  uuid: number;
  name: string;
  userid: string;
  sellersName: string;
  description: string;
  category: Category;
  price: number; 
  favourite: boolean;
}
