package com.portfoliohub.service;

import com.portfoliohub.dto.PublicPortfolioDto;
import com.portfoliohub.entity.Profile;
import com.portfoliohub.entity.User;
import com.portfoliohub.exception.ResourceNotFoundException;
import com.portfoliohub.repository.ProfileRepository;
import com.portfoliohub.repository.ResumeRepository;
import com.portfoliohub.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PublicPortfolioService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final SkillService skillService;
    private final ProjectService projectService;
    private final CertificationService certificationService;
    private final ResumeRepository resumeRepository;
    private final ProfileService profileService;

    public PublicPortfolioService(UserRepository userRepository,
                                  ProfileRepository profileRepository,
                                  SkillService skillService,
                                  ProjectService projectService,
                                  CertificationService certificationService,
                                  ResumeRepository resumeRepository,
                                  ProfileService profileService) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.skillService = skillService;
        this.projectService = projectService;
        this.certificationService = certificationService;
        this.resumeRepository = resumeRepository;
        this.profileService = profileService;
    }

    @Transactional(readOnly = true)
    public PublicPortfolioDto getPublicPortfolio(String username) {
        User user = userRepository.findByUsernameIgnoreCase(username.trim())
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio not found for user: " + username));

        if (!user.isPublished()) {
            throw new ResourceNotFoundException("This portfolio is private or has not been published yet.");
        }

        return buildPortfolioDto(user);
    }

    @Transactional(readOnly = true)
    public PublicPortfolioDto getPortfolioPreview(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        return buildPortfolioDto(user);
    }

    @Transactional
    public boolean updatePublishStatus(Long userId, boolean published) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        user.setPublished(published);
        userRepository.save(user);
        return user.isPublished();
    }

    private PublicPortfolioDto buildPortfolioDto(User user) {
        Profile profile = profileRepository.findByUser(user).orElse(null);
        boolean hasResume = resumeRepository.findByUserId(user.getId()).isPresent();

        PublicPortfolioDto dto = new PublicPortfolioDto();
        dto.setUsername(user.getUsername());
        dto.setPublished(user.isPublished());
        dto.setProfile(profileService.toDto(profile));
        dto.setSkills(skillService.getSkills(user.getId()));
        dto.setProjects(projectService.getProjects(user.getId()));
        dto.setCertifications(certificationService.getCertifications(user.getId()));
        dto.setHasResume(hasResume);
        if (hasResume) {
            dto.setResumeDownloadUrl("/api/public/" + user.getUsername() + "/resume");
        }

        return dto;
    }
}

