package com.chsoph.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 10000)
    private String description;

    private BigDecimal price;

    private int stock;

    @Column(length = 10000)
    private String uvodIspodCene;
    @Column(length = 10000)
    private String gramaza;
    @Column(length = 10000)
    private String tipKoze;
    @Column(length = 10000)
    private String tekstura;
    @Column(length = 10000)
    private String stanjeKoze;
    @Column(length = 10000)
    private String najboljeZa;
    @Column(length = 10000)
    private String primena;
    @Column(length = 10000)
    private String dobroJeZnati;
    @Column(length = 10000)
    private String kljucnePrednosti;
    @Column(length = 10000)
    private String opis1;
    @Column(length = 10000)
    private String opis2;
    @Column(length = 10000)
    private String opis3;
    @Column(length = 10000)
    private String opis4;
    @Column(length = 10000)
    private String kakoSeKoristi;
    @Column(length = 10000)
    private String formulisanBez;
    @Column(length = 10000)
    private String sastav;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("product") // Ignoriši product u ProductImage da izbegneš cirkularnost
    private List<ProductImage> images = new ArrayList<>();

    @Column(length = 2000)
    private String specifications;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties({"products", "parent"}) // Ignoriši products u Category da izbegneš cirkularnost
    private Category category;
}