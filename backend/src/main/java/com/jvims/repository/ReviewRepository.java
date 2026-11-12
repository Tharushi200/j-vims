package com.jvims.repository;
import com.jvims.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByStatusOrderByCreatedAtDesc(Review.ReviewStatus status);
    List<Review> findAllByOrderByCreatedAtDesc();
    boolean existsByCustomerIdAndOrderId(Long customerId, Long orderId);
}
