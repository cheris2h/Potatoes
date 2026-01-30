package com.potatoes.backend.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Gender {
    MALE("남자"),
    FEMALE("여자");

    private final String korean;

    public static Gender transportToGender(String koreanGender) {
        for (Gender gender : Gender.values()) {
            if (gender.korean.equals(koreanGender)) {
                return gender;
            }
        }
        throw new IllegalArgumentException("잘못된 성별 입력입니다: " + koreanGender);
    }
}