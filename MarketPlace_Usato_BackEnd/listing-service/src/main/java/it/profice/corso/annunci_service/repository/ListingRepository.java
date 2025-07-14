package it.profice.corso.annunci_service.repository;

import it.profice.corso.annunci_service.model.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {

    Listing findByListingName( String listingName );

}