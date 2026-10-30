package com.portfoliohub.controller;

import com.portfoliohub.dto.ai.*;
import com.portfoliohub.security.UserPrincipal;
import com.portfoliohub.service.AIContentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIContentController {

    private final AIContentService aiContentService;

    public AIContentController(AIContentService aiContentService) {
        this.aiContentService = aiContentService;
    }

    /**
     * Generate a professional About Me section.
     * POST /api/ai/generate-about
     */
    @PostMapping("/generate-about")
    public ResponseEntity<AIGeneratedResponse> generateAboutMe(
            @Valid @RequestBody AboutMeRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        AIGeneratedResponse response = aiContentService.generateAboutMe(request);
        return ResponseEntity.ok(response);
    }

    /**
     * Generate a professional project description.
     * POST /api/ai/generate-project-description
     */
    @PostMapping("/generate-project-description")
    public ResponseEntity<AIGeneratedResponse> generateProjectDescription(
            @Valid @RequestBody ProjectDescriptionRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        AIGeneratedResponse response = aiContentService.generateProjectDescription(request);
        return ResponseEntity.ok(response);
    }

    /**
     * Generate 3 professional headline options.
     * POST /api/ai/generate-headlines
     */
    @PostMapping("/generate-headlines")
    public ResponseEntity<AIGeneratedResponse> generateHeadlines(
            @Valid @RequestBody HeadlineRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        AIGeneratedResponse response = aiContentService.generateHeadlines(request);
        return ResponseEntity.ok(response);
    }

    /**
     * Suggest improvements for existing portfolio content.
     * POST /api/ai/suggest-improvements
     */
    @PostMapping("/suggest-improvements")
    public ResponseEntity<AIGeneratedResponse> suggestImprovements(
            @Valid @RequestBody ImprovementRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        AIGeneratedResponse response = aiContentService.suggestImprovements(request);
        return ResponseEntity.ok(response);
    }
}

