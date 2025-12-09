package com.chsoph.dto;

import com.chsoph.entity.ProductImage;
import lombok.Data;

@Data
public class ProductImageDTO {
    private Long id;
    private String imageBase64;
    private String imageType;

    public static ProductImageDTO fromEntity(ProductImage image) {
        if (image == null) return null;

        ProductImageDTO dto = new ProductImageDTO();
        dto.setId(image.getId());
        dto.setImageBase64(image.getImageBase64());
        dto.setImageType(image.getImageType());

        return dto;
    }
}