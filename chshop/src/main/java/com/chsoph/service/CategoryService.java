package com.chsoph.service;

import com.chsoph.dto.CategoryDTO;
import com.chsoph.dto.NavigationCategoryDTO;
import com.chsoph.entity.Category;

import java.util.List;

public interface CategoryService {
    List<CategoryDTO> getAllCategories();
    CategoryDTO getCategoryById(Long id);
    Category saveCategory(Category category);
    void deleteCategory(Long id);
    List<Category> getAllCategoriesWithProducts();

    /**
     * Vraća kategoriju sa proizvodima po ID-u
     */
    Category getCategoryWithProducts(Long id);

    /**
     * Vraća broj proizvoda u kategoriji
     */
    Long getProductCountByCategory(Long categoryId);

    /**
     * Vraća kategorije za navigaciju sa brojem proizvoda
     */
    List<NavigationCategoryDTO> getCategoriesForNavigation();
}
