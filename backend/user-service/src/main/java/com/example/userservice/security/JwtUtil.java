package com.example.userservice.security;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component//cosi si evita di utilizzare il costruttore per injection
public class JwtUtil {

    private final String SECRET = "super-secret-key";//da rifare utilizzando la cbiave pem 

    public String generateToken(String email) { //crea una stringa criptata che contiene 
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(SignatureAlgorithm.HS256, SECRET) //utiliziamo la chiave 
                .compact();
                
    }

    public String extractEmail(String token) { //estrae il tutto e verifica che sia valido 
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
