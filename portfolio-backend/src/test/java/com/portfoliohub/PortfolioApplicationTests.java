package com.portfoliohub;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfoliohub.dto.*;
import com.portfoliohub.entity.SkillCategory;
import com.portfoliohub.repository.ProjectRepository;
import com.portfoliohub.repository.SkillRepository;
import com.portfoliohub.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class PortfolioApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private com.portfoliohub.repository.ExperienceRepository experienceRepository;

    @BeforeEach
    void setup() {
        if (experienceRepository != null) experienceRepository.deleteAll();
        projectRepository.deleteAll();
        skillRepository.deleteAll();
        userRepository.deleteAll();
    }

    private String registerAndGetToken(String username, String email, String password) throws Exception {
        RegisterRequest registerReq = new RegisterRequest(username, email, password, "Test " + username);
        MvcResult result = mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.token").exists())
                .andReturn();

        String json = result.getResponse().getContentAsString();
        return objectMapper.readTree(json).get("data").get("token").asText();
    }

    @Test
    void testUserRegistrationAndLogin() throws Exception {
        RegisterRequest registerReq = new RegisterRequest("alexsmith", "alex@example.com", "Password123!", "Alex Smith");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.user.username").value("alexsmith"))
                .andExpect(jsonPath("$.data.user.email").value("alex@example.com"));

        // Duplicate email registration should fail
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerReq)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", containsString("already")));

        // Login
        LoginRequest loginReq = new LoginRequest("alex@example.com", "Password123!");
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.token").exists());
    }

    @Test
    void testSkillsCrudOperations() throws Exception {
        String token = registerAndGetToken("skilluser", "skill@example.com", "Password123!");

        // Add Skill
        SkillDto skillDto = new SkillDto(null, "React.js", "Frontend", "Advanced", null);
        MvcResult addResult = mockMvc.perform(post("/api/skills")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(skillDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.name").value("React.js"))
                .andExpect(jsonPath("$.data.category").value("Frontend"))
                .andReturn();

        long skillId = objectMapper.readTree(addResult.getResponse().getContentAsString()).get("data").get("id").asLong();

        // Get Skills
        mockMvc.perform(get("/api/skills")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].name").value("React.js"));

        // Update Skill
        SkillDto updateDto = new SkillDto(null, "React 19 & Next.js", "Frontend", "Expert", null);
        mockMvc.perform(put("/api/skills/" + skillId)
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value("React 19 & Next.js"))
                .andExpect(jsonPath("$.data.proficiencyLevel").value("Expert"));

        // Delete Skill
        mockMvc.perform(delete("/api/skills/" + skillId)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());

        // Verify empty list
        mockMvc.perform(get("/api/skills")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(0)));
    }

    @Test
    void testProjectsCrudAndOwnershipSecurity() throws Exception {
        String tokenUserA = registerAndGetToken("user_a", "usera@example.com", "Password123!");
        String tokenUserB = registerAndGetToken("user_b", "userb@example.com", "Password123!");

        // User A creates project
        ProjectDto projectDto = new ProjectDto(null, "PortfolioHub", "Personal portfolio system",
                "React, Spring Boot", "https://github.com/alex/portfolio", "https://demo.com", null, true, null, null);

        MvcResult createResult = mockMvc.perform(post("/api/projects")
                        .header("Authorization", "Bearer " + tokenUserA)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(projectDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.title").value("PortfolioHub"))
                .andReturn();

        long projectId = objectMapper.readTree(createResult.getResponse().getContentAsString()).get("data").get("id").asLong();

        // User B tries to update User A's project -> MUST BE FORBIDDEN / UNAUTHORIZED
        ProjectDto maliciousUpdate = new ProjectDto(null, "Hacked Title", "Hacked", "PHP", null, null, null, false, null, null);
        mockMvc.perform(put("/api/projects/" + projectId)
                        .header("Authorization", "Bearer " + tokenUserB)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(maliciousUpdate)))
                .andExpect(status().isUnauthorized());

        // User B tries to delete User A's project -> MUST BE FORBIDDEN / UNAUTHORIZED
        mockMvc.perform(delete("/api/projects/" + projectId)
                        .header("Authorization", "Bearer " + tokenUserB))
                .andExpect(status().isUnauthorized());

        // User A successfully updates own project
        ProjectDto validUpdate = new ProjectDto(null, "PortfolioHub v2", "Updated description",
                "React, Spring Boot, MySQL", "https://github.com/alex/portfolio", "https://demo.com", null, true, null, null);
        mockMvc.perform(put("/api/projects/" + projectId)
                        .header("Authorization", "Bearer " + tokenUserA)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validUpdate)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.title").value("PortfolioHub v2"));
    }

    @Test
    void testPublicPortfolioPublishingAndAccessControl() throws Exception {
        String token = registerAndGetToken("devhero", "hero@example.com", "Password123!");

        // Initially unpublished -> public endpoint should return 404 Not Found
        mockMvc.perform(get("/api/public/devhero"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message", containsString("private")));

        // Publish portfolio
        PublishRequest publishReq = new PublishRequest(true);
        mockMvc.perform(put("/api/portfolio/publish")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(publishReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").value(true));

        // Now public endpoint should return 200 OK
        mockMvc.perform(get("/api/public/devhero"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.username").value("devhero"))
                .andExpect(jsonPath("$.data.published").value(true));

        // Unpublish portfolio
        publishReq.setPublished(false);
        mockMvc.perform(put("/api/portfolio/publish")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(publishReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").value(false));

        // Access should be private again
        mockMvc.perform(get("/api/public/devhero"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testDashboardStats() throws Exception {
        String token = registerAndGetToken("statuser", "stat@example.com", "Password123!");

        // Add 1 skill
        SkillDto skillDto = new SkillDto(null, "Java", "Backend", "Advanced", null);
        mockMvc.perform(post("/api/skills")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(skillDto)));

        // Add 1 project
        ProjectDto projectDto = new ProjectDto(null, "Test Project", "Desc", "Java", null, null, null, false, null, null);
        mockMvc.perform(post("/api/projects")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(projectDto)));

        // Check Dashboard stats
        mockMvc.perform(get("/api/dashboard/stats")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalSkills").value(1))
                .andExpect(jsonPath("$.data.totalProjects").value(1))
                .andExpect(jsonPath("$.data.profileCompletionPercentage", greaterThan(0)))
                .andExpect(jsonPath("$.data.username").value("statuser"))
                .andExpect(jsonPath("$.data.publicUrl").value("/u/statuser"));
    }
}

