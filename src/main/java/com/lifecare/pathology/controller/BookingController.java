package com.lifecare.pathology.controller;

import com.lifecare.pathology.dto.request.BookingRequest;
import com.lifecare.pathology.dto.request.StatusUpdateRequest;
import com.lifecare.pathology.dto.response.BookingResponse;
import com.lifecare.pathology.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<BookingResponse> createBooking(@Valid @RequestBody BookingRequest request) {
        String email = currentEmail();
        return ResponseEntity.ok(bookingService.createBooking(email, request));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('PATIENT','LAB_TECHNICIAN')")
    public ResponseEntity<BookingResponse> getBookingById(@PathVariable Long id) {
        String email = currentEmail();
        String role = currentRole();
        return ResponseEntity.ok(bookingService.getBookingById(email, role, id));
    }

    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<BookingResponse>> getBookingsForPatient(@PathVariable Long patientId) {
        String email = currentEmail();
        return ResponseEntity.ok(bookingService.getBookingsForPatient(email, patientId));
    }

    @GetMapping
    @PreAuthorize("hasRole('LAB_TECHNICIAN')")
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }


    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('LAB_TECHNICIAN')")
    public ResponseEntity<BookingResponse> updateStatus(@PathVariable Long id,
                                                        @Valid @RequestBody StatusUpdateRequest request) {
        return ResponseEntity.ok(bookingService.updateStatus(id, request.getStatus()));
    }

    private String currentEmail() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName(); // username = email, set in UserDetailsServiceImpl
    }

    private String currentRole() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
    }
}