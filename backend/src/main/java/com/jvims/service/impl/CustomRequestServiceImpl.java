package com.jvims.service.impl;

import com.jvims.dto.CustomRequestCreateRequest;
import com.jvims.dto.CustomRequestDto;
import com.jvims.dto.UserDto;
import com.jvims.dto.VehicleCategoryDto;
import com.jvims.entity.CustomRequest;
import com.jvims.entity.User;
import com.jvims.entity.VehicleCategory;
import com.jvims.repository.CustomRequestRepository;
import com.jvims.repository.UserRepository;
import com.jvims.repository.VehicleCategoryRepository;
import com.jvims.service.CustomRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CustomRequestServiceImpl implements CustomRequestService {

    @Autowired
    private CustomRequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VehicleCategoryRepository categoryRepository;

    @Override
    public CustomRequestDto createRequest(String customerEmail, CustomRequestCreateRequest request) {
        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        VehicleCategory category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        CustomRequest req = new CustomRequest();
        req.setRequestNumber("REQ-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        req.setCustomer(customer);
        req.setCategory(category);
        req.setBrand(request.getBrand());
        req.setModel(request.getModel());
        req.setMinYear(request.getMinYear());
        req.setMaxYear(request.getMaxYear());
        req.setMinBudgetLkr(request.getMinBudgetLkr());
        req.setMaxBudgetLkr(request.getMaxBudgetLkr());
        if (request.getConditionType() != null) req.setConditionType(request.getConditionType());
        if (request.getFuelType() != null) req.setFuelType(request.getFuelType());
        if (request.getTransmission() != null) req.setTransmission(request.getTransmission());
        req.setPreferredColor(request.getPreferredColor());
        req.setAdditionalNotes(request.getAdditionalNotes());
        req.setStatus(CustomRequest.RequestStatus.NEW_REQUEST);

        CustomRequest saved = requestRepository.save(req);
        return convertToDto(saved);
    }

    @Override
    public List<CustomRequestDto> getCustomerRequests(String customerEmail) {
        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return requestRepository.findByCustomerIdOrderByCreatedAtDesc(customer.getId()).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CustomRequestDto> getAllRequests() {
        return requestRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public CustomRequestDto getRequestById(Long id) {
        CustomRequest req = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found with id: " + id));
        return convertToDto(req);
    }

    @Override
    public CustomRequestDto updateRequestStatus(Long id, String status) {
        CustomRequest req = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found with id: " + id));

        req.setStatus(CustomRequest.RequestStatus.valueOf(status.toUpperCase()));
        CustomRequest updated = requestRepository.save(req);
        return convertToDto(updated);
    }

    private CustomRequestDto convertToDto(CustomRequest req) {
        CustomRequestDto dto = new CustomRequestDto();
        dto.setId(req.getId());
        dto.setRequestNumber(req.getRequestNumber());
        dto.setBrand(req.getBrand());
        dto.setModel(req.getModel());
        dto.setMinYear(req.getMinYear());
        dto.setMaxYear(req.getMaxYear());
        dto.setMinBudgetLkr(req.getMinBudgetLkr());
        dto.setMaxBudgetLkr(req.getMaxBudgetLkr());
        dto.setConditionType(req.getConditionType());
        dto.setFuelType(req.getFuelType());
        dto.setTransmission(req.getTransmission());
        dto.setPreferredColor(req.getPreferredColor());
        dto.setAdditionalNotes(req.getAdditionalNotes());
        dto.setStatus(req.getStatus().name());
        dto.setCreatedAt(req.getCreatedAt());
        dto.setUpdatedAt(req.getUpdatedAt());

        if (req.getCustomer() != null) {
            dto.setCustomer(new UserDto(
                    req.getCustomer().getId(),
                    req.getCustomer().getFullName(),
                    req.getCustomer().getEmail(),
                    req.getCustomer().getPhone(),
                    req.getCustomer().getStatus().name(),
                    null,
                    req.getCustomer().getCreatedAt()
            ));
        }

        if (req.getCategory() != null) {
            dto.setCategory(new VehicleCategoryDto(
                    req.getCategory().getId(),
                    req.getCategory().getName(),
                    req.getCategory().getCode(),
                    req.getCategory().getDescription(),
                    req.getCategory().getIsActive(),
                    req.getCategory().getCreatedAt()
            ));
        }

        return dto;
    }
}
