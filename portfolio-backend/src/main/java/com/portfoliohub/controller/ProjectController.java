package com.portfoliohub.controller;

import com.portfoliohub.dto.ApiResponse;
import com.portfoliohub.dto.ProjectDto;
import com.portfoliohub.security.UserPrincipal;
import com.portfoliohub.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProjectDto>>> getProjects(@AuthenticationPrincipal UserPrincipal principal) {
        List<ProjectDto> projects = projectService.getProjects(principal.getId());
        return ResponseEntity.ok(ApiResponse.ok("Projects retrieved successfully", projects));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProjectDto>> addProject(@AuthenticationPrincipal UserPrincipal principal,
                                                              @Valid @RequestBody ProjectDto projectDto) {
        ProjectDto created = projectService.addProject(principal.getId(), projectDto);
        return new ResponseEntity<>(ApiResponse.ok("Project created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectDto>> updateProject(@AuthenticationPrincipal UserPrincipal principal,
                                                                 @PathVariable Long id,
                                                                 @Valid @RequestBody ProjectDto projectDto) {
        ProjectDto updated = projectService.updateProject(principal.getId(), id, projectDto);
        return ResponseEntity.ok(ApiResponse.ok("Project updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@AuthenticationPrincipal UserPrincipal principal,
                                                           @PathVariable Long id) {
        projectService.deleteProject(principal.getId(), id);
        return ResponseEntity.ok(ApiResponse.ok("Project deleted successfully"));
    }
}

