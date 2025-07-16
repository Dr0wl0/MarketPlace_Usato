package it.profice.corso.cart_service.service;

import it.profice.corso.cart_service.DTO.CartDTO;
import it.profice.corso.cart_service.DTO.CartItemDTO;

public interface CartService {

    CartDTO createCart( String userUuid );
    CartDTO findCartByUuid( String uuid );
    void addItem( String cartUuid, CartItemDTO item );
    void removeitem( String cartUuid, String listingUuid );
    void clearCart( String cartUuid );

}
