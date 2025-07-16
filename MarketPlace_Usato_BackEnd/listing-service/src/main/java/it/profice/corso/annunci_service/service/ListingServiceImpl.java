package it.profice.corso.annunci_service.service;

import it.profice.corso.annunci_service.DTO.CategoryDTO;
import it.profice.corso.annunci_service.DTO.ListingDTO;
import it.profice.corso.annunci_service.exception.CategoryNotFound;
import it.profice.corso.annunci_service.exception.ListingNotFoundException;
import it.profice.corso.annunci_service.model.Category;
import it.profice.corso.annunci_service.model.Listing;
import it.profice.corso.annunci_service.repository.CategoryRepositroy;
import it.profice.corso.annunci_service.repository.ListingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ListingServiceImpl implements ListingService{

    private final ListingRepository listingRepository;
    private final CategoryRepositroy categoryRepositroy;

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

        Category category = categoryRepositroy.findCategoryByName(listing.getCategoryName()).orElseThrow(CategoryNotFound::new);

        Listing listing1 = Listing.builder()
                .category(category)
                .build();

        return modelToDto( listingRepository.save( dtoToModel( listing, category ) ) );
    }

    @Override
    public List<ListingDTO> findByName(String listingName) {
        return listingRepository.findByListingName( "%" + listingName + "%")
                .stream()
                .map(this::modelToDto)
                .toList();
    }

    @Override
    public List<ListingDTO> findByCategory(String categoryName) {
        List<Listing> listings = listingRepository.findByCategoryName(categoryName);
        return listings.stream()
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
    public List<ListingDTO> findByUserUuid(String userUuid) {
        return listingRepository.findByUserUuid(userUuid).stream()
                .map(this::modelToDto)
                .toList();
    }

    @Override
    public List<ListingDTO> findByFavorite() {
        return listingRepository.findByFavorite().stream()
                .map(this::modelToDto)
                .toList();
    }

    @Override
    public ListingDTO updateToFavorite(String uuid, String userUuidFav) {
        Listing toSetFav = listingRepository.findByUuid(uuid).orElseThrow(ListingNotFoundException::new);
        toSetFav.setFavorite(!toSetFav.isFavorite());
        toSetFav.setUserUuidFav(userUuidFav);
        return modelToDto(listingRepository.save(toSetFav));
    }

    @Override
    public void deleteByUuid(String uuid) {
        Listing listingToDelete = listingRepository.findByUuid( uuid ).orElseThrow(ListingNotFoundException::new);
        listingRepository.deleteById(listingToDelete.getId());
    }



    public ListingDTO modelToDto(Listing listing){
        return ListingDTO.builder()
                .uuid(listing.getUuid())
                .userUuid(listing.getUserUuid())
                .listingName(listing.getListingName())
                .sellersName(listing.getSellersName())
                .description(listing.getDescription())
                .favorite(listing.isFavorite())
                .categoryName(listing.getCategory().getName())
                .price(listing.getPrice())
                .build();
    }

    public Listing dtoToModel (ListingDTO listingDto, Category category){
        return Listing.builder()
                .uuid(listingDto.getUuid())
                .userUuid(listingDto.getUserUuid())
                .listingName(listingDto.getListingName())
                .sellersName(listingDto.getSellersName())
                .description(listingDto.getDescription())
                .favorite(listingDto.isFavorite())
                .category(category)
                .price(listingDto.getPrice())
                .build();
    }
}
