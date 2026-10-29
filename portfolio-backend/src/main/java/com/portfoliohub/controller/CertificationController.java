package com.portfoliohub.controller;

import com.portfoliohub.dto.ApiResponse;
import com.portfoliohub.dto.CertificationDto;
import com.portfoliohub.security.UserPrincipal;
import com.portfoliohub.service.CertificationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certifications")
public class CertificationController {

    private final CertificationService certificationService;

    public CertificationController(CertificationService certificationService) {
        this.certificationService = certificationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CertificationDto>>> getCertifications(@AuthenticationPrincipal UserPrincipal principal) {
        List<CertificationDto> certs = certificationService.getCertifications(principal.getId());
        return ResponseEntity.ok(ApiResponse.ok("Certifications retrieved successfully", certs));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CertificationDto>> addCertification(@AuthenticationPrincipal UserPrincipal principal,
                                                                          @Valid @RequestBody CertificationDto certDto) {
        CertificationDto created = certificationService.addCertification(principal.getId(), certDto);
        return new ResponseEntity<>(ApiResponse.ok("Certification created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CertificationDto>> updateCertification(@AuthenticationPrincipal UserPrincipal principal,
                                                                             @PathVariable Long id,
                                                                             @Valid @RequestBody CertificationDto certDto) {
        CertificationDto updated = certificationService.updateCertification(principal.getId(), id, certDto);
        return ResponseEntity.ok(ApiResponse.ok("Certification updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCertification(@AuthenticationPrincipal UserPrincipal principal,
                                                                 @PathVariable Long id) {
        certificationService.deleteCertification(principal.getId(), id);
        return ResponseEntity.ok(ApiResponse.ok("Certification deleted successfully"));
    }
}

