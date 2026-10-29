package com.portfoliohub.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private SkillCategory category;

    @Column(name = "proficiency_level", length = 50)
    private String proficiencyLevel; // Beginner, Intermediate, Advanced, Expert

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Skill() {
    }

    public Skill(User user, String name, SkillCategory category, String proficiencyLevel) {
        this.user = user;
        this.name = name;
        this.category = category != null ? category : SkillCategory.TOOLS;
        this.proficiencyLevel = proficiencyLevel != null ? proficiencyLevel : "Intermediate";
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.category == null) {
            this.category = SkillCategory.TOOLS;
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SkillCategory getCategory() {
        return category;
    }

    public void setCategory(SkillCategory category) {
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

