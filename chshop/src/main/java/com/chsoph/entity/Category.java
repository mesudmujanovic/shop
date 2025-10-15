package com.chsoph.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
@Entity
@Data
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    @JsonBackReference
    private Category parent;

    @OneToMany(mappedBy = "category")
    @JsonManagedReference
    private List<Product> products;
}