package com.potatoes.backend.domain;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String deviceId;

    private String name;
    private String birth;
    private Character gender;

    private String emergencyContact = "보호자 존재 X";

    @Builder
    public User(String deviceId, String name, String birth, Character gender, String emergencyContact) {
        this.deviceId = deviceId;
        this.name = name;
        this.birth = birth;
        this.gender = gender;
        if (emergencyContact != null) {
            this.emergencyContact = emergencyContact;
        }
    }
}