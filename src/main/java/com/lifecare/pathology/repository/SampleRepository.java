package com.lifecare.pathology.repository;

import com.lifecare.pathology.entity.Sample;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SampleRepository extends JpaRepository<Sample, Long> {
    Optional<Sample> findByBookingId(Long bookingId);
}