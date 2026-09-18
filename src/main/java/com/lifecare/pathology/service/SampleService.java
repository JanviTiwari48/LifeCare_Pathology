package com.lifecare.pathology.service;

import com.lifecare.pathology.dto.response.SampleResponse;
import com.lifecare.pathology.entity.Booking;
import com.lifecare.pathology.entity.Sample;
import com.lifecare.pathology.entity.enums.BookingStatus;
import com.lifecare.pathology.entity.enums.SampleStatus;
import com.lifecare.pathology.exception.ResourceNotFoundException;
import com.lifecare.pathology.mapper.SampleMapper;
import com.lifecare.pathology.repository.BookingRepository;
import com.lifecare.pathology.repository.SampleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class SampleService {

    private final SampleRepository sampleRepository;
    private final BookingRepository bookingRepository;

    public SampleService(SampleRepository sampleRepository, BookingRepository bookingRepository) {
        this.sampleRepository = sampleRepository;
        this.bookingRepository = bookingRepository;
    }

    public SampleResponse collectSample(Long bookingId, String collectedByName) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + bookingId));

        if (booking.getStatus() != BookingStatus.BOOKED) {
            throw new IllegalStateException(
                    "Sample can only be collected for a BOOKED booking, current status: " + booking.getStatus());
        }

        Sample sample = Sample.builder()
                .booking(booking)
                .sampleCode("SMP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .collectedAt(LocalDateTime.now())
                .collectedBy(collectedByName)
                .sampleStatus(SampleStatus.COLLECTED)
                .build();
        sample = sampleRepository.save(sample);

        booking.setStatus(BookingStatus.SAMPLE_COLLECTED);
        bookingRepository.save(booking);

        return SampleMapper.toResponse(sample);
    }

    public SampleResponse getSampleById(Long id) {
        Sample sample = sampleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sample not found: " + id));
        return SampleMapper.toResponse(sample);
    }

    public List<SampleResponse> getAllSamples() {
        return sampleRepository.findAll()
                .stream()
                .map(SampleMapper::toResponse)
                .toList();
    }
}