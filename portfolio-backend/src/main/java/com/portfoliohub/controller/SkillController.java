package com.portfoliohub.controller;

import com.portfoliohub.dto.ApiResponse;
import com.portfoliohub.dto.SkillDto;
import com.portfoliohub.security.UserPrincipal;
import com.portfoliohub.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<SkillDto>>> getSkills(@AuthenticationPrincipal UserPrincipal principal) {
        List<SkillDto> skills = skillService.getSkills(principal.getId());
        return ResponseEntity.ok(ApiResponse.ok("Skills retrieved successfully", skills));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<SkillDto>> addSkill(@AuthenticationPrincipal UserPrincipal principal,
                                                          @Valid @RequestBody SkillDto skillDto) {
        SkillDto created = skillService.addSkill(principal.getId(), skillDto);
        return new ResponseEntity<>(ApiResponse.ok("Skill created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<SkillDto>> updateSkill(@AuthenticationPrincipal UserPrincipal principal,
                                                             @PathVariable Long id,
                                                             @Valid @RequestBody SkillDto skillDto) {
        SkillDto updated = skillService.updateSkill(principal.getId(), id, skillDto);
        return ResponseEntity.ok(ApiResponse.ok("Skill updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSkill(@AuthenticationPrincipal UserPrincipal principal,
                                                         @PathVariable Long id) {
        skillService.deleteSkill(principal.getId(), id);
        return ResponseEntity.ok(ApiResponse.ok("Skill deleted successfully"));
    }
}

