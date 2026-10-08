package com.english.platform.service;

import com.english.platform.dto.SpeakingDtos.SessionReport;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SpeakingEvaluationService {

    public SessionReport evaluateSession(List<String> userTranscripts) {
        int totalWords = userTranscripts.stream().mapToInt(t -> t.split("\\s+").length).sum();
        
        double fluency = Math.min(95.0, 60.0 + (totalWords * 0.2));
        double grammar = 78.5;
        double vocabulary = 82.0;
        double pronunciation = 76.0;
        double overall = (fluency + grammar + vocabulary + pronunciation) / 4.0;

        return new SessionReport(
            overall, fluency, grammar, vocabulary, pronunciation,
            List.of("Conditionals", "Prepositions"),
            List.of("Mastering B2 Conditionals")
        );
    }
}