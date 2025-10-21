package com.chsoph.service;

import com.chsoph.dto.GuestOrderRequest;
import com.chsoph.entity.Orders;

import java.util.List;

public interface OrderService {
    Orders placeOrderFromCart(String sessionId, GuestOrderRequest guestOrderRequest);
    List<Orders> getOrdersByUser(Long userId);
    Orders getOrderById(Long userId, Long orderId);
}
