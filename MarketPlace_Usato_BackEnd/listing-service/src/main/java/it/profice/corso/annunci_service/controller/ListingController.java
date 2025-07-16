package it.profice.corso.annunci_service.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import it.profice.corso.annunci_service.DTO.ListingDTO;
import it.profice.corso.annunci_service.service.ListingService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/listings")
public class ListingController {

    private final ListingService listingService;

    @GetMapping
    public List<ListingDTO> findAll() { return listingService.findAll(); }

    @GetMapping("/user/{userUuid}")
    public List<ListingDTO> findByUserUuid(@PathVariable String userUuid){
        return listingService.findByUserUuid(userUuid);
    }

    @GetMapping("/favorites")
    public List<ListingDTO> findByFavorite(){
        return listingService.findByFavorite();
    }

    @PatchMapping("/{userUuid}/{uuid}/favorite")
    public ListingDTO setFavorite(@PathVariable String userUuid, @PathVariable String uuid){
        return listingService.updateToFavorite(uuid,userUuid);
    }

    @GetMapping("/{uuid}/listing")
    public ListingDTO findByUuid(@PathVariable String uuid){
        return listingService.findByUuid(uuid);
    }

    @PostMapping
    public ListingDTO save (@RequestBody ListingDTO listing ){
        return listingService.save( listing );
    }

    @GetMapping("/search/{listingName}")
    public List<ListingDTO> findByListingName(@PathVariable String listingName ){
        return listingService.findByName( "%" + listingName + "%" );
    }

    @GetMapping("/search/category/{categoryString}")
    public List<ListingDTO> findByCategory( @PathVariable String categoryString ){
        return listingService.findByCategory(categoryString.toUpperCase());
    }

    @GetMapping("/search/price/{price}")
    public List<ListingDTO> findByPrice( @PathVariable Double price ){
        return listingService.findByPrice( price );
    }

    @DeleteMapping("/{uuid}")
    public void deleteListing( @PathVariable String uuid ){
        listingService.deleteByUuid( uuid );
    }

}
