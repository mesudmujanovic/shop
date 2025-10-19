package com.chsoph.service.impl;

import com.chsoph.dto.PaymentResponse;
import com.chsoph.entity.Orders;
import com.chsoph.entity.Payment;
import com.chsoph.exepction.ResourceNotFoundException;
import com.chsoph.repository.OrdersRepository;
import com.chsoph.repository.PaymentRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class StripePaymentServiceImpl {

    private final PaymentRepository paymentRepository;
    private final OrdersRepository ordersRepository;

    public PaymentResponse createPaymentIntent(Long orderId) {
        log.info("Creating payment intent for order: {}", orderId);

        Orders order = ordersRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Porudžbina nije pronađena"));

        // Proverite da li već postoji payment intent za ovu porudžbinu
        Optional<Payment> existingPayment = paymentRepository.findByOrderId(orderId);
        if (existingPayment.isPresent() && existingPayment.get().getStripePaymentIntentId() != null) {
            Payment payment = existingPayment.get();
            return PaymentResponse.builder()
                    .clientSecret(payment.getStripeClientSecret())
                    .paymentIntentId(payment.getStripePaymentIntentId())
                    .status(payment.getStripeStatus())
                    .amount(payment.getAmount())
                    .currency(payment.getCurrency())
                    .build();
        }

        try {
            // Konvertujte iznos u cente (Stripe očekuje iznos u najmanjoj jedinici valute)
            long amountInCents = order.getTotalAmount()
                    .multiply(BigDecimal.valueOf(100))
                    .longValue();

            Map<String, Object> params = new HashMap<>();
            params.put("amount", amountInCents);
            params.put("currency", "usd");
            params.put("payment_method_types", List.of("card"));
            params.put("metadata", Map.of(
                    "order_id", orderId.toString(),
                    "order_number", order.getOrderNumber()
            ));

            // Opciono: dodajte opis
            params.put("description", "Payment for order: " + order.getOrderNumber());

            PaymentIntent paymentIntent = PaymentIntent.create(params);

            // Ažurirajte postojeći payment ili kreirajte novi
            Payment payment = existingPayment.orElseGet(() -> Payment.builder()
                    .order(order)
                    .amount(order.getTotalAmount())
                    .currency("usd")
                    .status("PENDING")
                    .method("CARD")
                    .build());

            payment.setStripePaymentIntentId(paymentIntent.getId());
            payment.setStripeClientSecret(paymentIntent.getClientSecret());
            payment.setStripeStatus(paymentIntent.getStatus());

            paymentRepository.save(payment);

            log.info("Payment intent created successfully: {}", paymentIntent.getId());

            return PaymentResponse.builder()
                    .clientSecret(paymentIntent.getClientSecret())
                    .paymentIntentId(paymentIntent.getId())
                    .status(paymentIntent.getStatus())
                    .amount(order.getTotalAmount())
                    .currency("usd")
                    .build();

        } catch (StripeException e) {
            log.error("Error creating Stripe payment intent for order: {}", orderId, e);
            throw new RuntimeException("Greška pri kreiranju plaćanja: " + e.getMessage(), e);
        }
    }

    public PaymentResponse confirmPayment(String paymentIntentId) {
        log.info("Confirming payment: {}", paymentIntentId);

        try {
            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);

            Payment payment = paymentRepository.findByStripePaymentIntentId(paymentIntentId)
                    .orElseThrow(() -> new ResourceNotFoundException("Plaćanje nije pronađeno"));

            payment.setStripeStatus(paymentIntent.getStatus());
            payment.setStatus(mapStripeStatus(paymentIntent.getStatus()));
            paymentRepository.save(payment);

            // Ažurirajte status porudžbine na osnovu statusa plaćanja
            updateOrderStatus(payment.getOrder(), paymentIntent.getStatus());

            log.info("Payment confirmed: {} with status: {}", paymentIntentId, paymentIntent.getStatus());

            return PaymentResponse.builder()
                    .status(paymentIntent.getStatus())
                    .paymentIntentId(paymentIntent.getId())
                    .amount(BigDecimal.valueOf(paymentIntent.getAmount() / 100.0))
                    .currency(paymentIntent.getCurrency())
                    .build();

        } catch (StripeException e) {
            log.error("Error confirming payment: {}", paymentIntentId, e);
            throw new RuntimeException("Greška pri potvrdi plaćanja: " + e.getMessage(), e);
        }
    }

    public PaymentResponse getPaymentStatus(String paymentIntentId) {
        try {
            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);

            return PaymentResponse.builder()
                    .status(paymentIntent.getStatus())
                    .paymentIntentId(paymentIntent.getId())
                    .amount(BigDecimal.valueOf(paymentIntent.getAmount() / 100.0))
                    .currency(paymentIntent.getCurrency())
                    .build();

        } catch (StripeException e) {
            throw new RuntimeException("Greška pri dobijanju statusa plaćanja", e);
        }
    }

    private String mapStripeStatus(String stripeStatus) {
        switch (stripeStatus) {
            case "succeeded": return "COMPLETED";
            case "processing": return "PROCESSING";
            case "requires_payment_method":
            case "requires_action":
                return "REQUIRES_ACTION";
            case "canceled": return "CANCELLED";
            default: return "PENDING";
        }
    }

    private void updateOrderStatus(Orders order, String stripeStatus) {
        String newStatus;
        switch (stripeStatus) {
            case "succeeded":
                newStatus = "PAID";
                break;
            case "processing":
                newStatus = "PROCESSING";
                break;
            case "requires_payment_method":
                newStatus = "PAYMENT_FAILED";
                break;
            case "requires_action":
                newStatus = "REQUIRES_ACTION";
                break;
            case "canceled":
                newStatus = "CANCELLED";
                break;
            default:
                newStatus = "PENDING_PAYMENT";
        }

        order.setStatus(newStatus);
        ordersRepository.save(order);
        log.info("Order {} status updated to: {}", order.getId(), newStatus);
    }
}