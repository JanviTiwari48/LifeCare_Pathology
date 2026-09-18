package com.lifecare.pathology.dto.response;

import lombok.*;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class AuthResponse {
    private String token;
    private String name;
    private String email;
    private String role;
}