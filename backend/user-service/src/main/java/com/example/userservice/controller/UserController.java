package com.example.userservice.controller;

import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.userservice.model.User;
import com.example.userservice.service.UserService;

@RestController
@RequestMapping("/users") //rotte private 
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        // authentication.getName() recupera l'email messa nel contesto dal filtro JWT
        String email = authentication.getName();
        User user = userService.getProfileByEmail(email);
        return ResponseEntity.ok(user);
    }
}