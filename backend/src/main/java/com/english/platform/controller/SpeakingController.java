package com.english.platform.controller;

import com.english.platform.domain.entity.User.CefrLevel;
import com.english.platform.dto.SpeakingDtos.*;
import com.english.platform.service.AiSpeakingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/speaking")
@RequiredArgsConstructor
public class SpeakingController {

    private final AiSpeakingService aiSpeakingService;

    @PostMapping("/chat")
    public ResponseEntity<SpeakingResponse> chat(
            @RequestBody List<ChatMessage> history,
            @RequestParam(defaultValue = "B2") CefrLevel level,
            @RequestParam(defaultValue = "General") String topic) {
        return ResponseEntity.ok(aiSpeakingService.generateAiResponse(history, level, topic));
    }
}