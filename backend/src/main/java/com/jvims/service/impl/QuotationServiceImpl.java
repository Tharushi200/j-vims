package com.jvims.service.impl;

import com.jvims.dto.*;
import com.jvims.entity.*;
import com.jvims.repository.*;
import com.jvims.service.QuotationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class QuotationServiceImpl implements QuotationService {

    @Autowired
    private QuotationRepository quotationRepository;

    @Autowired
    private CustomRequestRepository requestRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    @Transactional
    public QuotationDto createQuotation(String adminEmail, QuotationCreateRequest request) {
        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new RuntimeException("Admin user not found"));

        User customer = userRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + request.getCustomerId()));

        Quotation q = new Quotation();
        q.setQuotationNumber("QT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        q.setCustomer(customer);
        q.setAdmin(admin);

        if (request.getRequestId() != null) {
            CustomRequest req = requestRepository.findById(request.getRequestId()).orElse(null);
            q.setRequest(req);
            if (req != null) {
                req.setStatus(CustomRequest.RequestStatus.QUOTATION_CREATED);
                requestRepository.save(req);
            }
        }

        if (request.getVehicleId() != null) {
            Vehicle vehicle = vehicleRepository.findById(request.getVehicleId()).orElse(null);
            q.setVehicle(vehicle);
        }

        // Price breakdown calculation
        BigDecimal jpyPrice = request.getJapanPriceJpy() != null ? request.getJapanPriceJpy() : BigDecimal.ZERO;
        BigDecimal rate = request.getExchangeRate() != null ? request.getExchangeRate() : new BigDecimal("2.15");
        BigDecimal lkrPrice = jpyPrice.multiply(rate);

        BigDecimal shipping = request.getShippingCostLkr() != null ? request.getShippingCostLkr() : BigDecimal.ZERO;
        BigDecimal tax = request.getCustomsTaxLkr() != null ? request.getCustomsTaxLkr() : BigDecimal.ZERO;
        BigDecimal local = request.getLocalChargesLkr() != null ? request.getLocalChargesLkr() : BigDecimal.ZERO;
        BigDecimal service = request.getServiceFeeLkr() != null ? request.getServiceFeeLkr() : BigDecimal.ZERO;
        BigDecimal profit = request.getProfitMarginLkr() != null ? request.getProfitMarginLkr() : BigDecimal.ZERO;

        BigDecimal total = lkrPrice.add(shipping).add(tax).add(local).add(service).add(profit);

        q.setJapanPriceJpy(jpyPrice);
        q.setExchangeRate(rate);
        q.setJapanPriceLkr(lkrPrice);
        q.setShippingCostLkr(shipping);
        q.setCustomsTaxLkr(tax);
        q.setLocalChargesLkr(local);
        q.setServiceFeeLkr(service);
        q.setProfitMarginLkr(profit);
        q.setTotalEstimatedPriceLkr(total);
        q.setValidUntil(request.getValidUntil());
        q.setAdminNotes(request.getAdminNotes());
        q.setStatus(Quotation.QuotationStatus.PENDING);

        Quotation saved = quotationRepository.save(q);
        return convertToDto(saved);
    }

    @Override
    public List<QuotationDto> getCustomerQuotations(String customerEmail) {
        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return quotationRepository.findByCustomerIdOrderByCreatedAtDesc(customer.getId()).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<QuotationDto> getAllQuotations() {
        return quotationRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public QuotationDto getQuotationById(Long id) {
        Quotation q = quotationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quotation not found with id: " + id));
        return convertToDto(q);
    }

    @Override
    @Transactional
    public QuotationDto respondToQuotation(String customerEmail, Long quotationId, boolean accept) {
        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Quotation q = quotationRepository.findById(quotationId)
                .orElseThrow(() -> new RuntimeException("Quotation not found with id: " + quotationId));

        if (!q.getCustomer().getId().equals(customer.getId())) {
            throw new RuntimeException("Unauthorized quotation response");
        }

        if (accept) {
            q.setStatus(Quotation.QuotationStatus.ACCEPTED);
            if (q.getRequest() != null) {
                q.getRequest().setStatus(CustomRequest.RequestStatus.ACCEPTED);
                requestRepository.save(q.getRequest());
            }

            // AUTO-CREATE ORDER
            Order order = new Order();
            order.setOrderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
            order.setQuotation(q);
            order.setCustomer(customer);
            order.setVehicle(q.getVehicle());
            order.setTotalAmountLkr(q.getTotalEstimatedPriceLkr());
            order.setPaidAmountLkr(BigDecimal.ZERO);
            order.setPaymentStatus(Order.PaymentStatus.UNPAID);
            order.setOrderStatus(Order.OrderStatus.CONFIRMED);
            order.setNotes("Order created from accepted quotation " + q.getQuotationNumber());
            orderRepository.save(order);

        } else {
            q.setStatus(Quotation.QuotationStatus.REJECTED);
            if (q.getRequest() != null) {
                q.getRequest().setStatus(CustomRequest.RequestStatus.REJECTED);
                requestRepository.save(q.getRequest());
            }
        }

        Quotation updated = quotationRepository.save(q);
        return convertToDto(updated);
    }

    private QuotationDto convertToDto(Quotation q) {
        QuotationDto dto = new QuotationDto();
        dto.setId(q.getId());
        dto.setQuotationNumber(q.getQuotationNumber());
        dto.setJapanPriceJpy(q.getJapanPriceJpy());
        dto.setExchangeRate(q.getExchangeRate());
        dto.setJapanPriceLkr(q.getJapanPriceLkr());
        dto.setShippingCostLkr(q.getShippingCostLkr());
        dto.setCustomsTaxLkr(q.getCustomsTaxLkr());
        dto.setLocalChargesLkr(q.getLocalChargesLkr());
        dto.setServiceFeeLkr(q.getServiceFeeLkr());
        dto.setProfitMarginLkr(q.getProfitMarginLkr());
        dto.setTotalEstimatedPriceLkr(q.getTotalEstimatedPriceLkr());
        dto.setValidUntil(q.getValidUntil());
        dto.setAdminNotes(q.getAdminNotes());
        dto.setStatus(q.getStatus().name());
        dto.setCreatedAt(q.getCreatedAt());
        dto.setUpdatedAt(q.getUpdatedAt());

        if (q.getCustomer() != null) {
            dto.setCustomer(new UserDto(q.getCustomer().getId(), q.getCustomer().getFullName(), q.getCustomer().getEmail(), q.getCustomer().getPhone(), q.getCustomer().getStatus().name(), null, q.getCustomer().getCreatedAt()));
        }
        if (q.getAdmin() != null) {
            dto.setAdmin(new UserDto(q.getAdmin().getId(), q.getAdmin().getFullName(), q.getAdmin().getEmail(), q.getAdmin().getPhone(), q.getAdmin().getStatus().name(), null, q.getAdmin().getCreatedAt()));
        }

        return dto;
    }
}
