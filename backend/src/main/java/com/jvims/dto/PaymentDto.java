package com.jvims.dto;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PaymentDto {
    private Long id;
    private Long orderId;
    private String orderNumber;
    private BigDecimal amountLkr;
    private String paymentMethod;
    private String referenceNo;
    private String status;
    private LocalDateTime paymentDate;
    private String notes;

    // getters and setters for all fields
    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public Long getOrderId() { return orderId; } public void setOrderId(Long orderId) { this.orderId = orderId; }
    public String getOrderNumber() { return orderNumber; } public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }
    public BigDecimal getAmountLkr() { return amountLkr; } public void setAmountLkr(BigDecimal amountLkr) { this.amountLkr = amountLkr; }
    public String getPaymentMethod() { return paymentMethod; } public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public String getReferenceNo() { return referenceNo; } public void setReferenceNo(String referenceNo) { this.referenceNo = referenceNo; }
    public String getStatus() { return status; } public void setStatus(String status) { this.status = status; }
    public LocalDateTime getPaymentDate() { return paymentDate; } public void setPaymentDate(LocalDateTime paymentDate) { this.paymentDate = paymentDate; }
    public String getNotes() { return notes; } public void setNotes(String notes) { this.notes = notes; }
}
