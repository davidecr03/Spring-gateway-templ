package com.example.gateway.util;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;
@Component
public class JwtUtil {
    private final String SECRET = "super-secret-key";

    public void validateToken(String token) {
        Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
        System.out.println("token valido");
    }
}

//il gateway ha anch esso bisogno di vedere se le richieste sono valide controllando con chiave pubblica il token