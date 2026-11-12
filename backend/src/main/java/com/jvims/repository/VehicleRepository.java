package com.jvims.repository;

import com.jvims.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long>, JpaSpecificationExecutor<Vehicle> {
    List<Vehicle> findByAvailabilityStatus(Vehicle.AvailabilityStatus status);
    List<Vehicle> findByCategoryId(Integer categoryId);
}
