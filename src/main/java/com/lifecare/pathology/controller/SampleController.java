package com.lifecare.pathology.controller;

import com.lifecare.pathology.dto.response.SampleResponse;
import com.lifecare.pathology.service.SampleService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/samples")
@PreAuthorize("hasRole('LAB_TECHNICIAN')")
public class SampleController {

    private final SampleService sampleService;

    public SampleController(SampleService sampleService) {
        this.sampleService = sampleService;
    }

    @PostMapping("/booking/{bookingId}")
    public ResponseEntity<SampleResponse> collectSample(@PathVariable Long bookingId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String collectedBy = auth.getName(); // technician's email; swap for name if you prefer
        return ResponseEntity.ok(sampleService.collectSample(bookingId, collectedBy));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SampleResponse> getSampleById(@PathVariable Long id) {
        return ResponseEntity.ok(sampleService.getSampleById(id));
    }

    @GetMapping
    public ResponseEntity<List<SampleResponse>> getAllSamples() {
        return ResponseEntity.ok(sampleService.getAllSamples());
    }
}