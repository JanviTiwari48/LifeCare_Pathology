package com.lifecare.pathology.mapper;

import com.lifecare.pathology.dto.response.SampleResponse;
import com.lifecare.pathology.entity.Sample;

public class SampleMapper {

    public static SampleResponse toResponse(Sample sample) {
        return SampleResponse.builder()
                .id(sample.getId())
                .bookingId(sample.getBooking().getId())
                .sampleCode(sample.getSampleCode())
                .collectedAt(sample.getCollectedAt())
                .collectedBy(sample.getCollectedBy())
                .sampleStatus(sample.getSampleStatus())
                .build();
    }
}