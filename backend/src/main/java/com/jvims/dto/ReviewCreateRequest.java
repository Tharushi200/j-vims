package com.jvims.dto;
import jakarta.validation.constraints.*;

public class ReviewCreateRequest {
    @NotNull private Long orderId;
    @NotNull @Min(1) @Max(5) private Integer rating;
    @NotBlank @Size(min = 10, max = 1000) private String comment;

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}
