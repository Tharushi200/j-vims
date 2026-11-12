package com.jvims.service;

import com.jvims.dto.QuotationCreateRequest;
import com.jvims.dto.QuotationDto;

import java.util.List;

public interface QuotationService {
    QuotationDto createQuotation(String adminEmail, QuotationCreateRequest request);
    List<QuotationDto> getCustomerQuotations(String customerEmail);
    List<QuotationDto> getAllQuotations();
    QuotationDto getQuotationById(Long id);
    QuotationDto respondToQuotation(String customerEmail, Long quotationId, boolean accept);
}
