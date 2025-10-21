package com.chsoph.controller;

import com.chsoph.dto.CartItemRequest;
import com.chsoph.dto.CartResponse;
import com.chsoph.service.impl.CartServiceImpl;
import com.chsoph.service.impl.SessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("*")
public class CartController {

    private final CartServiceImpl cartService;
    private final SessionService sessionService;

    @PostMapping("/session")
    public ResponseEntity<Map<String, String>> createSession() {
        String sessionId = sessionService.generateSessionId();
        return ResponseEntity.ok(Map.of("sessionId", sessionId));
    }

    @GetMapping
    public ResponseEntity<CartResponse> getCart(@RequestParam String sessionId) {
        try {
            CartResponse cart = cartService.getCart(sessionId);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            log.error("Greška pri dobijanju korpe", e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/items")
    public ResponseEntity<CartResponse> addItemToCart(
            @RequestParam String sessionId,
            @RequestBody CartItemRequest request) {
        try {
            CartResponse cart = cartService.addItemToCart(sessionId, request);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            log.error("Greška pri dodavanju proizvoda u korpu", e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/items")
    public ResponseEntity<CartResponse> updateItemQuantity(
            @RequestParam String sessionId,
            @RequestParam Long productId,
            @RequestParam int quantity) {
        try {
            CartResponse cart = cartService.updateItemQuantity(sessionId, productId, quantity);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            log.error("Greška pri ažuriranju količine", e);
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/items")
    public ResponseEntity<CartResponse> removeItemFromCart(
            @RequestParam String sessionId,
            @RequestParam Long productId) {
        try {
            CartResponse cart = cartService.removeItemFromCart(sessionId, productId);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            log.error("Greška pri uklanjanju proizvoda iz korpe", e);
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/clear")
    public ResponseEntity<CartResponse> clearCart(@RequestParam String sessionId) {
        try {
            CartResponse cart = cartService.clearCart(sessionId);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            log.error("Greška pri čišćenju korpe", e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> getCartItemCount(@RequestParam String sessionId) {
        try {
            int count = cartService.getCartItemCount(sessionId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            log.error("Greška pri dobijanju broja stavki u korpi", e);
            return ResponseEntity.badRequest().build();
        }
    }
}