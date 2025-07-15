package it.profice.corso.annunci_service.repository;

import it.profice.corso.annunci_service.model.Category;
import it.profice.corso.annunci_service.model.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {

    @Query(value = "SELECT * FROM Listing l WHERE LOWER(l.listing_name) LIKE LOWER( :name )", nativeQuery = true)
    List<Listing> findByListingName(@Param( value = "name") String listingName );

    @Query(value = "SELECT * FROM Listing l WHERE UPPER(l.category.category) = :categoryName", nativeQuery = true)
    List<Listing> findByCategoryName( String categoryName );

    Optional<Listing> findByUuid(String uuid );

    @Query(value = "SELECT * FROM Listing l WHERE l.price BETWEEN 0.0 AND :price", nativeQuery = true)
    List<Listing> findByPrice( Double price );

}