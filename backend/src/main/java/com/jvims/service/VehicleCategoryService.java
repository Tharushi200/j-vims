package com.jvims.service;

import com.jvims.dto.VehicleCategoryDto;

import java.util.List;

public interface VehicleCategoryService {
    List<VehicleCategoryDto> getAllCategories();
    List<VehicleCategoryDto> getActiveCategories();
    VehicleCategoryDto getCategoryById(Integer id);
    VehicleCategoryDto createCategory(VehicleCategoryDto categoryDto);
    VehicleCategoryDto updateCategory(Integer id, VehicleCategoryDto categoryDto);
    VehicleCategoryDto toggleCategoryStatus(Integer id);
}
