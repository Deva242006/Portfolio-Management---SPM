package com.portfoliohub.dto;

public class PublishRequest {
    private boolean published;

    public PublishRequest() {
    }

    public PublishRequest(boolean published) {
        this.published = published;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }
}

