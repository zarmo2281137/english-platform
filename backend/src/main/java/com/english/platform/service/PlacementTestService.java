package com.english.platform.service;

import com.english.platform.domain.entity.PlacementAttempt;
import com.english.platform.domain.entity.User;
import com.english.platform.domain.entity.User.CefrLevel;
import com.english.platform.repository.PlacementAttemptRepository;
import com.english.platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlacementTestService {

    private final PlacementAttemptRepository placementAttemptRepository;
    private final UserRepository userRepository;

    public PlacementAttempt calculateAndSaveResult(User user, double scorePercentage) {
        CefrLevel level = scorePercentage > 80 ? CefrLevel.B2 : CefrLevel.B1;
        user.setCurrentLevel(level);
        userRepository.save(user);

        PlacementAttempt attempt = PlacementAttempt.builder()
                .user(user)
                .assignedLevel(level)
                .overallScore(scorePercentage)
                .build();

        return placementAttemptRepository.save(attempt);
    }
}