package com.portfoliohub.controller;

import com.portfoliohub.dto.ApiResponse;
import com.portfoliohub.dto.PublicPortfolioDto;
import com.portfoliohub.dto.PublishRequest;
import com.portfoliohub.entity.Resume;
import com.portfoliohub.entity.User;
import com.portfoliohub.exception.ResourceNotFoundException;
import com.portfoliohub.repository.UserRepository;
import com.portfoliohub.security.UserPrincipal;
import com.portfoliohub.service.PublicPortfolioService;
import com.portfoliohub.service.ResumeService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class PublicPortfolioController {

    private final PublicPortfolioService publicPortfolioService;
    private final ResumeService resumeService;
    private final UserRepository userRepository;

    public PublicPortfolioController(PublicPortfolioService publicPortfolioService,
                                     ResumeService resumeService,
                                     UserRepository userRepository) {
        this.publicPortfolioService = publicPortfolioService;
        this.resumeService = resumeService;
        this.userRepository = userRepository;
    }

    @GetMapping({"/api/public/{username}", "/api/public/p/{username}"})
    public ResponseEntity<ApiResponse<PublicPortfolioDto>> getPublicPortfolio(@PathVariable String username) {
        PublicPortfolioDto portfolio = publicPortfolioService.getPublicPortfolio(username);
        return ResponseEntity.ok(ApiResponse.ok("Portfolio retrieved successfully", portfolio));
    }

    @GetMapping({"/api/public/{username}/resume", "/api/public/p/{username}/resume"})
    public ResponseEntity<Resource> downloadPublicResume(@PathVariable String username) {
        User user = userRepository.findByUsernameIgnoreCase(username.trim())
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio not found for user: " + username));

        if (!user.isPublished()) {
            throw new ResourceNotFoundException("Portfolio is private or does not exist.");
        }

        Resume resume = resumeService.getResumeEntity(user.getId());
        Resource resource = resumeService.loadResumeAsResource(user.getId());

        String filename = resume.getOriginalFileName();
        if (filename == null || filename.isBlank()) {
            filename = username + "_resume.pdf";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .body(resource);
    }

    @GetMapping("/api/portfolio/preview")
    public ResponseEntity<ApiResponse<PublicPortfolioDto>> getPortfolioPreview(@AuthenticationPrincipal UserPrincipal principal) {
        PublicPortfolioDto preview = publicPortfolioService.getPortfolioPreview(principal.getId());
        return ResponseEntity.ok(ApiResponse.ok("Portfolio preview retrieved successfully", preview));
    }

    @PutMapping("/api/portfolio/publish")
    public ResponseEntity<ApiResponse<Boolean>> updatePublishStatus(@AuthenticationPrincipal UserPrincipal principal,
                                                                    @RequestBody PublishRequest request) {
        boolean status = publicPortfolioService.updatePublishStatus(principal.getId(), request.isPublished());
        String msg = status ? "Portfolio has been published successfully" : "Portfolio has been unpublished";
        return ResponseEntity.ok(ApiResponse.ok(msg, status));
    }
}

