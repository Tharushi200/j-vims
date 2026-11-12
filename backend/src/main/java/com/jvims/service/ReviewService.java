package com.jvims.service;
import com.jvims.dto.*;
import java.util.List;

public interface ReviewService {
    ReviewDto createReview(String customerEmail, ReviewCreateRequest request);
    List<ReviewDto> getApprovedReviews();
    List<ReviewDto> getAllReviews();
    ReviewDto toggleReviewStatus(Long reviewId);
    void deleteReview(Long reviewId);
}
