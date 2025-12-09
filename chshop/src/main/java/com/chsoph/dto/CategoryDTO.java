package com.chsoph.dto;

import com.chsoph.entity.Category;
import com.chsoph.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDTO {
    private Long id;
    private String name;
    private String description;
    private Long productCount;

    public static CategoryDTO fromEntity(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setDescription(category.getDescription());

        // Ako je eager loadovano, koristi veličinu kolekcije
        if (category.getProducts() != null) {
            dto.setProductCount((long) category.getProducts().size());
        } else {
            dto.setProductCount(0L);
        }

        return dto;
    }
}