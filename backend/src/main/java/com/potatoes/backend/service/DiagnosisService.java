package com.potatoes.backend.service;

import com.potatoes.backend.domain.Report;
import com.potatoes.backend.domain.User;
import com.potatoes.backend.dto.request.ReportRequest;
import com.potatoes.backend.dto.response.GeminiResponse;
import com.potatoes.backend.repository.ReportRepository;
import com.potatoes.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DiagnosisService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    @Value("${google.genai.api-key}")
    private String apiKey;

    @Value("${google.genai.model}")
    private String model;

    /**
     * [최초 생성 및 AI 분석]
     * 유저 확인 -> AI 호출 -> 결과 포함하여 리포트 생성 -> 저장
     */
    @Transactional
    public Long saveReport(ReportRequest reportRequest) {
        User user = userRepository.findById(reportRequest.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다. ID: " + reportRequest.getUserId()));

        String aiResult = callAi(reportRequest);

        Report report = Report.builder()
                .user(user)
                .bodyPart(reportRequest.getBodyPart())
                .symptomIcon(reportRequest.getSymptomIcon())
                .intensity(reportRequest.getIntensity())
                .aiDiagnosis(aiResult)
                .build();

        return reportRepository.save(report).getId();
    }

    /**
     * Gemini API 호출 로직
     */
    private String callAi(ReportRequest reportRequest) {
        String apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + apiKey;
        RestTemplate restTemplate = new RestTemplate();

        String prompt = String.format(
                "너는 노인 건강 전문의야. 부드러운 말투로 조언해줘. " +
                        "환자 부위: %s, 통증 강도: %s, 증상 유형: %s. " +
                        "이 정보를 바탕으로 어르신을 위한 따뜻한 조언 3줄을 써줘." +
                        "나중에 수정하기",
                reportRequest.getBodyPart().getKoreanName(),
                reportRequest.getIntensity(),
                reportRequest.getSymptomIcon()
        );

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(Map.of(
                        "parts", List.of(Map.of("text", prompt))
                ))
        );

        try {
            GeminiResponse response = restTemplate.postForObject(apiUrl, requestBody, GeminiResponse.class);
            return (response != null) ? response.getFirstText() : "진단 결과를 불러오지 못했습니다.";
        } catch (Exception e) {
            log.error("AI 호출 에러: {}", e.getMessage());
            return "AI 분석이 일시적으로 지연되고 있습니다. 건강 상태를 유심히 지켜봐 주세요.";
        }
    }

    /**
     * 전체 리포트 조회
     */
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }
}