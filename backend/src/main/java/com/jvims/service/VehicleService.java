package com.jvims.service;

import com.jvims.dto.VehicleCreateRequest;
import com.jvims.dto.VehicleDto;

import java.math.BigDecimal;
import java.util.List;

public interface VehicleService {
    List<VehicleDto> getAllVehicles(Integer categoryId, String brand, String status, String fuelType, String transmission, BigDecimal minPrice, BigDecimal maxPrice, String search);
    VehicleDto getVehicleById(Long id);
    VehicleDto createVehicle(VehicleCreateRequest request);
    VehicleDto updateVehicle(Long id, VehicleCreateRequest request);
    VehicleDto updateVehicleStatus(Long id, String status);
    void deleteVehicle(Long id);
}
