package com.portfoliohub.repository;

import com.portfoliohub.entity.Skill;
import com.portfoliohub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByUserOrderByIdAsc(User user);
    List<Skill> findByUserIdOrderByIdAsc(Long userId);
    Optional<Skill> findByIdAndUser(Long id, User user);
    long countByUser(User user);
    long countByUserId(Long userId);
}

