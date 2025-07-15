package it.profice.corso.annunci_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.profice.corso.annunci_service.DTO.ListingDTO;
import it.profice.corso.annunci_service.Enum.Category;
import it.profice.corso.annunci_service.service.ListingService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/listings")
@CrossOrigin(origins = "http://localhost:4200")
public class ListingController {

    @Autowired
    private final ListingService listingService=null; //rimuovi il null se da problemi

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
