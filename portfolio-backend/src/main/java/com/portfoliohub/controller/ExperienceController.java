package com.portfoliohub.controller;

import com.portfoliohub.dto.ApiResponse;
import com.portfoliohub.dto.ExperienceDto;
import com.portfoliohub.security.UserPrincipal;
import com.portfoliohub.service.ExperienceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experiences")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ExperienceDto>>> getExperiences(@AuthenticationPrincipal UserPrincipal principal) {
        List<ExperienceDto> list = experienceService.getExperiences(principal.getId());
        return ResponseEntity.ok(ApiResponse.ok("Experiences retrieved successfully", list));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ExperienceDto>> addExperience(@AuthenticationPrincipal UserPrincipal principal,
                                                                    @Valid @RequestBody ExperienceDto dto) {
        ExperienceDto created = experienceService.addExperience(principal.getId(), dto);
        return new ResponseEntity<>(ApiResponse.ok("Experience added successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ExperienceDto>> updateExperience(@AuthenticationPrincipal UserPrincipal principal,
                                                                       @PathVariable Long id,
                                                                       @Valid @RequestBody ExperienceDto dto) {
        ExperienceDto updated = experienceService.updateExperience(principal.getId(), id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Experience updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteExperience(@AuthenticationPrincipal UserPrincipal principal,
                                                              @PathVariable Long id) {
        experienceService.deleteExperience(principal.getId(), id);
        return ResponseEntity.ok(ApiResponse.ok("Experience deleted successfully"));
    }
}

