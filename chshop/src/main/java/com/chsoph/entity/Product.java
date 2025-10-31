package com.chsoph.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
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
    private Category category;
}