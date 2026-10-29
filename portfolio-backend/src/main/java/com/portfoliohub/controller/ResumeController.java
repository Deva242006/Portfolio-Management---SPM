package com.portfoliohub.controller;

import com.portfoliohub.dto.ApiResponse;
import com.portfoliohub.dto.ResumeDto;
import com.portfoliohub.entity.Resume;
import com.portfoliohub.security.UserPrincipal;
import com.portfoliohub.service.ResumeService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<ResumeDto>> getResume(@AuthenticationPrincipal UserPrincipal principal) {
        ResumeDto resumeDto = resumeService.getResume(principal.getId());
        return ResponseEntity.ok(ApiResponse.ok("Resume retrieved successfully", resumeDto));
    }

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<ResumeDto>> uploadResume(@AuthenticationPrincipal UserPrincipal principal,
                                                               @RequestParam("file") MultipartFile file) {
        ResumeDto resumeDto = resumeService.uploadResume(principal.getId(), file);
        return ResponseEntity.ok(ApiResponse.ok("Resume uploaded successfully", resumeDto));
    }

    @GetMapping("/download")
    public ResponseEntity<Resource> downloadResume(@AuthenticationPrincipal UserPrincipal principal) {
        Resume resume = resumeService.getResumeEntity(principal.getId());
        Resource resource = resumeService.loadResumeAsResource(principal.getId());

        String filename = resume.getOriginalFileName();
        if (filename == null || filename.isBlank()) {
            filename = "resume.pdf";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .body(resource);
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteResume(@AuthenticationPrincipal UserPrincipal principal) {
        resumeService.deleteResume(principal.getId());
        return ResponseEntity.ok(ApiResponse.ok("Resume deleted successfully"));
    }
}

