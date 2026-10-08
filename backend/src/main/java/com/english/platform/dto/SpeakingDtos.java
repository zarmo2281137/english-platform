package com.english.platform.dto;

import java.util.List;

public class SpeakingDtos {
    public record ChatMessage(String text, boolean isUser) {}
    public record SpeakingResponse(String aiResponse, String quickCorrection) {}
    public record SessionReport(
        double overall, double fluency, double grammar, double vocabulary, double pronunciation,
        List<String> weakAreas, List<String> recommendedLessons
    ) {}
}