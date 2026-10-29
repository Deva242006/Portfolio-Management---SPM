package com.portfoliohub.service;

import com.portfoliohub.dto.CertificationDto;
import com.portfoliohub.entity.Certification;
import com.portfoliohub.entity.User;
import com.portfoliohub.exception.ResourceNotFoundException;
import com.portfoliohub.exception.UnauthorizedException;
import com.portfoliohub.repository.CertificationRepository;
import com.portfoliohub.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CertificationService {

    private final CertificationRepository certificationRepository;
    private final UserRepository userRepository;

    public CertificationService(CertificationRepository certificationRepository, UserRepository userRepository) {
        this.certificationRepository = certificationRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<CertificationDto> getCertifications(Long userId) {
        return certificationRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public CertificationDto addCertification(Long userId, CertificationDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Certification cert = new Certification();
        cert.setUser(user);
        cert.setName(dto.getName().trim());
        cert.setIssuingOrganization(dto.getIssuingOrganization().trim());
        cert.setIssueDate(dto.getIssueDate());
        cert.setCredentialUrl(dto.getCredentialUrl());
        cert.setCredentialId(dto.getCredentialId());

        Certification saved = certificationRepository.save(cert);
        return toDto(saved);
    }

    @Transactional
    public CertificationDto updateCertification(Long userId, Long certId, CertificationDto dto) {
        Certification cert = certificationRepository.findById(certId)
                .orElseThrow(() -> new ResourceNotFoundException("Certification", "id", certId));

        if (!cert.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to update this certification");
        }

        cert.setName(dto.getName().trim());
        cert.setIssuingOrganization(dto.getIssuingOrganization().trim());
        cert.setIssueDate(dto.getIssueDate());
        cert.setCredentialUrl(dto.getCredentialUrl());
        cert.setCredentialId(dto.getCredentialId());

        Certification updated = certificationRepository.save(cert);
        return toDto(updated);
    }

    @Transactional
    public void deleteCertification(Long userId, Long certId) {
        Certification cert = certificationRepository.findById(certId)
                .orElseThrow(() -> new ResourceNotFoundException("Certification", "id", certId));

        if (!cert.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to delete this certification");
        }

        certificationRepository.delete(cert);
    }

    public CertificationDto toDto(Certification cert) {
        if (cert == null) return null;
        return new CertificationDto(
                cert.getId(),
                cert.getName(),
                cert.getIssuingOrganization(),
                cert.getIssueDate(),
                cert.getCredentialUrl(),
                cert.getCredentialId(),
                cert.getCreatedAt()
        );
    }
}

