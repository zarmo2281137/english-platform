package com.english.platform.config;

import com.english.platform.domain.entity.User;
import com.english.platform.domain.entity.User.Role;
import com.english.platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SeedDataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User demoUser = User.builder()
                    .name("Demo Learner")
                    .email("demo@example.com")
                    .passwordHash(passwordEncoder.encode("demo12345"))
                    .role(Role.ROLE_USER)
                    .currentLevel(User.CefrLevel.B2)
                    .learningStreak(7)
                    .xp(1250)
                    .build();
            userRepository.save(demoUser);

            User adminUser = User.builder()
                    .name("System Admin")
                    .email("admin@example.com")
                    .passwordHash(passwordEncoder.encode("admin12345"))
                    .role(Role.ROLE_ADMIN)
                    .currentLevel(User.CefrLevel.C2)
                    .build();
            userRepository.save(adminUser);

            System.out.println("✅ Initial seed accounts created: demo@example.com / admin@example.com");
        }
    }
}