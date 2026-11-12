package com.jvims.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "quotations")
public class Quotation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quotation_number", nullable = false, unique = true, length = 50)
    private String quotationNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "request_id")
    private CustomRequest request;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "admin_id", nullable = false)
    private User admin;

    @Column(name = "japan_price_jpy", precision = 15, scale = 2)
    private BigDecimal japanPriceJpy = BigDecimal.ZERO;

    @Column(name = "exchange_rate", precision = 10, scale = 4)
    private BigDecimal exchangeRate = new BigDecimal("2.15");

    @Column(name = "japan_price_lkr", precision = 15, scale = 2)
    private BigDecimal japanPriceLkr = BigDecimal.ZERO;

    @Column(name = "shipping_cost_lkr", precision = 15, scale = 2)
    private BigDecimal shippingCostLkr = BigDecimal.ZERO;

    @Column(name = "customs_tax_lkr", precision = 15, scale = 2)
    private BigDecimal customsTaxLkr = BigDecimal.ZERO;

    @Column(name = "local_charges_lkr", precision = 15, scale = 2)
    private BigDecimal localChargesLkr = BigDecimal.ZERO;

    @Column(name = "service_fee_lkr", precision = 15, scale = 2)
    private BigDecimal serviceFeeLkr = BigDecimal.ZERO;

    @Column(name = "profit_margin_lkr", precision = 15, scale = 2)
    private BigDecimal profitMarginLkr = BigDecimal.ZERO;

    @Column(name = "total_estimated_price_lkr", nullable = false, precision = 15, scale = 2)
    private BigDecimal totalEstimatedPriceLkr;

    @Column(name = "valid_until", nullable = false)
    private LocalDate validUntil;

    @Column(name = "admin_notes", columnDefinition = "TEXT")
    private String adminNotes;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private QuotationStatus status = QuotationStatus.PENDING;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum QuotationStatus {
        PENDING, ACCEPTED, REJECTED, EXPIRED
    }

    public Quotation() {}

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

    public String getQuotationNumber() { return quotationNumber; }
    public void setQuotationNumber(String quotationNumber) { this.quotationNumber = quotationNumber; }

    public CustomRequest getRequest() { return request; }
    public void setRequest(CustomRequest request) { this.request = request; }

    public Vehicle getVehicle() { return vehicle; }
    public void setVehicle(Vehicle vehicle) { this.vehicle = vehicle; }

    public User getCustomer() { return customer; }
    public void setCustomer(User customer) { this.customer = customer; }

    public User getAdmin() { return admin; }
    public void setAdmin(User admin) { this.admin = admin; }

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

    public QuotationStatus getStatus() { return status; }
    public void setStatus(QuotationStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
