package com.chsoph.service.impl;

import com.chsoph.dto.CategoryDTO;
import com.chsoph.dto.NavigationCategoryDTO;
import com.chsoph.dto.ProductDTO;
import com.chsoph.entity.Category;
import com.chsoph.repository.CategoryRepository;
import com.chsoph.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(CategoryDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryDTO getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        return CategoryDTO.fromEntity(category);
    }

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public List<Category> getAllCategoriesWithProducts() {
        return categoryRepository.findAllTopLevelWithProducts();
    }

    @Override
    public Category getCategoryWithProducts(Long id) {
        return categoryRepository.findByIdWithProducts(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Override
    public Long getProductCountByCategory(Long categoryId) {
        return categoryRepository.countProductsByCategory(categoryId);
    }

    @Override
    public List<NavigationCategoryDTO> getCategoriesForNavigation() {
        return List.of();
    }
}