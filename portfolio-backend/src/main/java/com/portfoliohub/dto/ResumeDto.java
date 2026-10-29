package com.portfoliohub.dto;

import java.time.LocalDateTime;

public class ResumeDto {
    private Long id;
    private String originalFileName;
    private String fileType;
    private Long fileSize;
    private LocalDateTime uploadedAt;
    private String downloadUrl;

    public ResumeDto() {
    }

    public ResumeDto(Long id, String originalFileName, String fileType, Long fileSize, LocalDateTime uploadedAt, String downloadUrl) {
        this.id = id;
        this.originalFileName = originalFileName;
        this.fileType = fileType;
        this.fileSize = fileSize;
        this.uploadedAt = uploadedAt;
        this.downloadUrl = downloadUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOriginalFileName() {
        return originalFileName;
    }

    public void setOriginalFileName(String originalFileName) {
        this.originalFileName = originalFileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public String getDownloadUrl() {
        return downloadUrl;
    }

    public void setDownloadUrl(String downloadUrl) {
        this.downloadUrl = downloadUrl;
    }
}

