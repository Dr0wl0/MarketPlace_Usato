package it.profice.corso.annunci_service.service;

import it.profice.corso.annunci_service.DTO.CategoryDTO;
import it.profice.corso.annunci_service.model.Category;
import it.profice.corso.annunci_service.repository.CategoryRepositroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepositroy categoryRepositroy;

    @Override
    public CategoryDTO addCategory(CategoryDTO category) {
        category.setUuid(UUID.randomUUID().toString());
        return modelToDto(categoryRepositroy.save(dtoToModel( category )));
    }

    @Override
    public List<CategoryDTO> findAll() {
        return categoryRepositroy.findAll()
                .stream()
                .map(this::modelToDto)
                .toList();
    }


    public CategoryDTO modelToDto(Category category){
        return CategoryDTO.builder()
                .uuid(category.getUuid())
                .name(category.getName())
                .build();
    }

    public Category dtoToModel(CategoryDTO categoryDTO){
        return Category.builder()
                .uuid(categoryDTO.getUuid())
                .name(categoryDTO.getName())
                .build();
    }

}
