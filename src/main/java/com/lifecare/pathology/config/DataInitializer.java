package com.lifecare.pathology.config;

import com.lifecare.pathology.entity.User;
import com.lifecare.pathology.entity.enums.Role;
import com.lifecare.pathology.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Value("${TECHNICIAN_EMAIL:technician@lifecare.com}")
    private String technicianEmail;

    @Value("${TECHNICIAN_PASSWORD:}")
    private String technicianPassword;

    @Bean
    CommandLineRunner createLabTechnician(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            if (technicianPassword.isBlank()) {
                return;
            }

            if (!userRepository.existsByEmail(technicianEmail)) {

                User technician = User.builder()
                        .name("LifeCare Technician")
                        .email(technicianEmail)
                        .password(passwordEncoder.encode(technicianPassword))
                        .role(Role.LAB_TECHNICIAN)
                        .build();

                userRepository.save(technician);

                System.out.println("LAB TECHNICIAN CREATED: " + technicianEmail);
            }
        };
    }
}