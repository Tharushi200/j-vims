package com.jvims.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class QuotationDto {
    private Long id;
    private String quotationNumber;
    private CustomRequestDto request;
    private VehicleDto vehicle;
    private UserDto customer;
    private UserDto admin;
    private BigDecimal japanPriceJpy;
    private BigDecimal exchangeRate;
    private BigDecimal japanPriceLkr;
    private BigDecimal shippingCostLkr;
    private BigDecimal customsTaxLkr;
    private BigDecimal localChargesLkr;
    private BigDecimal serviceFeeLkr;
    private BigDecimal profitMarginLkr;
    private BigDecimal totalEstimatedPriceLkr;
    private LocalDate validUntil;
    private String adminNotes;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public QuotationDto() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getQuotationNumber() { return quotationNumber; }
    public void setQuotationNumber(String quotationNumber) { this.quotationNumber = quotationNumber; }

    public CustomRequestDto getRequest() { return request; }
    public void setRequest(CustomRequestDto request) { this.request = request; }

    public VehicleDto getVehicle() { return vehicle; }
    public void setVehicle(VehicleDto vehicle) { this.vehicle = vehicle; }

    public UserDto getCustomer() { return customer; }
    public void setCustomer(UserDto customer) { this.customer = customer; }

    public UserDto getAdmin() { return admin; }
    public void setAdmin(UserDto admin) { this.admin = admin; }

    public BigDecimal getJapanPriceJpy() { return japanPriceJpy; }
    public void setJapanPriceJpy(BigDecimal japanPriceJpy) { this.japanPriceJpy = japanPriceJpy; }

    public BigDecimal getExchangeRate() { return exchangeRate; }
    public void setExchangeRate(BigDecimal exchangeRate) { this.exchangeRate = exchangeRate; }

    public BigDecimal getJapanPriceLkr() { return japanPriceLkr; }
    public void setJapanPriceLkr(BigDecimal japanPriceLkr) { this.japanPriceLkr = japanPriceLkr; }

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

    public BigDecimal getTotalEstimatedPriceLkr() { return totalEstimatedPriceLkr; }
    public void setTotalEstimatedPriceLkr(BigDecimal totalEstimatedPriceLkr) { this.totalEstimatedPriceLkr = totalEstimatedPriceLkr; }

    public LocalDate getValidUntil() { return validUntil; }
    public void setValidUntil(LocalDate validUntil) { this.validUntil = validUntil; }

    public String getAdminNotes() { return adminNotes; }
    public void setAdminNotes(String adminNotes) { this.adminNotes = adminNotes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
