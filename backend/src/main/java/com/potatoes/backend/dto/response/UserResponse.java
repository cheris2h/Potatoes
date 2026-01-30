package com.potatoes.backend.dto.response;

import com.potatoes.backend.domain.User;
import lombok.Getter;

@Getter
public class UserResponse {

    private final Long id;
    private final String deviceId;
    private final String name;

    public UserResponse(User user) {
        this.id = user.getId();
        this.deviceId = user.getDeviceId();
        this.name = user.getName();
    }
}