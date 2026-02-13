package com.example.userservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.userservice.dto.*;
import com.example.userservice.service.*;

@RestController

@RequestMapping("/auth") // Prefisso per tutti gli endpoint in questa classe
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

  @PostMapping("/register")
public ResponseEntity<?> register(@RequestBody LoginRequest req) {
    try {
        LoginResponse response = authService.register(req);
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        // Stampiamo l'errore reale sulla console del server
        e.printStackTrace(); 
        // Restituiamo 500 invece di lasciare che Spring Security dia 403
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body("Errore durante la registrazione: " + e.getMessage());
    }
}

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest req) {
        return ResponseEntity.ok(authService.login(req));
    }
}