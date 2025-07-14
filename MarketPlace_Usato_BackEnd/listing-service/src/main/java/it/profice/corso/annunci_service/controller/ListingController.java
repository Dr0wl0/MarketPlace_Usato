package it.profice.corso.annunci_service.controller;

import it.profice.corso.annunci_service.DTO.ListingDTO;
import it.profice.corso.annunci_service.Enum.Category;
import it.profice.corso.annunci_service.service.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/listings")
public class ListingController {

    private final ListingService listingService;

    @GetMapping
    public List<ListingDTO> findAll() { return listingService.findAll(); }

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
        return listingService.findByCategory(Category.valueOf(categoryString.toUpperCase()));
    }

    @DeleteMapping("/{uuid}")
    public void deleteListing( @PathVariable String uuid ){
        listingService.deleteByUuid( uuid );
    }
}
