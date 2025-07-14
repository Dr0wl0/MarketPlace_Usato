package it.profice.corso.annunci_service.DTO;

import it.profice.corso.annunci_service.Enum.Category;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ListingDTO {

    private String uuid;
    private String userUuid;
    private String listingName;
    private String sellersName;
    private String description;
    private Category category;
    private Double price;

    private boolean favorite;
}
