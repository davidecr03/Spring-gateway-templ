package com.example.userservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.userservice.model.User;

//parla col db utiliziammo metodi jpa
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
