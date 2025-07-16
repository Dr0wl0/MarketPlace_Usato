//package it.profice.corso.api.gateway;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.server.reactive.ServerHttpRequest;
//import org.springframework.http.server.reactive.ServerHttpResponse;
//import org.springframework.web.server.ServerWebExchange;
//import org.springframework.web.server.WebFilter;
//import org.springframework.web.server.WebFilterChain;
//
//@Configuration
//public class CorsConfig {
//
//    @Bean
//    public WebFilter corsFilter() {
//        return (ServerWebExchange ctx, WebFilterChain chain) -> {
//            ServerHttpRequest request = ctx.getRequest();
//
//            if (request.getMethod() == HttpMethod.OPTIONS) {
//                ServerHttpResponse response = ctx.getResponse();
//                response.setStatusCode(HttpStatus.OK);
//                response.getHeaders().add("Access-Control-Allow-Origin", "*");
//                response.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//                response.getHeaders().add("Access-Control-Allow-Headers", "*");
//                return response.setComplete();
//            }
//
//            ctx.getResponse().getHeaders().add("Access-Control-Allow-Origin", "*");
//            ctx.getResponse().getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//            ctx.getResponse().getHeaders().add("Access-Control-Allow-Headers", "*");
//
//            return chain.filter(ctx);
//        };
//    }
//}
