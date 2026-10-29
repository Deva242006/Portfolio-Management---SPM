package com.portfoliohub.service;

import com.portfoliohub.dto.DashboardStatsDto;
import com.portfoliohub.entity.Profile;
import com.portfoliohub.entity.Skill;
import com.portfoliohub.entity.User;
import com.portfoliohub.exception.ResourceNotFoundException;
import com.portfoliohub.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final CertificationRepository certificationRepository;
    private final ResumeRepository resumeRepository;
    private final ProjectService projectService;

    public DashboardService(UserRepository userRepository,
                            ProfileRepository profileRepository,
                            SkillRepository skillRepository,
                            ProjectRepository projectRepository,
                            CertificationRepository certificationRepository,
                            ResumeRepository resumeRepository,
                            ProjectService projectService) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.certificationRepository = certificationRepository;
        this.resumeRepository = resumeRepository;
        this.projectService = projectService;
    }

    @Transactional(readOnly = true)
    public DashboardStatsDto getDashboardStats(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Profile profile = profileRepository.findByUser(user).orElse(null);
        List<Skill> skills = skillRepository.findByUserIdOrderByIdAsc(userId);
        long totalProjects = projectRepository.countByUserId(userId);
        long totalCertifications = certificationRepository.countByUserId(userId);
        boolean hasResume = resumeRepository.findByUserId(userId).isPresent();

        // Calculate profile completion score
        int score = 0;
        if (profile != null) {
            if (profile.getFullName() != null && !profile.getFullName().isBlank()) score += 10;
            if (profile.getHeadline() != null && !profile.getHeadline().isBlank()) score += 10;
            if (profile.getBio() != null && !profile.getBio().isBlank()) score += 15;
            if ((profile.getLocation() != null && !profile.getLocation().isBlank()) ||
                    (profile.getPhone() != null && !profile.getPhone().isBlank())) score += 10;
            if (profile.getEducation() != null && !profile.getEducation().isBlank()) score += 10;
            if ((profile.getGithubUrl() != null && !profile.getGithubUrl().isBlank()) ||
                    (profile.getLinkedinUrl() != null && !profile.getLinkedinUrl().isBlank())) score += 10;
            if (profile.getAvatarUrl() != null && !profile.getAvatarUrl().isBlank()) score += 5;
        }
        if (!skills.isEmpty()) score += 15;
        if (totalProjects > 0) score += 15;
        if (hasResume || totalCertifications > 0) score += 10;

        if (score > 100) score = 100;

        // Group skills by category for charts
        Map<String, Long> skillsByCategory = new LinkedHashMap<>();
        skillsByCategory.put("Programming Languages", 0L);
        skillsByCategory.put("Frontend", 0L);
        skillsByCategory.put("Backend", 0L);
        skillsByCategory.put("Databases", 0L);
        skillsByCategory.put("Tools", 0L);

        for (Skill s : skills) {
            String catName = s.getCategory().getDisplayName();
            skillsByCategory.put(catName, skillsByCategory.getOrDefault(catName, 0L) + 1);
        }

        DashboardStatsDto dto = new DashboardStatsDto();
        dto.setTotalProjects(totalProjects);
        dto.setTotalSkills(skills.size());
        dto.setTotalCertifications(totalCertifications);
        dto.setProfileCompletionPercentage(score);
        dto.setPublished(user.isPublished());
        dto.setUsername(user.getUsername());
        dto.setPublicUrl("/u/" + user.getUsername());
        dto.setHasResume(hasResume);
        dto.setSkillsByCategory(skillsByCategory);
        dto.setRecentProjects(
                projectRepository.findTop5ByUserOrderByCreatedAtDesc(user).stream()
                        .map(projectService::toDto)
                        .collect(Collectors.toList())
        );

        return dto;
    }
}

