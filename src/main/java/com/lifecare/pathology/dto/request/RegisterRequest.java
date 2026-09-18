package com.lifecare.pathology.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "Role is required")
    @Pattern(regexp = "PATIENT|LAB_TECHNICIAN", message = "Role must be PATIENT or LAB_TECHNICIAN")
    private String role;

    // Only used when role = PATIENT; ignored otherwise
    private String phone;
    private String address;
}