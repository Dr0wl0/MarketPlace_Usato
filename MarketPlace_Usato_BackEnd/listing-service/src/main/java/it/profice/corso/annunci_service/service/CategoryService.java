package it.profice.corso.annunci_service.service;

import it.profice.corso.annunci_service.DTO.CategoryDTO;

import java.util.List;

public interface CategoryService {

    CategoryDTO addCategory(CategoryDTO category );
    List<CategoryDTO> findAll();


}
