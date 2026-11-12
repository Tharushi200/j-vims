package com.jvims.repository;

import com.jvims.entity.Quotation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuotationRepository extends JpaRepository<Quotation, Long> {
    List<Quotation> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
    List<Quotation> findByRequestId(Long requestId);
    List<Quotation> findAllByOrderByCreatedAtDesc();
}
