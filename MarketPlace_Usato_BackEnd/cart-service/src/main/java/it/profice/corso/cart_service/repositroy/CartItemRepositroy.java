package it.profice.corso.cart_service.repositroy;

import it.profice.corso.cart_service.DTO.CartDTO;
import it.profice.corso.cart_service.model.Cart;
import it.profice.corso.cart_service.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepositroy extends JpaRepository<CartItem, Long> {
}
