package it.profice.corso.cart_service.service;

import it.profice.corso.cart_service.DTO.CartDTO;
import it.profice.corso.cart_service.DTO.CartItemDTO;
import it.profice.corso.cart_service.exception.CartNotFound;
import it.profice.corso.cart_service.model.Cart;
import it.profice.corso.cart_service.model.CartItem;
import it.profice.corso.cart_service.repositroy.CartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartServiceImpl implements CartService{

    private final CartRepository cartRepository;

    @Override
    public CartDTO createCart(String userUuid) {
        CartDTO cart = new CartDTO();
        cart.setUuid(UUID.randomUUID().toString());
        cart.setUserUuid(userUuid);
        return modelToDto(cartRepository.save(dtoToModel(cart)));
    }

    @Override
    public CartDTO findCartByUuid(String uuid) {
        return modelToDto(cartRepository.findByUuid(uuid).orElseThrow(CartNotFound::new));
    }

    @Override
    public void addItem(String cartUuid, CartItemDTO item) {
        CartDTO cart = modelToDto(cartRepository.findByUuid(cartUuid).orElseThrow(CartNotFound::new));

        CartItem cartItem = itemDtoToModel(item, dtoToModel(cart));
        cart.getItems().add(cartItem);

        modelToDto(cartRepository.save(dtoToModel(cart)));

    }

    @Override
    public void removeitem(String cartUuid, String listingUuid) {
        CartDTO cart = modelToDto(cartRepository.findByUuid(cartUuid).orElseThrow(CartNotFound::new));

        cart.getItems().removeIf(i -> i.getListingUuid().equals(listingUuid));
        modelToDto(cartRepository.save(dtoToModel(cart)));
    }

    @Override
    public void clearCart(String cartUuid) {
        CartDTO cart = modelToDto(cartRepository.findByUuid(cartUuid).orElseThrow(CartNotFound::new));

        cart.getItems().clear();
        modelToDto(cartRepository.save(dtoToModel(cart)));
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
