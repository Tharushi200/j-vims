package com.jvims.service.impl;

import com.jvims.dto.VehicleCategoryDto;
import com.jvims.entity.VehicleCategory;
import com.jvims.repository.VehicleCategoryRepository;
import com.jvims.service.VehicleCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VehicleCategoryServiceImpl implements VehicleCategoryService {

    @Autowired
    private VehicleCategoryRepository categoryRepository;

    @Override
    public List<VehicleCategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<VehicleCategoryDto> getActiveCategories() {
        return categoryRepository.findByIsActiveTrue().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public VehicleCategoryDto getCategoryById(Integer id) {
        VehicleCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        return convertToDto(category);
    }

    @Override
    public VehicleCategoryDto createCategory(VehicleCategoryDto categoryDto) {
        VehicleCategory category = new VehicleCategory(
                categoryDto.getName(),
                categoryDto.getCode().toUpperCase(),
                categoryDto.getDescription()
        );
        VehicleCategory saved = categoryRepository.save(category);
        return convertToDto(saved);
    }

    @Override
    public VehicleCategoryDto updateCategory(Integer id, VehicleCategoryDto categoryDto) {
        VehicleCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        category.setName(categoryDto.getName());
        category.setCode(categoryDto.getCode().toUpperCase());
        category.setDescription(categoryDto.getDescription());
        if (categoryDto.getIsActive() != null) {
            category.setIsActive(categoryDto.getIsActive());
        }

        VehicleCategory updated = categoryRepository.save(category);
        return convertToDto(updated);
    }

    @Override
    public VehicleCategoryDto toggleCategoryStatus(Integer id) {
        VehicleCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        category.setIsActive(!category.getIsActive());
        VehicleCategory updated = categoryRepository.save(category);
        return convertToDto(updated);
    }

    private VehicleCategoryDto convertToDto(VehicleCategory category) {
        return new VehicleCategoryDto(
                category.getId(),
                category.getName(),
                category.getCode(),
                category.getDescription(),
                category.getIsActive(),
                category.getCreatedAt()
        );
    }
}
