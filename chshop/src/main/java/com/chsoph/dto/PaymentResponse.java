package com.chsoph.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class PaymentResponse {
    private String clientSecret;
    private String status;
    private String paymentIntentId;
    private BigDecimal amount;
    private String currency;
}