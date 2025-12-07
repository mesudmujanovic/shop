package com.chsoph.service.impl;

import com.chsoph.dto.CartResponse;
import com.chsoph.dto.GuestOrderRequest;
import com.chsoph.entity.OrderItem;
import com.chsoph.entity.Orders;
import com.chsoph.entity.Payment;
import com.chsoph.entity.Product;
import com.chsoph.exepction.ResourceNotFoundException;
import com.chsoph.repository.*;
import com.chsoph.service.OrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrdersServiceImpl implements OrderService {

    private final OrdersRepository ordersRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;
    private final PaymentRepository paymentRepository;
    private final CartServiceImpl cartService;

    @Override
    @Transactional
    public Orders placeOrderFromCart(String sessionId, GuestOrderRequest guestOrderRequest) {
        CartResponse cart = cartService.getCart(sessionId);

        if (cart.getItems().isEmpty()) {
            throw new IllegalStateException("Korpa je prazna");
        }

        // Kreiraj order sa guest podacima
        Orders orders = Orders.builder()
                .orderNumber(UUID.randomUUID().toString())
                .status("PENDING_PAYMENT")
                .createdDate(LocalDateTime.now())
                .guestEmail(guestOrderRequest.getEmail())
                .guestFirstName(guestOrderRequest.getFirstName())
                .guestLastName(guestOrderRequest.getLastName())
                .guestAddress(guestOrderRequest.getAddress())
                .guestPhone(guestOrderRequest.getPhone())
                .build();

        orders = ordersRepository.save(orders);
        final Orders finalOrders = orders;

        List<OrderItem> orderItems = cart.getItems().stream()
                .map(cartItem -> {
                    Product product = productRepository.findById(cartItem.getProductId())
                            .orElseThrow(() -> new ResourceNotFoundException("Proizvod nije pronađen"));

                    return OrderItem.builder()
                            .order(finalOrders)
                            .product(product)
                            .quantity(cartItem.getQuantity())
                            .price(cartItem.getTotalPrice())
                            .build();
                })
                .collect(Collectors.toList());

        orderItemRepository.saveAll(orderItems);

        orders.setTotalAmount(cart.getTotalPrice());
        orders.setOrderItems(orderItems);
        orders = ordersRepository.save(orders);

        // Očisti korpu nakon kreiranja porudžbine
        cartService.clearCart(sessionId);

        // Kreiraj payment
        Payment payment = Payment.builder()
                .order(orders)
                .amount(cart.getTotalPrice())
                .method("CARD")
                .status("PENDING")
                .createdDate(LocalDateTime.now())
                .build();

        paymentRepository.save(payment); 
        orders.setPayment(payment);

        log.info("Kreirana guest porudžbina, session: {}, order ID: {}", sessionId, orders.getId());
        return ordersRepository.save(orders);
    }

    @Override
    public List<Orders> getOrdersByUser(Long userId) {
        return null;
    }

    @Override
    public Orders getOrderById(Long userId, Long orderId) {
        return null;
    }
}
