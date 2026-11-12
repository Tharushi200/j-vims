package com.jvims.repository;
import com.jvims.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByOrderIdOrderByPaymentDateDesc(Long orderId);
    List<Payment> findByOrderCustomerEmailOrderByPaymentDateDesc(String email);
    List<Payment> findAllByOrderByPaymentDateDesc();
    @Query("SELECT COALESCE(SUM(p.amountLkr), 0) FROM Payment p WHERE p.status = 'VERIFIED'")
    BigDecimal getTotalVerifiedRevenue();
}
