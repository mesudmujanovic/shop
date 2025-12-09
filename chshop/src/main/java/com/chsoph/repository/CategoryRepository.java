package com.chsoph.repository;

import com.chsoph.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // Za sve kategorije sa proizvodima
    @Query("SELECT DISTINCT c FROM Category c LEFT JOIN FETCH c.products WHERE c.parent IS NULL")
    List<Category> findAllTopLevelWithProducts();

    // Za kategoriju sa proizvodima po ID-u
    @Query("SELECT c FROM Category c LEFT JOIN FETCH c.products WHERE c.id = :id")
    Optional<Category> findByIdWithProducts(@Param("id") Long id);

    // Broj proizvoda po kategoriji
    @Query("SELECT COUNT(p) FROM Product p WHERE p.category.id = :categoryId")
    Long countProductsByCategory(@Param("categoryId") Long categoryId);
}
