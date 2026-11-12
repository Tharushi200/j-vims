package com.jvims.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private VehicleCategory category;

    @Column(nullable = false, length = 50)
    private String brand;

    @Column(nullable = false, length = 50)
    private String model;

    @Column(name = "model_year", nullable = false)
    private Integer modelYear;

    @Enumerated(EnumType.STRING)
    @Column(name = "condition_type", length = 30)
    private ConditionType conditionType = ConditionType.RECONDITIONED;

    @Column(name = "mileage_km")
    private Integer mileageKm = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "fuel_type", length = 30)
    private FuelType fuelType = FuelType.PETROL;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private TransmissionType transmission = TransmissionType.AUTOMATIC;

    @Column(name = "engine_capacity_cc")
    private Integer engineCapacityCc = 0;

    @Column(length = 30)
    private String color;

    @Column(name = "japan_price_jpy", precision = 15, scale = 2)
    private BigDecimal japanPriceJpy = BigDecimal.ZERO;

    @Column(name = "import_cost_lkr", precision = 15, scale = 2)
    private BigDecimal importCostLkr = BigDecimal.ZERO;

    @Column(name = "selling_price_lkr", nullable = false, precision = 15, scale = 2)
    private BigDecimal sellingPriceLkr;

    @Enumerated(EnumType.STRING)
    @Column(name = "availability_status", length = 30)
    private AvailabilityStatus availabilityStatus = AvailabilityStatus.AVAILABLE;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<VehicleImage> images = new ArrayList<>();

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum ConditionType {
        BRAND_NEW, RECONDITIONED, USED
    }

    public enum FuelType {
        PETROL, DIESEL, HYBRID, PLUG_IN_HYBRID, ELECTRIC, OTHER
    }

    public enum TransmissionType {
        AUTOMATIC, MANUAL, CVT
    }

    public enum AvailabilityStatus {
        AVAILABLE, RESERVED, IMPORTED, SOLD, UNAVAILABLE
    }

    public Vehicle() {}

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public VehicleCategory getCategory() { return category; }
    public void setCategory(VehicleCategory category) { this.category = category; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public Integer getModelYear() { return modelYear; }
    public void setModelYear(Integer modelYear) { this.modelYear = modelYear; }

    public ConditionType getConditionType() { return conditionType; }
    public void setConditionType(ConditionType conditionType) { this.conditionType = conditionType; }

    public Integer getMileageKm() { return mileageKm; }
    public void setMileageKm(Integer mileageKm) { this.mileageKm = mileageKm; }

    public FuelType getFuelType() { return fuelType; }
    public void setFuelType(FuelType fuelType) { this.fuelType = fuelType; }

    public TransmissionType getTransmission() { return transmission; }
    public void setTransmission(TransmissionType transmission) { this.transmission = transmission; }

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

    public AvailabilityStatus getAvailabilityStatus() { return availabilityStatus; }
    public void setAvailabilityStatus(AvailabilityStatus availabilityStatus) { this.availabilityStatus = availabilityStatus; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<VehicleImage> getImages() { return images; }
    public void setImages(List<VehicleImage> images) { this.images = images; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
