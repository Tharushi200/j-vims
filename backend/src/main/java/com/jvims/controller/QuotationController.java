package com.jvims.controller;

import com.jvims.dto.QuotationCreateRequest;
import com.jvims.dto.QuotationDto;
import com.jvims.service.QuotationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class QuotationController {

    @Autowired
    private QuotationService quotationService;

    @PostMapping("/admin/quotations")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<QuotationDto> createQuotation(@Valid @RequestBody QuotationCreateRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String adminEmail = authentication.getName();
        return ResponseEntity.ok(quotationService.createQuotation(adminEmail, request));
    }

    @GetMapping("/quotations/my-quotations")
    public ResponseEntity<List<QuotationDto>> getMyQuotations() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String customerEmail = authentication.getName();
        return ResponseEntity.ok(quotationService.getCustomerQuotations(customerEmail));
    }

    @GetMapping("/admin/quotations")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<QuotationDto>> getAllQuotations() {
        return ResponseEntity.ok(quotationService.getAllQuotations());
    }

    @GetMapping("/quotations/{id}")
    public ResponseEntity<QuotationDto> getQuotationById(@PathVariable Long id) {
        return ResponseEntity.ok(quotationService.getQuotationById(id));
    }

    @PostMapping("/quotations/{id}/respond")
    public ResponseEntity<QuotationDto> respondToQuotation(@PathVariable Long id, @RequestParam boolean accept) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String customerEmail = authentication.getName();
        return ResponseEntity.ok(quotationService.respondToQuotation(customerEmail, id, accept));
    }
}
