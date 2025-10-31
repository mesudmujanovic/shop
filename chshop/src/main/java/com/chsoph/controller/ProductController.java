package com.chsoph.controller;

import com.chsoph.entity.Product;
import com.chsoph.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProductController {
    private final ProductService productService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> createProduct(
            @RequestPart("product") String productJson,
            @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        Product product = mapper.readValue(productJson, Product.class);

        if (image != null && !image.isEmpty()) {
            product.setImageData(image.getBytes());
            product.setImageType(image.getContentType());
        }

        Product saved = productService.saveProduct(product);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
