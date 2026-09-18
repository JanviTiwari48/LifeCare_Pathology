package com.lifecare.pathology.controller;

import com.lifecare.pathology.dto.response.TestResponse;
import com.lifecare.pathology.service.TestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tests")
public class TestController {

    private final TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    @GetMapping
    public ResponseEntity<List<TestResponse>> getAllTests() {
        return ResponseEntity.ok(testService.getAllTests());
    }

    @GetMapping("/active")
    public ResponseEntity<List<TestResponse>> getActiveTests() {
        return ResponseEntity.ok(testService.getActiveTests());
    }
}