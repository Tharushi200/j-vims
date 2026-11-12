package com.jvims.repository;

import com.jvims.entity.ImportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImportRepository extends JpaRepository<ImportEntity, Long> {
    Optional<ImportEntity> findByOrderId(Long orderId);
}
