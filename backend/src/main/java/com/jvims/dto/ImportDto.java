package com.jvims.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ImportDto {
    private Long id;
    private Long orderId;
    private LocalDate purchaseDate;
    private String japanSupplierName;
    private BigDecimal japanPurchasePriceJpy;
    private String shippingMethod;
    private String shipmentReferenceBl;
    private String vesselName;
    private String departurePort;
    private String arrivalPort;
    private LocalDate expectedArrivalDate;
    private LocalDate actualArrivalDate;
    private String importStatus;
    private String notes;

    public ImportDto() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

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

    public String getImportStatus() { return importStatus; }
    public void setImportStatus(String importStatus) { this.importStatus = importStatus; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
