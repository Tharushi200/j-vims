package com.jvims.controller;

import com.jvims.dto.CustomRequestCreateRequest;
import com.jvims.dto.CustomRequestDto;
import com.jvims.service.CustomRequestService;
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
public class CustomRequestController {

    @Autowired
    private CustomRequestService requestService;

    @PostMapping("/custom-requests")
    public ResponseEntity<CustomRequestDto> createRequest(@Valid @RequestBody CustomRequestCreateRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String customerEmail = authentication.getName();
        return ResponseEntity.ok(requestService.createRequest(customerEmail, request));
    }

    @GetMapping("/custom-requests/my-requests")
    public ResponseEntity<List<CustomRequestDto>> getMyRequests() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String customerEmail = authentication.getName();
        return ResponseEntity.ok(requestService.getCustomerRequests(customerEmail));
    }

    @GetMapping("/admin/custom-requests")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<CustomRequestDto>> getAllRequests() {
        return ResponseEntity.ok(requestService.getAllRequests());
    }

    @GetMapping("/custom-requests/{id}")
    public ResponseEntity<CustomRequestDto> getRequestById(@PathVariable Long id) {
        return ResponseEntity.ok(requestService.getRequestById(id));
    }

    @PatchMapping("/admin/custom-requests/{id}/status")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<CustomRequestDto> updateRequestStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(requestService.updateRequestStatus(id, status));
    }
}
