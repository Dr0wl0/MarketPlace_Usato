package it.profice.corso.annunci_service.service;

import it.profice.corso.annunci_service.DTO.ListingDTO;
import it.profice.corso.annunci_service.Enum.Category;

import java.util.List;

public interface ListingService {

    ListingDTO findByUuid( String uuid );
    List<ListingDTO> findAll();
    ListingDTO save ( ListingDTO listing );
    List<ListingDTO> findByName ( String listingName );
    List<ListingDTO> findByCategory( Category category );

    void deleteByUuid( String uuid );

}
