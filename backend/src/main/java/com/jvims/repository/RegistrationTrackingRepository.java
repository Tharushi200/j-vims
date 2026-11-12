package com.jvims.repository;

import com.jvims.entity.RegistrationTracking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegistrationTrackingRepository extends JpaRepository<RegistrationTracking, Long> {
    Optional<RegistrationTracking> findByOrderId(Long orderId);
}
