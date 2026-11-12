package com.jvims.dto;
import java.time.LocalDateTime;

public class ReviewDto {
    private Long id;
    private Long orderId;
    private String orderNumber;
    private Long customerId;
    private String customerName;
    private String vehicleName;
    private Integer rating;
    private String comment;
    private Boolean verifiedBuyer;
    private String status;
    private LocalDateTime createdAt;

    // All getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }
    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getVehicleName() { return vehicleName; }
    public void setVehicleName(String vehicleName) { this.vehicleName = vehicleName; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public Boolean getVerifiedBuyer() { return verifiedBuyer; }
    public void setVerifiedBuyer(Boolean verifiedBuyer) { this.verifiedBuyer = verifiedBuyer; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
