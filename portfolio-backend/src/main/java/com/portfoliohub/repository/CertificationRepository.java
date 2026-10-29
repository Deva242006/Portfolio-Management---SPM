package com.portfoliohub.repository;

import com.portfoliohub.entity.Certification;
import com.portfoliohub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Long> {
    List<Certification> findByUserOrderByCreatedAtDesc(User user);
    List<Certification> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<Certification> findByIdAndUser(Long id, User user);
    long countByUser(User user);
    long countByUserId(Long userId);
}

