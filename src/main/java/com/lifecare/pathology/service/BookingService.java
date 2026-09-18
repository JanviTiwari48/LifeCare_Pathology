package com.lifecare.pathology.service;

import com.lifecare.pathology.dto.request.BookingRequest;
import com.lifecare.pathology.dto.response.BookingResponse;
import com.lifecare.pathology.entity.Booking;
import com.lifecare.pathology.entity.Patient;
import com.lifecare.pathology.entity.PathologyTest;
import com.lifecare.pathology.entity.User;
import com.lifecare.pathology.entity.enums.BookingStatus;
import com.lifecare.pathology.exception.ResourceNotFoundException;
import com.lifecare.pathology.exception.UnauthorizedActionException;
import com.lifecare.pathology.mapper.BookingMapper;
import com.lifecare.pathology.repository.BookingRepository;
import com.lifecare.pathology.repository.PatientRepository;
import com.lifecare.pathology.repository.PathologyTestRepository;
import com.lifecare.pathology.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final PatientRepository patientRepository;
    private final PathologyTestRepository testRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository,
                          PatientRepository patientRepository,
                          PathologyTestRepository testRepository,
                          UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.patientRepository = patientRepository;
        this.testRepository = testRepository;
        this.userRepository = userRepository;
    }

    public BookingResponse createBooking(String email, BookingRequest request) {
        Patient patient = getPatientByEmail(email);

        PathologyTest test = testRepository.findById(request.getTestId())
                .orElseThrow(() -> new ResourceNotFoundException("Test not found: " + request.getTestId()));

        if (!test.isActive()) {
            throw new IllegalStateException("Cannot book an inactive test");
        }

        Booking booking = Booking.builder()
                .patient(patient)
                .test(test)
                .bookingDate(LocalDateTime.now())
                .status(BookingStatus.BOOKED)
                .totalAmount(test.getPrice())
                .build();

        booking = bookingRepository.save(booking);
        return BookingMapper.toResponse(booking);
    }

    public BookingResponse getBookingById(String email, String role, Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + bookingId));

        if ("PATIENT".equals(role)) {
            Patient patient = getPatientByEmail(email);
            if (!booking.getPatient().getId().equals(patient.getId())) {
                throw new UnauthorizedActionException("You cannot view another patient's booking");
            }
        }
        // LAB_TECHNICIAN can view any booking — no ownership restriction

        return BookingMapper.toResponse(booking);
    }

    public List<BookingResponse> getBookingsForPatient(String email, Long patientId) {
        Patient patient = getPatientByEmail(email);

        if (!patient.getId().equals(patientId)) {
            throw new UnauthorizedActionException("You cannot view another patient's bookings");
        }

        return bookingRepository.findByPatientId(patientId)
                .stream()
                .map(BookingMapper::toResponse)
                .toList();
    }

    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(BookingMapper::toResponse)
                .toList();
    }

    private Patient getPatientByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return patientRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found for this user"));
    }
    // Add to BookingService

    public BookingResponse updateStatus(Long bookingId, String newStatusStr) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + bookingId));

        BookingStatus newStatus;
        try {
            newStatus = BookingStatus.valueOf(newStatusStr);
        } catch (IllegalArgumentException e) {
            throw new IllegalStateException("Invalid status: " + newStatusStr);
        }

        BookingStatus current = booking.getStatus();

        boolean validTransition =
                (current == BookingStatus.SAMPLE_COLLECTED && newStatus == BookingStatus.TEST_IN_PROGRESS) ||
                        (current == BookingStatus.TEST_IN_PROGRESS && newStatus == BookingStatus.TEST_COMPLETED);

        if (!validTransition) {
            throw new IllegalStateException(
                    "Cannot move booking from " + current + " to " + newStatus);
        }

        booking.setStatus(newStatus);
        booking = bookingRepository.save(booking);
        return BookingMapper.toResponse(booking);
    }
}