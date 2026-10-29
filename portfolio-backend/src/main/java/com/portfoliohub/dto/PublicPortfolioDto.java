package com.portfoliohub.dto;

import java.util.List;

public class PublicPortfolioDto {
    private String username;
    private boolean isPublished;
    private ProfileDto profile;
    private List<SkillDto> skills;
    private List<ProjectDto> projects;
    private List<CertificationDto> certifications;
    private boolean hasResume;
    private String resumeDownloadUrl;

    public PublicPortfolioDto() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isPublished() {
        return isPublished;
    }

    public void setPublished(boolean published) {
        isPublished = published;
    }

    public ProfileDto getProfile() {
        return profile;
    }

    public void setProfile(ProfileDto profile) {
        this.profile = profile;
    }

    public List<SkillDto> getSkills() {
        return skills;
    }

    public void setSkills(List<SkillDto> skills) {
        this.skills = skills;
    }

    public List<ProjectDto> getProjects() {
        return projects;
    }

    public void setProjects(List<ProjectDto> projects) {
        this.projects = projects;
    }

    public List<CertificationDto> getCertifications() {
        return certifications;
    }

    public void setCertifications(List<CertificationDto> certifications) {
        this.certifications = certifications;
    }

    public boolean isHasResume() {
        return hasResume;
    }

    public void setHasResume(boolean hasResume) {
        this.hasResume = hasResume;
    }

    public String getResumeDownloadUrl() {
        return resumeDownloadUrl;
    }

    public void setResumeDownloadUrl(String resumeDownloadUrl) {
        this.resumeDownloadUrl = resumeDownloadUrl;
    }
}

