package com.jvims.controller;

import com.jvims.dto.VehicleCategoryDto;
import com.jvims.service.VehicleCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private VehicleCategoryService categoryService;

    @GetMapping("/categories")
    public ResponseEntity<List<VehicleCategoryDto>> getActiveCategories() {
        return ResponseEntity.ok(categoryService.getActiveCategories());
    }

    @GetMapping("/admin/categories")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<VehicleCategoryDto>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @PostMapping("/admin/categories")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<VehicleCategoryDto> createCategory(@RequestBody VehicleCategoryDto categoryDto) {
        return ResponseEntity.ok(categoryService.createCategory(categoryDto));
    }

    @PutMapping("/admin/categories/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<VehicleCategoryDto> updateCategory(@PathVariable Integer id, @RequestBody VehicleCategoryDto categoryDto) {
        return ResponseEntity.ok(categoryService.updateCategory(id, categoryDto));
    }

    @PatchMapping("/admin/categories/{id}/toggle")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<VehicleCategoryDto> toggleCategoryStatus(@PathVariable Integer id) {
        return ResponseEntity.ok(categoryService.toggleCategoryStatus(id));
    }
}
