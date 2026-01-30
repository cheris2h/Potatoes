package com.potatoes.backend.dto.request;

import com.potatoes.backend.domain.BodyPart;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportRequest {
    private Long userId;        // 가입 이후에는 deviseId 대신 userId로 사용자 식별(효율성)
    private BodyPart bodyPart;
    private String intensity;
    private String symptomIcon;
}