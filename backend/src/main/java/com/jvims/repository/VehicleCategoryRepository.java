package com.jvims.repository;

import com.jvims.entity.VehicleCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleCategoryRepository extends JpaRepository<VehicleCategory, Integer> {
    Optional<VehicleCategory> findByCode(String code);
    List<VehicleCategory> findByIsActiveTrue();
}
