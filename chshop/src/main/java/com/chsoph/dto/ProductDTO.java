package com.chsoph.dto;

import com.chsoph.entity.Product;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Base64;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private int stock;
    private String imageType;
    private String imageBase64;
    private String specifications;

    public static ProductDTO fromEntity(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setImageType(product.getImageType());
        dto.setSpecifications(product.getSpecifications());

        // Konvertuj byte[] u Base64 samo ako postoji
        if (product.getImageData() != null && product.getImageData().length > 0) {
            dto.setImageBase64(Base64.getEncoder().encodeToString(product.getImageData()));
        }

        return dto;
    }
}