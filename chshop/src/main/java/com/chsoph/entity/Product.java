package com.chsoph.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 1000)
    private String description;

    private BigDecimal price;

    private int stock;

    @Lob
    @JsonIgnore
    @Column(name = "image_data")
    private byte[] imageData;

    private String imageType;

    @Transient
    private String imageBase64;

    @Column(length = 2000)
    private String specifications;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonBackReference
    @JsonIgnoreProperties({"imageData", "imageType", "imageBase64"})
    private Category category;
}