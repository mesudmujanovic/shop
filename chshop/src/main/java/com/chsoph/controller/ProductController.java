package com.chsoph.controller;

import com.chsoph.dto.ProductDTO;
import com.chsoph.entity.Product;
import com.chsoph.entity.ProductImage;
import com.chsoph.repository.ProductRepository;
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
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProductController {
    private final ProductService productService;
    private final ProductRepository productRepository;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductDTO> createProduct(
            @RequestPart("product") String productJson,
            @RequestPart(value = "images", required = false) MultipartFile[] images
    ) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Product product = mapper.readValue(productJson, Product.class);

        if (images != null) {
            List<ProductImage> productImages = new ArrayList<>();
            for (MultipartFile img : images) {
                if (!img.isEmpty()) {
                    ProductImage pi = new ProductImage();
                    pi.setImageBase64(Base64.getEncoder().encodeToString(img.getBytes()));
                    pi.setImageType(img.getContentType());
                    pi.setProduct(product);
                    productImages.add(pi);
                }
            }
            product.setImages(productImages);
        }

        Product saved = productService.saveProduct(product);
        ProductDTO dto = ProductDTO.fromEntity(saved);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        List<ProductDTO> dtos = products.stream()
                .map(ProductDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        ProductDTO dto = ProductDTO.fromEntity(product);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/bestsellers")
    public ResponseEntity<List<ProductDTO>> getBestsellers() {
        List<Product> allProducts = productRepository.findAll();

        // Izaberi random 10
        Collections.shuffle(allProducts);
        List<Product> randomTen = allProducts.stream()
                .limit(12)
                .collect(Collectors.toList());

        List<ProductDTO> dtos = randomTen.stream()
                .map(ProductDTO::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }
}