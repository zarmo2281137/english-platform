package com.english.platform.repository;

import com.english.platform.domain.entity.PlacementAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlacementAttemptRepository extends JpaRepository<PlacementAttempt, Long> {
    List<PlacementAttempt> findByUserIdOrderByCreatedAtDesc(Long userId);
}