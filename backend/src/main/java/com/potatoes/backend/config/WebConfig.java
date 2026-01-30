package com.potatoes.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                // 같은 와이파이 공유하는 모든 컴퓨터 접근 허용
                .allowedOriginPatterns("http://192.168.0.[*]:*", "http://localhost:*")
                .allowedMethods("*") // 모든 요청 허용
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}