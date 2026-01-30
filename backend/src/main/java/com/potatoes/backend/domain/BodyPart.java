package com.potatoes.backend.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BodyPart {
    HEAD("머리"),
    CHEST("가슴"),
    STOMACH("배"),
    BACK("등"),
    ARM_LEFT("왼팔"),
    ARM_RIGHT("오른팔"),
    LEG_LEFT("왼다리"),
    LEG_RIGHT("오른다리"),
    SHOULDER("어깨"),
    NECK("목");

    private final String koreanName;
}