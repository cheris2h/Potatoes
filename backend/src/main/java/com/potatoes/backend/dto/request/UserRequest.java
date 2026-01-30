package com.potatoes.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private String deviceId;
    private String name;
    private String birth;
    private String gender;
    private String emergencyContact;
}
