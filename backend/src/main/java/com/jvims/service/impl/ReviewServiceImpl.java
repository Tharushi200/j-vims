package com.jvims.service.impl;

import com.jvims.dto.*;
import com.jvims.entity.*;
import com.jvims.repository.*;
import com.jvims.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired private ReviewRepository reviewRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private OrderRepository orderRepository;

    @Override
    public ReviewDto createReview(String customerEmail, ReviewCreateRequest request) {
        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getCustomer().getId().equals(customer.getId())) {
            throw new RuntimeException("Unauthorized: not your order");
        }
        if (reviewRepository.existsByCustomerIdAndOrderId(customer.getId(), order.getId())) {
            throw new RuntimeException("You have already reviewed this order");
        }

        Review review = new Review();
        review.setCustomer(customer);
        review.setOrder(order);
        if (order.getVehicle() != null) review.setVehicle(order.getVehicle());
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setVerifiedBuyer(order.getOrderStatus() == Order.OrderStatus.COMPLETED || order.getOrderStatus() == Order.OrderStatus.DELIVERED);
        review.setStatus(Review.ReviewStatus.APPROVED);

        return toDto(reviewRepository.save(review));
    }

    @Override
    public List<ReviewDto> getApprovedReviews() {
        return reviewRepository.findByStatusOrderByCreatedAtDesc(Review.ReviewStatus.APPROVED)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<ReviewDto> getAllReviews() {
        return reviewRepository.findAllByOrderByCreatedAtDesc()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public ReviewDto toggleReviewStatus(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        review.setStatus(review.getStatus() == Review.ReviewStatus.APPROVED
                ? Review.ReviewStatus.HIDDEN : Review.ReviewStatus.APPROVED);
        return toDto(reviewRepository.save(review));
    }

    @Override
    public void deleteReview(Long reviewId) {
        if (!reviewRepository.existsById(reviewId)) throw new RuntimeException("Review not found");
        reviewRepository.deleteById(reviewId);
    }

    private ReviewDto toDto(Review r) {
        ReviewDto dto = new ReviewDto();
        dto.setId(r.getId());
        dto.setRating(r.getRating());
        dto.setComment(r.getComment());
        dto.setVerifiedBuyer(r.getVerifiedBuyer());
        dto.setStatus(r.getStatus().name());
        dto.setCreatedAt(r.getCreatedAt());
        if (r.getCustomer() != null) {
            dto.setCustomerId(r.getCustomer().getId());
            dto.setCustomerName(r.getCustomer().getFullName());
        }
        if (r.getOrder() != null) {
            dto.setOrderId(r.getOrder().getId());
            dto.setOrderNumber(r.getOrder().getOrderNumber());
        }
        if (r.getVehicle() != null) {
            dto.setVehicleName(r.getVehicle().getBrand() + " " + r.getVehicle().getModel());
        } else {
            dto.setVehicleName("Japanese Vehicle Import");
        }
        return dto;
    }
}
