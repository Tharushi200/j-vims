package com.jvims.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class OrderDto {
    private Long id;
    private String orderNumber;
    private QuotationDto quotation;
    private UserDto customer;
    private VehicleDto vehicle;
    private BigDecimal totalAmountLkr;
    private BigDecimal paidAmountLkr;
    private String paymentStatus;
    private String orderStatus;
    private String notes;
    private ImportDto importTracking;
    private RegistrationTrackingDto registrationTracking;
    private DeliveryDto deliveryTracking;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public OrderDto() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }

    public QuotationDto getQuotation() { return quotation; }
    public void setQuotation(QuotationDto quotation) { this.quotation = quotation; }

    public UserDto getCustomer() { return customer; }
    public void setCustomer(UserDto customer) { this.customer = customer; }

    public VehicleDto getVehicle() { return vehicle; }
    public void setVehicle(VehicleDto vehicle) { this.vehicle = vehicle; }

    public BigDecimal getTotalAmountLkr() { return totalAmountLkr; }
    public void setTotalAmountLkr(BigDecimal totalAmountLkr) { this.totalAmountLkr = totalAmountLkr; }

    public BigDecimal getPaidAmountLkr() { return paidAmountLkr; }
    public void setPaidAmountLkr(BigDecimal paidAmountLkr) { this.paidAmountLkr = paidAmountLkr; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getOrderStatus() { return orderStatus; }
    public void setOrderStatus(String orderStatus) { this.orderStatus = orderStatus; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public ImportDto getImportTracking() { return importTracking; }
    public void setImportTracking(ImportDto importTracking) { this.importTracking = importTracking; }

    public RegistrationTrackingDto getRegistrationTracking() { return registrationTracking; }
    public void setRegistrationTracking(RegistrationTrackingDto registrationTracking) { this.registrationTracking = registrationTracking; }

    public DeliveryDto getDeliveryTracking() { return deliveryTracking; }
    public void setDeliveryTracking(DeliveryDto deliveryTracking) { this.deliveryTracking = deliveryTracking; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
