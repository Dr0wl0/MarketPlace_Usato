package it.profice.corso.annunci_service.service;

import it.profice.corso.annunci_service.DTO.ListingDTO;
import it.profice.corso.annunci_service.Enum.Category;
import it.profice.corso.annunci_service.model.Listing;
import it.profice.corso.annunci_service.repository.ListingRepository;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ListingServiceImpl implements ListingService{

    private final ListingRepository listingRepository;

    @Override
    public List<ListingDTO> findAll() {
        return listingRepository.findAll()
                .stream()
                .map(this::modelToDto)
                .toList();
    }

    @Override
    public ListingDTO save(ListingDTO listing) {
        listing.setUuid(UUID.randomUUID().toString());
        return modelToDto( listingRepository.save( dtoToModel( listing ) ) );
    }

    @Override
    public ListingDTO findByName(String listingName) {
        return null;
    }

    @Override
    public List<ListingDTO> findByCategory(Category category) {
        return List.of();
    }

    @Override
    public void deleteByUuid(ListingDTO listing, String sellersName) {

    }

    public ListingDTO modelToDto(Listing listing){
        return ListingDTO.builder()
                .uuid(listing.getUuid())
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
                .listingName(listingDto.getListingName())
                .sellersName(listingDto.getSellersName())
                .description(listingDto.getDescription())
                .favorite(listingDto.isFavorite())
                .category(listingDto.getCategory())
                .price(listingDto.getPrice())
                .build();
    }
}
