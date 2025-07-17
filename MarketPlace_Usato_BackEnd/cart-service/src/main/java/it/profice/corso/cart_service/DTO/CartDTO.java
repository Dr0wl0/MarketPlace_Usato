package it.profice.corso.cart_service.DTO;

import it.profice.corso.cart_service.model.Cart;
import it.profice.corso.cart_service.model.CartItem;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {

    private String uuid;
    private String userUuid;
    private List<CartItemDTO> items = new ArrayList<>();
    private Double tot;

}
