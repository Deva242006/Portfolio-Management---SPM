package com.portfoliohub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

public class ProjectDto {
    private Long id;

    @NotBlank(message = "Project title is required")
    @Size(max = 150, message = "Project title cannot exceed 150 characters")
    private String title;

    private String description;

    @Size(max = 255, message = "Technologies cannot exceed 255 characters")
    private String technologies;

    @Size(max = 255, message = "GitHub URL cannot exceed 255 characters")
    private String githubUrl;

    @Size(max = 255, message = "Live demo URL cannot exceed 255 characters")
    private String liveDemoUrl;

    @Size(max = 500, message = "Image URL cannot exceed 500 characters")
    private String imageUrl;

    private boolean isFeatured;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ProjectDto() {
    }

    public ProjectDto(Long id, String title, String description, String technologies,
                      String githubUrl, String liveDemoUrl, String imageUrl,
                      boolean isFeatured, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.technologies = technologies;
        this.githubUrl = githubUrl;
        this.liveDemoUrl = liveDemoUrl;
        this.imageUrl = imageUrl;
        this.isFeatured = isFeatured;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTechnologies() {
        return technologies;
    }

    public void setTechnologies(String technologies) {
        this.technologies = technologies;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getLiveDemoUrl() {
        return liveDemoUrl;
    }

    public void setLiveDemoUrl(String liveDemoUrl) {
        this.liveDemoUrl = liveDemoUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isFeatured() {
        return isFeatured;
    }

    public void setFeatured(boolean featured) {
        isFeatured = featured;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}

