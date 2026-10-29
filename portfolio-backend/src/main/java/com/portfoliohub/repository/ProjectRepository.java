package com.portfoliohub.repository;

import com.portfoliohub.entity.Project;
import com.portfoliohub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUserOrderByCreatedAtDesc(User user);
    List<Project> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<Project> findTop5ByUserOrderByCreatedAtDesc(User user);
    Optional<Project> findByIdAndUser(Long id, User user);
    long countByUser(User user);
    long countByUserId(Long userId);
}

