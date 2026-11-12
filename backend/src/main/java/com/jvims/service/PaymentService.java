package com.jvims.service;
import com.jvims.dto.*;
import java.util.List;

public interface PaymentService {
    PaymentDto submitPayment(String customerEmail, PaymentCreateRequest request);
    List<PaymentDto> getMyPayments(String customerEmail);
    List<PaymentDto> getOrderPayments(Long orderId);
    List<PaymentDto> getAllPayments();
    PaymentDto verifyPayment(Long paymentId, boolean approve);
}
