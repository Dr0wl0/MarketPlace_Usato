package it.profice.corso.annunci_service.model;


import it.profice.corso.annunci_service.Enum.Category;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Listing {

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
