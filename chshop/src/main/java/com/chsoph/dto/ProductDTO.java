package com.chsoph.dto;

import com.chsoph.entity.Product;
import com.chsoph.entity.ProductImage;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private int stock;
    private String specifications;

    // Nova polja: lista slika (base64)
    private List<String> imagesBase64 = new ArrayList<>();

    // Ostala polja (npr. category id) po potrebi...

    public static ProductDTO fromEntity(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setSpecifications(product.getSpecifications());

        if (product.getImages() != null) {
            for (ProductImage img : product.getImages()) {
                if (img.getImageData() != null && img.getImageData().length > 0) {
                    String base64 = Base64.getEncoder().encodeToString(img.getImageData());
                    dto.getImagesBase64().add(base64);
                }
            }
        }

        return dto;
    }
}
