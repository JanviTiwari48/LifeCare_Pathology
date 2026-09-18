package com.lifecare.pathology.entity;

import com.lifecare.pathology.entity.enums.SampleStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "samples")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Sample {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "booking_id", nullable = false, unique = true)
    private Booking booking;

    @Column(nullable = false, unique = true)
    private String sampleCode;

    @Column(nullable = false)
    private LocalDateTime collectedAt;

    @Column(nullable = false)
    private String collectedBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SampleStatus sampleStatus;
}