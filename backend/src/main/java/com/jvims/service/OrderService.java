package com.jvims.service;

import com.jvims.dto.*;

import java.util.List;

public interface OrderService {
    List<OrderDto> getCustomerOrders(String customerEmail);
    List<OrderDto> getAllOrders();
    OrderDto getOrderById(Long id);
    OrderDto updateOrderStatus(Long orderId, String orderStatus);
    ImportDto updateImportTracking(Long orderId, ImportDto importDto);
    RegistrationTrackingDto updateRegistrationTracking(Long orderId, RegistrationTrackingDto regDto);
    DeliveryDto updateDeliveryTracking(Long orderId, DeliveryDto deliveryDto);
}
