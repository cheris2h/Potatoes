package com.potatoes.backend.controller;

import com.potatoes.backend.domain.User;
import com.potatoes.backend.dto.request.UserRequest; // 이 부분을 꼭 확인하세요!
import com.potatoes.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * [회원가입/로그인 API]
     * 이제 서비스가 원하는 'UserRequest' 가방으로 데이터를 받습니다.
     */
    @PostMapping("/signup")
    public ResponseEntity<Long> loginOrJoin(@RequestBody UserRequest request) {
        User user = userService.loginOrJoin(request);

        return ResponseEntity.ok(user.getId());
    }

    /**
     * [유저 조회 API]
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(user);
    }
}