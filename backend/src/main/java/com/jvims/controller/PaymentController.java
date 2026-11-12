package com.jvims.controller;

import com.jvims.dto.*;
import com.jvims.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/payments/submit")
    public ResponseEntity<PaymentDto> submitPayment(@Valid @RequestBody PaymentCreateRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.ok(paymentService.submitPayment(auth.getName(), request));
    }

    @GetMapping("/payments/my-payments")
    public ResponseEntity<List<PaymentDto>> getMyPayments() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.ok(paymentService.getMyPayments(auth.getName()));
    }

    @GetMapping("/admin/payments")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<PaymentDto>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @GetMapping("/admin/orders/{orderId}/payments")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<PaymentDto>> getOrderPayments(@PathVariable Long orderId) {
        return ResponseEntity.ok(paymentService.getOrderPayments(orderId));
    }

    @PatchMapping("/admin/payments/{id}/verify")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<PaymentDto> verifyPayment(@PathVariable Long id, @RequestParam boolean approve) {
        return ResponseEntity.ok(paymentService.verifyPayment(id, approve));
    }
}
