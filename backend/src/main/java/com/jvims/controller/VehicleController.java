package com.jvims.controller;

import com.jvims.dto.MessageResponse;
import com.jvims.dto.VehicleCreateRequest;
import com.jvims.dto.VehicleDto;
import com.jvims.service.VehicleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @GetMapping("/vehicles")
    public ResponseEntity<List<VehicleDto>> getAllVehicles(
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String fuelType,
            @RequestParam(required = false) String transmission,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String search
    ) {
        List<VehicleDto> vehicles = vehicleService.getAllVehicles(categoryId, brand, status, fuelType, transmission, minPrice, maxPrice, search);
        return ResponseEntity.ok(vehicles);
    }

    @GetMapping("/vehicles/{id}")
    public ResponseEntity<VehicleDto> getVehicleById(@PathVariable Long id) {
        return ResponseEntity.ok(vehicleService.getVehicleById(id));
    }

    @PostMapping("/admin/vehicles")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<VehicleDto> createVehicle(@Valid @RequestBody VehicleCreateRequest request) {
        return ResponseEntity.ok(vehicleService.createVehicle(request));
    }

    @PutMapping("/admin/vehicles/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<VehicleDto> updateVehicle(@PathVariable Long id, @Valid @RequestBody VehicleCreateRequest request) {
        return ResponseEntity.ok(vehicleService.updateVehicle(id, request));
    }

    @PatchMapping("/admin/vehicles/{id}/status")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<VehicleDto> updateVehicleStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(vehicleService.updateVehicleStatus(id, status));
    }

    @DeleteMapping("/admin/vehicles/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.ok(new MessageResponse("Vehicle deleted successfully"));
    }
}
