package com.portfoliohub.dto;

import java.util.List;
import java.util.Map;

public class DashboardStatsDto {
    private long totalProjects;
    private long totalSkills;
    private long totalCertifications;
    private int profileCompletionPercentage;
    private boolean isPublished;
    private String username;
    private String publicUrl;
    private boolean hasResume;
    private List<ProjectDto> recentProjects;
    private Map<String, Long> skillsByCategory;

    public DashboardStatsDto() {
    }

    public long getTotalProjects() {
        return totalProjects;
    }

    public void setTotalProjects(long totalProjects) {
        this.totalProjects = totalProjects;
    }

    public long getTotalSkills() {
        return totalSkills;
    }

    public void setTotalSkills(long totalSkills) {
        this.totalSkills = totalSkills;
    }

    public long getTotalCertifications() {
        return totalCertifications;
    }

    public void setTotalCertifications(long totalCertifications) {
        this.totalCertifications = totalCertifications;
    }

    public int getProfileCompletionPercentage() {
        return profileCompletionPercentage;
    }

    public void setProfileCompletionPercentage(int profileCompletionPercentage) {
        this.profileCompletionPercentage = profileCompletionPercentage;
    }

    public boolean isPublished() {
        return isPublished;
    }

    public void setPublished(boolean published) {
        isPublished = published;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPublicUrl() {
        return publicUrl;
    }

    public void setPublicUrl(String publicUrl) {
        this.publicUrl = publicUrl;
    }

    public boolean isHasResume() {
        return hasResume;
    }

    public void setHasResume(boolean hasResume) {
        this.hasResume = hasResume;
    }

    public List<ProjectDto> getRecentProjects() {
        return recentProjects;
    }

    public void setRecentProjects(List<ProjectDto> recentProjects) {
        this.recentProjects = recentProjects;
    }

    public Map<String, Long> getSkillsByCategory() {
        return skillsByCategory;
    }

    public void setSkillsByCategory(Map<String, Long> skillsByCategory) {
        this.skillsByCategory = skillsByCategory;
    }
}

