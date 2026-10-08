package com.english.platform.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "user_mistakes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserMistake {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    private String userAnswer;

    @Builder.Default
    private Integer attemptsCount = 1;

    @Builder.Default
    private Boolean resolved = false;

    private Instant lastFailedAt;

    @PrePersist
    protected void onCreate() {
        lastFailedAt = Instant.now();
    }
}