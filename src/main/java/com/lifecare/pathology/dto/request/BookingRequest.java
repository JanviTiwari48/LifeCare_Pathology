package com.lifecare.pathology.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookingRequest {

    @NotNull(message = "Test ID is required")
    private Long testId;
}