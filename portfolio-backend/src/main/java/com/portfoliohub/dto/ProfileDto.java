package com.portfoliohub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public class ProfileDto {
    private Long id;

    @Size(max = 100, message = "Full name cannot exceed 100 characters")
    private String fullName;

    @Size(max = 200, message = "Headline cannot exceed 200 characters")
    private String headline;

    private String bio;

    @Email(message = "Email must be valid")
    @Size(max = 100, message = "Email cannot exceed 100 characters")
    private String email;

    @Size(max = 30, message = "Phone cannot exceed 30 characters")
    private String phone;

    @Size(max = 100, message = "Location cannot exceed 100 characters")
    private String location;

    private String education;

    @Size(max = 255, message = "GitHub URL cannot exceed 255 characters")
    private String githubUrl;

    @Size(max = 255, message = "LinkedIn URL cannot exceed 255 characters")
    private String linkedinUrl;

    @Size(max = 255, message = "Website URL cannot exceed 255 characters")
    private String websiteUrl;

    @Size(max = 500, message = "Avatar URL cannot exceed 500 characters")
    private String avatarUrl;

    public ProfileDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getHeadline() {
        return headline;
    }

    public void setHeadline(String headline) {
        this.headline = headline;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
}

