package com.lifecare.pathology.service;

import com.lifecare.pathology.dto.request.LoginRequest;
import com.lifecare.pathology.dto.request.RegisterRequest;
import com.lifecare.pathology.dto.response.AuthResponse;
import com.lifecare.pathology.entity.Patient;
import com.lifecare.pathology.entity.User;
import com.lifecare.pathology.entity.enums.Role;
import com.lifecare.pathology.exception.DuplicateResourceException;
import com.lifecare.pathology.repository.PatientRepository;
import com.lifecare.pathology.repository.UserRepository;
import com.lifecare.pathology.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository,
                       PatientRepository patientRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already registered: " + request.getEmail());
        }

        Role role = Role.PATIENT;

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();
        user = userRepository.save(user);
        Long patientId = null;   // ADD
        if (role == Role.PATIENT) {
            Patient patient = Patient.builder()
                    .user(user)
                    .phone(request.getPhone())
                    .address(request.getAddress())
                    .build();

            patient = patientRepository.save(patient);   // CHANGED — capture return value
            patientId = patient.getId();
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .patientId(patientId)
                .build();
    }

    public AuthResponse login(LoginRequest request) {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (org.springframework.security.core.AuthenticationException e) {
            throw new BadCredentialsException("Invalid email or password");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));
        Long patientId = null;   // ADD
        if (user.getRole() == Role.PATIENT) {   // ADD
            patientId = patientRepository.findByUserId(user.getId())
                    .map(Patient::getId)
                    .orElse(null);
        }
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .patientId(patientId)
                .build();
    }
}