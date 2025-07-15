package it.profice.corso.annunci_service.service;

import it.profice.corso.annunci_service.DTO.ListingDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ListingService {

    ListingDTO findByUuid( String uuid );
    List<ListingDTO> findAll();
    ListingDTO save ( ListingDTO listing );
    List<ListingDTO> findByName ( String listingName );
    List<ListingDTO> findByCategory( String categoryName );
    List<ListingDTO> findByPrice( Double price );

    void deleteByUuid( String uuid );

    ResponseEntity<ListingDTO>  toggleFavourite(String uuid);
}
