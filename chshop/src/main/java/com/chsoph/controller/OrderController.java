package com.chsoph.controller;

import com.chsoph.dto.GuestOrderRequest;
import com.chsoph.entity.Orders;
import com.chsoph.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin("*")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<Orders> placeOrderFromCart(
            @RequestParam String sessionId,
            @RequestBody GuestOrderRequest guestOrderRequest) {

        Orders newOrders = orderService.placeOrderFromCart(sessionId, guestOrderRequest);
        return ResponseEntity.ok(newOrders);
    }

    @GetMapping
    public ResponseEntity<List<Orders>> getOrdersByUser(@RequestParam Long userId) {
        List<Orders> orders = orderService.getOrdersByUser(userId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Orders> getOrderById(
        @RequestParam Long userId,
        @PathVariable Long orderId) {

        Orders orders = orderService.getOrderById(userId, orderId);
        return ResponseEntity.ok(orders);
    }
}