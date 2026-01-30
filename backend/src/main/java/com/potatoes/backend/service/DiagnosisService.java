package com.potatoes.backend.service;

import com.potatoes.backend.domain.Report;
import com.potatoes.backend.domain.User;
import com.potatoes.backend.dto.request.ReportRequest;
import com.potatoes.backend.repository.ReportRepository;
import com.potatoes.backend.repository.UserRepository;
import com.google.genai.Client; // 구글 공식 라이브러리
import com.google.genai.types.GenerateContentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    @Transactional
    public Long saveReport(ReportRequest reportRequest) {
        User user = userRepository.findById(reportRequest.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다. ID: " + reportRequest.getUserId()));

        String aiAnswer = callAi(reportRequest);

        Report report = Report.builder()
                .user(user)
                .bodyPart(reportRequest.getBodyPart())
                .symptomIcon(reportRequest.getSymptomIcon())
                .intensity(reportRequest.getIntensity())
                .aiDiagnosis(aiAnswer)
                .build();

        return reportRepository.save(report).getId();
    }

    private String callAi(ReportRequest reportRequest) {
        try {
            Client client = Client.builder().apiKey(apiKey).build();

            String prompt = String.format(
                    "너는 노인 건강 전문의야. 아래 정보를 바탕으로 어르신께 따뜻한 조언 3줄을 해줘.\n" +
                            "1. 아픈 부위: %s\n" +
                            "2. 아픈 정도: %s (1~100)\n" +
                            "3. 증상 아이콘: %s\n\n" +
                            "말투는 '~하셔요', '~보셔요' 처럼 부드럽게 해줘.",
                    reportRequest.getBodyPart().getKoreanName(),
                    reportRequest.getIntensity(),
                    reportRequest.getSymptomIcon()
            );

            GenerateContentResponse response = client.models.generateContent(model, prompt, null);
            return response.text();

        } catch (Exception e) {
            return "어르신, 지금 시스템에 잠시 문제가 생겼어요. 곧 다시 도와드릴게요.";
        }
    }

    public List<Report> getReportsByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));
        return reportRepository.findByUserOrderByIdDesc(user);
    }
}