package com.portfoliohub.controller;

import com.portfoliohub.dto.ApiResponse;
import com.portfoliohub.dto.DashboardStatsDto;
import com.portfoliohub.security.UserPrincipal;
import com.portfoliohub.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsDto>> getDashboardStats(@AuthenticationPrincipal UserPrincipal principal) {
        DashboardStatsDto stats = dashboardService.getDashboardStats(principal.getId());
        return ResponseEntity.ok(ApiResponse.ok("Dashboard statistics retrieved successfully", stats));
    }
}

