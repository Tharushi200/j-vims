package com.jvims.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

public class VehicleCreateRequest {

    @NotNull(message = "Category is required")
    private Integer categoryId;

    @NotBlank(message = "Brand is required")
    private String brand;

    @NotBlank(message = "Model is required")
    private String model;

    @NotNull(message = "Model year is required")
    @Min(value = 1990, message = "Model year must be 1990 or newer")
    private Integer modelYear;

    private String conditionType; // BRAND_NEW, RECONDITIONED, USED

    private Integer mileageKm = 0;

    private String fuelType; // PETROL, DIESEL, HYBRID, PLUG_IN_HYBRID, ELECTRIC, OTHER

    private String transmission; // AUTOMATIC, MANUAL, CVT

    private Integer engineCapacityCc = 0;

    private String color;

    private BigDecimal japanPriceJpy = BigDecimal.ZERO;

    private BigDecimal importCostLkr = BigDecimal.ZERO;

    @NotNull(message = "Selling price is required")
    private BigDecimal sellingPriceLkr;

    private String availabilityStatus; // AVAILABLE, RESERVED, IMPORTED, SOLD, UNAVAILABLE

    private String description;

    private List<String> imageUrls;

    // Getters and Setters
    public Integer getCategoryId() { return categoryId; }
    public void setCategoryId(Integer categoryId) { this.categoryId = categoryId; }

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
}
