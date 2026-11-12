package com.jvims.dto;

import java.time.LocalDate;

public class RegistrationTrackingDto {
    private Long id;
    private Long orderId;
    private String lawyerName;
    private String lawyerContact;
    private LocalDate submittedDate;
    private LocalDate estimatedCompletionDate;
    private LocalDate actualCompletionDate;
    private String registrationStatus;
    private String notes;

    public RegistrationTrackingDto() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public String getLawyerName() { return lawyerName; }
    public void setLawyerName(String lawyerName) { this.lawyerName = lawyerName; }

    public String getLawyerContact() { return lawyerContact; }
    public void setLawyerContact(String lawyerContact) { this.lawyerContact = lawyerContact; }

    public LocalDate getSubmittedDate() { return submittedDate; }
    public void setSubmittedDate(LocalDate submittedDate) { this.submittedDate = submittedDate; }

    public LocalDate getEstimatedCompletionDate() { return estimatedCompletionDate; }
    public void setEstimatedCompletionDate(LocalDate estimatedCompletionDate) { this.estimatedCompletionDate = estimatedCompletionDate; }

    public LocalDate getActualCompletionDate() { return actualCompletionDate; }
    public void setActualCompletionDate(LocalDate actualCompletionDate) { this.actualCompletionDate = actualCompletionDate; }

    public String getRegistrationStatus() { return registrationStatus; }
    public void setRegistrationStatus(String registrationStatus) { this.registrationStatus = registrationStatus; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
