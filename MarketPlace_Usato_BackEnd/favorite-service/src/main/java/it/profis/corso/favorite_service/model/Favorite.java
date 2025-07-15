package it.profis.corso.favorite_service.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Service;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Favorite {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Long id;

    private String uuid;
    private String userUuid;
    private String listingName;
    private String sellersName;
    private String description;
    @Enumerated( EnumType.STRING )
    @Column(name = "category")
    private Category category;
    private Double price;

    private boolean favorite;



}
