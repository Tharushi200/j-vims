package com.jvims.service.impl;

import com.jvims.dto.*;
import com.jvims.entity.*;
import com.jvims.repository.*;
import com.jvims.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired private PaymentRepository paymentRepository;
    @Autowired private OrderRepository orderRepository;
    @Autowired private UserRepository userRepository;

    @Override
    @Transactional
    public PaymentDto submitPayment(String customerEmail, PaymentCreateRequest request) {
        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));
        if (!order.getCustomer().getId().equals(customer.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmountLkr(request.getAmountLkr());
        try { payment.setPaymentMethod(Payment.PaymentMethod.valueOf(request.getPaymentMethod())); }
        catch (Exception e) { payment.setPaymentMethod(Payment.PaymentMethod.BANK_TRANSFER); }
        payment.setReferenceNo(request.getReferenceNo());
        payment.setNotes(request.getNotes());
        payment.setStatus(Payment.PaymentStatus.PENDING);

        return toDto(paymentRepository.save(payment));
    }

    @Override
    public List<PaymentDto> getMyPayments(String customerEmail) {
        return paymentRepository.findByOrderCustomerEmailOrderByPaymentDateDesc(customerEmail)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<PaymentDto> getOrderPayments(Long orderId) {
        return paymentRepository.findByOrderIdOrderByPaymentDateDesc(orderId)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<PaymentDto> getAllPayments() {
        return paymentRepository.findAllByOrderByPaymentDateDesc()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PaymentDto verifyPayment(Long paymentId, boolean approve) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        payment.setStatus(approve ? Payment.PaymentStatus.VERIFIED : Payment.PaymentStatus.REJECTED);

        if (approve) {
            Order order = payment.getOrder();
            java.math.BigDecimal newPaid = order.getPaidAmountLkr().add(payment.getAmountLkr());
            order.setPaidAmountLkr(newPaid);
            if (newPaid.compareTo(order.getTotalAmountLkr()) >= 0) {
                order.setPaymentStatus(Order.PaymentStatus.FULLY_PAID);
            } else {
                order.setPaymentStatus(Order.PaymentStatus.PARTIALLY_PAID);
            }
            orderRepository.save(order);
        }
        return toDto(paymentRepository.save(payment));
    }

    private PaymentDto toDto(Payment p) {
        PaymentDto dto = new PaymentDto();
        dto.setId(p.getId());
        dto.setAmountLkr(p.getAmountLkr());
        dto.setPaymentMethod(p.getPaymentMethod().name());
        dto.setReferenceNo(p.getReferenceNo());
        dto.setStatus(p.getStatus().name());
        dto.setPaymentDate(p.getPaymentDate());
        dto.setNotes(p.getNotes());
        if (p.getOrder() != null) {
            dto.setOrderId(p.getOrder().getId());
            dto.setOrderNumber(p.getOrder().getOrderNumber());
        }
        return dto;
    }
}
