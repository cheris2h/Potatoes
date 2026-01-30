package com.potatoes.backend.dto.response;

import com.potatoes.backend.domain.Report;
import lombok.Getter;
import java.time.format.DateTimeFormatter;

@Getter
public class ReportResponse {
    private final Long id;
    private final String bodyPartKorean;
    private final String intensity;
    private final String aiDiagnosis;
    private final String createdAt;
    private final Integer weight;

    public ReportResponse(Report report) {
        this.id = report.getId();
        // 영어가 아닌 한글 설명으로 전달
        this.bodyPartKorean = report.getBodyPart().getKoreanName();
        this.intensity = report.getIntensity();
        this.aiDiagnosis = report.getAiDiagnosis();
        this.createdAt = report.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        this.weight = report.getWeight();
    }
}