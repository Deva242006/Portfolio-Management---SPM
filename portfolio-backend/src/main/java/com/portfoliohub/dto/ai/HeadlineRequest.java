package com.portfoliohub.dto.ai;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class HeadlineRequest {

    @NotBlank(message = "Career goal is required")
    @Size(max = 300, message = "Career goal must not exceed 300 characters")
    private String careerGoal;

    @Size(max = 500, message = "Skills must not exceed 500 characters")
    private String skills;

    @Size(max = 100, message = "Experience level must not exceed 100 characters")
    private String experienceLevel;

    @Size(max = 200, message = "Full name must not exceed 200 characters")
    private String fullName;

    public String getCareerGoal() { return careerGoal; }
    public void setCareerGoal(String careerGoal) { this.careerGoal = careerGoal; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public String getExperienceLevel() { return experienceLevel; }
    public void setExperienceLevel(String experienceLevel) { this.experienceLevel = experienceLevel; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
}

