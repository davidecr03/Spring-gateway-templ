package com.example.userservice.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter @Setter @NoArgsConstructor
public class LoginResponse {
    public String token;
    public String email;

    public LoginResponse(String token, String email) {
        this.token = token;
        this.email = email;
    }
}//dto output login
