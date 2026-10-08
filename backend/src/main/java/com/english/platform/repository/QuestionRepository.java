package com.english.platform.repository;

import com.english.platform.domain.entity.Question;
import com.english.platform.domain.entity.User.CefrLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByLevel(CefrLevel level);
}