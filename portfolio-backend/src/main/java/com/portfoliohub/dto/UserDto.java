package com.portfoliohub.dto;

public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String role;
    private boolean isPublished;
    private String fullName;
    private String avatarUrl;

    public UserDto() {
    }

    public UserDto(Long id, String username, String email, String role, boolean isPublished, String fullName, String avatarUrl) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.isPublished = isPublished;
        this.fullName = fullName;
        this.avatarUrl = avatarUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isPublished() {
        return isPublished;
    }

    public void setPublished(boolean published) {
        isPublished = published;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
}

