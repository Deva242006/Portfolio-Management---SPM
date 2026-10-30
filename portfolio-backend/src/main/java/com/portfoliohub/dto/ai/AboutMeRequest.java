package com.portfoliohub.dto.ai;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AboutMeRequest {

    @NotBlank(message = "Full name is required")
    @Size(max = 200, message = "Full name must not exceed 200 characters")
    private String fullName;

    @Size(max = 300, message = "Role/career goal must not exceed 300 characters")
    private String role;

    @Size(max = 500, message = "Education must not exceed 500 characters")
    private String education;

    @Size(max = 500, message = "Skills must not exceed 500 characters")
    private String skills;

    @Size(max = 500, message = "Projects must not exceed 500 characters")
    private String projects;

    @Size(max = 500, message = "Experience must not exceed 500 characters")
    private String experience;

    @Size(max = 300, message = "Career interests must not exceed 300 characters")
    private String interests;

    // Professional, Friendly, Confident, Creative, Concise
    private String tone = "Professional";

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public String getProjects() { return projects; }
    public void setProjects(String projects) { this.projects = projects; }

    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }

    public String getInterests() { return interests; }
    public void setInterests(String interests) { this.interests = interests; }

    public String getTone() { return tone; }
    public void setTone(String tone) { this.tone = tone; }
}

