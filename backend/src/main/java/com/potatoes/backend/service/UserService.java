package com.potatoes.backend.service;

import com.potatoes.backend.domain.Gender;
import com.potatoes.backend.domain.User;
import com.potatoes.backend.dto.request.UserRequest;
import com.potatoes.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public User loginOrJoin(UserRequest userRequest) {
        return userRepository.findByDeviceId(userRequest.getDeviceId())
                .orElseGet(() -> {

                    return userRepository.save(User.builder()
                            .deviceId(userRequest.getDeviceId())
                            .name(userRequest.getName())
                            .birth(userRequest.getBirth())
                            .gender(Gender.transportToGender(userRequest.getGender()))
                            .emergencyContact(userRequest.getEmergencyContact())
                            .build());
                });
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다. ID: " + id));
    }
}