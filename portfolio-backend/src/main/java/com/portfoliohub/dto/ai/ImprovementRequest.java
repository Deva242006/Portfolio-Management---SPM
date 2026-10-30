package com.portfoliohub.dto.ai;

import jakarta.validation.constraints.Size;

public class ImprovementRequest {

    @Size(max = 2000, message = "Bio must not exceed 2000 characters")
    private String currentBio;

    @Size(max = 500, message = "Skills must not exceed 500 characters")
    private String skills;

    @Size(max = 700, message = "Projects must not exceed 700 characters")
    private String projects;

    @Size(max = 500, message = "Headline must not exceed 500 characters")
    private String headline;

    public String getCurrentBio() { return currentBio; }
    public void setCurrentBio(String currentBio) { this.currentBio = currentBio; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public String getProjects() { return projects; }
    public void setProjects(String projects) { this.projects = projects; }

    public String getHeadline() { return headline; }
    public void setHeadline(String headline) { this.headline = headline; }
}

