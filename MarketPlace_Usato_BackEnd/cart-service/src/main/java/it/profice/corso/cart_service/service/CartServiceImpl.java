package it.profice.corso.cart_service.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import it.profice.corso.cart_service.DTO.CartDTO;
import it.profice.corso.cart_service.DTO.CartItemDTO;
import it.profice.corso.cart_service.exception.CartAlreadyCreated;
import it.profice.corso.cart_service.exception.CartNotFound;
import it.profice.corso.cart_service.model.Cart;
import it.profice.corso.cart_service.model.CartItem;
import it.profice.corso.cart_service.repositroy.CartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartServiceImpl implements CartService{

    private final CartRepository cartRepository;

    @Override
    public CartDTO createCart(String userUuid) {
        String userUuidFind = cartRepository.findUserUuid(userUuid);
        if(userUuidFind == null){
            CartDTO cart = new CartDTO();
            cart.setUuid(UUID.randomUUID().toString());
            cart.setUserUuid(userUuid);
            cart.setTot(0D);
            return modelToDto(cartRepository.save(dtoToModel(cart)));
        }else {
            throw new CartAlreadyCreated();
        }

    }

    @Override
    public CartDTO findCartByUserUuid(String userUuid) {
        return modelToDto(cartRepository.findByUserUuid(userUuid).orElseThrow(CartNotFound::new));
    }

    @Override
    public CartDTO findCartByUuid(String uuid) {
        return modelToDto(cartRepository.findByUuid(uuid).orElseThrow(CartNotFound::new));
    }

    @Override
    public void addItem(String cartUuid, CartItemDTO item) {
        Cart cart = cartRepository.findByUuid(cartUuid).orElseThrow(CartNotFound::new);

        CartItem cartItem = itemDtoToModel(item, cart);
        cartItem.setUuid(UUID.randomUUID().toString());
        cart.getItems().add(cartItem);

        cartRepository.save(cart);

    }

    @Override
    public void removeitem(String cartUuid, String listingUuid) {
        Cart cart = cartRepository.findByUuid(cartUuid).orElseThrow(CartNotFound::new);

        cart.getItems().removeIf(i -> i.getListingUuid().equals(listingUuid));
        cartRepository.save(cart);
    }

    @Override
    public void clearCart(String cartUuid) {
        Cart cart = cartRepository.findByUuid(cartUuid).orElseThrow(CartNotFound::new);

        cart.getItems().clear();
        cartRepository.save(cart);
    }

    public CartDTO modelToDto(Cart cart){
        return CartDTO.builder()
                .uuid(cart.getUuid())
                .userUuid(cart.getUserUuid())
                .items(cart.getItems())
                .tot(cart.getTot())
                .build();
    }

    public Cart dtoToModel (CartDTO cartDTO){
        return Cart.builder()
                .uuid(cartDTO.getUuid())
                .userUuid(cartDTO.getUserUuid())
                .items(cartDTO.getItems())
                .tot(cartDTO.getTot())
                .build();
    }

    public CartItemDTO itemModelToDto(CartItem item){
        return CartItemDTO.builder()
                .listingUuid(item.getListingUuid())
                .quantity(item.getQuantity())
                .uuid(item.getUuid())
                .build();
    }

    public CartItem itemDtoToModel (CartItemDTO itemDto, Cart cart){
        return CartItem.builder()
                .listingUuid(itemDto.getListingUuid())
                .quantity(itemDto.getQuantity())
                .uuid(itemDto.getUuid())
                .cart(cart)
                .build();
    }

    
}
