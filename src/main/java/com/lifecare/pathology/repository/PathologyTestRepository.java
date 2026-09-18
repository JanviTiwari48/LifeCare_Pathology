package com.lifecare.pathology.repository;

import com.lifecare.pathology.entity.PathologyTest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PathologyTestRepository extends JpaRepository<PathologyTest, Long> {
    List<PathologyTest> findByActiveTrue();
    Optional<PathologyTest> findByTestCode(String testCode);
}