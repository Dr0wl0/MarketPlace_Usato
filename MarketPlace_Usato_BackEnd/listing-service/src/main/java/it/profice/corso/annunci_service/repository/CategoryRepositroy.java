package it.profice.corso.annunci_service.repository;

import it.profice.corso.annunci_service.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepositroy extends JpaRepository<Category, Long> {

    Optional<Category> findCategoryByName(String categoryName );

}
