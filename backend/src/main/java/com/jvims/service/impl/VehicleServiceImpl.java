package com.jvims.service.impl;

import com.jvims.dto.VehicleCategoryDto;
import com.jvims.dto.VehicleCreateRequest;
import com.jvims.dto.VehicleDto;
import com.jvims.entity.Vehicle;
import com.jvims.entity.VehicleCategory;
import com.jvims.entity.VehicleImage;
import com.jvims.repository.VehicleCategoryRepository;
import com.jvims.repository.VehicleRepository;
import com.jvims.service.VehicleService;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private VehicleCategoryRepository categoryRepository;

    @Override
    public List<VehicleDto> getAllVehicles(Integer categoryId, String brand, String status, String fuelType, String transmission, BigDecimal minPrice, BigDecimal maxPrice, String search) {
        Specification<Vehicle> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (categoryId != null) {
                predicates.add(criteriaBuilder.equal(root.get("category").get("id"), categoryId));
            }
            if (brand != null && !brand.isBlank()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("brand")), "%" + brand.toLowerCase() + "%"));
            }
            if (status != null && !status.isBlank()) {
                predicates.add(criteriaBuilder.equal(root.get("availabilityStatus"), Vehicle.AvailabilityStatus.valueOf(status.toUpperCase())));
            }
            if (fuelType != null && !fuelType.isBlank()) {
                predicates.add(criteriaBuilder.equal(root.get("fuelType"), Vehicle.FuelType.valueOf(fuelType.toUpperCase())));
            }
            if (transmission != null && !transmission.isBlank()) {
                predicates.add(criteriaBuilder.equal(root.get("transmission"), Vehicle.TransmissionType.valueOf(transmission.toUpperCase())));
            }
            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("sellingPriceLkr"), minPrice));
            }
            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("sellingPriceLkr"), maxPrice));
            }
            if (search != null && !search.isBlank()) {
                String[] tokens = search.toLowerCase().trim().split("\\s+");
                List<Predicate> tokenPredicates = new ArrayList<>();
                for (String token : tokens) {
                    if (token.isBlank()) continue;
                    String pattern = "%" + token + "%";
                    Predicate brandMatch = criteriaBuilder.like(criteriaBuilder.lower(root.get("brand")), pattern);
                    Predicate modelMatch = criteriaBuilder.like(criteriaBuilder.lower(root.get("model")), pattern);
                    Predicate descMatch = criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), pattern);
                    Predicate colorMatch = criteriaBuilder.like(criteriaBuilder.lower(root.get("color")), pattern);
                    tokenPredicates.add(criteriaBuilder.or(brandMatch, modelMatch, descMatch, colorMatch));
                }
                if (!tokenPredicates.isEmpty()) {
                    predicates.add(criteriaBuilder.and(tokenPredicates.toArray(new Predicate[0])));
                }
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        return vehicleRepository.findAll(spec).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public VehicleDto getVehicleById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + id));
        return convertToDto(vehicle);
    }

    @Override
    public VehicleDto createVehicle(VehicleCreateRequest request) {
        VehicleCategory category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + request.getCategoryId()));

        Vehicle vehicle = new Vehicle();
        vehicle.setCategory(category);
        vehicle.setBrand(request.getBrand());
        vehicle.setModel(request.getModel());
        vehicle.setModelYear(request.getModelYear());
        
        if (request.getConditionType() != null) {
            vehicle.setConditionType(Vehicle.ConditionType.valueOf(request.getConditionType().toUpperCase()));
        }
        if (request.getMileageKm() != null) {
            vehicle.setMileageKm(request.getMileageKm());
        }
        if (request.getFuelType() != null) {
            vehicle.setFuelType(Vehicle.FuelType.valueOf(request.getFuelType().toUpperCase()));
        }
        if (request.getTransmission() != null) {
            vehicle.setTransmission(Vehicle.TransmissionType.valueOf(request.getTransmission().toUpperCase()));
        }
        if (request.getEngineCapacityCc() != null) {
            vehicle.setEngineCapacityCc(request.getEngineCapacityCc());
        }

        vehicle.setColor(request.getColor());
        vehicle.setJapanPriceJpy(request.getJapanPriceJpy() != null ? request.getJapanPriceJpy() : BigDecimal.ZERO);
        vehicle.setImportCostLkr(request.getImportCostLkr() != null ? request.getImportCostLkr() : BigDecimal.ZERO);
        vehicle.setSellingPriceLkr(request.getSellingPriceLkr());
        
        if (request.getAvailabilityStatus() != null) {
            vehicle.setAvailabilityStatus(Vehicle.AvailabilityStatus.valueOf(request.getAvailabilityStatus().toUpperCase()));
        } else {
            vehicle.setAvailabilityStatus(Vehicle.AvailabilityStatus.AVAILABLE);
        }

        vehicle.setDescription(request.getDescription());

        // Process images
        if (request.getImageUrls() != null && !request.getImageUrls().isEmpty()) {
            List<VehicleImage> images = new ArrayList<>();
            for (int i = 0; i < request.getImageUrls().size(); i++) {
                String url = request.getImageUrls().get(i);
                boolean isPrimary = (i == 0);
                images.add(new VehicleImage(vehicle, url, isPrimary));
            }
            vehicle.setImages(images);
        }

        Vehicle saved = vehicleRepository.save(vehicle);
        return convertToDto(saved);
    }

    @Override
    public VehicleDto updateVehicle(Long id, VehicleCreateRequest request) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + id));

        if (request.getCategoryId() != null) {
            VehicleCategory category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + request.getCategoryId()));
            vehicle.setCategory(category);
        }

        vehicle.setBrand(request.getBrand());
        vehicle.setModel(request.getModel());
        vehicle.setModelYear(request.getModelYear());

        if (request.getConditionType() != null) {
            vehicle.setConditionType(Vehicle.ConditionType.valueOf(request.getConditionType().toUpperCase()));
        }
        if (request.getMileageKm() != null) {
            vehicle.setMileageKm(request.getMileageKm());
        }
        if (request.getFuelType() != null) {
            vehicle.setFuelType(Vehicle.FuelType.valueOf(request.getFuelType().toUpperCase()));
        }
        if (request.getTransmission() != null) {
            vehicle.setTransmission(Vehicle.TransmissionType.valueOf(request.getTransmission().toUpperCase()));
        }
        if (request.getEngineCapacityCc() != null) {
            vehicle.setEngineCapacityCc(request.getEngineCapacityCc());
        }

        vehicle.setColor(request.getColor());
        if (request.getJapanPriceJpy() != null) vehicle.setJapanPriceJpy(request.getJapanPriceJpy());
        if (request.getImportCostLkr() != null) vehicle.setImportCostLkr(request.getImportCostLkr());
        if (request.getSellingPriceLkr() != null) vehicle.setSellingPriceLkr(request.getSellingPriceLkr());
        if (request.getAvailabilityStatus() != null) {
            vehicle.setAvailabilityStatus(Vehicle.AvailabilityStatus.valueOf(request.getAvailabilityStatus().toUpperCase()));
        }
        vehicle.setDescription(request.getDescription());

        Vehicle updated = vehicleRepository.save(vehicle);
        return convertToDto(updated);
    }

    @Override
    public VehicleDto updateVehicleStatus(Long id, String status) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + id));

        vehicle.setAvailabilityStatus(Vehicle.AvailabilityStatus.valueOf(status.toUpperCase()));
        Vehicle updated = vehicleRepository.save(vehicle);
        return convertToDto(updated);
    }

    @Override
    public void deleteVehicle(Long id) {
        if (!vehicleRepository.existsById(id)) {
            throw new RuntimeException("Vehicle not found with id: " + id);
        }
        vehicleRepository.deleteById(id);
    }

    private VehicleDto convertToDto(Vehicle vehicle) {
        VehicleDto dto = new VehicleDto();
        dto.setId(vehicle.getId());
        dto.setBrand(vehicle.getBrand());
        dto.setModel(vehicle.getModel());
        dto.setModelYear(vehicle.getModelYear());
        dto.setConditionType(vehicle.getConditionType().name());
        dto.setMileageKm(vehicle.getMileageKm());
        dto.setFuelType(vehicle.getFuelType().name());
        dto.setTransmission(vehicle.getTransmission().name());
        dto.setEngineCapacityCc(vehicle.getEngineCapacityCc());
        dto.setColor(vehicle.getColor());
        dto.setJapanPriceJpy(vehicle.getJapanPriceJpy());
        dto.setImportCostLkr(vehicle.getImportCostLkr());
        dto.setSellingPriceLkr(vehicle.getSellingPriceLkr());
        dto.setAvailabilityStatus(vehicle.getAvailabilityStatus().name());
        dto.setDescription(vehicle.getDescription());
        dto.setCreatedAt(vehicle.getCreatedAt());
        dto.setUpdatedAt(vehicle.getUpdatedAt());

        if (vehicle.getCategory() != null) {
            dto.setCategory(new VehicleCategoryDto(
                    vehicle.getCategory().getId(),
                    vehicle.getCategory().getName(),
                    vehicle.getCategory().getCode(),
                    vehicle.getCategory().getDescription(),
                    vehicle.getCategory().getIsActive(),
                    vehicle.getCategory().getCreatedAt()
            ));
        }

        if (vehicle.getImages() != null && !vehicle.getImages().isEmpty()) {
            List<String> urls = vehicle.getImages().stream()
                    .map(VehicleImage::getImageUrl)
                    .collect(Collectors.toList());
            dto.setImageUrls(urls);
            
            String primaryUrl = vehicle.getImages().stream()
                    .filter(VehicleImage::getIsPrimary)
                    .map(VehicleImage::getImageUrl)
                    .findFirst()
                    .orElse(urls.get(0));
            dto.setPrimaryImageUrl(primaryUrl);
        } else {
            dto.setImageUrls(new ArrayList<>());
            dto.setPrimaryImageUrl("https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"); // High quality placeholder
        }

        return dto;
    }
}
