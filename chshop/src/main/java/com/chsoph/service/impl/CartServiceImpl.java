package com.chsoph.service.impl;

import com.chsoph.dto.CartItemRequest;
import com.chsoph.dto.CartItemResponse;
import com.chsoph.dto.CartResponse;
import com.chsoph.entity.Cart;
import com.chsoph.entity.CartItem;
import com.chsoph.entity.Product;
import com.chsoph.exepction.ResourceNotFoundException;
import com.chsoph.repository.CartItemRepository;
import com.chsoph.repository.CartRepository;
import com.chsoph.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CartServiceImpl {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final SessionService sessionService;

    // Sada prima samo sessionId
    public Cart getOrCreateCart(String sessionId) {
        return getOrCreateGuestCart(sessionId);
    }

    private Cart getOrCreateGuestCart(String sessionId) {
        if (!sessionService.isValidSessionId(sessionId)) {
            throw new IllegalArgumentException("Nevažeći session ID");
        }

        return cartRepository.findBySessionIdWithItems(sessionId)
                .orElseGet(() -> createGuestCart(sessionId));
    }

    private Cart createGuestCart(String sessionId) {
        Cart cart = Cart.builder()
                .sessionId(sessionId)
                .cartItems(new ArrayList<>())
                .build();

        return cartRepository.save(cart);
    }

    // Sada prima samo sessionId
    public CartResponse addItemToCart(String sessionId, CartItemRequest request) {
        if (request.getQuantity() <= 0) {
            throw new IllegalArgumentException("Količina mora biti veća od 0");
        }

        Cart cart = getOrCreateCart(sessionId);
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Proizvod nije pronađen"));

        // Proveri da li item već postoji u korpi
        CartItem existingItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), product.getId())
                .orElse(null);

        if (existingItem != null) {
            // Ažuriraj količinu
            existingItem.setQuantity(existingItem.getQuantity() + request.getQuantity());
            cartItemRepository.save(existingItem);
            log.info("Ažurirana količina proizvoda {} u korpi: {}", product.getId(), existingItem.getQuantity());
        } else {
            // Dodaj novi item
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .build();
            cartItemRepository.save(newItem);
            cart.getCartItems().add(newItem);
            log.info("Dodat novi proizvod {} u korpu, količina: {}", product.getId(), request.getQuantity());
        }

        cartRepository.save(cart);
        return mapToCartResponse(cart);
    }

    // Slično ažuriraj sve metode da ne koriste userId
    public CartResponse updateItemQuantity(String sessionId, Long productId, int quantity) {
        if (quantity < 0) {
            throw new IllegalArgumentException("Količina ne može biti negativna");
        }

        Cart cart = getOrCreateCart(sessionId);
        CartItem item = cartItemRepository.findByCartIdAndProductId(cart.getId(), productId)
                .orElseThrow(() -> new ResourceNotFoundException("Proizvod nije pronađen u korpi"));

        if (quantity == 0) {
            cart.getCartItems().remove(item);
            cartItemRepository.delete(item);
            log.info("Uklonjen proizvod {} iz korpe", productId);
        } else {
            item.setQuantity(quantity);
            cartItemRepository.save(item);
            log.info("Ažurirana količina proizvoda {} na: {}", productId, quantity);
        }

        cartRepository.save(cart);
        return mapToCartResponse(cart);
    }

    public CartResponse removeItemFromCart(String sessionId, Long productId) {
        Cart cart = getOrCreateCart(sessionId);
        CartItem item = cartItemRepository.findByCartIdAndProductId(cart.getId(), productId)
                .orElseThrow(() -> new ResourceNotFoundException("Proizvod nije pronađen u korpi"));

        cart.getCartItems().remove(item);
        cartItemRepository.delete(item);
        cartRepository.save(cart);

        log.info("Uklonjen proizvod {} iz korpe", productId);
        return mapToCartResponse(cart);
    }

    public CartResponse clearCart(String sessionId) {
        Cart cart = getOrCreateCart(sessionId);
        cartItemRepository.deleteByCartId(cart.getId());
        cart.getCartItems().clear();
        cartRepository.save(cart);

        log.info("Očišćena korpa");
        return mapToCartResponse(cart);
    }

    public CartResponse getCart(String sessionId) {
        Cart cart = getOrCreateCart(sessionId);
        return mapToCartResponse(cart);
    }

    public int getCartItemCount(String sessionId) {
        Cart cart = getOrCreateCart(sessionId);
        return cart.getCartItems().stream()
                .mapToInt(CartItem::getQuantity)
                .sum();
    }

    // Metoda za merge više ne postoji jer nemamo usera

    private CartResponse mapToCartResponse(Cart cart) {
        List<CartItemResponse> itemResponses = cart.getCartItems().stream()
                .map(this::mapToCartItemResponse)
                .collect(Collectors.toList());

        int totalItems = cart.getCartItems().stream()
                .mapToInt(CartItem::getQuantity)
                .sum();

        BigDecimal totalPrice = cart.getTotalPrice();

        return CartResponse.builder()
                .id(cart.getId())
                .sessionId(cart.getSessionId())
                .items(itemResponses)
                .totalPrice(totalPrice)
                .totalItems(totalItems)
                .build();
    }

    private CartItemResponse mapToCartItemResponse(CartItem cartItem) {
        BigDecimal itemTotalPrice = cartItem.getTotalPrice();

        return CartItemResponse.builder()
                .id(cartItem.getId())
                .productId(cartItem.getProduct().getId())
                .productName(cartItem.getProduct().getName())
                .productPrice(cartItem.getProduct().getPrice())
                .quantity(cartItem.getQuantity())
                .totalPrice(itemTotalPrice)
                .build();
    }
}