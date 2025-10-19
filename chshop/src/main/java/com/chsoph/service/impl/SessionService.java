package com.chsoph.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class SessionService {

    public String generateSessionId() {
        return UUID.randomUUID().toString();
    }

    public boolean isValidSessionId(String sessionId) {
        return sessionId != null && sessionId.length() == 36; // UUID format
    }
}