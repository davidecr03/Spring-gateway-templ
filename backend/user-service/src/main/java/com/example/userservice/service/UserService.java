package com.example.userservice.service;

import org.springframework.stereotype.Service;

import com.example.userservice.model.User;
import com.example.userservice.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getProfileByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));
    }
}