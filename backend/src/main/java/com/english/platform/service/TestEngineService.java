package com.english.platform.service;

import com.english.platform.domain.entity.Question;
import com.english.platform.domain.entity.User;
import com.english.platform.domain.entity.UserMistake;
import com.english.platform.repository.QuestionRepository;
import com.english.platform.repository.UserMistakeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TestEngineService {

    private final QuestionRepository questionRepository;
    private final UserMistakeRepository mistakeRepository;

    public void processTestSubmission(User user, Map<Long, String> userAnswers) {
        for (Map.Entry<Long, String> entry : userAnswers.entrySet()) {
            Question question = questionRepository.findById(entry.getKey()).orElseThrow();
            if (!entry.getValue().trim().equalsIgnoreCase("correct")) {
                UserMistake mistake = UserMistake.builder()
                        .user(user)
                        .question(question)
                        .userAnswer(entry.getValue())
                        .build();
                mistakeRepository.save(mistake);
            }
        }
    }

    public List<UserMistake> getUserMistakesForPractice(User user) {
        return mistakeRepository.findByUserIdAndResolvedFalse(user.getId());
    }
}