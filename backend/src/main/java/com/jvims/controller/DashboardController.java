package com.jvims.controller;

import com.jvims.repository.*;
import com.jvims.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class DashboardController {

    @Autowired private UserRepository userRepository;
    @Autowired private VehicleRepository vehicleRepository;
    @Autowired private CustomRequestRepository requestRepository;
    @Autowired private OrderRepository orderRepository;
    @Autowired private QuotationRepository quotationRepository;
    @Autowired private PaymentRepository paymentRepository;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getAdminStats() {
        Map<String, Object> stats = new HashMap<>();

        // Count customers
        long totalCustomers = userRepository.findAll().stream()
                .filter(u -> u.getRoles().stream().anyMatch(r -> r.getName().name().equals("ROLE_CUSTOMER")))
                .count();
        stats.put("totalCustomers", totalCustomers);

        // Vehicle stats
        stats.put("totalVehicles", vehicleRepository.count());
        long availableVehicles = vehicleRepository.findAll().stream()
                .filter(v -> v.getAvailabilityStatus() == Vehicle.AvailabilityStatus.AVAILABLE)
                .count();
        stats.put("availableVehicles", availableVehicles);

        // Requests
        stats.put("totalRequests", requestRepository.count());
        long pendingRequests = requestRepository.findAll().stream()
                .filter(r -> r.getStatus() == CustomRequest.RequestStatus.NEW_REQUEST ||
                             r.getStatus() == CustomRequest.RequestStatus.UNDER_REVIEW)
                .count();
        stats.put("pendingRequests", pendingRequests);

        // Orders
        stats.put("totalOrders", orderRepository.count());
        long activeOrders = orderRepository.findAll().stream()
                .filter(o -> o.getOrderStatus() != Order.OrderStatus.COMPLETED &&
                             o.getOrderStatus() != Order.OrderStatus.CANCELLED)
                .count();
        stats.put("activeOrders", activeOrders);

        // Quotations pending
        long pendingQuotations = quotationRepository.findAll().stream()
                .filter(q -> q.getStatus() == Quotation.QuotationStatus.PENDING)
                .count();
        stats.put("pendingQuotations", pendingQuotations);

        // Revenue
        try {
            BigDecimal revenue = paymentRepository.getTotalVerifiedRevenue();
            stats.put("totalRevenueLkr", revenue != null ? revenue : BigDecimal.ZERO);
        } catch (Exception e) {
            stats.put("totalRevenueLkr", BigDecimal.ZERO);
        }

        // Registration pending
        long registrationPending = orderRepository.findAll().stream()
                .filter(o -> o.getOrderStatus() == Order.OrderStatus.REGISTRATION_PROCESSING)
                .count();
        stats.put("registrationPending", registrationPending);

        return ResponseEntity.ok(stats);
    }
}
