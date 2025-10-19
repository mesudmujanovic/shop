package com.chsoph.controller;

import com.chsoph.dto.PaymentResponse;
import com.chsoph.repository.OrdersRepository;
import com.chsoph.service.impl.StripePaymentServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

    private final StripePaymentServiceImpl stripePaymentService;

    @PostMapping("/create-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestParam Long orderId) {
        try {
            PaymentResponse response = stripePaymentService.createPaymentIntent(orderId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error creating payment intent for order: {}", orderId, e);
            return ResponseEntity.badRequest().body(
                    Map.of("error", "Greška pri kreiranju plaćanja: " + e.getMessage())
            );
        }
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirmPayment(@RequestParam String paymentIntentId) {
        try {
            PaymentResponse response = stripePaymentService.confirmPayment(paymentIntentId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error confirming payment: {}", paymentIntentId, e);
            return ResponseEntity.badRequest().body(
                    Map.of("error", "Greška pri potvrdi plaćanja: " + e.getMessage())
            );
        }
    }

    @GetMapping("/status")
    public ResponseEntity<?> getPaymentStatus(@RequestParam String paymentIntentId) {
        try {
            PaymentResponse response = stripePaymentService.getPaymentStatus(paymentIntentId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    Map.of("error", "Greška pri dobijanju statusa plaćanja")
            );
        }
    }
}