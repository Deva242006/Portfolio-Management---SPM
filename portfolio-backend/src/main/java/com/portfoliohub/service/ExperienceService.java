package com.portfoliohub.service;

import com.portfoliohub.dto.ExperienceDto;
import com.portfoliohub.entity.Experience;
import com.portfoliohub.entity.User;
import com.portfoliohub.exception.ResourceNotFoundException;
import com.portfoliohub.exception.UnauthorizedException;
import com.portfoliohub.repository.ExperienceRepository;
import com.portfoliohub.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExperienceService {

    private final ExperienceRepository experienceRepository;
    private final UserRepository userRepository;

    public ExperienceService(ExperienceRepository experienceRepository, UserRepository userRepository) {
        this.experienceRepository = experienceRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<ExperienceDto> getExperiences(Long userId) {
        return experienceRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ExperienceDto addExperience(Long userId, ExperienceDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Experience exp = new Experience();
        exp.setUser(user);
        exp.setCompany(dto.getCompany().trim());
        exp.setRole(dto.getRole().trim());
        exp.setStartDate(dto.getStartDate());
        exp.setEndDate(dto.getEndDate());
        exp.setCurrent(dto.isCurrent());
        exp.setLocation(dto.getLocation());
        exp.setDescription(dto.getDescription());

        Experience saved = experienceRepository.save(exp);
        return toDto(saved);
    }

    @Transactional
    public ExperienceDto updateExperience(Long userId, Long expId, ExperienceDto dto) {
        Experience exp = experienceRepository.findById(expId)
                .orElseThrow(() -> new ResourceNotFoundException("Experience", "id", expId));

        if (!exp.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to update this experience record");
        }

        exp.setCompany(dto.getCompany().trim());
        exp.setRole(dto.getRole().trim());
        exp.setStartDate(dto.getStartDate());
        exp.setEndDate(dto.getEndDate());
        exp.setCurrent(dto.isCurrent());
        exp.setLocation(dto.getLocation());
        exp.setDescription(dto.getDescription());

        Experience updated = experienceRepository.save(exp);
        return toDto(updated);
    }

    @Transactional
    public void deleteExperience(Long userId, Long expId) {
        Experience exp = experienceRepository.findById(expId)
                .orElseThrow(() -> new ResourceNotFoundException("Experience", "id", expId));

        if (!exp.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to delete this experience record");
        }

        experienceRepository.delete(exp);
    }

    public ExperienceDto toDto(Experience exp) {
        if (exp == null) return null;
        return new ExperienceDto(
                exp.getId(),
                exp.getCompany(),
                exp.getRole(),
                exp.getStartDate(),
                exp.getEndDate(),
                exp.isCurrent(),
                exp.getLocation(),
                exp.getDescription(),
                exp.getCreatedAt()
        );
    }
}

