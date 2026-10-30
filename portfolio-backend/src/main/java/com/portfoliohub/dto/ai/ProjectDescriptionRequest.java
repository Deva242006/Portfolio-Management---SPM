package com.portfoliohub.dto.ai;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProjectDescriptionRequest {

    @NotBlank(message = "Project title is required")
    @Size(max = 200, message = "Project title must not exceed 200 characters")
    private String title;

    @Size(max = 500, message = "Project purpose must not exceed 500 characters")
    private String purpose;

    @Size(max = 500, message = "Technologies must not exceed 500 characters")
    private String technologies;

    @Size(max = 700, message = "Features must not exceed 700 characters")
    private String features;

    @Size(max = 500, message = "Problems solved must not exceed 500 characters")
    private String problemsSolved;

    @Size(max = 300, message = "GitHub URL must not exceed 300 characters")
    private String githubUrl;

    @Size(max = 300, message = "Live demo URL must not exceed 300 characters")
    private String liveDemoUrl;

    // short, detailed, resume-friendly, recruiter-focused
    private String mode = "detailed";

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }

    public String getTechnologies() { return technologies; }
    public void setTechnologies(String technologies) { this.technologies = technologies; }

    public String getFeatures() { return features; }
    public void setFeatures(String features) { this.features = features; }

    public String getProblemsSolved() { return problemsSolved; }
    public void setProblemsSolved(String problemsSolved) { this.problemsSolved = problemsSolved; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getLiveDemoUrl() { return liveDemoUrl; }
    public void setLiveDemoUrl(String liveDemoUrl) { this.liveDemoUrl = liveDemoUrl; }

    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }
}

