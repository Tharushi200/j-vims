package com.jvims.service;

import com.jvims.dto.CustomRequestCreateRequest;
import com.jvims.dto.CustomRequestDto;

import java.util.List;

public interface CustomRequestService {
    CustomRequestDto createRequest(String customerEmail, CustomRequestCreateRequest request);
    List<CustomRequestDto> getCustomerRequests(String customerEmail);
    List<CustomRequestDto> getAllRequests();
    CustomRequestDto getRequestById(Long id);
    CustomRequestDto updateRequestStatus(Long id, String status);
}
