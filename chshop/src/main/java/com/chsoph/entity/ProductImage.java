package com.chsoph.entity;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Base64;


@Entity
@Data
@Table(name = "product_image")
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Umesto @Lob, koristi bytea za PostgreSQL
    @Column(name = "image_data", columnDefinition = "bytea")
    private byte[] imageData;

    private String imageType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    @JsonIgnoreProperties({"images", "category"}) // Ignoriši cirkularnu referencu
    private Product product;

    @Transient
    private String imageBase64;

    @JsonGetter("imageBase64")
    public String getImageBase64() {
        if (this.imageData != null && this.imageBase64 == null) {
            this.imageBase64 = Base64.getEncoder().encodeToString(this.imageData);
        }
        return this.imageBase64;
    }

    @JsonSetter("imageBase64")
    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
        if (imageBase64 != null) {
            this.imageData = Base64.getDecoder().decode(imageBase64);
        }
    }
}