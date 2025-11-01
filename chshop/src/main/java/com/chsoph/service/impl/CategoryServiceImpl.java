package com.chsoph.service.impl;

import com.chsoph.dto.CategoryDTO;
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

        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setDescription(category.getDescription());

        List<ProductDTO> productDTOs = category.getProducts().stream()
                .map(p -> {
                    ProductDTO pdto = new ProductDTO();
                    pdto.setId(p.getId());
                    pdto.setName(p.getName());
                    pdto.setDescription(p.getDescription());
                    pdto.setPrice(p.getPrice());
                    pdto.setStock(p.getStock());
                    pdto.setImageType(p.getImageType());
                    return pdto;
                })
                .toList();

        dto.setProducts(productDTOs);
        return dto;
    }

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}