package com.chsoph.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NavigationCategoryDTO {
    private Long id;
    private String name;
    private String description;
    private Long productCount;
}