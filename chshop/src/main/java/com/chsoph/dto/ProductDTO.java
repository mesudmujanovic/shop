package com.chsoph.dto;

import com.chsoph.entity.Product;
import com.chsoph.entity.ProductImage;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class ProductDTO {
        private Long id;
        private String name;
        private String description;
        private BigDecimal price;
        private int stock;
        private List<ProductImageDTO> images;
        private String specifications;
        private CategoryDTO category;
        private String uvodIspodCene;
        private String gramaza;
        private String tipKoze;
        private String tekstura;
        private String stanjeKoze;
        private String najboljeZa;
        private String primena;
        private String dobroJeZnati;
        private String kljucnePrednosti;
        private String opis1;
        private String opis2;
        private String opis3;
        private String opis4;
        private String kakoSeKoristi;
        private String formulisanBez;
        private String sastav;

    // Ostala polja (npr. category id) po potrebi...

    public static ProductDTO fromEntity(Product product) {
        if (product == null) return null;

        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setSpecifications(product.getSpecifications());

        // NOVA POLJA
        dto.setUvodIspodCene(product.getUvodIspodCene());
        dto.setGramaza(product.getGramaza());
        dto.setTipKoze(product.getTipKoze());
        dto.setTekstura(product.getTekstura());
        dto.setStanjeKoze(product.getStanjeKoze());
        dto.setNajboljeZa(product.getNajboljeZa());
        dto.setPrimena(product.getPrimena());
        dto.setDobroJeZnati(product.getDobroJeZnati());
        dto.setKljucnePrednosti(product.getKljucnePrednosti());
        dto.setOpis1(product.getOpis1());
        dto.setOpis2(product.getOpis2());
        dto.setOpis3(product.getOpis3());
        dto.setOpis4(product.getOpis4());
        dto.setKakoSeKoristi(product.getKakoSeKoristi());
        dto.setFormulisanBez(product.getFormulisanBez());
        dto.setSastav(product.getSastav());

        // Kategorija
        if (product.getCategory() != null) {
            dto.setCategory(CategoryDTO.fromEntity(product.getCategory()));
        }

        // Slike
        if (product.getImages() != null && !product.getImages().isEmpty()) {
            List<ProductImageDTO> imageDTOs = product.getImages().stream()
                    .map(ProductImageDTO::fromEntity)
                    .collect(Collectors.toList());
            dto.setImages(imageDTOs);
        }

        return dto;
    }
}
