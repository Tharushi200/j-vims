package com.jvims.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CustomRequestDto {
    private Long id;
    private String requestNumber;
    private UserDto customer;
    private VehicleCategoryDto category;
    private String brand;
    private String model;
    private Integer minYear;
    private Integer maxYear;
    private BigDecimal minBudgetLkr;
    private BigDecimal maxBudgetLkr;
    private String conditionType;
    private String fuelType;
    private String transmission;
    private String preferredColor;
    private String additionalNotes;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CustomRequestDto() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRequestNumber() { return requestNumber; }
    public void setRequestNumber(String requestNumber) { this.requestNumber = requestNumber; }

    public UserDto getCustomer() { return customer; }
    public void setCustomer(UserDto customer) { this.customer = customer; }

    public VehicleCategoryDto getCategory() { return category; }
    public void setCategory(VehicleCategoryDto category) { this.category = category; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public Integer getMinYear() { return minYear; }
    public void setMinYear(Integer minYear) { this.minYear = minYear; }

    public Integer getMaxYear() { return maxYear; }
    public void setMaxYear(Integer maxYear) { this.maxYear = maxYear; }

    public BigDecimal getMinBudgetLkr() { return minBudgetLkr; }
    public void setMinBudgetLkr(BigDecimal minBudgetLkr) { this.minBudgetLkr = minBudgetLkr; }

    public BigDecimal getMaxBudgetLkr() { return maxBudgetLkr; }
    public void setMaxBudgetLkr(BigDecimal maxBudgetLkr) { this.maxBudgetLkr = maxBudgetLkr; }

    public String getConditionType() { return conditionType; }
    public void setConditionType(String conditionType) { this.conditionType = conditionType; }

    public String getFuelType() { return fuelType; }
    public void setFuelType(String fuelType) { this.fuelType = fuelType; }

    public String getTransmission() { return transmission; }
    public void setTransmission(String transmission) { this.transmission = transmission; }

    public String getPreferredColor() { return preferredColor; }
    public void setPreferredColor(String preferredColor) { this.preferredColor = preferredColor; }

    public String getAdditionalNotes() { return additionalNotes; }
    public void setAdditionalNotes(String additionalNotes) { this.additionalNotes = additionalNotes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
