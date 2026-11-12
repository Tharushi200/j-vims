package com.jvims.dto;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

public class QuotationCreateRequest {

    private Long requestId;
    private Long vehicleId;

    @NotNull(message = "Customer ID is required")
    private Long customerId;

    @NotNull(message = "Japan Price (JPY) is required")
    private BigDecimal japanPriceJpy;

    private BigDecimal exchangeRate = new BigDecimal("2.15");

    private BigDecimal shippingCostLkr = BigDecimal.ZERO;
    private BigDecimal customsTaxLkr = BigDecimal.ZERO;
    private BigDecimal localChargesLkr = BigDecimal.ZERO;
    private BigDecimal serviceFeeLkr = BigDecimal.ZERO;
    private BigDecimal profitMarginLkr = BigDecimal.ZERO;

    @NotNull(message = "Validity date is required")
    private LocalDate validUntil;

    private String adminNotes;

    // Getters and Setters
    public Long getRequestId() { return requestId; }
    public void setRequestId(Long requestId) { this.requestId = requestId; }

    public Long getVehicleId() { return vehicleId; }
    public void setVehicleId(Long vehicleId) { this.vehicleId = vehicleId; }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public BigDecimal getJapanPriceJpy() { return japanPriceJpy; }
    public void setJapanPriceJpy(BigDecimal japanPriceJpy) { this.japanPriceJpy = japanPriceJpy; }

    public BigDecimal getExchangeRate() { return exchangeRate; }
    public void setExchangeRate(BigDecimal exchangeRate) { this.exchangeRate = exchangeRate; }

    public BigDecimal getShippingCostLkr() { return shippingCostLkr; }
    public void setShippingCostLkr(BigDecimal shippingCostLkr) { this.shippingCostLkr = shippingCostLkr; }

    public BigDecimal getCustomsTaxLkr() { return customsTaxLkr; }
    public void setCustomsTaxLkr(BigDecimal customsTaxLkr) { this.customsTaxLkr = customsTaxLkr; }

    public BigDecimal getLocalChargesLkr() { return localChargesLkr; }
    public void setLocalChargesLkr(BigDecimal localChargesLkr) { this.localChargesLkr = localChargesLkr; }

    public BigDecimal getServiceFeeLkr() { return serviceFeeLkr; }
    public void setServiceFeeLkr(BigDecimal serviceFeeLkr) { this.serviceFeeLkr = serviceFeeLkr; }

    public BigDecimal getProfitMarginLkr() { return profitMarginLkr; }
    public void setProfitMarginLkr(BigDecimal profitMarginLkr) { this.profitMarginLkr = profitMarginLkr; }

    public LocalDate getValidUntil() { return validUntil; }
    public void setValidUntil(LocalDate validUntil) { this.validUntil = validUntil; }

    public String getAdminNotes() { return adminNotes; }
    public void setAdminNotes(String adminNotes) { this.adminNotes = adminNotes; }
}
