package com.lifecare.pathology.dto.response;

import lombok.*;
import java.math.BigDecimal;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class TestResponse {
    private Long id;
    private String testName;
    private String testCode;
    private String description;
    private BigDecimal price;
    private String sampleType;
    private boolean active;
}