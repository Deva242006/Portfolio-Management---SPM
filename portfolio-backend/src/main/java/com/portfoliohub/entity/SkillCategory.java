package com.portfoliohub.entity;

public enum SkillCategory {
    PROGRAMMING_LANGUAGES("Programming Languages"),
    FRONTEND("Frontend"),
    BACKEND("Backend"),
    DATABASES("Databases"),
    TOOLS("Tools");

    private final String displayName;

    SkillCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static SkillCategory fromString(String text) {
        if (text == null) return TOOLS;
        for (SkillCategory b : SkillCategory.values()) {
            if (b.name().equalsIgnoreCase(text) || b.displayName.equalsIgnoreCase(text)) {
                return b;
            }
        }
        return TOOLS;
    }
}

