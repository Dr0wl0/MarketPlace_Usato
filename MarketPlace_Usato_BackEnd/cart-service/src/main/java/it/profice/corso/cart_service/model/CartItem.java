package it.profice.corso.cart_service.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private String uuid;
    private String listingUuid;
    private Integer quantity;
    private String listingName;
    private Double price;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

}
