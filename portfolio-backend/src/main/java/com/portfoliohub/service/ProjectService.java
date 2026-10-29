package com.portfoliohub.service;

import com.portfoliohub.dto.ProjectDto;
import com.portfoliohub.entity.Project;
import com.portfoliohub.entity.User;
import com.portfoliohub.exception.ResourceNotFoundException;
import com.portfoliohub.exception.UnauthorizedException;
import com.portfoliohub.repository.ProjectRepository;
import com.portfoliohub.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<ProjectDto> getProjects(Long userId) {
        return projectRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProjectDto addProject(Long userId, ProjectDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Project project = new Project();
        project.setUser(user);
        project.setTitle(dto.getTitle().trim());
        project.setDescription(dto.getDescription());
        project.setTechnologies(dto.getTechnologies());
        project.setGithubUrl(dto.getGithubUrl());
        project.setLiveDemoUrl(dto.getLiveDemoUrl());
        project.setImageUrl(dto.getImageUrl());
        project.setFeatured(dto.isFeatured());

        Project saved = projectRepository.save(project);
        return toDto(saved);
    }

    @Transactional
    public ProjectDto updateProject(Long userId, Long projectId, ProjectDto dto) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", projectId));

        if (!project.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to update this project");
        }

        project.setTitle(dto.getTitle().trim());
        project.setDescription(dto.getDescription());
        project.setTechnologies(dto.getTechnologies());
        project.setGithubUrl(dto.getGithubUrl());
        project.setLiveDemoUrl(dto.getLiveDemoUrl());
        project.setImageUrl(dto.getImageUrl());
        project.setFeatured(dto.isFeatured());

        Project updated = projectRepository.save(project);
        return toDto(updated);
    }

    @Transactional
    public void deleteProject(Long userId, Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", projectId));

        if (!project.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to delete this project");
        }

        projectRepository.delete(project);
    }

    public ProjectDto toDto(Project project) {
        if (project == null) return null;
        return new ProjectDto(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getTechnologies(),
                project.getGithubUrl(),
                project.getLiveDemoUrl(),
                project.getImageUrl(),
                project.isFeatured(),
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }
}

