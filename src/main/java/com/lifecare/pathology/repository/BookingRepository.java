package com.lifecare.pathology.repository;

import com.lifecare.pathology.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByPatientId(Long patientId);
}