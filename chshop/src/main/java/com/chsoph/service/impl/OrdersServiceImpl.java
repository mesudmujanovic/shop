package com.chsoph.service.impl;

import com.chsoph.dto.OrderRequest;
import com.chsoph.entity.*;
import com.chsoph.exepction.ResourceNotFoundException;
import com.chsoph.repository.*;
import com.chsoph.service.OrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrdersServiceImpl implements OrderService {

    private final OrdersRepository ordersRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;
    private final PaymentRepository paymentRepository;

    @Override
    @Transactional
    public Orders placeOrder(Long userId, OrderRequest orderRequest) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Orders orders = Orders.builder()
            .user(user)
            .orderNumber(UUID.randomUUID().toString())
            .status("NEW")
            .createdDate(LocalDateTime.now())
            .build();

        orders = ordersRepository.save(orders);
        final Orders savedOrders = orders;

        List<OrderItem> orderItems = orderRequest.getItems().stream()
            .map(itemRequest -> {
                Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

                return OrderItem.builder()
                    .order(savedOrders)
                    .product(product)
                    .quantity(itemRequest.getQuantity())
                    .price(product.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())))
                    .build();
            })
            .collect(Collectors.toList());

        orderItemRepository.saveAll(orderItems);

        BigDecimal totalAmount = orderItems.stream()
            .map(OrderItem::getPrice)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        orders.setTotalAmount(totalAmount);
        orders.setOrderItems(orderItems);
        orders = ordersRepository.save(orders);

        Payment payment = Payment.builder()
            .order(orders)
            .amount(totalAmount)
            .method("NOT_SET")
            .status("PENDING")
            .build();

        paymentRepository.save(payment);

        orders.setPayment(payment);
        return orders;
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
