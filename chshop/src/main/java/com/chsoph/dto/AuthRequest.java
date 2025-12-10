package com.chsoph.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthRequest {
    @NotBlank(message = "Username or email is required")
    public String login;

    @NotBlank(message = "Password is required")
    public String password;
}