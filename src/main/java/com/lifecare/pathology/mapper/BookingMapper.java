package com.lifecare.pathology.mapper;

import com.lifecare.pathology.dto.response.BookingResponse;
import com.lifecare.pathology.entity.Booking;

public class BookingMapper {

    public static BookingResponse toResponse(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId())
                .testName(booking.getTest().getTestName())
                .bookingDate(booking.getBookingDate())
                .status(booking.getStatus())
                .totalAmount(booking.getTotalAmount())
                .patientName(booking.getPatient().getUser().getName())
                .build();
    }
}