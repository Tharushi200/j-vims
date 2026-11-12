package com.jvims.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class VehicleDto {
    private Long id;
    private VehicleCategoryDto category;
    private String brand;
    private String model;
    private Integer modelYear;
    private String conditionType;
    private Integer mileageKm;
    private String fuelType;
    private String transmission;
    private Integer engineCapacityCc;
    private String color;
    private BigDecimal japanPriceJpy;
    private BigDecimal importCostLkr;
    private BigDecimal sellingPriceLkr;
    private String availabilityStatus;
    private String description;
    private List<String> imageUrls;
    private String primaryImageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public VehicleDto() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public VehicleCategoryDto getCategory() { return category; }
    public void setCategory(VehicleCategoryDto category) { this.category = category; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public Integer getModelYear() { return modelYear; }
    public void setModelYear(Integer modelYear) { this.modelYear = modelYear; }

    public String getConditionType() { return conditionType; }
    public void setConditionType(String conditionType) { this.conditionType = conditionType; }

    public Integer getMileageKm() { return mileageKm; }
    public void setMileageKm(Integer mileageKm) { this.mileageKm = mileageKm; }

    public String getFuelType() { return fuelType; }
    public void setFuelType(String fuelType) { this.fuelType = fuelType; }

    public String getTransmission() { return transmission; }
    public void setTransmission(String transmission) { this.transmission = transmission; }

    public Integer getEngineCapacityCc() { return engineCapacityCc; }
    public void setEngineCapacityCc(Integer engineCapacityCc) { this.engineCapacityCc = engineCapacityCc; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public BigDecimal getJapanPriceJpy() { return japanPriceJpy; }
    public void setJapanPriceJpy(BigDecimal japanPriceJpy) { this.japanPriceJpy = japanPriceJpy; }

    public BigDecimal getImportCostLkr() { return importCostLkr; }
    public void setImportCostLkr(BigDecimal importCostLkr) { this.importCostLkr = importCostLkr; }

    public BigDecimal getSellingPriceLkr() { return sellingPriceLkr; }
    public void setSellingPriceLkr(BigDecimal sellingPriceLkr) { this.sellingPriceLkr = sellingPriceLkr; }

    public String getAvailabilityStatus() { return availabilityStatus; }
    public void setAvailabilityStatus(String availabilityStatus) { this.availabilityStatus = availabilityStatus; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getImageUrls() { return imageUrls; }
    public void setImageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; }

    public String getPrimaryImageUrl() { return primaryImageUrl; }
    public void setPrimaryImageUrl(String primaryImageUrl) { this.primaryImageUrl = primaryImageUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
