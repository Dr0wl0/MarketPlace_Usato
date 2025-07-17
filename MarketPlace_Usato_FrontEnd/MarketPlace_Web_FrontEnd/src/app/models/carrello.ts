import { Annuncio } from "./annuncio";

export interface Carrello {
  uuid: string;
  userUuid: string;
  annunci: Annuncio[];
  tot: number;
}