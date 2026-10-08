package com.english.platform.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminImportController {

    @PostMapping("/import/questions")
    public ResponseEntity<String> importQuestions(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok("Successfully processed import file: " + file.getOriginalFilename());
    }
}