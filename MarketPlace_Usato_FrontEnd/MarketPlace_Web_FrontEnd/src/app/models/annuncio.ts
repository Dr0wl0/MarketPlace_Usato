import { Category } from "./Category.js";


export interface Annuncio {
  id: number;
  name: string;
  sellersName: string;
  description: string;
  category: Category;
  price: number; 
  favourite: boolean;
}
