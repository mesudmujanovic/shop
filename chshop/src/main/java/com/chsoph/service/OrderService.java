package com.chsoph.service;

import com.chsoph.dto.OrderRequest;
import com.chsoph.entity.Orders;

import java.util.List;

public interface OrderService {
    Orders placeOrder(Long userId, OrderRequest orderRequest);
    List<Orders> getOrdersByUser(Long userId);
    Orders getOrderById(Long userId, Long orderId);
}
