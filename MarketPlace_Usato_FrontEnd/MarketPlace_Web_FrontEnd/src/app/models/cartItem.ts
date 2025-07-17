import { Annuncio } from "./annuncio";

export interface CartItem extends Annuncio {
    uuid: string,
    listingUuid: string,
    quantity: number
}