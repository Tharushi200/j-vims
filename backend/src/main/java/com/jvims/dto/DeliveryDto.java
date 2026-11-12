package com.jvims.dto;

import java.time.LocalDate;

public class DeliveryDto {
    private Long id;
    private Long orderId;
    private String deliveryAddress;
    private String contactPerson;
    private String contactPhone;
    private LocalDate scheduledDeliveryDate;
    private LocalDate actualDeliveryDate;
    private String deliveryStatus;
    private String notes;

    public DeliveryDto() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public String getDeliveryAddress() { return deliveryAddress; }
    public void setDeliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; }

    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public LocalDate getScheduledDeliveryDate() { return scheduledDeliveryDate; }
    public void setScheduledDeliveryDate(LocalDate scheduledDeliveryDate) { this.scheduledDeliveryDate = scheduledDeliveryDate; }

    public LocalDate getActualDeliveryDate() { return actualDeliveryDate; }
    public void setActualDeliveryDate(LocalDate actualDeliveryDate) { this.actualDeliveryDate = actualDeliveryDate; }

    public String getDeliveryStatus() { return deliveryStatus; }
    public void setDeliveryStatus(String deliveryStatus) { this.deliveryStatus = deliveryStatus; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
