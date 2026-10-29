package com.portfoliohub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

public class SkillDto {
    private Long id;

    @NotBlank(message = "Skill name is required")
    @Size(max = 100, message = "Skill name cannot exceed 100 characters")
    private String name;

    private String category; // Programming Languages, Frontend, Backend, Databases, Tools

    private String proficiencyLevel; // Beginner, Intermediate, Advanced, Expert

    private LocalDateTime createdAt;

    public SkillDto() {
    }

    public SkillDto(Long id, String name, String category, String proficiencyLevel, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.proficiencyLevel = proficiencyLevel;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getProficiencyLevel() {
        return proficiencyLevel;
    }

    public void setProficiencyLevel(String proficiencyLevel) {
        this.proficiencyLevel = proficiencyLevel;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

