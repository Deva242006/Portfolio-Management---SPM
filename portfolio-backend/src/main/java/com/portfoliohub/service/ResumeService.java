package com.portfoliohub.service;

import com.portfoliohub.dto.ResumeDto;
import com.portfoliohub.entity.Resume;
import com.portfoliohub.entity.User;
import com.portfoliohub.exception.BadRequestException;
import com.portfoliohub.exception.ResourceNotFoundException;
import com.portfoliohub.repository.ResumeRepository;
import com.portfoliohub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.UUID;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final Path fileStorageLocation;

    public ResumeService(ResumeRepository resumeRepository,
                         UserRepository userRepository,
                         @Value("${portfolio.resume.upload-dir:uploads/resumes}") String uploadDir) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create directory where uploaded resumes will be stored.", ex);
        }
    }

    @Transactional(readOnly = true)
    public ResumeDto getResume(Long userId) {
        return resumeRepository.findByUserId(userId)
                .map(this::toDto)
                .orElse(null);
    }

    @Transactional
    public ResumeDto uploadResume(Long userId, MultipartFile file) {
        if (file.isEmpty()) {
            throw new BadRequestException("Please select a file to upload");
        }

        String originalFileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        // Validate PDF extension and mime type
        String contentType = file.getContentType();
        if (!originalFileName.toLowerCase().endsWith(".pdf") &&
                (contentType == null || !contentType.equalsIgnoreCase("application/pdf"))) {
            throw new BadRequestException("Invalid file type. Only PDF resumes are accepted.");
        }

        // Validate max size 5MB (5 * 1024 * 1024 = 5242880 bytes)
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new BadRequestException("File size exceeds 5MB limit.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        try {
            // Check if user already has a resume; if so, delete old file
            Resume existingResume = resumeRepository.findByUser(user).orElse(null);
            if (existingResume != null) {
                try {
                    Path oldPath = Paths.get(existingResume.getUploadPath());
                    Files.deleteIfExists(oldPath);
                } catch (Exception ignored) {
                }
            }

            // Generate unique filename to avoid collision and path traversal
            String fileExtension = ".pdf";
            String uniqueFileName = "resume_" + user.getId() + "_" + UUID.randomUUID() + fileExtension;
            Path targetLocation = this.fileStorageLocation.resolve(uniqueFileName);

            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            Resume resume = existingResume != null ? existingResume : new Resume();
            resume.setUser(user);
            resume.setOriginalFileName(originalFileName);
            resume.setStoredFileName(uniqueFileName);
            resume.setFileType(contentType != null ? contentType : "application/pdf");
            resume.setFileSize(file.getSize());
            resume.setUploadPath(targetLocation.toString());

            Resume saved = resumeRepository.save(resume);
            return toDto(saved);

        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + originalFileName + ". Please try again!", ex);
        }
    }

    @Transactional(readOnly = true)
    public Resource loadResumeAsResource(Long userId) {
        Resume resume = resumeRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", "userId", userId));

        try {
            Path filePath = Paths.get(resume.getUploadPath()).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new ResourceNotFoundException("Resume file not found on disk");
            }
        } catch (MalformedURLException ex) {
            throw new ResourceNotFoundException("Resume file not found on disk");
        }
    }

    @Transactional(readOnly = true)
    public Resume getResumeEntity(Long userId) {
        return resumeRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", "userId", userId));
    }

    @Transactional
    public void deleteResume(Long userId) {
        Resume resume = resumeRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", "userId", userId));

        try {
            Path filePath = Paths.get(resume.getUploadPath());
            Files.deleteIfExists(filePath);
        } catch (IOException ignored) {
        }

        resumeRepository.delete(resume);
    }

    public ResumeDto toDto(Resume resume) {
        if (resume == null) return null;
        return new ResumeDto(
                resume.getId(),
                resume.getOriginalFileName(),
                resume.getFileType(),
                resume.getFileSize(),
                resume.getUploadedAt(),
                "/api/resume/download"
        );
    }
}

