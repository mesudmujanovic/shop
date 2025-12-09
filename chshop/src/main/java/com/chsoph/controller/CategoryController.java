package com.chsoph.controller;

import com.chsoph.dto.CategoryDTO;
import com.chsoph.entity.Category;
import com.chsoph.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return categoryService.saveCategory(category);
    }

    @GetMapping("/for-navigation")
    public ResponseEntity<List<Map<String, Object>>> getCategoriesForNavigation() {
        List<Category> categories = categoryService.getAllCategoriesWithProducts();

        List<Map<String, Object>> navigationCategories = categories.stream()
                .filter(c -> c.getParent() == null)
                .map(c -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", c.getId());
                    map.put("name", c.getName());
                    map.put("description", c.getDescription());
                    map.put("productCount", c.getProducts() != null ? c.getProducts().size() : 0);
                    return map;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(navigationCategories);
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategoriesWithProducts();
        List<CategoryDTO> dtos = categories.stream()
                .map(CategoryDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.getCategoryWithProducts(id));
    }

    @GetMapping("/{id}/product-count")
    public ResponseEntity<Long> getProductCount(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.getProductCountByCategory(id));
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }
}
