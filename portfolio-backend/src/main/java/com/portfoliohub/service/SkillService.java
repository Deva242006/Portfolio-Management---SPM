package com.portfoliohub.service;

import com.portfoliohub.dto.SkillDto;
import com.portfoliohub.entity.Skill;
import com.portfoliohub.entity.SkillCategory;
import com.portfoliohub.entity.User;
import com.portfoliohub.exception.ResourceNotFoundException;
import com.portfoliohub.exception.UnauthorizedException;
import com.portfoliohub.repository.SkillRepository;
import com.portfoliohub.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillService {

    private final SkillRepository skillRepository;
    private final UserRepository userRepository;

    public SkillService(SkillRepository skillRepository, UserRepository userRepository) {
        this.skillRepository = skillRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<SkillDto> getSkills(Long userId) {
        return skillRepository.findByUserIdOrderByIdAsc(userId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public SkillDto addSkill(Long userId, SkillDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Skill skill = new Skill();
        skill.setUser(user);
        skill.setName(dto.getName().trim());
        skill.setCategory(SkillCategory.fromString(dto.getCategory()));
        skill.setProficiencyLevel(dto.getProficiencyLevel() != null ? dto.getProficiencyLevel().trim() : "Intermediate");

        Skill saved = skillRepository.save(skill);
        return toDto(saved);
    }

    @Transactional
    public SkillDto updateSkill(Long userId, Long skillId, SkillDto dto) {
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new ResourceNotFoundException("Skill", "id", skillId));

        if (!skill.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to update this skill");
        }

        skill.setName(dto.getName().trim());
        if (dto.getCategory() != null) {
            skill.setCategory(SkillCategory.fromString(dto.getCategory()));
        }
        if (dto.getProficiencyLevel() != null) {
            skill.setProficiencyLevel(dto.getProficiencyLevel().trim());
        }

        Skill updated = skillRepository.save(skill);
        return toDto(updated);
    }

    @Transactional
    public void deleteSkill(Long userId, Long skillId) {
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new ResourceNotFoundException("Skill", "id", skillId));

        if (!skill.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to delete this skill");
        }

        skillRepository.delete(skill);
    }

    public SkillDto toDto(Skill skill) {
        if (skill == null) return null;
        return new SkillDto(
                skill.getId(),
                skill.getName(),
                skill.getCategory().getDisplayName(),
                skill.getProficiencyLevel(),
                skill.getCreatedAt()
        );
    }
}

