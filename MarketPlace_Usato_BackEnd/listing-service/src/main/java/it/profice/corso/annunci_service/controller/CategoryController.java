package it.profice.corso.annunci_service.controller;

import it.profice.corso.annunci_service.DTO.CategoryDTO;
import it.profice.corso.annunci_service.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/category")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public List<CategoryDTO> findAll(){ return categoryService.findAll(); }

    @PostMapping
    public CategoryDTO addCategory(@RequestBody CategoryDTO categoryDTO ){
        return categoryService.addCategory( categoryDTO );
    }

}
