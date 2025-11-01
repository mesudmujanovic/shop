package com.chsoph.dto;

import com.chsoph.entity.Category;
import com.chsoph.entity.Product;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class CategoryDTO {
    private Long id;
    private String name;
    private String description;
    private List<ProductDTO> products;

    public static CategoryDTO fromEntity(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setDescription(category.getDescription());

        if (category.getProducts() != null) {
            dto.setProducts(category.getProducts().stream()
                    .map(ProductDTO::fromEntity)
                    .collect(Collectors.toList()));
        }

        return dto;
    }
}