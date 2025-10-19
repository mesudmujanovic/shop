package com.chsoph.repository;

import com.chsoph.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByStripePaymentIntentId(String stripePaymentIntentId);

    // Korisne dodatne metode
    Optional<Payment> findByOrderId(Long orderId);
    List<Payment> findByStatus(String status);}
