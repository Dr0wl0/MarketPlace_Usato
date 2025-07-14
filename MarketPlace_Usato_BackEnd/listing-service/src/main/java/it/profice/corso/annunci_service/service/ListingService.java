package it.profice.corso.annunci_service.service;

import it.profice.corso.annunci_service.DTO.ListingDTO;
import it.profice.corso.annunci_service.Enum.Category;

import java.util.List;

public interface ListingService {

    List<ListingDTO> findAll();
    ListingDTO save ( ListingDTO listing );
    ListingDTO findByName ( String listingName );
    List<ListingDTO> findByCategory( Category category );
    void deleteByUuid( ListingDTO listing, String sellersName);

}
