package com.jvims.repository;

import com.jvims.entity.CustomRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomRequestRepository extends JpaRepository<CustomRequest, Long> {
    List<CustomRequest> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
    List<CustomRequest> findAllByOrderByCreatedAtDesc();
}
