package com.portfoliohub.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfoliohub.dto.ai.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class AIContentService {

    private static final Logger logger = LoggerFactory.getLogger(AIContentService.class);

    @Value("${gemini.api.key:}")
    private String geminiApiKey;

    @Value("${gemini.api.url:https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent}")
    private String geminiApiUrl;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public AIContentService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    // ───────────────────────────────────────────────────────────────────────────
    // PUBLIC API METHODS
    // ───────────────────────────────────────────────────────────────────────────

    public AIGeneratedResponse generateAboutMe(AboutMeRequest request) {
        if (!isApiKeyConfigured()) {
            return AIGeneratedResponse.error(getApiKeyMissingMessage());
        }

        String toneInstruction = buildToneInstruction(request.getTone());
        String prompt = """
                You are a professional portfolio writer. Write a first-person About Me section for a portfolio website.
                
                STRICT RULES:
                - Use ONLY the facts provided below. Do NOT invent qualifications, achievements, degrees, job titles, or experience not mentioned.
                - Do NOT add "Senior", "Expert", "10+ years" or similar unless the user explicitly stated it.
                - Write in first person.
                - Write 3-4 sentences only.
                - Output ONLY the About Me paragraph. No headings, no labels, no extra text.
                
                Tone: %s
                %s
                Name: %s
                Career Goal / Current Role: %s
                Education: %s
                Technical Skills: %s
                Projects Built: %s
                Work Experience: %s
                Career Interests: %s
                """.formatted(
                request.getTone() != null ? request.getTone() : "Professional",
                toneInstruction,
                nullSafe(request.getFullName()),
                nullSafe(request.getRole()),
                nullSafe(request.getEducation()),
                nullSafe(request.getSkills()),
                nullSafe(request.getProjects()),
                nullSafe(request.getExperience()),
                nullSafe(request.getInterests())
        );

        return callGemini(prompt);
    }

    public AIGeneratedResponse generateProjectDescription(ProjectDescriptionRequest request) {
        if (!isApiKeyConfigured()) {
            return AIGeneratedResponse.error(getApiKeyMissingMessage());
        }

        String modeInstruction = buildModeInstruction(request.getMode());
        String prompt = """
                You are a professional technical writer. Write a project description for a portfolio website.
                
                STRICT RULES:
                - Use ONLY the information provided below. Do NOT invent features, achievements, or capabilities not mentioned.
                - Do NOT add metrics, percentages, or performance figures unless the user provided them.
                - Output ONLY the project description. No headings, no labels, no extra text.
                
                Mode: %s
                %s
                
                Project Title: %s
                Purpose / Goal: %s
                Technologies Used: %s
                Features Implemented: %s
                Problems Solved: %s
                GitHub URL: %s
                Live Demo URL: %s
                """.formatted(
                request.getMode() != null ? request.getMode() : "detailed",
                modeInstruction,
                nullSafe(request.getTitle()),
                nullSafe(request.getPurpose()),
                nullSafe(request.getTechnologies()),
                nullSafe(request.getFeatures()),
                nullSafe(request.getProblemsSolved()),
                nullSafe(request.getGithubUrl()),
                nullSafe(request.getLiveDemoUrl())
        );

        return callGemini(prompt);
    }

    public AIGeneratedResponse generateHeadlines(HeadlineRequest request) {
        if (!isApiKeyConfigured()) {
            return AIGeneratedResponse.error(getApiKeyMissingMessage());
        }

        String prompt = """
                You are a professional portfolio copywriter. Generate exactly 3 professional headline options for a portfolio website.
                
                STRICT RULES:
                - Use ONLY the facts provided. Do NOT add "Senior", "Expert", "Lead", or years of experience unless the user stated them.
                - Each headline should be concise: 5-12 words maximum.
                - Each headline must be distinct (different angle/focus).
                - Output ONLY the 3 headlines, numbered 1. 2. 3. — nothing else.
                
                Name: %s
                Career Goal / Desired Role: %s
                Technical Skills: %s
                Experience Level: %s
                """.formatted(
                nullSafe(request.getFullName()),
                nullSafe(request.getCareerGoal()),
                nullSafe(request.getSkills()),
                nullSafe(request.getExperienceLevel())
        );

        AIGeneratedResponse rawResponse = callGemini(prompt);
        if (!rawResponse.isSuccess()) {
            return rawResponse;
        }

        // Parse numbered list into alternatives
        List<String> alternatives = parseNumberedList(rawResponse.getContent());
        if (alternatives.isEmpty()) {
            // Fallback: return the raw content as one alternative
            alternatives.add(rawResponse.getContent().trim());
        }
        return AIGeneratedResponse.withAlternatives(alternatives);
    }

    public AIGeneratedResponse suggestImprovements(ImprovementRequest request) {
        if (!isApiKeyConfigured()) {
            return AIGeneratedResponse.error(getApiKeyMissingMessage());
        }

        String prompt = """
                You are a professional portfolio reviewer and career coach. Review the following portfolio content and provide specific, actionable improvement suggestions.
                
                STRICT RULES:
                - Only base your suggestions on what is actually provided. Do NOT assume skills or experience not listed.
                - Be constructive and specific.
                - Format as a numbered list of 4-6 suggestions.
                - Output ONLY the numbered suggestions — no introduction, no conclusion.
                
                Current Bio: %s
                Skills: %s
                Projects: %s
                Professional Headline: %s
                """.formatted(
                nullSafe(request.getCurrentBio()),
                nullSafe(request.getSkills()),
                nullSafe(request.getProjects()),
                nullSafe(request.getHeadline())
        );

        return callGemini(prompt);
    }

    // ───────────────────────────────────────────────────────────────────────────
    // PRIVATE HELPERS
    // ───────────────────────────────────────────────────────────────────────────

    private boolean isApiKeyConfigured() {
        return geminiApiKey != null && !geminiApiKey.isBlank();
    }

    private String getApiKeyMissingMessage() {
        return "AI_KEY_NOT_CONFIGURED: The GEMINI_API_KEY environment variable is not set on the backend server. " +
               "Please set it and restart the backend to enable AI features.";
    }

    private AIGeneratedResponse callGemini(String promptText) {
        try {
            String url = geminiApiUrl + "?key=" + geminiApiKey;

            String requestBody = """
                    {
                      "contents": [
                        {
                          "parts": [
                            {
                              "text": %s
                            }
                          ]
                        }
                      ],
                      "generationConfig": {
                        "temperature": 0.7,
                        "maxOutputTokens": 800,
                        "topP": 0.9
                      }
                    }
                    """.formatted(objectMapper.writeValueAsString(promptText));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                String generatedText = extractTextFromGeminiResponse(response.getBody());
                if (generatedText != null && !generatedText.isBlank()) {
                    return AIGeneratedResponse.success(generatedText.trim());
                } else {
                    return AIGeneratedResponse.error("The AI returned an empty response. Please try again.");
                }
            } else {
                logger.error("Gemini API returned non-2xx status: {}", response.getStatusCode());
                return AIGeneratedResponse.error("AI service returned an unexpected response. Please try again.");
            }

        } catch (Exception e) {
            logger.error("Error calling Gemini API: {}", e.getMessage());
            String msg = e.getMessage();
            if (msg != null && msg.contains("400")) {
                return AIGeneratedResponse.error("Invalid request sent to AI service. Please check your input and try again.");
            } else if (msg != null && msg.contains("403")) {
                return AIGeneratedResponse.error("Invalid or unauthorized Gemini API key. Please check the GEMINI_API_KEY configuration.");
            } else if (msg != null && msg.contains("429")) {
                return AIGeneratedResponse.error("AI service rate limit reached. Please wait a moment and try again.");
            } else {
                return AIGeneratedResponse.error("Failed to connect to AI service. Please check your internet connection and try again.");
            }
        }
    }

    private String extractTextFromGeminiResponse(String responseBody) {
        try {
            JsonNode root = objectMapper.readTree(responseBody);
            JsonNode candidates = root.path("candidates");
            if (candidates.isArray() && !candidates.isEmpty()) {
                JsonNode content = candidates.get(0).path("content");
                JsonNode parts = content.path("parts");
                if (parts.isArray() && !parts.isEmpty()) {
                    return parts.get(0).path("text").asText();
                }
            }
            // Check for error in response
            JsonNode error = root.path("error");
            if (!error.isMissingNode()) {
                String errorMsg = error.path("message").asText("Unknown AI error");
                logger.error("Gemini API error in response body: {}", errorMsg);
                return null;
            }
        } catch (Exception e) {
            logger.error("Failed to parse Gemini response: {}", e.getMessage());
        }
        return null;
    }

    private List<String> parseNumberedList(String text) {
        List<String> items = new ArrayList<>();
        if (text == null || text.isBlank()) return items;

        String[] lines = text.split("\n");
        for (String line : lines) {
            String trimmed = line.trim();
            // Match lines starting with "1.", "2.", "3." etc.
            if (trimmed.matches("^\\d+\\..*")) {
                String item = trimmed.replaceFirst("^\\d+\\.\\s*", "").trim();
                if (!item.isBlank()) {
                    items.add(item);
                }
            }
        }
        return items;
    }

    private String buildToneInstruction(String tone) {
        if (tone == null) return "";
        return switch (tone.toLowerCase()) {
            case "friendly"    -> "Writing style: warm, approachable, conversational — like talking to a colleague.";
            case "confident"   -> "Writing style: assertive and direct — state capabilities clearly without over-qualifying.";
            case "creative"    -> "Writing style: expressive and memorable — use vivid but professional language.";
            case "concise"     -> "Writing style: very brief and to the point — maximum 2 sentences, no filler words.";
            default            -> "Writing style: formal, polished, and professional — suitable for corporate environments.";
        };
    }

    private String buildModeInstruction(String mode) {
        if (mode == null) return "";
        return switch (mode.toLowerCase()) {
            case "short"            -> "Length: Write 1-2 sentences only. Very brief overview.";
            case "resume-friendly"  -> "Length: Write 2-3 sentences. Use action verbs. Suitable for a resume bullet-point style.";
            case "recruiter-focused"-> "Length: Write 3-4 sentences. Highlight the problem solved, technologies, and outcomes clearly.";
            default                 -> "Length: Write 3-5 sentences. Include overview, technologies, and key features.";
        };
    }

    private String nullSafe(String value) {
        return (value == null || value.isBlank()) ? "Not provided" : value.trim();
    }
}

