package com.chsoph.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private Long orderId;
    private String paymentMethodId;
    private String currency = "usd";
}