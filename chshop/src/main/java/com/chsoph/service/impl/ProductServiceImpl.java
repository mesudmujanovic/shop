package com.chsoph.service.impl;

import com.chsoph.entity.Category;
import com.chsoph.entity.Product;
import com.chsoph.repository.CategoryRepository;
import com.chsoph.repository.ProductRepository;
import com.chsoph.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public Product saveProduct(Product product) {
        if (product.getCategory() != null && product.getCategory().getId() != null) {
            Category category = categoryRepository.findById(product.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        }
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        List<Product> products = productRepository.findAll();
        products.forEach(p -> {
            p.getImages().forEach(img -> {
                if (img.getImageData() != null) {
                    img.setImageBase64(Base64.getEncoder().encodeToString(img.getImageData()));
                }
            });
        });
        return products;
    }

    @Override
    public Product getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        product.getImages().forEach(img -> {
            if (img.getImageData() != null) {
                img.setImageBase64(Base64.getEncoder().encodeToString(img.getImageData()));
            }
        });
        return product;
    }


    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
