package com.lifecare.pathology.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "pathology_tests")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PathologyTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String testName;

    @Column(nullable = false, unique = true)
    private String testCode;

    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private String sampleType;

    @Column(nullable = false)
    private boolean active;
}