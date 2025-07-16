package it.profice.corso.cart_service.controller;

import it.profice.corso.cart_service.DTO.CartDTO;
import it.profice.corso.cart_service.DTO.CartItemDTO;
import it.profice.corso.cart_service.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/cart")
public class CartController {

    private final CartService cartService;

    @PostMapping
    public CartDTO createCart(@RequestParam String userUuid){
        return cartService.createCart(userUuid);
    }

    @GetMapping("/{uuid}")
    public  CartDTO findCart(@PathVariable String uuid){
        return cartService.findCartByUuid(uuid);
    }

    @PostMapping("/{uuid}/add")
    public void addItem(@PathVariable String uuid, @RequestBody CartItemDTO itemDTO){
        cartService.addItem(uuid, itemDTO);
    }

    @DeleteMapping("/{uuid}/remove/{listingUuid}")
    public void removeItem(@PathVariable String uuid, @PathVariable String listingUuid){
        cartService.removeitem(uuid, listingUuid);
    }

    @DeleteMapping("/{uuid}/clear")
    public void clearCart(@PathVariable String uuid){
        cartService.clearCart(uuid);
    }

}
