package com.potatoes.backend.dto.response;

import com.potatoes.backend.domain.Report;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
public class ReportResponse {
    private final Long id;
    private final String bodyPartKorean;
    private final String intensity;
    private final String aiDiagnosisText;
    private final LocalDateTime createdAt;

    public ReportResponse(Report report) {
        this.id = report.getId();
        // 영어가 아닌 한글 설명으로 전달
        this.bodyPartKorean = report.getBodyPart().getKoreanName();
        this.intensity = report.getIntensity();
        this.aiDiagnosisText = report.getAiDiagnosis();
        this.createdAt = report.getCreatedAt();
    }
}