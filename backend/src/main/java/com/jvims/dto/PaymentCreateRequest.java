package com.jvims.dto;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class PaymentCreateRequest {
    @NotNull private Long orderId;
    @NotNull @DecimalMin("1.00") private BigDecimal amountLkr;
    private String paymentMethod = "BANK_TRANSFER";
    private String referenceNo;
    private String notes;

    public Long getOrderId() { return orderId; } public void setOrderId(Long orderId) { this.orderId = orderId; }
    public BigDecimal getAmountLkr() { return amountLkr; } public void setAmountLkr(BigDecimal amountLkr) { this.amountLkr = amountLkr; }
    public String getPaymentMethod() { return paymentMethod; } public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public String getReferenceNo() { return referenceNo; } public void setReferenceNo(String referenceNo) { this.referenceNo = referenceNo; }
    public String getNotes() { return notes; } public void setNotes(String notes) { this.notes = notes; }
}
