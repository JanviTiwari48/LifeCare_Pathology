package com.lifecare.pathology.dto.response;

import com.lifecare.pathology.entity.enums.SampleStatus;
import lombok.*;
import java.time.LocalDateTime;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class SampleResponse {
    private Long id;
    private Long bookingId;
    private String sampleCode;
    private LocalDateTime collectedAt;
    private String collectedBy;
    private SampleStatus sampleStatus;
}