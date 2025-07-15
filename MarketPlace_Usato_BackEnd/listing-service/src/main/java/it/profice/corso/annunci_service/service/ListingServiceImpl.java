package it.profice.corso.annunci_service.service;

import it.profice.corso.annunci_service.DTO.ListingDTO;
import it.profice.corso.annunci_service.Enum.Category;
import it.profice.corso.annunci_service.config.WebClientBuilderConfig;
import it.profice.corso.annunci_service.exception.ListingNotFoundException;
import it.profice.corso.annunci_service.model.Listing;
import it.profice.corso.annunci_service.repository.ListingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ListingServiceImpl implements ListingService{

    private final ListingRepository listingRepository;

    @Override
    public ListingDTO findByUuid(String uuid) {
        return modelToDto( listingRepository.findByUuid( uuid ).orElseThrow(ListingNotFoundException::new));
    }

    @Override
    public List<ListingDTO> findAll() {
        return listingRepository.findAll()
                .stream()
                .map(this::modelToDto)
                .toList();
    }

    @Override
    public ListingDTO save( ListingDTO listing ) {
        listing.setUuid(UUID.randomUUID().toString());
        return modelToDto( listingRepository.save( dtoToModel( listing ) ) );
    }

    @Override
    public List<ListingDTO> findByName(String listingName) {
        return listingRepository.findByListingName( "%" + listingName + "%")
                .stream()
                .map(this::modelToDto)
                .toList();
    }

    @Override
    public List<ListingDTO> findByCategory(Category category) {
        return listingRepository.findByCategory( category )
                .stream()
                .map(this::modelToDto)
                .toList();
    }

    @Override
    public List<ListingDTO> findByPrice(Double price) {
        return listingRepository.findByPrice( price )
                .stream()
                .map(this::modelToDto)
                .toList();
    }

    @Override
    public void deleteByUuid(String uuid) {
        Listing listingToDelete = listingRepository.findByUuid( uuid ).orElseThrow(ListingNotFoundException::new);
        listingRepository.deleteById(listingToDelete.getId());
    }

    @Override
    public ResponseEntity<ListingDTO> toggleFavourite(String uuid) {
        {
            ListingDTO listing = findByUuid(uuid);

            if (listing != null) {
                listing.setFavourite();
                return ResponseEntity.ok(listing);
            } else {
                return ResponseEntity.notFound().build();
            }
        }
    }

    public ListingDTO modelToDto(Listing listing){
        return ListingDTO.builder()
                .uuid(listing.getUuid())
                .userUuid(listing.getUserUuid())
                .listingName(listing.getListingName())
                .sellersName(listing.getSellersName())
                .description(listing.getDescription())
                .favorite(listing.isFavorite())
                .category(listing.getCategory())
                .price(listing.getPrice())
                .build();
    }

    public Listing dtoToModel (ListingDTO listingDto){
        return Listing.builder()
                .uuid(listingDto.getUuid())
                .userUuid(listingDto.getUserUuid())
                .listingName(listingDto.getListingName())
                .sellersName(listingDto.getSellersName())
                .description(listingDto.getDescription())
                .favorite(listingDto.isFavorite())
                .category(listingDto.getCategory())
                .price(listingDto.getPrice())
                .build();
    }
}
