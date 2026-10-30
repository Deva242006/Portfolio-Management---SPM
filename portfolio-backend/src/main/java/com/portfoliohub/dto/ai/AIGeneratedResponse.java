package com.portfoliohub.dto.ai;

import java.util.List;

public class AIGeneratedResponse {

    private boolean success;
    private String content;
    private List<String> alternatives;
    private String errorMessage;
    private String type;

    public AIGeneratedResponse() {}

    public static AIGeneratedResponse success(String content) {
        AIGeneratedResponse r = new AIGeneratedResponse();
        r.success = true;
        r.content = content;
        return r;
    }

    public static AIGeneratedResponse withAlternatives(List<String> alternatives) {
        AIGeneratedResponse r = new AIGeneratedResponse();
        r.success = true;
        r.alternatives = alternatives;
        if (!alternatives.isEmpty()) {
            r.content = alternatives.get(0);
        }
        return r;
    }

    public static AIGeneratedResponse error(String message) {
        AIGeneratedResponse r = new AIGeneratedResponse();
        r.success = false;
        r.errorMessage = message;
        return r;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public List<String> getAlternatives() { return alternatives; }
    public void setAlternatives(List<String> alternatives) { this.alternatives = alternatives; }

    public String getErrorMessage() { return errorMessage; }
    public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}

