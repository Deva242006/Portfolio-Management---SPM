package com.portfoliohub.service;

import com.portfoliohub.dto.ProfileDto;
import com.portfoliohub.entity.Profile;
import com.portfoliohub.entity.User;
import com.portfoliohub.exception.ResourceNotFoundException;
import com.portfoliohub.repository.ProfileRepository;
import com.portfoliohub.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public ProfileService(ProfileRepository profileRepository, UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ProfileDto getProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Profile profile = profileRepository.findByUser(user)
                .orElseGet(() -> {
                    Profile newProfile = new Profile(user);
                    newProfile.setFullName(user.getUsername());
                    newProfile.setEmail(user.getEmail());
                    return profileRepository.save(newProfile);
                });

        return toDto(profile);
    }

    @Transactional
    public ProfileDto updateProfile(Long userId, ProfileDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Profile profile = profileRepository.findByUser(user)
                .orElseGet(() -> new Profile(user));

        profile.setFullName(dto.getFullName());
        profile.setHeadline(dto.getHeadline());
        profile.setBio(dto.getBio());
        profile.setEmail(dto.getEmail());
        profile.setPhone(dto.getPhone());
        profile.setLocation(dto.getLocation());
        profile.setEducation(dto.getEducation());
        profile.setGithubUrl(dto.getGithubUrl());
        profile.setLinkedinUrl(dto.getLinkedinUrl());
        profile.setWebsiteUrl(dto.getWebsiteUrl());
        profile.setAvatarUrl(dto.getAvatarUrl());
        if (dto.getTemplateId() != null) {
            profile.setTemplateId(dto.getTemplateId());
        }
        if (dto.getThemeColor() != null) {
            profile.setThemeColor(dto.getThemeColor());
        }
        if (dto.getFontFamily() != null) {
            profile.setFontFamily(dto.getFontFamily());
        }

        Profile saved = profileRepository.save(profile);
        return toDto(saved);
    }

    public ProfileDto toDto(Profile profile) {
        if (profile == null) return null;
        ProfileDto dto = new ProfileDto();
        dto.setId(profile.getId());
        dto.setFullName(profile.getFullName());
        dto.setHeadline(profile.getHeadline());
        dto.setBio(profile.getBio());
        dto.setEmail(profile.getEmail());
        dto.setPhone(profile.getPhone());
        dto.setLocation(profile.getLocation());
        dto.setEducation(profile.getEducation());
        dto.setGithubUrl(profile.getGithubUrl());
        dto.setLinkedinUrl(profile.getLinkedinUrl());
        dto.setWebsiteUrl(profile.getWebsiteUrl());
        dto.setAvatarUrl(profile.getAvatarUrl());
        dto.setTemplateId(profile.getTemplateId());
        dto.setThemeColor(profile.getThemeColor());
        dto.setFontFamily(profile.getFontFamily());
        return dto;
    }
}

