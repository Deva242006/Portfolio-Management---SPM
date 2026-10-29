package com.portfoliohub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

public class CertificationDto {
    private Long id;

    @NotBlank(message = "Certification name is required")
    @Size(max = 150, message = "Certification name cannot exceed 150 characters")
    private String name;

    @NotBlank(message = "Issuing organization is required")
    @Size(max = 150, message = "Issuing organization cannot exceed 150 characters")
    private String issuingOrganization;

    @Size(max = 50, message = "Issue date cannot exceed 50 characters")
    private String issueDate;

    @Size(max = 255, message = "Credential URL cannot exceed 255 characters")
    private String credentialUrl;

    @Size(max = 100, message = "Credential ID cannot exceed 100 characters")
    private String credentialId;

    private LocalDateTime createdAt;

    public CertificationDto() {
    }

    public CertificationDto(Long id, String name, String issuingOrganization, String issueDate,
                            String credentialUrl, String credentialId, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.issuingOrganization = issuingOrganization;
        this.issueDate = issueDate;
        this.credentialUrl = credentialUrl;
        this.credentialId = credentialId;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIssuingOrganization() {
        return issuingOrganization;
    }

    public void setIssuingOrganization(String issuingOrganization) {
        this.issuingOrganization = issuingOrganization;
    }

    public String getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(String issueDate) {
        this.issueDate = issueDate;
    }

    public String getCredentialUrl() {
        return credentialUrl;
    }

    public void setCredentialUrl(String credentialUrl) {
        this.credentialUrl = credentialUrl;
    }

    public String getCredentialId() {
        return credentialId;
    }

    public void setCredentialId(String credentialId) {
        this.credentialId = credentialId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

