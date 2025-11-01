package com.chsoph.service;

import com.chsoph.dto.CategoryDTO;
import com.chsoph.entity.Category;

import java.util.List;

public interface CategoryService {
    List<CategoryDTO> getAllCategories();
    Category getCategoryById(Long id);
    Category saveCategory(Category category);
    void deleteCategory(Long id);
}
