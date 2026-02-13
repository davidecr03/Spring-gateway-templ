package com.example.gateway.util;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.function.Predicate;
@Component
public class RouteValidator {

    public static final List<String> openApiEndpoints = List.of(
        "/auth",
        "/eureka"
    );

    public Predicate<ServerHttpRequest> isSecured =
        request -> openApiEndpoints.stream()
            .noneMatch(path -> request.getURI().getPath().startsWith(path));
}
