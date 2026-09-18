package com.lifecare.pathology.service;

import com.lifecare.pathology.dto.response.TestResponse;
import com.lifecare.pathology.mapper.TestMapper;
import com.lifecare.pathology.repository.PathologyTestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {

    private final PathologyTestRepository testRepository;

    public TestService(PathologyTestRepository testRepository) {
        this.testRepository = testRepository;
    }

    public List<TestResponse> getAllTests() {
        return testRepository.findAll()
                .stream()
                .map(TestMapper::toResponse)
                .toList();
    }

    public List<TestResponse> getActiveTests() {
        return testRepository.findByActiveTrue()
                .stream()
                .map(TestMapper::toResponse)
                .toList();
    }
}