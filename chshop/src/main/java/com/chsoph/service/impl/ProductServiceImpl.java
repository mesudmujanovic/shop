package com.chsoph.service.impl;

import com.chsoph.dto.ProductDTO;
import com.chsoph.dto.ProductImageDTO;
import com.chsoph.entity.Category;
import com.chsoph.entity.Product;
import com.chsoph.entity.ProductImage;
import com.chsoph.repository.CategoryRepository;
import com.chsoph.repository.ProductRepository;
import com.chsoph.service.ProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public Product saveProduct(Product product) {
        if (product.getCategory() != null && product.getCategory().getId() != null) {
            Category category = categoryRepository.findById(product.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        }

        if (product.getImages() != null) {
            for (ProductImage image : product.getImages()) {
                image.setProduct(product);
            }
        }

        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAllWithImages();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findByIdWithImages(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
