package com.lifecare.pathology.mapper;

import com.lifecare.pathology.dto.response.TestResponse;
import com.lifecare.pathology.entity.PathologyTest;

public class TestMapper {

    public static TestResponse toResponse(PathologyTest test) {
        return TestResponse.builder()
                .id(test.getId())
                .testName(test.getTestName())
                .testCode(test.getTestCode())
                .description(test.getDescription())
                .price(test.getPrice())
                .sampleType(test.getSampleType())
                .active(test.isActive())
                .build();
    }
}