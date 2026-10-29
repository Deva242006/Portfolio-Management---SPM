package com.portfoliohub.controller;

import com.portfoliohub.dto.ApiResponse;
import com.portfoliohub.dto.ProfileDto;
import com.portfoliohub.security.UserPrincipal;
import com.portfoliohub.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<ProfileDto>> getProfile(@AuthenticationPrincipal UserPrincipal principal) {
        ProfileDto profileDto = profileService.getProfile(principal.getId());
        return ResponseEntity.ok(ApiResponse.ok("Profile retrieved successfully", profileDto));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<ProfileDto>> updateProfile(@AuthenticationPrincipal UserPrincipal principal,
                                                                 @Valid @RequestBody ProfileDto profileDto) {
        ProfileDto updated = profileService.updateProfile(principal.getId(), profileDto);
        return ResponseEntity.ok(ApiResponse.ok("Profile updated successfully", updated));
    }
}

