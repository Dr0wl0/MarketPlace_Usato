package it.profice.corso.annunci_service.DTO;

import it.profice.corso.annunci_service.model.Category;
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
    private String categoryName;
    private Double price;

    private boolean favorite;

    public void setFavourite() {
        this.favorite = !this.favorite;
    }
}
