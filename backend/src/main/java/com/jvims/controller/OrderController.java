package com.jvims.controller;

import com.jvims.dto.*;
import com.jvims.service.OrderService;
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
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/orders/my-orders")
    public ResponseEntity<List<OrderDto>> getMyOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String customerEmail = authentication.getName();
        return ResponseEntity.ok(orderService.getCustomerOrders(customerEmail));
    }

    @GetMapping("/admin/orders")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PatchMapping("/admin/orders/{id}/status")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<OrderDto> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }

    @PutMapping("/admin/orders/{id}/import-tracking")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ImportDto> updateImportTracking(@PathVariable Long id, @RequestBody ImportDto dto) {
        return ResponseEntity.ok(orderService.updateImportTracking(id, dto));
    }

    @PutMapping("/admin/orders/{id}/registration-tracking")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<RegistrationTrackingDto> updateRegistrationTracking(@PathVariable Long id, @RequestBody RegistrationTrackingDto dto) {
        return ResponseEntity.ok(orderService.updateRegistrationTracking(id, dto));
    }

    @PutMapping("/admin/orders/{id}/delivery-tracking")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<DeliveryDto> updateDeliveryTracking(@PathVariable Long id, @RequestBody DeliveryDto dto) {
        return ResponseEntity.ok(orderService.updateDeliveryTracking(id, dto));
    }
}
