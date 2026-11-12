package com.jvims.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "imports")
public class ImportEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id", nullable = false, unique = true)
    private Order order;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @Column(name = "purchase_date")
    private LocalDate purchaseDate;

    @Column(name = "japan_supplier_name", length = 100)
    private String japanSupplierName;

    @Column(name = "japan_purchase_price_jpy", precision = 15, scale = 2)
    private BigDecimal japanPurchasePriceJpy = BigDecimal.ZERO;

    @Column(name = "shipping_method", length = 50)
    private String shippingMethod = "RoRo Vessel";

    @Column(name = "shipment_reference_bl", length = 100)
    private String shipmentReferenceBl;

    @Column(name = "vessel_name", length = 100)
    private String vesselName;

    @Column(name = "departure_port", length = 50)
    private String departurePort = "Yokohama, Japan";

    @Column(name = "arrival_port", length = 50)
    private String arrivalPort = "Hambantota, Sri Lanka";

    @Column(name = "expected_arrival_date")
    private LocalDate expectedArrivalDate;

    @Column(name = "actual_arrival_date")
    private LocalDate actualArrivalDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "import_status", length = 30)
    private ImportStatus importStatus = ImportStatus.PENDING_PURCHASE;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum ImportStatus {
        PENDING_PURCHASE, PURCHASED, IN_TRANSIT_SHIPPING, ARRIVED_PORT, CUSTOMS_CLEARED, COMPLETED
    }

    public ImportEntity() {}

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

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

    public Vehicle getVehicle() { return vehicle; }
    public void setVehicle(Vehicle vehicle) { this.vehicle = vehicle; }

    public LocalDate getPurchaseDate() { return purchaseDate; }
    public void setPurchaseDate(LocalDate purchaseDate) { this.purchaseDate = purchaseDate; }

    public String getJapanSupplierName() { return japanSupplierName; }
    public void setJapanSupplierName(String japanSupplierName) { this.japanSupplierName = japanSupplierName; }

    public BigDecimal getJapanPurchasePriceJpy() { return japanPurchasePriceJpy; }
    public void setJapanPurchasePriceJpy(BigDecimal japanPurchasePriceJpy) { this.japanPurchasePriceJpy = japanPurchasePriceJpy; }

    public String getShippingMethod() { return shippingMethod; }
    public void setShippingMethod(String shippingMethod) { this.shippingMethod = shippingMethod; }

    public String getShipmentReferenceBl() { return shipmentReferenceBl; }
    public void setShipmentReferenceBl(String shipmentReferenceBl) { this.shipmentReferenceBl = shipmentReferenceBl; }

    public String getVesselName() { return vesselName; }
    public void setVesselName(String vesselName) { this.vesselName = vesselName; }

    public String getDeparturePort() { return departurePort; }
    public void setDeparturePort(String departurePort) { this.departurePort = departurePort; }

    public String getArrivalPort() { return arrivalPort; }
    public void setArrivalPort(String arrivalPort) { this.arrivalPort = arrivalPort; }

    public LocalDate getExpectedArrivalDate() { return expectedArrivalDate; }
    public void setExpectedArrivalDate(LocalDate expectedArrivalDate) { this.expectedArrivalDate = expectedArrivalDate; }

    public LocalDate getActualArrivalDate() { return actualArrivalDate; }
    public void setActualArrivalDate(LocalDate actualArrivalDate) { this.actualArrivalDate = actualArrivalDate; }

    public ImportStatus getImportStatus() { return importStatus; }
    public void setImportStatus(ImportStatus importStatus) { this.importStatus = importStatus; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
