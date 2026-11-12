package com.jvims.controller;

import com.jvims.dto.*;
import com.jvims.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/reviews/public")
    public ResponseEntity<List<ReviewDto>> getApprovedReviews() {
        return ResponseEntity.ok(reviewService.getApprovedReviews());
    }

    @PostMapping("/customer/reviews")
    public ResponseEntity<ReviewDto> createReview(@Valid @RequestBody ReviewCreateRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.ok(reviewService.createReview(auth.getName(), request));
    }

    @GetMapping("/admin/reviews")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<ReviewDto>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    @PatchMapping("/admin/reviews/{id}/toggle")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ReviewDto> toggleReview(@PathVariable Long id) {
        return ResponseEntity.ok(reviewService.toggleReviewStatus(id));
    }

    @DeleteMapping("/admin/reviews/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<MessageResponse> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok(new MessageResponse("Review deleted successfully"));
    }
}
