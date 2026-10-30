package com.portfoliohub.repository;

import com.portfoliohub.entity.Experience;
import com.portfoliohub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    List<Experience> findByUserOrderByCreatedAtDesc(User user);
    List<Experience> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<Experience> findByIdAndUser(Long id, User user);
    long countByUser(User user);
    long countByUserId(Long userId);
}

