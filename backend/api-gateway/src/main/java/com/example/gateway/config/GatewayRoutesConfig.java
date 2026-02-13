package com.example.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.gateway.filter.JwtAuthFilter;

@Configuration
public class GatewayRoutesConfig {

    private final JwtAuthFilter filter;

    // 1. Iniettiamo il nostro filtro personalizzato
    public GatewayRoutesConfig(JwtAuthFilter filter) {
        this.filter = filter;
    }

@Bean
public RouteLocator routes(RouteLocatorBuilder builder) {
    return builder.routes()
        // Usa localhost invece del nome del servizio Docker
        .route("user-service-route", r -> r.path("/auth/**")
            .uri("http://localhost:8081")) 
            
        .route("user-service-protected", r -> r.path("/users/**")
            .filters(f -> f.filter(filter.apply(new JwtAuthFilter.Config())))
            .uri("http://localhost:8081"))
        .build();
}
}