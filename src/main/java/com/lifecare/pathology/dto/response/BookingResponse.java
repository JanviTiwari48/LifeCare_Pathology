package com.lifecare.pathology.dto.response;

import com.lifecare.pathology.entity.enums.BookingStatus;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class BookingResponse {
    private Long id;
    private String testName;
    private LocalDateTime bookingDate;
    private BookingStatus status;
    private BigDecimal totalAmount;
    private String patientName;   // useful for the lab technician's view
}