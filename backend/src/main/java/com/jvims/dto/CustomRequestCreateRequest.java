package com.jvims.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class CustomRequestCreateRequest {

    @NotNull(message = "Category is required")
    private Integer categoryId;

    @NotBlank(message = "Brand is required")
    private String brand;

    @NotBlank(message = "Model is required")
    private String model;

    private Integer minYear;
    private Integer maxYear;

    private BigDecimal minBudgetLkr;
    private BigDecimal maxBudgetLkr;

    private String conditionType = "RECONDITIONED";
    private String fuelType = "ANY";
    private String transmission = "ANY";
    private String preferredColor;
    private String additionalNotes;

    // Getters and Setters
    public Integer getCategoryId() { return categoryId; }
    public void setCategoryId(Integer categoryId) { this.categoryId = categoryId; }

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
}
