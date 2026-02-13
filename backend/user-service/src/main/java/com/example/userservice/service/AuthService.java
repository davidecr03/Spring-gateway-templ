package com.example.userservice.service;

import com.example.userservice.dto.LoginRequest;
import com.example.userservice.dto.LoginResponse;
import com.example.userservice.model.User;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class AuthService {

    private final UserRepository repo;
    private final JwtUtil jwt;
    private final BCryptPasswordEncoder passwordEncoder; // Aggiunto per la sicurezza

    public AuthService(UserRepository repo, JwtUtil jwt, BCryptPasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.jwt = jwt;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse register(LoginRequest req) {
        // Criptiamo la password prima di salvarla!
        // Da "12345" diventa "$2a$10$xyz..."
        String encodedPassword = passwordEncoder.encode(req.getPassword());

        User newUser = new User();
        newUser.setEmail(req.getEmail());
        newUser.setPassword(encodedPassword); 

        repo.save(newUser);
        
        String token = jwt.generateToken(newUser.getEmail());
        return new LoginResponse(token, newUser.getEmail());
    }



    public LoginResponse login(LoginRequest req) {
        User user = repo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));

        // NON usiamo .equals()! 
        // matches() prende la password in chiaro e la confronta con l'hash nel DB
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Credenziali errate");
        }

        String token = jwt.generateToken(user.getEmail());
        return new LoginResponse(token, user.getEmail());
    }
}