package com.english.platform.service;

import com.english.platform.domain.entity.User.CefrLevel;
import com.english.platform.dto.SpeakingDtos.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiSpeakingService {

    @Value("${ai.api.key:mock_key}")
    private String apiKey;

    @Value("${ai.model:gpt-4o}")
    private String model;

    private final RestClient restClient = RestClient.create();

    public SpeakingResponse generateAiResponse(List<ChatMessage> conversationHistory, CefrLevel level, String topic) {
        try {
            Map<String, Object> requestBody = Map.of(
                "model", model,
                "messages", List.of(
                    Map.of("role", "system", "content", "You are an English tutor for level " + level + " discussing " + topic),
                    Map.of("role", "user", "content", conversationHistory.get(conversationHistory.size() - 1).text())
                )
            );

            Map response = restClient.post()
                .uri("https://api.openai.com/v1/chat/completions")
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .body(requestBody)
                .retrieve()
                .body(Map.class);

            List choices = (List) response.get("choices");
            Map firstChoice = (Map) choices.get(0);
            Map message = (Map) firstChoice.get("message");
            String aiText = (String) message.get("content");

            return new SpeakingResponse(aiText, "Tip: Watch your tenses!");
        } catch (Exception e) {
            return new SpeakingResponse(
                "That's a very interesting point about " + topic + "! Could you expand more on why you think that is?",
                "Quick tip: Remember to use present perfect when talking about experiences."
            );
        }
    }
}