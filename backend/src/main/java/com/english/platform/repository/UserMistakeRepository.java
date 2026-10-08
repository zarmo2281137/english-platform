package com.english.platform.repository;

import com.english.platform.domain.entity.UserMistake;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserMistakeRepository extends JpaRepository<UserMistake, Long> {
    List<UserMistake> findByUserIdAndResolvedFalse(Long userId);
    long countByUserIdAndResolvedFalse(Long userId);
}